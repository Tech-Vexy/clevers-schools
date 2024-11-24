'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Download, Lock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Updated type to match Google Drive file structure
interface FileItem {
    id: string;
    name: string;
    webViewLink: string;
    mimeType: string;
}

interface UserSubscription {
    isSubscribed: boolean;
    expiryDate: string;
}

interface SessionUser {
    id: string;
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
                    const parsedData: FileItem = JSON.parse(decodeURIComponent(fileDataParam));

                    // Validate file data
                    if (!parsedData.id || !parsedData.name) {
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
    }, [searchParams, session, isMounted]);

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

        if (!fileData?.webViewLink) {
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
                    fileId: fileData.id,
                    fileName: fileData.name,
                    downloadDate: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to log download');
            }

            // Open Google Drive file view/download link
            window.open(fileData.webViewLink, '_blank', 'noopener,noreferrer');

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
            <div className="min-h-screen flex items-center justify-center bg-amber-300">
                <div className="bg-gray-800/80 p-6 rounded-full shadow-xl">
                    <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6 min-h-screen bg-amber-200">
            <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent pointer-events-none"></div>

                <Card className="shadow-2xl backdrop-blur-sm border border-gray-700 rounded-xl relative">
                    <CardHeader className="space-y-2">
                        <CardTitle className="text-xl md:text-2xl text-emerald-400 text-center font-bold">
                            {fileData?.name || 'Document Not Found'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {!session ? (
                            <Button
                                onClick={() => router.push('/auth')}
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
        </div>
    );
};

export default DocumentPage;