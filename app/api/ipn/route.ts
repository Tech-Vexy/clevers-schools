import { type NextRequest, NextResponse } from "next/server"
import { getAuthToken, getTransactionStatus } from "@/lib/pesapal"
import { connectToDatabase } from "@/lib/mongodb"

// Types for payment records
interface PaymentRecord {
  orderTrackingId: string
  paymentStatus: string
  paymentMethod: string
  amount: number
  currency: string
  confirmationCode?: string
  paymentDate?: string
  createdAt: Date
  updatedAt: Date
}

// Save or update payment record in MongoDB
async function savePaymentRecord(status: any): Promise<string> {
  const { db } = await connectToDatabase()
  const collection = db.collection("payments")

  const paymentRecord: PaymentRecord = {
    orderTrackingId: status.order_tracking_id,
    paymentStatus: status.payment_status_description,
    paymentMethod: status.payment_method,
    amount: status.amount,
    currency: status.currency,
    confirmationCode: status.confirmation_code,
    paymentDate: status.payment_date,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  // Check if record already exists
  const existingRecord = await collection.findOne({ orderTrackingId: status.order_tracking_id })

  if (existingRecord) {
    // Update existing record
    await collection.updateOne(
      { orderTrackingId: status.order_tracking_id },
      {
        $set: {
          ...paymentRecord,
          createdAt: existingRecord.createdAt, // Preserve original creation date
          updatedAt: new Date(), // Update the update timestamp
        },
      },
    )
    return `Updated payment record: ${status.order_tracking_id}`
  } else {
    // Create new record
    await collection.insertOne(paymentRecord)
    return `Created payment record: ${status.order_tracking_id}`
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const orderTrackingId = searchParams.get("OrderTrackingId")

  if (!orderTrackingId) {
    return NextResponse.json({ message: "OrderTrackingId is required" }, { status: 400 })
  }

  try {
    const authToken = await getAuthToken()
    const status = await getTransactionStatus(authToken, orderTrackingId)

    console.log("IPN received:", status)

    // Save transaction data to MongoDB
    const dbResult = await savePaymentRecord(status)
    console.log(dbResult)

    return NextResponse.json({ message: "IPN Received", status })
  } catch (error) {
    console.error("IPN error:", error)
    return NextResponse.json({ message: "IPN Error" }, { status: 500 })
  }
}

