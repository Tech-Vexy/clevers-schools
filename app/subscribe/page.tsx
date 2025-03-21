"use client"
import SubscriptionPageContent from "@/app/subscribe/SubscriptionPageContent"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"

export default function SubscribePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <SubscriptionPageContent />
    </Suspense>
  )
}

