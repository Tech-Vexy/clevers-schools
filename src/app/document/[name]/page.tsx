'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Download, Lock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface FileItem {
    name: string;
    url: string;
}

interface UserSubscription {
    isSubscribed: boolean;
    expiryDate: string;
}

interface SessionUser {
    id: string;
    // Add other user properties as needed
}

const DocumentPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session, status } = useSession();

    const [fileData, setFileData] = useState<FileItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [subscription, setSubscription] = useState<UserSubscription | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const checkSubscriptionStatus = async () => {
        try {
            const response = await fetch('/api/subscription/check/', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch subscription status');
            }

            const data = await response.json();
            setSubscription(data);
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to check subscription status. Please try again.',
                variant: 'destructive',
            });
            console.error('Error checking subscription:', error);
        }
    };

    useEffect(() => {
        const initializePage = async () => {
            if (!isMounted) return;

            try {
                const fileDataParam = searchParams.get('fileData');
                if (fileDataParam) {
                    const parsedData = JSON.parse(fileDataParam) as FileItem;
                    if (!parsedData.name || !parsedData.url) {
                        throw new Error('Invalid file data format');
                    }
                    setFileData(parsedData);
                }

                if (session?.user) {
                    await checkSubscriptionStatus();
                }
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Failed to load document information. Please try again.',
                    variant: 'destructive',
                });
                console.error('Initialization error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initializePage();
    }, [searchParams, session, isMounted]); // Added proper dependencies

    const handleDownload = async () => {
        if (!session) {
            router.push('/auth');
            return;
        }

        if (!subscription?.isSubscribed) {
            const returnUrl = encodeURIComponent(window.location.pathname + window.location.search);
            router.push(`/subscribe?returnUrl=${returnUrl}`);
            return;
        }

        if (!fileData?.url) {
            toast({
                title: 'Error',
                description: 'Document URL not found.',
                variant: 'destructive',
            });
            return;
        }

        setIsProcessing(true);
        try {
            // Type assertion for session.user
            const user = session.user as SessionUser;

            const response = await fetch('/api/downloads/log', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    fileName: fileData.name,
                    downloadDate: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to log download');
            }

            // Using window.open for better security
            window.open(fileData.url, '_blank', 'noopener,noreferrer');

        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to process download. Please try again.',
                variant: 'destructive',
            });
            console.error('Error processing download:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    // Handle initial loading state
    if (!isMounted) {
        return null;
    }

    if (isLoading || status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6 min-h-screen">
            <Card className="w-full max-w-2xl mx-auto shadow-lg">
                <CardHeader className="space-y-2">
                    <CardTitle className="text-xl md:text-2xl text-green-600">
                        {fileData?.name || 'Document Not Found'}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {!session ? (
                        <Button
                            onClick={() => router.push('/auth/signin')}
                            className="w-full"
                            variant="outline"
                        >
                            Sign in to Download
                        </Button>
                    ) : (
                        <Button
                            onClick={handleDownload}
                            className="w-full"
                            variant={subscription?.isSubscribed ? "default" : "outline"}
                            disabled={isProcessing}
                        >
                            {isProcessing ? (
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : subscription?.isSubscribed ? (
                                <Download className="mr-2 h-4 w-4" />
                            ) : (
                                <Lock className="mr-2 h-4 w-4" />
                            )}
                            {isProcessing
                                ? 'Processing...'
                                : subscription?.isSubscribed
                                    ? 'Download Document'
                                    : 'GET ACCESS'}
                        </Button>
                    )}

                </CardContent>
            </Card>
        </div>
    );
};

export default DocumentPage;