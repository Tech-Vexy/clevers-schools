'use client';

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, Loader2, Search, X, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Types
interface FileItem {
    id: string;
    name: string;
    webViewLink: string;
    mimeType: string;
    lastModified?: string;
}

interface FetchError {
    message: string;
    status?: number;
}

// Google Drive API helper function with better error handling
const fetchGoogleDriveFiles = async (folderId: string): Promise<{ files: FileItem[]; error?: FetchError }> => {
    try {
        const response = await fetch(`/api/drive/files?folderId=${folderId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to fetch files (${response.status})`);
        }

        const data = await response.json();
        return { files: data.files };
    } catch (error) {
        console.error('Error fetching files:', error);
        return {
            files: [],
            error: {
                message: error instanceof Error ? error.message : 'An unexpected error occurred',
                status: error instanceof Response ? error.status : undefined
            }
        };
    }
};

export default function PP2Plan() {
    const [material, setMaterial] = useState<FileItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<FetchError | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    // Replace this with your Google Drive folder ID
    const folderId = '16amTQwIuOLT2iuuw20KO64_h2tH8ryry';

    useEffect(() => {
        const fetchFiles = async () => {
            setLoading(true);
            setError(null);

            const { files, error: fetchError } = await fetchGoogleDriveFiles(folderId);

            if (fetchError) {
                setError(fetchError);
            } else {
                // Sort files by last modified date if available
                const sortedFiles = files.sort((a, b) => {
                    if (a.lastModified && b.lastModified) {
                        return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
                    }
                    return 0;
                });
                setMaterial(sortedFiles);
            }

            setLoading(false);
        };

        fetchFiles();
    }, [folderId]);

    // Memoized filtered files with improved search functionality
    const filteredMaterial = useMemo(() => {
        if (!searchQuery) return material;

        const searchTerms = searchQuery.toLowerCase().trim().split(' ');
        return material.filter(file =>
            searchTerms.every(term =>
                file.name.toLowerCase().includes(term) ||
                file.mimeType.toLowerCase().includes(term)
            )
        );
    }, [material, searchQuery]);

    const handleDocumentClick = (file: FileItem) => {
        router.push(`/document/${encodeURIComponent(file.id)}?fileData=${encodeURIComponent(JSON.stringify(file))}`);
    };

    const handleSearchClear = () => {
        setSearchQuery('');
    };

    const handleRetry = () => {
        router.refresh();
    };

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center bg-amber-300">
                <div className="bg-gray-800/80 p-6 rounded-full shadow-xl">
                    <Loader2 className="h-8 w-8 animate-spin text-emerald-500" aria-label="Loading documents" />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full overflow-hidden w-full">
            <div className="flex-1 overflow-y-auto px-4 py-8 bg-amber-200">
                <div className="relative max-w-6xl mx-auto">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10" aria-hidden="true" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent" aria-hidden="true" />

                    <Card className="shadow-2xl backdrop-blur-sm border border-gray-700 rounded-xl relative">
                        <CardHeader className="space-y-2 md:space-y-0 md:flex md:flex-row md:items-center md:justify-between p-4 md:p-6 border-b border-gray-700">
                            <CardTitle className="text-xl md:text-2xl text-emerald-400 text-center md:text-left font-bold">
                                PP2 LESSON PLANS
                            </CardTitle>
                            <div className="relative mt-2 md:mt-0">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none w-32">
                                    <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <Input
                                    type="search"
                                    placeholder="Search documents..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-10 w-full md:w-64 bg-white text-black border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                                    aria-label="Search documents"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={handleSearchClear}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        aria-label="Clear search"
                                    >
                                        <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    </button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 md:p-6">
                            {error ? (
                                <Alert variant="destructive" className="mb-4">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription className="ml-2">
                                        {error.message}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={handleRetry}
                                            className="ml-4"
                                        >
                                            Retry
                                        </Button>
                                    </AlertDescription>
                                </Alert>
                            ) : (
                                <div className="grid gap-3 md:gap-4">
                                    {filteredMaterial.map((file) => (
                                        <div
                                            key={file.id}
                                            className="group flex items-center p-3 md:p-4 rounded-lg border border-gray-700
                                                     hover:bg-gray-700/50 hover:border-emerald-600/50 transition-all duration-200
                                                     cursor-pointer shadow-sm hover:shadow-md bg-white backdrop-blur-sm
                                                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                                            onClick={() => handleDocumentClick(file)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleDocumentClick(file)}
                                            role="button"
                                            tabIndex={0}
                                            aria-label={`Open ${file.name}`}
                                        >
                                            <FileText
                                                className="h-5 w-5 md:h-6 md:w-6 text-gray-500 group-hover:text-emerald-400
                                                          transition-colors mr-3 flex-shrink-0"
                                                aria-hidden="true"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm md:text-base font-medium text-black group-hover:text-emerald-300 truncate">
                                                    {file.name}
                                                </h3>
                                                {file.lastModified && (
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Last modified: {new Date(file.lastModified).toLocaleDateString()}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {!error && filteredMaterial.length === 0 && (
                                <div className="text-center py-8 text-red-400 bg-white rounded-lg border border-gray-700">
                                    {searchQuery
                                        ? `No documents found matching "${searchQuery}"`
                                        : "No documents available at the moment"
                                    }
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}