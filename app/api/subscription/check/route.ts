import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { getUserSubscription } from "@/lib/subscription"
import { authOptions } from "@/auth"

export async function GET(request: NextRequest) {
  try {
    // Get the current user session
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        {
          isSubscribed: false,
          message: "User not authenticated",
        },
        { status: 401 },
      )
    }

    const userId = session.user.id
    const subscription = await getUserSubscription(userId)

    if (!subscription) {
      return NextResponse.json({
        isSubscribed: false,
      })
    }

    return NextResponse.json({
      isSubscribed: true,
      subscription,
    })
  } catch (error) {
    console.error("Error checking subscription:", error)
    const err = error as Error
    return NextResponse.json(
      {
        isSubscribed: false,
        message: err.message,
      },
      { status: 500 },
    )
  }
}

