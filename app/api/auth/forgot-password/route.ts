import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import crypto from "crypto"
import { Resend } from "resend"

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY)

// Token expiration time (1 hour)
const TOKEN_EXPIRATION = 60 * 60 * 1000

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()
    const users = db.collection("users")

    // Find user by email
    const user = await users.findOne({ email: email.toLowerCase() })

    // If user not found, still return success to prevent email enumeration
    if (!user) {
      console.log(`Password reset requested for non-existent email: ${email}`)
      return NextResponse.json({
        message: "If your email is registered, you will receive a password reset link",
      })
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex")
    const resetTokenExpiry = new Date(Date.now() + TOKEN_EXPIRATION)

    // Save reset token to user
    await users.updateOne(
      { _id: user._id },
      {
        $set: {
          resetToken,
          resetTokenExpiry,
        },
      },
    )

    // Create reset URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const resetUrl = `${baseUrl}/auth/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`

    // Send email with reset link
    const { data, error } = await resend.emails.send({
      from: "Clevers Schools Resources <noreply@schoolresources.clevers.co.ke>",
      to: email,
      subject: "Reset Your Password",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <a href="https://schoolresources.clevers.co.ke">
          <img src="https://schoolresources.clevers.co.ke/logo.png" alt="Clevers Schools Resources" style="width: 200px; margin: 20px 0;">
          <span style="color: #00a651; font-size: 24px; font-weight: bold;">Clevers Schools Resources</span>
        </a>
          <h2>Reset Your Password</h2>
          <p>Hello,</p>
          <p>We received a request to reset your password. Click the button below to create a new password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #00a651; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Reset Password</a>
          </div>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request a password reset, you can ignore this email.</p>
          <p>Best regards,<br>StudyPortal Team</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;">
          <p style="font-size: 12px; color: #666;">If the button doesn't work, copy and paste this link into your browser: ${resetUrl}</p>
        </div>
      `,
    })

    if (error) {
      console.error("Error sending password reset email:", error)
      return NextResponse.json(
        { message: "Failed to send password reset email. Please try again later." },
        { status: 500 },
      )
    }

    return NextResponse.json({
      message: "If your email is registered, you will receive a password reset link",
    })
  } catch (error) {
    console.error("Password reset error:", error)
    return NextResponse.json({ message: "An unexpected error occurred. Please try again later." }, { status: 500 })
  }
}

