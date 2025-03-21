"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { convertCurrency, formatCurrency } from "@/lib/currency"

// Fixed subscription amount in KES
const SUBSCRIPTION_AMOUNT_KES = 1005

export default function PaymentForm() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    currency: "KES",
    countryCode: "KE",
  })

  const [convertedAmount, setConvertedAmount] = useState(SUBSCRIPTION_AMOUNT_KES)

  useEffect(() => {
    setMounted(true)

    // Pre-fill form with user data if available
    if (session?.user) {
      const nameParts = (session.user.name || "").split(" ")
      setFormData((prev) => ({
        ...prev,
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        email: session.user.email || "",
      }))
    }
  }, [session])

  useEffect(() => {
    // Convert currency when currency changes
    const amount = convertCurrency(SUBSCRIPTION_AMOUNT_KES, "KES", formData.currency)
    setConvertedAmount(amount)
  }, [formData.currency])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (!session?.user?.id) {
        throw new Error("User not authenticated")
      }

      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          amount: convertedAmount,
          description: "Annual Subscription",
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Redirect to PesaPal payment page
        router.push(data.order.redirect_url)
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to process payment",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
      console.error("Payment error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle loading state
  if (!mounted || status === "loading") {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  // Handle unauthenticated state
  if (status === "unauthenticated") {
    router.push("/auth/signin?callbackUrl=/payment")
    return null
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Make a Payment</CardTitle>
          <CardDescription>Complete your subscription payment</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                readOnly
                className="bg-gray-50"
              />
              <p className="text-xs text-muted-foreground">Email is linked to your account and cannot be changed</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={formData.currency} onValueChange={(value) => handleSelectChange("currency", value)}>
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="KES">KES</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="countryCode">Country</Label>
                <Select
                  value={formData.countryCode}
                  onValueChange={(value) => handleSelectChange("countryCode", value)}
                >
                  <SelectTrigger id="countryCode">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="KE">Kenya</SelectItem>
                    <SelectItem value="UG">Uganda</SelectItem>
                    <SelectItem value="TZ">Tanzania</SelectItem>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="GB">United Kingdom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-medium">Amount:</span>
                <span className="text-xl font-bold">{formatCurrency(convertedAmount, formData.currency)}</span>
              </div>
              {formData.currency !== "KES" && (
                <p className="text-xs text-muted-foreground text-right mt-1">
                  (KES {SUBSCRIPTION_AMOUNT_KES.toFixed(2)})
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Pay Now"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

