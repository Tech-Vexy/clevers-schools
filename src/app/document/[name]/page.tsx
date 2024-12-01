'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Download, Lock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

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

const ErrorDisplay = ({ message }: { message: string }) => (
    <Card className="border-red-500">
        <CardContent className="text-center py-4">
            <p className="text-red-500">{message}</p>
        </CardContent>
    </Card>
);

const DownloadButton = ({ 
    isProcessing, 
    subscription, 
    onClick 
}: { 
    isProcessing: boolean;
    subscription: UserSubscription | null;
    onClick: () => void;
}) => (
    <Button
        onClick={onClick}
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
            ? 'Downloading...'
            : subscription?.isSubscribed
                ? 'Download Document'
                : 'GET ACCESS'}
    </Button>
);

const DocumentPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session, status } = useSession();

    const [fileData, setFileData] = useState<FileItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [subscription, setSubscription] = useState<UserSubscription | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleCheckSubscription = async () => {
        try {
            setError(null);
            const response = await fetch('/api/subscription/check/');
            if (!response.ok) throw new Error('Subscription check failed');
            
            const data = await response.json();
            setSubscription(data);
        } catch (error) {
            setError('Failed to check subscription status');
            console.error('Subscription error:', error);
        }
    };

    const handleFileDownload = async () => {
        if (!session?.user || !fileData?.id) return;
        
        setIsProcessing(true);
        setError(null);
        
        try {
            // First log the download
            const user = session.user as SessionUser;
            const logResponse = await fetch('/api/downloads/log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    fileId: fileData.id,
                    fileName: fileData.name,
                    downloadDate: new Date().toISOString(),
                }),
            });

            if (!logResponse.ok) throw new Error('Download logging failed');

            // Then initiate the file download
            const downloadResponse = await fetch(`/api/downloads/file/${fileData.id}`);
            
            if (!downloadResponse.ok) {
                throw new Error('File download failed');
            }

            // Get the filename from the content-disposition header if available
            const contentDisposition = downloadResponse.headers.get('content-disposition');
            const fileName = contentDisposition
                ? decodeURIComponent(contentDisposition.split('filename=')[1].replace(/['"]/g, ''))
                : fileData.name;

            // Create a blob from the response
            const blob = await downloadResponse.blob();
            
            // Create a temporary URL for the blob
            const url = window.URL.createObjectURL(blob);
            
            // Create a temporary link element and trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            
            // Clean up
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            toast({
                title: 'Success',
                description: 'Download started successfully',
            });
        } catch (error) {
            setError('Failed to download file');
            toast({
                title: 'Error',
                description: 'Failed to download file. Please try again.',
                variant: 'destructive',
            });
            console.error('Download error:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownload = () => {
        if (!session) {
            router.push('/auth');
            return;
        }

        if (!subscription?.isSubscribed) {
            const returnUrl = encodeURIComponent(window.location.pathname + window.location.search);
            router.push(`/subscribe?returnUrl=${returnUrl}`);
            return;
        }

        handleFileDownload();
    };

    useEffect(() => {
        const initializePage = async () => {
            if (!isMounted) return;

            try {
                const fileDataParam = searchParams.get('fileData');
                if (fileDataParam) {
                    const parsedData: FileItem = JSON.parse(decodeURIComponent(fileDataParam));

                    if (!parsedData.id || !parsedData.name) {
                        throw new Error('Invalid file data format');
                    }

                    setFileData(parsedData);
                }

                if (session?.user) {
                    await handleCheckSubscription();
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

    if (!isMounted) {
        return null;
    }

    if (isLoading || status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-gray-800/80 p-6 rounded-full shadow-xl">
                    <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6 bg-orange-200">
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
                        {error && <ErrorDisplay message={error} />}
                        {!session ? (
                            <Button
                                onClick={() => router.push('/auth')}
                                className="w-full"
                                variant="outline"
                            >
                                Sign in to Download
                            </Button>
                        ) : (
                            <DownloadButton
                                isProcessing={isProcessing}
                                subscription={subscription}
                                onClick={handleDownload}
                            />
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DocumentPage;