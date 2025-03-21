'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllFilesInFolder } from "@/lib/firebaseUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Loader2, ChevronLeft, ChevronRight } from "lucide-react";

type FileItem = {
    name: string;
    url: string;
}

type PaginationControlsProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

function PaginationControls({ currentPage, totalPages, onPageChange }: PaginationControlsProps) {
    return (
        <div className="flex items-center justify-center space-x-4 mt-6">
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700"
            >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
            </Button>
            <span className="text-sm text-gray-300 bg-gray-800 px-3 py-1 rounded-md border border-gray-700">
                Page {currentPage} of {totalPages}
            </span>
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700"
            >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
        </div>
    );
}

export default function Page() {
    const [material, setMaterial] = useState<FileItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const router = useRouter();
    const folderPath = 'gs://clevers-school-resources.appspot.com/WEEKLY QUIZES/ELEMENTARY/GRADE 4';
    useEffect(() => {
        const fetchFiles = async () => {
            const filesList = await getAllFilesInFolder(folderPath);
            setMaterial(filesList);
            setLoading(false);
        };
        fetchFiles();
    }, [folderPath]);

    const handleDocumentClick = (file: FileItem) => {
        const searchParams = new URLSearchParams({
            fileData: JSON.stringify(file)
        });
        router.push(`/document/${encodeURIComponent(file.name)}?${searchParams.toString()}`);
    };

    const totalPages = Math.ceil(material.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentFiles = material.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const contentArea = document.getElementById('content-area');
        if (contentArea) {
            contentArea.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center bg-yellow-400">
                <div className="bg-gray-800/80 p-6 rounded-full shadow-xl">
                    <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div 
                id="content-area"
                className="flex-1 overflow-y-auto px-4 py-8 bg-yellow-400"
            >
                <div className="relative max-w-4xl mx-auto">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent pointer-events-none"></div>
                    
                    <Card className="shadow-2xl  backdrop-blur-sm border border-gray-700 rounded-xl relative">
                        <CardHeader className="space-y-2 md:space-y-0 md:flex md:flex-row md:items-center md:justify-between p-4 md:p-6 border-b border-gray-700">
                            <CardTitle className="text-xl md:text-2xl text-emerald-400 text-center md:text-left font-bold">
                                All Study Materials
                            </CardTitle>
                            <div className="text-sm text-gray-400 text-center md:text-right bg-gray-700/50 px-3 py-1 rounded-full">
                                {material.length} {material.length === 1 ? 'document' : 'documents'} available
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 md:p-6">
                            <div className="grid gap-3 md:gap-4">
                                {currentFiles.map((file) => (
                                    <div
                                        key={file.name}
                                        className="group flex items-center p-3 md:p-4 rounded-lg border border-gray-700 
                                                 hover:bg-gray-700/50 hover:border-emerald-600/50 transition-all duration-200 
                                                 cursor-pointer shadow-sm hover:shadow-md bg-white backdrop-blur-sm"
                                        onClick={() => handleDocumentClick(file)}
                                    >
                                        <FileText className="h-5 w-5 md:h-6 md:w-6 text-gray-500 group-hover:text-emerald-400 
                                                           transition-colors mr-3 flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-3xl md:text-base font-semibold text-black group-hover:text-emerald-300 truncate">
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
                            {material.length > itemsPerPage && (
                                <PaginationControls
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}