"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"
import Link from "next/link"

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams?.get("error")

  let errorMessage = "An unknown error occurred"

  switch (error) {
    case "CredentialsSignin":
      errorMessage = "Invalid email or password"
      break
    case "AccessDenied":
      errorMessage = "You do not have permission to access this resource"
      break
    case "OAuthAccountNotLinked":
      errorMessage = "This account is already linked to another user"
      break
    case "OAuthSignInError":
      errorMessage = "Error signing in with this provider"
      break
    case "OAuthCallbackError":
      errorMessage = "Error during authentication callback"
      break
    case "EmailSignInError":
      errorMessage = "Error sending the email for sign in"
      break
    case "SessionRequired":
      errorMessage = "You must be signed in to access this page"
      break
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <XCircle className="h-12 w-12 text-red-500" />
          </div>
          <CardTitle className="text-2xl text-center">Authentication Error</CardTitle>
          <CardDescription className="text-center">There was a problem with your authentication</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">{errorMessage}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/auth/signin">
            <Button>Return to Sign In</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

