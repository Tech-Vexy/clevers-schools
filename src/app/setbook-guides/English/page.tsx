'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Film, Image, Music, File } from "lucide-react";

// Types
type FileItem = {
    id: string;
    name: string;
    webViewLink: string;
    mimeType: string;
}

// Add back the getFileIcon helper function
const getFileIcon = (mimeType: string) => {
    switch (true) {
        case mimeType.includes('video'):
            return <Film className="h-5 w-5 md:h-6 md:w-6 text-purple-500" />;
        case mimeType.includes('image'):
            return <Image className="h-5 w-5 md:h-6 md:w-6 text-green-500" />;
        case mimeType.includes('audio'):
            return <Music className="h-5 w-5 md:h-6 md:w-6 text-yellow-500" />;
        default:
            return <File className="h-5 w-5 md:h-6 md:w-6 text-gray-500" />;
    }
};

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

export default function EnglishSetbookGuides() {
    const [material, setMaterial] = useState<FileItem[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Replace this with your Google Drive folder ID
    const folderId = '127baQy13U9u3NoV33ywrRGBuEpb1CM-g';

    useEffect(() => {
        const fetchFiles = async () => {
            const filesList = await fetchGoogleDriveFiles(folderId);
            setMaterial(filesList);
            setLoading(false);
        };
        fetchFiles();
    }, [folderId]);

    const handleDocumentClick = (file: FileItem) => {
        // Navigate to document details page
        router.push(`/document/${encodeURIComponent(file.id)}?fileData=${encodeURIComponent(JSON.stringify(file))}`);
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
                                ENGLISH SETBOOK GUIDES
                            </CardTitle>

                        </CardHeader>
                        <CardContent className="p-4 md:p-6">
                            <div className="space-y-2">
                                {material.map((file) => (
                                    <div
                                        key={file.id}
                                        className="group flex items-center p-2 hover:bg-gray-700/20 
                                                 rounded-lg cursor-pointer transition-all duration-200"
                                        onClick={() => handleDocumentClick(file)}
                                    >
                                        {getFileIcon(file.mimeType)}
                                        <div className="flex-1 min-w-0 ml-3">
                                            <h3 className="text-sm md:text-base font-medium text-blue-600 
                                                         dark:text-blue-400 group-hover:text-blue-500 truncate">
                                                {file.name}
                                            </h3>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {material.length === 0 && (
                                <div className="text-center py-8 text-gray-400 bg-gray-800/50 rounded-lg border border-gray-700">
                                    No documents available at the moment
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}