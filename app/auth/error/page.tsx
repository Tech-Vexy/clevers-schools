"use client"

import type React from "react"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle, AlertTriangle, UserX, KeyRound, HelpCircle, Mail } from "lucide-react"
import Link from "next/link"

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams?.get("error")

  // Define error types and their details
  const errorDetails: Record<
    string,
    { title: string; description: string; icon: React.ReactNode; action: { text: string; href: string } }
  > = {
    "invalid-password": {
      title: "Incorrect Password",
      description: "The password you entered is incorrect. Please try again or reset your password.",
      icon: <KeyRound className="h-12 w-12 text-amber-500" />,
      action: { text: "Forgot Password?", href: "/auth/forgot-password" },
    },
    "user-not-found": {
      title: "Account Not Found",
      description:
        "We couldn't find an account with that email address. Please check your email or create a new account.",
      icon: <UserX className="h-12 w-12 text-amber-500" />,
      action: { text: "Create Account", href: "/auth/signup" },
    },
    "missing-credentials": {
      title: "Missing Information",
      description: "Please provide both email and password to sign in.",
      icon: <AlertTriangle className="h-12 w-12 text-amber-500" />,
      action: { text: "Try Again", href: "/auth/signin" },
    },
    "email-not-verified": {
      title: "Email Not Verified",
      description: "Your email address has not been verified. Please check your inbox for a verification email.",
      icon: <Mail className="h-12 w-12 text-blue-500" />,
      action: { text: "Resend Verification", href: "/auth/verify-email" },
    },
    "authentication-error": {
      title: "Authentication Error",
      description: "There was a problem with your authentication. Please try again later.",
      icon: <XCircle className="h-12 w-12 text-red-500" />,
      action: { text: "Try Again", href: "/auth/signin" },
    },
    default: {
      title: "Authentication Error",
      description: "There was a problem signing you in. Please try again later.",
      icon: <HelpCircle className="h-12 w-12 text-red-500" />,
      action: { text: "Return to Sign In", href: "/auth/signin" },
    },
  }

  // Get error details or use default
  const details = errorDetails[error || ""] || errorDetails.default

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">{details.icon}</div>
          <CardTitle className="text-2xl text-center">{details.title}</CardTitle>
          <CardDescription className="text-center">{details.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {error === "invalid-password" && (
            <div className="space-y-4">
              <div className="bg-amber-50 p-3 rounded-md text-amber-700 text-sm">
                <p className="font-medium">Possible reasons:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>You may have typed your password incorrectly</li>
                  <li>If you've recently reset your password, make sure you're using the new one</li>
                  <li>Check if your caps lock is on</li>
                </ul>
              </div>
              <div className="flex justify-between">
                <Link href="/auth/signin">
                  <Button variant="outline" size="sm">
                    Try Again
                  </Button>
                </Link>
                <Link href="/auth/forgot-password">
                  <Button size="sm">Reset Password</Button>
                </Link>
              </div>
            </div>
          )}

          {error === "user-not-found" && (
            <div className="space-y-4">
              <div className="bg-amber-50 p-3 rounded-md text-amber-700 text-sm">
                <p>If you're sure you have an account, you might have:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Used a different email address</li>
                  <li>Signed up through a different method</li>
                  <li>Mistyped your email address</li>
                </ul>
              </div>
              <div className="flex justify-between">
                <Link href="/auth/signin">
                  <Button variant="outline" size="sm">
                    Try Again
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">Create Account</Button>
                </Link>
              </div>
            </div>
          )}

          {error === "email-not-verified" && (
            <div className="space-y-4">
              <div className="bg-blue-50 p-3 rounded-md text-blue-700 text-sm">
                <p className="font-medium">What to do next:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Check your email inbox for a verification link</li>
                  <li>Check your spam or junk folder</li>
                  <li>Request a new verification email if needed</li>
                </ul>
              </div>
              <div className="flex justify-center">
                <Link href="/auth/verify-email">
                  <Button size="sm">Resend Verification Email</Button>
                </Link>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {!["invalid-password", "user-not-found", "email-not-verified"].includes(error || "") && (
            <Link href={details.action.href}>
              <Button>{details.action.text}</Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

