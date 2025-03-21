"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Check, Calendar, CreditCard, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Fixed subscription amount
const SUBSCRIPTION_AMOUNT = 1005

interface SubscriptionData {
  id: string
  startDate: Date
  expiryDate: Date
  remainingDays: number
  status: string
  reference: string
  amount: number
}

const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

const formatCurrency = (amount: number): string => {
  return `KES ${amount.toLocaleString()}`
}

const SubscriptionPageContent: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null)
  const [mounted, setMounted] = useState(false)
  const [paymentCompleted, setPaymentCompleted] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)

  const returnUrl = searchParams?.get("returnUrl") || "/"
  const paymentReference = searchParams?.get("pesapalReference") || ""
  const paymentStatus = searchParams?.get("status") || ""

  useEffect(() => {
    setMounted(true)
  }, [])

  // Check for existing subscription
  const checkSubscription = useCallback(async () => {
    if (!mounted || !session?.user?.id) return

    try {
      setIsProcessing(true)
      const response = await fetch("/api/subscription/check")
      
      if (!response.ok) {
        throw new Error("Failed to fetch subscription data")
      }
      
      const data = await response.json()

      if (data.isSubscribed) {
        setSubscriptionData(data.subscription)
      }
    } catch (error) {
      console.error("Error checking subscription:", error)
      toast({
        title: "Error",
        description: "Failed to check subscription status. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }, [mounted, session?.user?.id, toast])

  useEffect(() => {
    void checkSubscription()
  }, [checkSubscription])

  // Handle PesaPal payment response
  useEffect(() => {
    const verifyPayment = async () => {
      if (paymentReference && paymentStatus === "COMPLETED") {
        setIsProcessing(true)
        try {
          if (!session?.user?.id) {
            throw new Error("User session not found")
          }

          console.log("Processing payment with reference:", paymentReference)

          const subscriptionResponse = await fetch("/api/subscription/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: session.user.id,
              reference: paymentReference,
              amount: SUBSCRIPTION_AMOUNT,
              duration: 365,
              currency: "KES",
              status: "active",
            }),
          })

          if (!subscriptionResponse.ok) {
            const errorData = await subscriptionResponse.json()
            throw new Error(errorData.message || "Failed to create subscription")
          }

          const responseData = await subscriptionResponse.json()
          console.log("Subscription created:", responseData)

          toast({
            title: "Success",
            description: "Your subscription has been activated successfully!",
          })
          setPaymentCompleted(true)

          // Refresh subscription data
          await checkSubscription()

          // Redirect after successful payment processing
          setIsRedirecting(true)
          setTimeout(() => {
            router.push(returnUrl)
          }, 2000)
        } catch (error) {
          toast({
            title: "Error",
            description:
              error instanceof Error ? error.message : "Failed to activate subscription. Please contact support.",
            variant: "destructive",
          })
          console.error("Error saving subscription:", error)
        } finally {
          setIsProcessing(false)
        }
      }
    }

    if (paymentReference && !subscriptionData) {
      verifyPayment()
    }
  }, [paymentReference, paymentStatus, session, router, returnUrl, toast, checkSubscription, subscriptionData])

  // Handle loading state
  if (status === "loading" || !mounted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading your subscription details...</p>
      </div>
    )
  }

  // Handle unauthenticated state
  if (status === "unauthenticated") {
    router.push("/auth/signin?callbackUrl=/subscribe")
    return null
  }

  // Render subscription status card
  const renderSubscriptionStatus = () => {
    if (!subscriptionData) return null
    
    const progressValue = (subscriptionData.remainingDays / 365) * 100
    
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
            <Check className="h-4 w-4 mr-1" />
            Active Subscription
          </Badge>
          <h3 className="text-2xl font-bold text-primary mt-4">You're all set!</h3>
          <p className="text-muted-foreground">
            Enjoy full access to all premium features and content.
          </p>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subscription Status</span>
            <span className="font-medium text-green-600">Active</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Time Remaining</span>
              <span className="font-medium">{subscriptionData.remainingDays} days</span>
            </div>
            <Progress value={progressValue} className="h-2" />
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Expiry Date</span>
            <span className="font-medium">
              {subscriptionData.expiryDate && formatDate(subscriptionData.expiryDate)}
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Reference</span>
            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
              {subscriptionData.reference}
            </span>
          </div>
        </div>
        
        <Button variant="outline" className="w-full" onClick={() => router.push(returnUrl)}>
          Return to Dashboard
        </Button>
      </div>
    )
  }

  // Render payment processing
  const renderProcessing = () => {
    return (
      <div className="text-center space-y-4 py-6">
        <Loader2 className="h-16 w-16 animate-spin mx-auto text-primary" />
        <div>
          <p className="text-lg font-medium">Processing your payment</p>
          <p className="text-muted-foreground">Please wait while we verify your transaction...</p>
        </div>
      </div>
    )
  }

  // Render payment successful
  const renderPaymentSuccess = () => {
    return (
      <div className="text-center space-y-4 py-6">
        <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-green-100">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <div>
          <p className="text-lg font-medium text-green-600">Payment Successful!</p>
          <p className="text-muted-foreground">Your subscription has been activated.</p>
          {isRedirecting && (
            <p className="text-sm text-muted-foreground mt-4">
              Redirecting you in a moment...
            </p>
          )}
        </div>
      </div>
    )
  }

  // Render subscription options
  const renderSubscriptionOptions = () => {
    return (
      <>
        <div className="text-center space-y-2 mb-6">
          <p className="text-3xl font-bold text-primary">{formatCurrency(SUBSCRIPTION_AMOUNT)}</p>
          <p className="text-muted-foreground">Annual Premium Access</p>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Check className="h-5 w-5 text-green-600" />
              <span>Premium Benefits</span>
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Full Year Access</p>
                  <p className="text-sm text-muted-foreground">365 days of unlimited premium features</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Complete Study Materials</p>
                  <p className="text-sm text-muted-foreground">Access to all premium learning resources</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CreditCard className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Secure One-time Payment</p>
                  <p className="text-sm text-muted-foreground">No recurring charges or hidden fees</p>
                </div>
              </li>
            </ul>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium text-center">Choose your payment method:</h4>
            
            {/* Option 1: PesaPal iframe */}
            <div className="w-full bg-white rounded-lg overflow-hidden border">
              <iframe
                width="100%"
                height="40"
                src={`https://store.pesapal.com/embed-code?pageUrl=https://store.pesapal.com/subscribetocleversschools&email=${encodeURIComponent(session?.user?.email || "")}&amount=${SUBSCRIPTION_AMOUNT}`}
                frameBorder="0"
                allowFullScreen
                title="PesaPal Payment"
              />
            </div>

            {/* Option 2: Redirect payment */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Having trouble with the payment form above?
              </p>
              <Link href="/payment">
                <Button variant="outline" className="gap-2">
                  <CreditCard className="h-4 w-4" />
                  Use Alternative Payment Form
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Card className="shadow-lg border-0">
          <CardHeader className="text-center bg-gradient-to-r from-primary/10 to-primary/5 border-b">
            <CardTitle className="text-2xl text-primary">Premium Subscription</CardTitle>
            <CardDescription>
              Unlock full access to all learning materials
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            {subscriptionData ? renderSubscriptionStatus() : 
             isProcessing ? renderProcessing() :
             paymentCompleted ? renderPaymentSuccess() :
             renderSubscriptionOptions()}
          </CardContent>
          
          {!subscriptionData && !isProcessing && !paymentCompleted && (
            <CardFooter className="bg-gray-50 text-center text-xs text-muted-foreground pt-4 pb-6">
              <p>By subscribing, you agree to our Terms of Service and Privacy Policy.</p>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  )
}

export default SubscriptionPageContent