import { type NextRequest, NextResponse } from "next/server"
import { getAuthToken, getTransactionStatus } from "@/lib/pesapal"
import { connectToDatabase } from "@/lib/db"

// Update subscription status
async function updateSubscriptionStatus(orderTrackingId: string, status: string) {
  const { db } = await connectToDatabase()
  const subscriptions = db.collection("subscriptions")

  const subscription = await subscriptions.findOne({ orderTrackingId })

  if (!subscription) {
    throw new Error("Subscription not found")
  }

  await subscriptions.updateOne(
    { orderTrackingId },
    {
      $set: {
        status,
        updatedAt: new Date(),
      },
    },
  )

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

    // Check if payment is completed
    if (status.payment_status_description === "Completed") {
      // Update subscription status
      await updateSubscriptionStatus(orderTrackingId, "active")
    }

    return NextResponse.json({ message: "IPN Received", status })
  } catch (error) {
    console.error("IPN error:", error)
    return NextResponse.json({ message: "IPN Error" }, { status: 500 })
  }
}

