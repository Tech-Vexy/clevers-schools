'use client';
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogOut, Settings, Crown } from 'lucide-react';
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

    // Get initials from email for avatar fallback
    const getInitials = (email: string) => {
        return email
            .split('@')[0]
            .split('.')
            .map(part => part[0])
            .join('')
            .toUpperCase();
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={session.user?.image || undefined} alt={session.user?.email || ''} />
                        <AvatarFallback>{session.user?.email ? getInitials(session.user.email) : '??'}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {session.user?.name || session.user?.email}
                        </p>
                        {session.user?.name && (
                            <p className="text-xs text-muted-foreground">{session.user.email}</p>
                        )}
                    </div>
                </div>
                <DropdownMenuSeparator />

                {/* Subscription Status Section */}
                {!loading && (
                    <>
                        <div className="px-2 py-1.5">
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
                        <DropdownMenuSeparator />
                    </>
                )}

                <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer text-red-600"
                    onClick={handleSignOut}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default NavProfile;