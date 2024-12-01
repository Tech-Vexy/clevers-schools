'use client';
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {  LogOut, Crown } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { Card, CardContent,  CardHeader, CardTitle } from '@/components/ui/card';

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
        <Card className="flex flex-col  border-2 rounded-lg shadow-sm items-center">
            <CardHeader className="block  w-full mb-4 bg-green-500">
                <CardTitle className="text-lg font-semibold">Current User</CardTitle>
            
            </CardHeader>

            {/* Subscription Status Section */}
            {!loading && (
                <CardContent className="py-2">
                     <p className="text-md font-medium text-headertext leading-none">
                        {session.user?.email}
                    </p>
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
                </CardContent>
            )}

            <div className="flex gap-2 mt-4 p-4 ml-6 items-center">
                <Button 
                    variant="outline" 
                    className=" items-center gap-2 text-red-600" 
                    onClick={handleSignOut}
                >
                    <LogOut className="h-4 w-4 text-center" />
                    Log out
                </Button>
            </div>
        </Card>
    );
};

export default NavProfile;