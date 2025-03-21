import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { getAuthToken, registerIPN, submitOrder, getTransactionStatus } from "@/lib/pesapal"
import { connectToDatabase } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { ObjectId } from "mongodb"

// Fixed subscription amount
const SUBSCRIPTION_AMOUNT = 1005

// Save subscription to database for iframe payments
async function saveIframeSubscription(userId: string, data: any) {
  const { db } = await connectToDatabase()
  const subscriptions = db.collection("subscriptions")
  const users = db.collection("users")

  // Get user email
  const user = await users.findOne({ _id: new ObjectId(userId) })
  if (!user) {
    throw new Error("User not found")
  }

  const startDate = new Date()
  const expiryDate = new Date()
  expiryDate.setDate(expiryDate.getDate() + (data.duration || 365))

  // Check if a subscription with this reference already exists
  const existingSubscription = await subscriptions.findOne({
    reference: data.reference,
    userId: userId,
  })

  if (existingSubscription) {
    // Update the existing subscription to active if it's not already
    if (existingSubscription.status !== "active") {
      await subscriptions.updateOne(
        { _id: existingSubscription._id },
        {
          $set: {
            status: "active",
            updatedAt: new Date(),
          },
        },
      )
    }
    return { id: existingSubscription._id.toString(), ...existingSubscription, status: "active" }
  }

  // Create a new subscription
  const subscription = {
    userId,
    userEmail: user.email, // Link to user email
    reference: data.reference,
    amount: data.amount || SUBSCRIPTION_AMOUNT,
    currency: data.currency || "KES",
    startDate,
    expiryDate,
    status: "active", // Direct activation for iframe payments
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const result = await subscriptions.insertOne(subscription)
  return { id: result.insertedId.toString(), ...subscription }
}

// Update the saveRedirectSubscription function to include email
async function saveRedirectSubscription(userId: string, orderData: any, orderResponse: any) {
  const { db } = await connectToDatabase()
  const subscriptions = db.collection("subscriptions")
  const users = db.collection("users")

  // Get user email
  const user = await users.findOne({ _id: new ObjectId(userId) })
  if (!user) {
    throw new Error("User not found")
  }

  const startDate = new Date()
  const expiryDate = new Date()
  expiryDate.setDate(expiryDate.getDate() + orderData.duration)

  const subscription = {
    userId,
    userEmail: user.email, // Link to user email
    orderId: orderData.orderId,
    orderTrackingId: orderResponse.order_tracking_id,
    amount: orderData.amount,
    currency: orderData.currency,
    startDate,
    expiryDate,
    status: "pending", // Will be updated when payment is confirmed
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const result = await subscriptions.insertOne(subscription)
  return { id: result.insertedId.toString(), ...subscription }
}

// Update the createSubscriptionFromOrder function to include email
async function createSubscriptionFromOrder(orderTrackingId: string) {
  // Get auth token
  const authToken = await getAuthToken()

  // Get transaction status
  const status = await getTransactionStatus(authToken, orderTrackingId)

  if (status.payment_status_description !== "COMPLETED") {
    throw new Error(`Payment not completed. Status: ${status.payment_status_description}`)
  }

  // Get order details from database
  const { db } = await connectToDatabase()
  const orders = db.collection("orders")

  const order = await orders.findOne({ orderTrackingId })

  if (!order) {
    throw new Error("Order not found")
  }

  // Get user by email
  const users = db.collection("users")
  const user = await users.findOne({ email: order.email })

  if (!user) {
    throw new Error("User not found")
  }

  // Create subscription
  const subscriptions = db.collection("subscriptions")

  // Check if subscription already exists
  const existingSubscription = await subscriptions.findOne({
    orderTrackingId,
    userId: user._id.toString(),
  })

  if (existingSubscription) {
    // Update status if needed
    if (existingSubscription.status !== "active") {
      await subscriptions.updateOne(
        { _id: existingSubscription._id },
        {
          $set: {
            status: "active",
            updatedAt: new Date(),
          },
        },
      )
    }
    return { id: existingSubscription._id.toString(), ...existingSubscription, status: "active" }
  }

  // Create new subscription
  const startDate = new Date()
  const expiryDate = new Date()
  expiryDate.setDate(expiryDate.getDate() + 365) // 1 year

  const subscription = {
    userId: user._id.toString(),
    userEmail: user.email, // Link to user email
    orderTrackingId,
    orderId: order.orderId,
    amount: order.amount,
    currency: order.currency,
    startDate,
    expiryDate,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const result = await subscriptions.insertOne(subscription)
  return { id: result.insertedId.toString(), ...subscription }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Check if this is a request to create subscription from completed order
    if (data.orderTrackingId) {
      // Validate required fields
      if (!data.orderTrackingId) {
        return NextResponse.json(
          {
            success: false,
            message: "Order tracking ID is required",
          },
          { status: 400 },
        )
      }

      // Create subscription from completed order
      const subscription = await createSubscriptionFromOrder(data.orderTrackingId)

      return NextResponse.json({
        success: true,
        subscription,
        message: "Subscription created from completed order",
      })
    }
    // Check if this is a direct iframe payment with reference
    else if (data.reference) {
      // Validate required fields
      if (!data.userId || !data.reference) {
        return NextResponse.json(
          {
            success: false,
            message: "Missing required fields for iframe payment",
          },
          { status: 400 },
        )
      }

      console.log("Processing iframe payment with reference:", data.reference)

      // Save subscription to database
      const subscription = await saveIframeSubscription(data.userId, data)

      return NextResponse.json({
        success: true,
        subscription,
        message: "Subscription activated successfully",
      })
    } else {
      // This is the original flow with PesaPal redirect
      // Get the current user session
      const session = await getServerSession(authOptions)

      if (!session?.user) {
        return NextResponse.json(
          {
            success: false,
            message: "User not authenticated",
          },
          { status: 401 },
        )
      }

      // Validate required fields
      if (!data.email || !data.firstName) {
        return NextResponse.json(
          {
            success: false,
            message: "Missing required fields for redirect payment",
          },
          { status: 400 },
        )
      }

      // Create order data
      const orderData = {
        orderId: "SUB-" + crypto.randomUUID().substring(0, 8),
        currency: data.currency || "KES",
        amount: data.amount || SUBSCRIPTION_AMOUNT, // Use fixed amount if not specified
        description: data.description || "Annual Subscription",
        email: data.email,
        phone: data.phone || "",
        firstName: data.firstName,
        lastName: data.lastName || "",
        countryCode: data.countryCode || "KE",
        duration: data.duration || 365,
      }

      // Get auth token and register IPN
      const authToken = await getAuthToken()
      const ipnId = await registerIPN(authToken, true)

      // Submit order to PesaPal
      const orderResponse = await submitOrder(authToken, ipnId, orderData, true)

      // Save subscription to database
      const subscription = await saveRedirectSubscription(session.user.id, orderData, orderResponse)

      return NextResponse.json({
        success: true,
        order: orderResponse,
        subscription,
      })
    }
  } catch (error) {
    console.error("Error creating subscription:", error)
    const err = error as Error
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 },
    )
  }
}

