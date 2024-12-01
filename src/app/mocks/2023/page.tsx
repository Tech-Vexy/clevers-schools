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

export default function CountyMocks2023() {
    const [material, setMaterial] = useState<FileItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    // Assignment folder IDs and names
    const folderNames: { [key: string]: string } = useMemo(() => ({
        '1CW2lckf7Er2A4Lk43InZqYi9Yog7Q8hL': 'WAHUNDURA MOCK',
        '1Hd-01VB23db6Y6YiKhgvUpz_vBXacCu5': 'SUNRISE PRE MOCK',
        '1eCED3eej6947FrrxQB5-U75vw5K-jMFt': 'SUKELLEMO JOINT PRE MOCK EXAMS',
        '1paxuvoPlYRlrWuCEhwtLeN5Gv1qMrIDy': 'SAMIA JOINT MOCK ',
        '1MlkVARgFO3cJhtlGXqDe6_Ov4uOVcgoj': 'PANGANI MOCK ',
        '1mW9Y_MisNLOoisDsCPUx5eq15TkN3Itk': 'NYARIRA CLUSTER MOCK',
        '1s5-cRv_JsSTQw5TnbK9Jz5jXfmQgUJ2C': 'NGINDARA GIRLS MOCK',
        '13T97AmU7FEwIQG8T0Ff5He_8RJQLKYOf': 'MUMIAS WEST PRE MOCK EXAMS',
        '1JyJIo0_xmoJ8qIZMc1blZ7aXpVaK8vIR': 'MOMALICHE 2 EXAMS PRE MOCK ',
        '11Q5HN9caQFyBVT7p1zth8W1BjK_tCJ7B': 'MOKASA MOCK REVISION EXAMS',
        '1fd9zVjU81i7d7-lmzYacSpsWQJ40v6vR': 'MOKASA 2 MOCK ',
        '1zLTWcrQjKyn5cf8yyCTCj7s_zTozh2Kb': 'MECS CLUSTER JOINT MOCK EXAM',
        '1ORBtkktIzppvsL7-lCa-yMBqV_ZcM_Xa': 'MARANDA HIGH SCHOOL MOCK ',
        '1J6lnRY_Um2TlJEIcwR8wOmABgQQgwAw5': 'MANGU HIGH REVISION MOCK ',
        '1czEbkAVKoU44cbIg40aOBmcDt0OgbYF8': 'LUGARI CONSTITUENCY MOCK 1',
        '1owJeOk5jM4NIpbq3fY7cBuBNEeTdW-7x': 'LANJET EVALUATION MOCK',
        '1wrCA4uTQE6BoT5oEOCWmYeq7UAYCnaSx': 'LAINAKU II FORM 4 JOINT MOCK',
        '137bsYZQwUevKTrior9Mi5vjfl9EiL7Uh': 'KENYA HIGH POST MOCK ',
        '1o7OgK-Q9SpzeExJuhL_fF5o6CqJSCUph': 'KASSU MOCK ',
        '1IoO9uNZEo6BkMD65-6aDklQht1SDGtp-': 'KAPSABET INTERNAL TRIAL 1',
        '1tZKDtYi_sdMrV1RHIPLniqAWjV3ZuuGo': 'KAPSABET BOYS POST MOCK ',
        '1UBq8VfiwnRiDnMTIdnUE6C8CaEAX8zW-': 'KAPSABET 2 MOCK ',
        '1uQ7uyVZWyPF1SiDJBEu2j80sSG-5aX3j': 'KALA MOCK ',
        '1WmIgv4_ZuanfS9KrKJ-8VfMGy2vqOJe_': 'IAINAKU REVISION MOCK ',
        '1LOBAbZePVtViUHcHRq9JwUtvvpbVhj69': 'CHOGORIA MURUGI ZONE PRE MOCK ',
        '1BOWygtiuFwmr5agAyCDsdG4f9Fe7n4k9': 'CEKANA MOCKS',
        '13F7rjLjqF9xdgSRm5Gt5KZzByVw9ND96': 'CATHOLIC DIOCESE OK KAKAMEGA MOCK ',
        '1RkYlh2yuM0M61G5y67fA3vVFgYzmm_TG': 'BSJE JOINT MOCK',
        '1cNG11XekvkaV866NV7gHs_Yt4YO7GRzT': 'ASUMBI PRE MOCK EXAMS',
        '1KfzGArDZe1DRj25zvsLlW9j-LLkAkmLq': 'ARISE AND SHINE PRE MOCK',
        '1UGInyDcCokdnvqjT6u0LC5ay7YoLasci': 'ACHIEVERS JOINT MOCK '
    

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
                              2023 COUNTY MOCKS
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