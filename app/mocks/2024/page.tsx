'use client';

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Loader2, Search, X } from "lucide-react";
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

// Google Drive API helper function
const fetchGoogleDriveFiles = async (folderIds: string[]): Promise<FileItem[]> => {
    try {
        // Fetch files from all folders in parallel
        const filesPromises = folderIds.map(async (folderId) => {
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
            // Add folderId to each file object
            return data.files.map((file: FileItem) => ({
                ...file,
                folderId
            }));
        });

        // Wait for all requests to complete
        const filesArrays = await Promise.all(filesPromises);
        // Flatten the arrays of files into a single array
        return filesArrays.flat();
    } catch (error) {
        console.error('Error fetching files:', error);
        return [];
    }
};

export default function CountyMocks2024() {
    const [material, setMaterial] = useState<FileItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    // Assignment folder IDs and names
    const folderNames: { [key: string]: string } = useMemo(() => ({

        '1ETfLmygQl1truGlkBYJW0spCuNdmi91F': '2024 ACK JOINT MOCK MUMIAS',
        '13pgpKwj2hotyE0k-4GGWhebZ6A-l75w3': '2024 BSJE{Bondo sub county joint) JOINT EXAMINATION QUESTIONS',
        '1y-MSLsjYkuNVGG1kgfEPKgLz-8FKtgQD': 'STAREHE GIRLS CENTRE MOCK EXAMINATION 2024',
        '1ZoJuvbgX4QQgoPf2qVbQ8vM4LJajy5RA': 'MUSJET EXAMINATION 2024',
        '1nly_NoVnTZIQMztDUP2SagvULsmWqTkF': 'Muranga south kcse 2024 mock',
        '1yZSa_FVR8vn0SnLm9noun0ozKFwjtS62': 'MOKASA II JOINT MOCK 2024',
        '1xE9dr4wPIikI-OH0y6pBr6lGi0JTYYtN': 'moi high kabarak post mock KCSE 2024',
        '1OO6v6DCgDAa2mlV58BgtX6sopX14q-ji': 'MOI GIRLS HIGH SCHOOL',
        '1tOZUeLM8_ef9WmiqXEmt5-a_T_ZqZrLj': 'MATUNGU SUB COUNTY JOINT EXAM SEPTEMBER 2024',
        '1lYscN7U-TZ41nwohj7dvTEinIUSwC0kZ': 'MASENO HIGH KCSE QUESTION AND ANSWERS',
        '1wGZ69nxtr8t2_LrxylGE9xKwEAfioNnm': 'MARANDA PRE-MOCK FULL EXAM',
        '1zDvQ6i1-leVRqbgI43RVY5r_tFDtUdG1': 'LORETO,LIMURU & MARANDA JOINT MOCK 2024',
        '1qpOpVUU0TIo6lJ6qoCL1pD8nm8pJA11G': 'KENYA HIGH REVISION MOCK',
        '11s-ixWSp8c8XuA1ToPSd-UHIhtjKuV51': 'KCSE BOKAKE JOINT MOCK',
        '1t2bQK9cphr0umQq_i9OHLsHhHPKG7U4l': 'KCSE 2024 KISII HIGH REVISION MOCK',
        '1zWOYmmuGjzrtvYDafJ_TZrq0lp9bubnn': 'KASSU JET JOINT MOCK 2024',
        '1kiZP2GX4PuCUvwOu2uLGhJuWXvBJstar': 'KALA JOINT TRIAL EXAMINATION JULY/AUG 2024',
        '17GXv77EEjnZMPmLKmt-Sapgz4ANhmbXm': 'KABIANGA HIGH KCSE 2024 MOCK',
        '1xCV2Z0SeRbhYw2CLPz2HcXtjFqoi9uxB': 'CHAMPIONS JET**INCOMPLETE',
        '1LPz68Ex9jx-d1EfARjiJJQuiOO95gYes': 'BUKAKA CLUSTER EXAMINATION 2024',
        '1f6nJ4FX3DdijcwrPfS0zNk5JET6rMMlF': '2024 NAKURU JOINT MOCK REVISION PAPERS',
        '1aydeK_mXeDNW2M27qTpb-ol0akYiNACr': '2024 KCSE PANGANI GIRLS REVISION MOCK',
        '1vT_l4XjBEfN5FPT-am6rAFAicxjsKaKY': '2024 CEKANA REVISION MOCK QUESTION AND ANSWERS'
       

    }), []);

    const folderIds = Object.keys(folderNames);

    useEffect(() => {
        const fetchFiles = async () => {
            const filesList = await fetchGoogleDriveFiles(folderIds);
            setMaterial(filesList);
            setLoading(false);
        };
        fetchFiles();
    }, [folderIds]);

    // Memoized filtered files based on search query
    const filteredMaterial = useMemo(() => {
        if (!searchQuery) return material;

        const lowercaseQuery = searchQuery.toLowerCase().trim();
        return material.filter(file =>
            file.name.toLowerCase().includes(lowercaseQuery) ||
            folderNames[file.folderId].toLowerCase().includes(lowercaseQuery)
        );
    }, [material, searchQuery, folderNames]);

    // Group files by folder
    const groupedFiles = useMemo(() => {
        return filteredMaterial.reduce((acc, file) => {
            const folderId = file.folderId;
            if (!acc[folderId]) {
                acc[folderId] = [];
            }
            acc[folderId].push(file);
            return acc;
        }, {} as { [key: string]: FileItem[] });
    }, [filteredMaterial]);

    const handleDocumentClick = (file: FileItem) => {
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
        <div className="flex flex-col h-full  overflow-hidden">
            <div className="flex-1 overflow-y-auto px-4 py-8 bg-amber-200">
                <div className="relative max-w-4xl mx-auto">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent pointer-events-none"></div>

                    <Card className="shadow-2xl backdrop-blur-sm border border-gray-700 rounded-xl relative">
                        <CardHeader className="space-y-2 md:space-y-0 md:flex md:flex-row md:items-center md:justify-between p-4 md:p-6 border-b border-gray-700">
                            <CardTitle className="text-xl md:text-2xl text-emerald-400 text-center md:text-left font-bold">
                              2024 COUNTY MOCKS
                            </CardTitle>
                            <div className="relative mt-2 md:mt-0">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <Input
                                    type="text"
                                    placeholder="Search assignments..."
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
                            {Object.entries(groupedFiles).map(([folderId, files]) => (
                                <div key={folderId} className="mb-6 last:mb-0">
                                    <h2 className="text-lg font-semibold text-emerald-400 mb-3">
                                        {folderNames[folderId]}
                                    </h2>
                                    <div className="grid gap-3 md:gap-4">
                                        {files.map((file) => (
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
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {filteredMaterial.length === 0 && (
                                <div className="text-center py-8 text-gray-400 bg-gray-800/50 rounded-lg border border-gray-700">
                                    {searchQuery
                                        ? `No assignments found matching "${searchQuery}"`
                                        : "No assignments available at the moment"
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