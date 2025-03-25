import { type NextRequest, NextResponse } from "next/server"
import { getAuthToken, getTransactionStatus } from "@/lib/pesapal"
import { connectToDatabase } from "@/lib/mongodb"

// Update subscription status
async function updateSubscriptionStatus(orderTrackingId: string, status: string, paymentDetails: any) {
  const { db } = await connectToDatabase()
  const subscriptions = db.collection("subscriptions")
  const orders = db.collection("orders")

  // Find the subscription
  const subscription = await subscriptions.findOne({ orderTrackingId })

  if (!subscription) {
    throw new Error("Subscription not found")
  }

  // Update subscription status
  await subscriptions.updateOne(
    { orderTrackingId },
    {
      $set: {
        status: status === "COMPLETED" ? "active" : status.toLowerCase(),
        paymentMethod: paymentDetails.payment_method,
        paymentAccount: paymentDetails.payment_account,
        paymentDate: new Date(paymentDetails.created_date),
        updatedAt: new Date(),
      },
    },
  )

  // Update the corresponding order as well
  const order = await orders.findOne({ orderTrackingId })

  if (order) {
    await orders.updateOne(
      { orderTrackingId },
      {
        $set: {
          status: status,
          paymentMethod: paymentDetails.payment_method,
          paymentAccount: paymentDetails.payment_account,
          paymentDate: new Date(paymentDetails.created_date),
          updatedAt: new Date(),
        },
      },
    )
  }

  return subscription
}

// Create a subscription if it doesn't exist
async function createSubscriptionIfNeeded(orderTrackingId: string, status: any) {
  const { db } = await connectToDatabase()
  const subscriptions = db.collection("subscriptions")
  const orders = db.collection("orders")
  const users = db.collection("users")

  // Check if subscription already exists
  const existingSubscription = await subscriptions.findOne({ orderTrackingId })

  if (existingSubscription) {
    // Subscription exists, just update it
    return updateSubscriptionStatus(orderTrackingId, status.payment_status_description, status)
  }

  // Find the order
  const order = await orders.findOne({ orderTrackingId })

  if (!order) {
    throw new Error("Order not found")
  }

  // Find the user
  const user = await users.findOne({ email: order.email || order.userEmail })

  if (!user) {
    throw new Error("User not found")
  }

  // Create a new subscription
  const startDate = new Date()
  const expiryDate = new Date()
  expiryDate.setDate(expiryDate.getDate() + 365) // 1 year

  const subscription = {
    userId: user._id.toString(),
    userEmail: user.email,
    orderTrackingId,
    orderId: order.orderId,
    amount: order.amount,
    currency: order.currency,
    status: status.payment_status_description === "COMPLETED" ? "active" : "pending",
    startDate,
    expiryDate,
    paymentMethod: status.payment_method,
    paymentAccount: status.payment_account,
    paymentDate: new Date(status.created_date),
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  await subscriptions.insertOne(subscription)
  return subscription
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const orderTrackingId = searchParams.get("OrderTrackingId")

  if (!orderTrackingId) {
    return NextResponse.json({ message: "OrderTrackingId is required" }, { status: 400 })
  }

  try {
    // Get auth token and transaction status
    const authToken = await getAuthToken()
    const status = await getTransactionStatus(authToken, orderTrackingId)

    console.log("IPN received:", status)

    // Create or update subscription based on payment status
    const subscription = await createSubscriptionIfNeeded(orderTrackingId, status)

    return NextResponse.json({
      message: "IPN Received and processed",
      status: status.payment_status_description,
      subscription,
    })
  } catch (error) {
    console.error("IPN error:", error)
    return NextResponse.json({ message: "IPN Error", error: (error as Error).message }, { status: 500 })
  }
}

