'use client';

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, FileText, Loader2, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Types
type FileItem = {
    id: string;
    name: string;
    webViewLink: string;
    mimeType: string;
    folderId: string;
}

type FolderState = {
    isExpanded: boolean;
    files: FileItem[];
    isLoading: boolean;
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
            throw new Error(`Failed to fetch files from folder ${folderId}`);
        }

        const data = await response.json();
        return data.files.map((file: FileItem) => ({
            ...file,
            folderId
        }));
    } catch (error) {
        console.error('Error fetching files:', error);
        return [];
    }
};

export default function EdexcelOLevel() {
    const [searchQuery, setSearchQuery] = useState('');
    const [folderStates, setFolderStates] = useState<{ [key: string]: FolderState }>({});
    const router = useRouter();

    // Assignment folder IDs and names
    const folderNames: { [key: string]: string } = useMemo(() => ({
        '1R2gu8wU09Q3CHhUAmxig_e1v6jBK7vZK': 'English Literature',
        '1B9KuseVQqnW4j6vm_IiHlPrISdSdeuN3': 'Religious Studies',
        '15e5JYxolvLPZQbB4uyshFv66Ht8MAqBz': 'German',
        '1kSgN40iRo5BENlLdgHtGMq7D8bNxTAuy': 'Physics',
        '1vf7CH6QuyLLiPDIWgMOIocHGmaYa1Ko0': 'Swahili',
        '1g2EpsXyHJBULwNJkqeVxayFSoWprctpp': 'Mathematics',
        '1W9fZ82shnybbBQPMF-ttSykMl-lbTk2B': 'History',
        '1VIZZIxcZwNdCS6pH3iSZtDfyyHe8xTz2': 'Geography',
        '1xpwuaCRLgnEZnyi3Q2TV57ei-z_azc0e': 'French',
        '1Ka7lUWQCf_MBqSQWfzRwu9c9Vujr5h9J': 'English',
        '1mi_KSjhu-f2OD6DhIo98vu6nmP2f3V2s': 'Law',
        '1oLs52-Eo2Zf428u2FYZ-NBdXJyz8RG2Z': 'Computer Science',
        '1XzBaTY0qI_vlTXwGxRQ507w4Q_sqXzvb': 'Chemistry',
        '1RE9jMeur7-BnJTc8QYRZEdcE0jeIBaEL': 'Business',
        '1ZRRayHP1-j0Aj4jFNC9dCjqPorkvDVdg': 'Economics',
        '14LEhFDCQDvOtjUz19ey7a6FX6AZbiUr-': 'Art & Design',
        '1Au4LIW_NZjgsgkafmSVFou92PtEA3ZE_': 'Accounting'
    }), []);

    // Initialize folder states
    useEffect(() => {
        const initialStates = Object.keys(folderNames).reduce((acc, folderId) => {
            acc[folderId] = {
                isExpanded: false,
                files: [],
                isLoading: false
            };
            return acc;
        }, {} as { [key: string]: FolderState });
        setFolderStates(initialStates);
    }, [folderNames]);

    const handleFolderClick = async (folderId: string) => {
        // Toggle folder expansion
        setFolderStates(prev => ({
            ...prev,
            [folderId]: {
                ...prev[folderId],
                isExpanded: !prev[folderId].isExpanded,
                isLoading: !prev[folderId].isExpanded && prev[folderId].files.length === 0
            }
        }));

        // If folder is being expanded and has no files, fetch them
        if (!folderStates[folderId].isExpanded && folderStates[folderId].files.length === 0) {
            const files = await fetchGoogleDriveFiles(folderId);
            setFolderStates(prev => ({
                ...prev,
                [folderId]: {
                    ...prev[folderId],
                    files,
                    isLoading: false
                }
            }));
        }
    };

    const handleDocumentClick = (file: FileItem) => {
        router.push(`/document/${encodeURIComponent(file.id)}?fileData=${encodeURIComponent(JSON.stringify(file))}`);
    };

    const handleSearchClear = () => {
        setSearchQuery('');
    };

    const filteredFolders = useMemo(() => {
        if (!searchQuery) return Object.keys(folderNames);

        const lowercaseQuery = searchQuery.toLowerCase().trim();
        return Object.entries(folderNames)
            .filter(([, name]) => name.toLowerCase().includes(lowercaseQuery))
            .map(([id]) => id);
    }, [folderNames, searchQuery]);

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto px-4 py-8 bg-amber-200">
                <div className="relative max-w-4xl mx-auto">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent pointer-events-none"></div>

                    <Card className="shadow-2xl h-full backdrop-blur-sm border border-gray-700 rounded-xl relative">
                        <CardHeader className="space-y-2 md:space-y-0 md:flex md:flex-row md:items-center md:justify-between p-4 md:p-6 border-b border-gray-700">
                            <CardTitle className="text-xl md:text-2xl text-emerald-400 text-center md:text-left font-bold">
                                IGCSE EDEXCEL O_LEVEL RESOURCES
                            </CardTitle>
                            <div className="relative mt-2 md:mt-0">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <Input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-10 w-full md:w-64 bg-white text-black border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                                />
                                {searchQuery && (
                                    <Button
                                        onClick={handleSearchClear}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 md:p-6">
                            {filteredFolders.map((folderId) => (
                                <div key={folderId} className="mb-6 last:mb-0 border-b-2 border-blue-950">
                                    <Button
                                        variant="ghost"
                                        className="w-full flex items-center justify-between p-6 text-xl  font-semibold uppercase text-center text-blue-800 hover:bg-gray-700/20"
                                        onClick={() => handleFolderClick(folderId)}
                                    >
                                        <span>{folderNames[folderId]}</span>
                                        <ChevronRight 
                                            className={`h-5 w-5 transition-transform duration-200 ${
                                                folderStates[folderId]?.isExpanded ? 'rotate-90' : ''
                                            }`}
                                        />
                                    </Button>
                                    
                                    {folderStates[folderId]?.isExpanded && (
                                        <div className="mt-3 grid gap-3 md:gap-4">
                                            {folderStates[folderId]?.isLoading ? (
                                                <div className="flex justify-center p-4">
                                                    <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
                                                </div>
                                            ) : (
                                                folderStates[folderId]?.files.map((file) => (
                                                    <div
                                                        key={file.id}
                                                        className="group flex items-center p-3 md:p-4 rounded-lg border border-gray-700
                                                                 hover:bg-gray-700/50 hover:border-emerald-600/50 transition-all duration-200
                                                                 cursor-pointer shadow-sm hover:shadow-md bg-white backdrop-blur-sm"
                                                        onClick={() => handleDocumentClick(file)}
                                                    >
                                                        <FileText className="h-5 w-5 md:h-6 md:w-6 text-blue-800 group-hover:text-emerald-400
                                                                           transition-colors mr-3 flex-shrink-0" />
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="text-sm md:text-base font-medium text-wrap text-blue-800 group-hover:text-emerald-300 truncate">
                                                                {file.name}
                                                            </h3>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {filteredFolders.length === 0 && (
                                <div className="text-center py-8 text-gray-400 text-wrap bg-gray-800/50 rounded-lg border border-gray-700">
                                    No folders found matching &quot;{searchQuery}&quot;
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}