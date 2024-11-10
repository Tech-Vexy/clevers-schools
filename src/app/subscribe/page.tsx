'use client';
import SubscriptionPageContent from "@/app/subscribe/SubscriptionPageContent";
import {Suspense} from "react";
import {Loader2} from "lucide-react";
export default function SubscribePage() {

    return (
        <Suspense fallback={<Loader2 />}>
            <SubscriptionPageContent />
        </Suspense>
    );
}