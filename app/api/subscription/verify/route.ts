import { type NextRequest, NextResponse } from "next/server"
import { getAuthToken, getTransactionStatus } from "@/lib/pesapal"
import { connectToDatabase } from "@/lib/mongodb"

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
  const orderMerchantReference = searchParams.get("OrderMerchantReference")

  if (!orderTrackingId || !orderMerchantReference) {
    return NextResponse.json(
      {
        success: false,
        message: "Missing required parameters",
      },
      { status: 400 },
    )
  }

  try {
    // Get auth token and transaction status
    const authToken = await getAuthToken()
    const status = await getTransactionStatus(authToken, orderTrackingId)

    // Check if payment is completed
    if (status.payment_status_description === "Completed") {
      // Update subscription status
      await updateSubscriptionStatus(orderTrackingId, "active")

      return NextResponse.json({
        success: true,
        message: "Subscription activated successfully",
      })
    } else {
      return NextResponse.json({
        success: false,
        message: `Payment status: ${status.payment_status_description}`,
      })
    }
  } catch (error) {
    console.error("Verification error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to verify payment status",
      },
      { status: 500 },
    )
  }
}

