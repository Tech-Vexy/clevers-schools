import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")
    const email = searchParams.get("email")

    if (!token || !email) {
      return NextResponse.json({ valid: false, message: "Missing token or email" }, { status: 400 })
    }

    const { db } = await connectToDatabase()
    const users = db.collection("users")

    // Find user by email and token
    const user = await users.findOne({
      email: email.toLowerCase(),
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() }, // Token must not be expired
    })

    if (!user) {
      return NextResponse.json({ valid: false, message: "Invalid or expired token" }, { status: 400 })
    }

    return NextResponse.json({ valid: true })
  } catch (error) {
    console.error("Token verification error:", error)
    return NextResponse.json(
      { valid: false, message: "An unexpected error occurred. Please try again later." },
      { status: 500 },
    )
  }
}

