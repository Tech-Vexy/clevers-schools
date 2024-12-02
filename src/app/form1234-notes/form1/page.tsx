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

export default function Form1Notes() {
    const [material, setMaterial] = useState<FileItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const folderIds = useMemo(() => [
        '1F7H96FRxDZ_4DavvKthGAPAtO8f2drdK',
        '1brQK0kdto2B0BMUOk1PuFchVsQIce9nM',
        '1izW0AS9vd9OP-aZTLeLFRsXa0ZMqy0DX',
        '1UpNQ13_kctq5HBO73tKwDVhyvS2YsBbR',
        '1xdH_-XMcSbo7pVBMBjRlOJaish5t2XF1',
        '1cYHQazWtIDQax1DEehpx1WcgKdirv8a5',
        '1X6XzHtXgq6KgHb4boiCC_kQivzjSqW0V',
        '1c5JtiZLjouoCn7s4kr4g40W-PYQXqwKJ',
        '1n2l3XP6FsIrYi-k33kKKtk1tvTYoEJDK',
        '1eFEKWWzjpbCdnmYivDw_gYVSYuJTM5xz',
        '1Vhor3ZGpLzKkUYMwSnlhCIlKPUiVitnX',
        '1IGidrkaIWLRWbrLXauYnC3dbCx0eqVIK',
        '1LJGHLcdxEn28EXJcGCXZzr-Bsd2BTMlC',
        '1693n4QSOqP_64RVGm4m2feMa7Hu0aFBn'
    ], []);

    // Updated folder IDs for Form 3 Notes

    // Updated folder names mapping for Form 3 Notes
    const folderNames: { [key: string]: string } = {
        '1F7H96FRxDZ_4DavvKthGAPAtO8f2drdK': 'Physics',
        '1brQK0kdto2B0BMUOk1PuFchVsQIce9nM': 'Maths',
        '1izW0AS9vd9OP-aZTLeLFRsXa0ZMqy0DX': 'Kiswahili',
        '1UpNQ13_kctq5HBO73tKwDVhyvS2YsBbR': 'IRE',
        '1xdH_-XMcSbo7pVBMBjRlOJaish5t2XF1': 'Home Science',
        '1cYHQazWtIDQax1DEehpx1WcgKdirv8a5': 'History',
        '1X6XzHtXgq6KgHb4boiCC_kQivzjSqW0V': 'Geography',
        '1c5JtiZLjouoCn7s4kr4g40W-PYQXqwKJ': 'English',
        '1n2l3XP6FsIrYi-k33kKKtk1tvTYoEJDK': 'Computer Science',
        '1eFEKWWzjpbCdnmYivDw_gYVSYuJTM5xz': 'Chemistry',
        '1Vhor3ZGpLzKkUYMwSnlhCIlKPUiVitnX': 'CRE',
        '1IGidrkaIWLRWbrLXauYnC3dbCx0eqVIK': 'Business',
        '1LJGHLcdxEn28EXJcGCXZzr-Bsd2BTMlC': 'Biology',
        '1693n4QSOqP_64RVGm4m2feMa7Hu0aFBn': 'Agriculture'
    };

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
            file.name.toLowerCase().includes(lowercaseQuery)
        );
    }, [searchQuery, material]);

    // Group files by folderId
    const groupedFiles = useMemo(() => {
        return filteredMaterial.reduce((acc, file) => {
            if (!acc[file.folderId]) {
                acc[file.folderId] = [];
            }
            acc[file.folderId].push(file);
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
        <div className="flex flex-col h-full w-full overflow-hidden">
            <div className="flex-1 overflow-y-auto px-4 py-8 bg-amber-200">
                <div className="relative md:max-w-screen  max-w-4xl mx-auto">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent pointer-events-none"></div>

                    <Card className="shadow-2xl backdrop-blur-sm border border-gray-700 rounded-xl relative">
                        <CardHeader className="space-y-2 md:space-y-0 md:flex md:flex-row md:items-center md:justify-between p-4 md:p-6 border-b border-gray-700">
                            <CardTitle className="text-xl md:text-2xl text-emerald-400 text-center md:text-left font-bold">
                                FORM 1 NOTES
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
                                                    <h3 className="text-sm md:text-base font-medium  text-blue-800 text-wrap group-hover:text-emerald-300 truncate">
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