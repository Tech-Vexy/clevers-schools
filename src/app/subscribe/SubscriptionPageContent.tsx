'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Dynamically import PaystackButton with no SSR
const PaystackButton = dynamic(
    () => import('react-paystack').then((mod) => mod.PaystackButton),
    { ssr: false }
);

interface PaystackResponse {
    reference: string;
    status: string;
    trans: string;
    transaction: string;
    message: string;
}

interface SubscriptionData {
    id: string;
    startDate: Date;
    expiryDate: Date;
    remainingDays: number;
    status: string;
    reference: string;
    amount: number;
}

const SubscriptionPageContent: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session, status } = useSession();
    const [isProcessing, setIsProcessing] = useState(false);
    const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);
    const [mounted, setMounted] = useState(false);

    const returnUrl = searchParams?.get('returnUrl') || '/';

    useEffect(() => {
        setMounted(true);
    }, []);

    const checkSubscription = useCallback(async () => {
        if (!mounted) return;

        try {
            const response = await fetch('/api/subscription/check');
            const data = await response.json();

            if (data.isSubscribed) {
                setSubscriptionData(data.subscription);
            }
        } catch (error) {
            console.error('Error checking subscription:', error);
            toast({
                title: 'Error',
                description: 'Failed to check subscription status. Please try again later.',
                variant: 'destructive',
            });
        }
    }, [mounted]);

    useEffect(() => {
        void checkSubscription();
    }, [checkSubscription]);

    const handleSubscriptionSuccess = async (response: PaystackResponse) => {
        setIsProcessing(true);
        try {
            if (!response.reference) {
                throw new Error('Invalid payment reference');
            }

            if (!session?.user?.id) {
                throw new Error('User session not found');
            }

            const subscriptionResponse = await fetch('/api/subscription/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: session.user.id,
                    reference: response.reference,
                    amount: 100000, // Amount in KES
                    duration: 365,
                    currency: 'KES',
                    status: response.status,
                    transactionId: response.trans,
                }),
            });

            if (!subscriptionResponse.ok) {
                const errorData = await subscriptionResponse.json();
                throw new Error(errorData.message || 'Failed to create subscription');
            }

            toast({
                title: 'Success',
                description: 'Your subscription has been activated successfully!',
            });

            router.push(returnUrl);
        } catch (error) {
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to activate subscription. Please contact support.',
                variant: 'destructive',
            });
            console.error('Error saving subscription:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handlePaystackClose = useCallback(() => {
        toast({
            title: 'Payment Cancelled',
            description: 'You have cancelled the payment process.',
            variant: 'default',
        });
        router.push(returnUrl);
    }, [router, returnUrl]);

    // Handle loading state
    if (status === 'loading' || !mounted) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    // Handle unauthenticated state
    if (status === 'unauthenticated') {
        router.push('/auth/signin');
        return null;
    }

    const amountInNGN = 1000 * 100; // Amount in kobo (NGN cents)
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_API;

    if (!publicKey) {
        console.error('Paystack public key is not configured');
        toast({
            title: 'Configuration Error',
            description: 'Payment system is not properly configured. Please contact support.',
            variant: 'destructive',
        });
        return null;
    }

    const paystackConfig = {
        reference: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        email: session?.user?.email || '',
        amount: amountInNGN,
        publicKey,
        currency: 'KES',
        channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'] as string[],
        label: 'Annual Subscription',
        metadata: {
            userId: session?.user?.id,
            custom_fields: [
                {
                    display_name: 'Subscription Type',
                    variable_name: 'subscription_type',
                    value: 'annual',
                },
            ],
        },
        onSuccess: handleSubscriptionSuccess,
        onClose: handlePaystackClose,
    };

    return (
        <div className="container mx-auto px-4 py-6 min-h-screen">
            <Card className="w-full max-w-md mx-auto shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-green-600">Subscribe Now</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {subscriptionData ? (
                        <div className="text-center space-y-2">
                            <p className="text-2xl font-bold text-green-600">You Have An Active Subscription</p>
                            <p className="text-gray-500">
                                Your subscription expires in {subscriptionData.remainingDays} days.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="text-center space-y-2">
                                <p className="text-3xl font-bold">Ksh. 1,000</p>
                                <p className="text-gray-500">1 Year Access</p>
                            </div>

                            <div className="space-y-3">
                                <h4 className="font-medium">Benefits:</h4>
                                <ul className="list-disc list-inside space-y-2 text-gray-600">
                                    <li>Access to all study materials</li>
                                    <li>Unlimited downloads</li>
                                    <li>1 Year of access</li>
                                </ul>
                            </div>

                            <PaystackButton
                                {...paystackConfig}
                                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                disabled={isProcessing || !!subscriptionData}
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                        Processing...
                                    </>
                                ) : (
                                    'Subscribe Now'
                                )}
                            </PaystackButton>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default SubscriptionPageContent;