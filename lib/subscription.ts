import { connectToDatabase } from "@/lib/mongodb"

// Check if a payment reference has already been processed
export async function isPaymentReferenceProcessed(reference: string): Promise<boolean> {
  const { db } = await connectToDatabase()
  const subscriptions = db.collection("subscriptions")

  const existingSubscription = await subscriptions.findOne({
    reference: reference,
    status: "active",
  })

  return !!existingSubscription
}

// Get user subscription by user ID
export async function getUserSubscription(userId: string) {
  const { db } = await connectToDatabase()
  const subscriptions = db.collection("subscriptions")

  const now = new Date()
  const subscription = await subscriptions.findOne({
    userId,
    expiryDate: { $gt: now },
    status: "active",
  })

  if (!subscription) return null

  // Calculate remaining days
  const expiryDate = new Date(subscription.expiryDate)
  const remainingDays = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  return {
    id: subscription._id.toString(),
    startDate: subscription.startDate,
    expiryDate: subscription.expiryDate,
    remainingDays,
    status: subscription.status,
    reference: subscription.reference || subscription.orderTrackingId,
    amount: subscription.amount,
    userEmail: subscription.userEmail,
  }
}

// Get user subscription by email
export async function getUserSubscriptionByEmail(email: string) {
  const { db } = await connectToDatabase()
  const subscriptions = db.collection("subscriptions")

  const now = new Date()
  const subscription = await subscriptions.findOne({
    userEmail: email,
    expiryDate: { $gt: now },
    status: "active",
  })

  if (!subscription) return null

  // Calculate remaining days
  const expiryDate = new Date(subscription.expiryDate)
  const remainingDays = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  return {
    id: subscription._id.toString(),
    startDate: subscription.startDate,
    expiryDate: subscription.expiryDate,
    remainingDays,
    status: subscription.status,
    reference: subscription.reference || subscription.orderTrackingId,
    amount: subscription.amount,
    userEmail: subscription.userEmail,
  }
}

