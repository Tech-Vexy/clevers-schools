'use client';

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Loader2, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

// Types
type FileItem = {
    id: string;
    name: string;
    webViewLink: string;
    mimeType: string;
}

// Google Drive API helper function
const fetchGoogleDriveFiles = async (folderId: string): Promise<FileItem[]> => {
    try {
        const response = await fetch(`/api/drive/files?folderId=${folderId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch files');
        }

        const data = await response.json();
        return data.files;
    } catch (error) {
        console.error('Error fetching files:', error);
        return [];
    }
};

export default function Form1() {
    const [material, setMaterial] = useState<FileItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    // Replace this with your Google Drive folder ID
    const folderId = '1qRpa3d8friOJfwV9fZXHL7dmDOe_qLUc';

    useEffect(() => {
        const fetchFiles = async () => {
            const filesList = await fetchGoogleDriveFiles(folderId);
            setMaterial(filesList);
            setLoading(false);
        };
        fetchFiles();
    }, [folderId]);

    // Memoized filtered files based on search query
    const filteredMaterial = useMemo(() => {
        if (!searchQuery) return material;

        const lowercaseQuery = searchQuery.toLowerCase().trim();
        return material.filter(file =>
            file.name.toLowerCase().includes(lowercaseQuery)
        );
    }, [material, searchQuery]);

    const handleDocumentClick = (file: FileItem) => {
        // Navigate to document details page
        router.push(`/document/${encodeURIComponent(file.id)}?fileData=${encodeURIComponent(JSON.stringify(file))}`);
    };

    const handleSearchClear = () => {
        setSearchQuery('');
    };

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center bg-amber-300">
                <div className="bg-gray-800/80 p-6 rounded-full shadow-xl">
                    <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto px-4 py-8 bg-amber-200">
                <div className="relative max-w-4xl mx-auto">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent pointer-events-none"></div>

                    <Card className="shadow-2xl backdrop-blur-sm border border-gray-700 rounded-xl relative">
                        <CardHeader className="space-y-2 md:space-y-0 md:flex md:flex-row md:items-center md:justify-between p-4 md:p-6 border-b border-gray-700">
                            <CardTitle className="text-xl md:text-2xl text-emerald-400 text-center md:text-left font-bold">
                                2011 REVISION BOOKLETS
                            </CardTitle>
                            <div className="relative mt-2 md:mt-0">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <Input
                                    type="text"
                                    placeholder="Search documents..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-10 w-full md:w-64 bg-white text-black border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={handleSearchClear}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    </button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 md:p-6">
                            <div className="grid gap-3 md:gap-4">
                                {filteredMaterial.map((file) => (
                                    <div
                                        key={file.id}
                                        className="group flex items-center p-3 md:p-4 rounded-lg border border-gray-700
                                                 hover:bg-gray-700/50 hover:border-emerald-600/50 transition-all duration-200
                                                 cursor-pointer shadow-sm hover:shadow-md bg-white backdrop-blur-sm"
                                        onClick={() => handleDocumentClick(file)}
                                    >
                                        <FileText className="h-5 w-5 md:h-6 md:w-6 text-gray-500 group-hover:text-emerald-400
                                                           transition-colors mr-3 flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm md:text-base font-medium text-black group-hover:text-emerald-300 truncate">
                                                {file.name}
                                            </h3>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredMaterial.length === 0 && (
                                <div className="text-center py-8 text-gray-400 bg-gray-800/50 rounded-lg border border-gray-700">
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