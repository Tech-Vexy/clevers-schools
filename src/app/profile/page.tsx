'use client';
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {  LogOut, Crown } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

interface SubscriptionData {
    isSubscribed: boolean;
    subscription: {
        expiryDate: string;
        remainingDays: number;
        status: string;
    } | null;
}

const NavProfile = () => {
    const { data: session } = useSession();
    const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubscription = async () => {
            try {
                const response = await fetch('/api/subscription/check');
                if (!response.ok) {
                    throw new Error('Failed to fetch subscription status');
                }
                const data = await response.json();
                setSubscriptionData(data);
            } catch (error) {
                console.error('Error fetching subscription:', error);
            } finally {
                setLoading(false);
            }
        };

        if (session) {
            fetchSubscription();
        }
    }, [session]);

    if (!session) {
        return null;
    }

    const handleSignOut = () => {
        signOut({ callbackUrl: '/auth/signin' });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="flex flex-col p-4 border rounded-lg shadow-sm">
            <div className="block items-center justify-start gap-2 mb-4">
                <h2 className="text-lg font-semibold">Current User</h2>
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                        {session.user?.email}
                    </p>

                </div>
            </div>

            {/* Subscription Status Section */}
            {!loading && (
                <div className="py-2">
                    <div className="flex items-center gap-2">
                        <Crown className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">
                            {subscriptionData?.isSubscribed ? 'Premium Member' : 'Free Plan'}
                        </span>
                    </div>
                    {subscriptionData?.isSubscribed && subscriptionData.subscription && (
                        <p className="text-xs text-muted-foreground ml-6">
                            Expires: {formatDate(subscriptionData.subscription.expiryDate)}
                            <br />
                            {subscriptionData.subscription.remainingDays} days remaining
                        </p>
                    )}
                </div>
            )}

            <div className="flex gap-2 mt-4">
                <Button 
                    variant="outline" 
                    className="flex items-center gap-2 text-red-600" 
                    onClick={handleSignOut}
                >
                    <LogOut className="h-4 w-4" />
                    Log out
                </Button>
            </div>
        </div>
    );
};

export default NavProfile;