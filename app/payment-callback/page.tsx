"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Clock } from "lucide-react"
import Link from "next/link"

export default function PaymentCallback() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading")
  const [message, setMessage] = useState("Verifying your payment...")

  const orderTrackingId = searchParams.get("OrderTrackingId")
  const orderMerchantReference = searchParams.get("OrderMerchantReference")

  useEffect(() => {
    if (!orderTrackingId || !orderMerchantReference) {
      setStatus("failed")
      setMessage("Invalid payment information received.")
      return
    }

    // Check payment status
    const checkPaymentStatus = async () => {
      try {
        const response = await fetch(
          `/api/payment?OrderTrackingId=${orderTrackingId}&OrderMerchantReference=${orderMerchantReference}`,
        )
        const data = await response.json()

        if (data.success) {
          setStatus("success")
          setMessage("Your payment was processed successfully!")
        } else {
          setStatus("failed")
          setMessage(data.message || "There was an issue processing your payment.")
        }
      } catch (error) {
        setStatus("failed")
        setMessage("Failed to verify payment status.")
      }
    }

    checkPaymentStatus()
  }, [orderTrackingId, orderMerchantReference])

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            {status === "loading" && "Processing Payment"}
            {status === "success" && "Payment Successful"}
            {status === "failed" && "Payment Failed"}
          </CardTitle>
          <CardDescription className="text-center">
            {orderMerchantReference && `Order: ${orderMerchantReference}`}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6">
          {status === "loading" && <Clock className="w-16 h-16 text-yellow-500 mb-4" />}
          {status === "success" && <CheckCircle className="w-16 h-16 text-green-500 mb-4" />}
          {status === "failed" && <XCircle className="w-16 h-16 text-red-500 mb-4" />}

          <p className="text-center">{message}</p>

          {orderTrackingId && <p className="text-sm text-muted-foreground mt-2">Tracking ID: {orderTrackingId}</p>}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

