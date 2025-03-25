import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { getAuthToken, registerIPN, submitOrder, getTransactionStatus } from "@/lib/pesapal"
import { connectToDatabase } from "@/lib/mongodb"
import type { ObjectId } from "mongodb"

// TypeScript interfaces
interface OrderData {
  orderId: string
  currency: string
  amount: number
  description: string
  email: string
  phone: string
  firstName: string
  lastName: string
  countryCode: string
}

interface DBOrder {
  _id?: ObjectId
  orderId: string
  currency: string
  amount: number
  description: string
  email: string
  phone: string
  firstName: string
  lastName: string
  countryCode: string
  status: string
  ipnId?: string
  orderTrackingId?: string
  redirectUrl?: string
  paymentMethod?: string
  paymentAccount?: string
  paymentDate?: Date
  createdAt: Date
  updatedAt: Date
}

// Save order to MongoDB
async function saveOrderToDatabase(orderData: OrderData, ipnId: string, orderResponse: any): Promise<string> {
  const { db } = await connectToDatabase()
  const orders = db.collection("orders")

  // Check if order already exists
  const existingOrder = await orders.findOne({
    $or: [{ orderId: orderData.orderId }, { orderTrackingId: orderResponse.order_tracking_id }],
  })

  if (existingOrder) {
    // Update existing order
    await orders.updateOne(
      { _id: existingOrder._id },
      {
        $set: {
          status: orderResponse.status,
          ipnId: ipnId,
          orderTrackingId: orderResponse.order_tracking_id,
          redirectUrl: orderResponse.redirect_url,
          paymentMethod: orderResponse.payment_method,
          updatedAt: new Date(),
        },
      },
    )
    return existingOrder._id.toString()
  }

  const dbOrder: DBOrder = {
    orderId: orderData.orderId,
    currency: orderData.currency,
    amount: orderData.amount,
    description: orderData.description,
    email: orderData.email,
    phone: orderData.phone,
    firstName: orderData.firstName,
    lastName: orderData.lastName,
    countryCode: orderData.countryCode,
    status: orderResponse.status,
    ipnId: ipnId,
    orderTrackingId: orderResponse.order_tracking_id,
    redirectUrl: orderResponse.redirect_url,
    paymentMethod: orderResponse.payment_method,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const result = await orders.insertOne(dbOrder)
  return result.insertedId.toString()
}

// Update order status in MongoDB
async function updateOrderStatus(orderId: string, status: string, paymentDetails?: Partial<DBOrder>): Promise<boolean> {
  const { db } = await connectToDatabase()
  const orders = db.collection("orders")

  const updateData: Partial<DBOrder> = {
    status: status,
    updatedAt: new Date(),
    ...paymentDetails,
  }

  const result = await orders.updateOne({ orderId: orderId }, { $set: updateData })

  return result.modifiedCount > 0
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate amount
    const amount = Number.parseFloat(data.amount)
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid amount. Please enter a positive number.",
        },
        { status: 400 },
      )
    }

    const orderData: OrderData = {
      orderId: "ORDER-" + crypto.randomUUID().substring(0, 8),
      currency: data.currency || "KES",
      amount: amount,
      description: data.description || "Payment for goods/services",
      email: data.email,
      phone: data.phone,
      firstName: data.firstName,
      lastName: data.lastName,
      countryCode: data.countryCode || "KE",
    }

    // Get auth token and IPN ID
    const authToken = await getAuthToken()
    const ipnId = await registerIPN(authToken)

    // Submit order to PesaPal
    const orderResponse = await submitOrder(authToken, ipnId, orderData)

    // Store order data in MongoDB
    const dbOrderId = await saveOrderToDatabase(orderData, ipnId, orderResponse)

    return NextResponse.json({
      success: true,
      order: orderResponse,
      dbOrderId: dbOrderId,
    })
  } catch (error) {
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

// IPN handler to receive payment notifications
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const orderTrackingId = searchParams.get("OrderTrackingId")
    const orderMerchantReference = searchParams.get("OrderMerchantReference")
    const orderNotificationType = searchParams.get("OrderNotificationType")

    if (!orderTrackingId || !orderMerchantReference) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required parameters",
        },
        { status: 400 },
      )
    }

    // Get order status from PesaPal
    const authToken = await getAuthToken()

    try {
      const paymentStatus = await getTransactionStatus(authToken, orderTrackingId)

      // Update order in database
      await updateOrderStatus(orderMerchantReference, paymentStatus.payment_status_description, {
        paymentMethod: paymentStatus.payment_method,
        paymentAccount: paymentStatus.payment_account,
        paymentDate: new Date(paymentStatus.created_date),
      })

      // If payment is completed, create a subscription if this is a subscription order
      if (
        paymentStatus.payment_status_description === "COMPLETED" &&
        (orderMerchantReference.startsWith("SUB-") || paymentStatus.description?.includes("Subscription"))
      ) {
        // Create subscription via API call to subscription endpoint
        try {
          const { db } = await connectToDatabase()
          const orders = db.collection("orders")

          // Get the order
          const order = await orders.findOne({
            $or: [{ orderId: orderMerchantReference }, { orderTrackingId: orderTrackingId }],
          })

          if (order) {
            // Call the subscription API to create a subscription
            const subscriptionResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/subscription`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                orderTrackingId: orderTrackingId,
              }),
            })

            const subscriptionData = await subscriptionResponse.json()
            console.log("Subscription created:", subscriptionData)
          }
        } catch (subscriptionError) {
          console.error("Error creating subscription:", subscriptionError)
        }
      }

      return NextResponse.json({
        success: true,
        message: "IPN received and processed successfully",
        status: paymentStatus.payment_status_description,
      })
    } catch (error) {
      // Still update the order with the notification type
      await updateOrderStatus(orderMerchantReference, orderNotificationType || "NOTIFICATION_RECEIVED")

      return NextResponse.json({
        success: true,
        message: "IPN received but status check failed",
        error: (error as Error).message,
      })
    }
  } catch (error) {
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

