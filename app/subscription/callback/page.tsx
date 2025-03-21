"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Clock } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function SubscriptionCallback() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading")
  const [message, setMessage] = useState("Verifying your subscription payment...")

  // Check for both PesaPal redirect and iframe parameters
  const orderTrackingId = searchParams.get("OrderTrackingId")
  const orderMerchantReference = searchParams.get("OrderMerchantReference")
  const pesapalReference = searchParams.get("pesapalReference")
  const pesapalStatus = searchParams.get("status")

  useEffect(() => {
    // Handle iframe payment return
    if (pesapalReference && pesapalStatus === "COMPLETED") {
      setStatus("success")
      setMessage("Your subscription has been activated successfully!")

      toast({
        title: "Subscription Activated",
        description: "Your subscription has been activated successfully.",
      })

      // Redirect to subscription page after 2 seconds
      setTimeout(() => {
        router.push("/subscribe")
      }, 2000)

      return
    }

    // Handle PesaPal redirect payment
    if (!orderTrackingId || !orderMerchantReference) {
      setStatus("failed")
      setMessage("Invalid payment information received.")
      return
    }

    // Check payment status
    const checkPaymentStatus = async () => {
      try {
        const response = await fetch(
          `/api/subscription/verify?OrderTrackingId=${orderTrackingId}&OrderMerchantReference=${orderMerchantReference}`,
        )
        const data = await response.json()

        if (data.success) {
          setStatus("success")
          setMessage("Your subscription has been activated successfully!")

          toast({
            title: "Subscription Activated",
            description: "Your subscription has been activated successfully.",
          })
        } else {
          setStatus("failed")
          setMessage(data.message || "There was an issue processing your subscription payment.")
        }
      } catch (error) {
        setStatus("failed")
        setMessage("Failed to verify subscription status.")
      }
    }

    checkPaymentStatus()
  }, [orderTrackingId, orderMerchantReference, pesapalReference, pesapalStatus, toast, router])

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            {status === "loading" && "Processing Subscription"}
            {status === "success" && "Subscription Successful"}
            {status === "failed" && "Subscription Failed"}
          </CardTitle>
          <CardDescription className="text-center">
            {orderMerchantReference && `Order: ${orderMerchantReference}`}
            {pesapalReference && `Reference: ${pesapalReference}`}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6">
          {status === "loading" && <Clock className="w-16 h-16 text-yellow-500 mb-4" />}
          {status === "success" && <CheckCircle className="w-16 h-16 text-green-500 mb-4" />}
          {status === "failed" && <XCircle className="w-16 h-16 text-red-500 mb-4" />}

          <p className="text-center">{message}</p>

          {orderTrackingId && <p className="text-sm text-muted-foreground mt-2">Tracking ID: {orderTrackingId}</p>}
          {pesapalReference && <p className="text-sm text-muted-foreground mt-2">Reference: {pesapalReference}</p>}
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

