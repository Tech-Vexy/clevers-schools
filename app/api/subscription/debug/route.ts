import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectToDatabase } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    // Get the current user session
    const session = await getServerSession()

    if (!session?.user?.email?.includes("admin")) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      )
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const reference = searchParams.get("reference")

    const { db } = await connectToDatabase()
    const subscriptions = db.collection("subscriptions")

    let query = {}

    if (userId) {
      query = { ...query, userId }
    }

    if (reference) {
      query = { ...query, reference }
    }

    const subscriptionData = await subscriptions.find(query).toArray()

    return NextResponse.json({
      success: true,
      subscriptions: subscriptionData,
    })
  } catch (error) {
    console.error("Debug error:", error)
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

