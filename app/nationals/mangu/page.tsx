'use client';

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, Loader2, Search, X, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Constants
const FOLDER_ID = '17BHbLhy1P3-DQIjcbq_jM5TQd1YQrk1L';
const API_ENDPOINT = '/api/drive/files';

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

interface FileCardProps {
    file: FileItem;
    onClick: (file: FileItem) => void;
}

// API Service
const DriveService = {
    async fetchFiles(folderId: string): Promise<{ files: FileItem[]; error?: FetchError }> {
        try {
            const response = await fetch(`${API_ENDPOINT}?folderId=${folderId}`, {
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
    }
};

// Components
const LoadingSpinner = () => (
    <div className="h-full flex items-center justify-center bg-amber-300" role="status">
        <div className="bg-gray-800/80 p-6 rounded-full shadow-xl">
            <Loader2
                className="h-8 w-8 animate-spin text-emerald-500"
                aria-label="Loading documents"
            />
        </div>
        <span className="sr-only">Loading documents...</span>
    </div>
);

const SearchBar = ({
                       value,
                       onChange,
                       onClear
                   }: {
    value: string;
    onChange: (value: string) => void;
    onClear: () => void;
}) => (
    <div className="relative mt-2 md:mt-0">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <Input
            type="search"
            placeholder="Search documents..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pl-10 pr-10 w-full md:w-64 bg-white text-black border-gray-300
                       focus:ring-emerald-500 focus:border-emerald-500"
            aria-label="Search documents"
        />
        {value && (
            <button
                onClick={onClear}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                aria-label="Clear search"
            >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
        )}
    </div>
);

const FileCard: React.FC<FileCardProps> = ({ file, onClick }) => {
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick(file);
        }
    };

    return (
        <div
            className="group flex items-center p-3 md:p-4 rounded-lg border border-gray-700
                       hover:bg-gray-700/50 hover:border-emerald-600/50 transition-all duration-200
                       cursor-pointer shadow-sm hover:shadow-md bg-white backdrop-blur-sm
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            onClick={() => onClick(file)}
            onKeyDown={handleKeyPress}
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
                <h3 className="text-sm md:text-base font-medium text-wrap text-blue-500 group-hover:text-emerald-300 truncate">
                    {file.name}
                </h3>
                {file.lastModified && (
                    <p className="text-xs text-gray-500 mt-1">
                        Last modified: {new Date(file.lastModified).toLocaleDateString()}
                    </p>
                )}
            </div>
        </div>
    );
};

// Main Component
export default function Mangu() {
    const [material, setMaterial] = useState<FileItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<FetchError | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const fetchFiles = useCallback(async () => {
        setLoading(true);
        setError(null);

        const { files, error: fetchError } = await DriveService.fetchFiles(FOLDER_ID);

        if (fetchError) {
            setError(fetchError);
        } else {
            const sortedFiles = files.sort((a, b) => {
                if (a.lastModified && b.lastModified) {
                    return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
                }
                return 0;
            });
            setMaterial(sortedFiles);
        }

        setLoading(false);
    }, []);

    useEffect(() => {
        fetchFiles();
    }, [fetchFiles]);

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

    const handleDocumentClick = useCallback((file: FileItem) => {
        router.push(`/document/${encodeURIComponent(file.id)}?fileData=${encodeURIComponent(JSON.stringify(file))}`);
    }, [router]);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="flex flex-col h-full overflow-hidden w-full">
            <div className="flex-1 overflow-y-auto px-4 py-8 bg-amber-200">
                <div className="relative max-w-3xl mx-auto">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10" aria-hidden="true" />
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent"
                        aria-hidden="true"
                    />

                    <Card className="shadow-2xl backdrop-blur-sm border border-gray-700 rounded-xl relative">
                        <CardHeader className="space-y-2 md:space-y-0 md:flex md:flex-row md:items-center
                                             md:justify-between p-4 md:p-6 border-b border-gray-700">
                            <CardTitle className="text-xl md:text-2xl text-emerald-400 text-center
                                                md:text-left font-bold">
                            MANGU 2017 MOCKS
                            </CardTitle>
                            <SearchBar
                                value={searchQuery}
                                onChange={setSearchQuery}
                                onClear={() => setSearchQuery('')}
                            />
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
                                            onClick={fetchFiles}
                                            className="ml-4"
                                        >
                                            Retry
                                        </Button>
                                    </AlertDescription>
                                </Alert>
                            ) : (
                                <div className="grid gap-3 md:gap-4">
                                    {filteredMaterial.map((file) => (
                                        <FileCard
                                            key={file.id}
                                            file={file}
                                            onClick={handleDocumentClick}
                                           
                                        />
                                    ))}
                                </div>
                            )}

                            {!error && filteredMaterial.length === 0 && (
                                <div className="text-center py-8 text-red-400 bg-white rounded-lg
                                              border border-gray-700" role="alert">
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