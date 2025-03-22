"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DatabaseIcon } from "lucide-react"
import Link from "next/link"

export default function DatabaseError() {
  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <DatabaseIcon className="h-12 w-12 text-amber-500" />
          </div>
          <CardTitle className="text-2xl text-center">Database Connection Error</CardTitle>
          <CardDescription className="text-center">We're having trouble connecting to our database</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            This is usually a temporary issue. Please try again in a few minutes.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Link href="/">
            <Button variant="outline">Return Home</Button>
          </Link>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

