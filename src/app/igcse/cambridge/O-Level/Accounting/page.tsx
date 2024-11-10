'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllFilesInFolder } from "@/lib/firebaseUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Loader2 } from "lucide-react"; // Added icons for better visual hierarchy

interface FileItem {
    name: string;
    url: string;
}

const Home = () => {
    const [material, setMaterial] = useState<FileItem[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const folderPath = 'gs://document-repository-bc6af.appspot.com/IGCSE';
    
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6 min-h-screen">
            <Card className="w-full max-w-4xl mx-auto shadow-lg">
                <CardHeader className="space-y-2 md:space-y-0 md:flex md:flex-row md:items-center md:justify-between p-4 md:p-6">
                    <CardTitle className="text-xl md:text-2xl text-green-600 text-center md:text-left">
                        IGCSE Study Materials
                    </CardTitle>
                    <div className="text-sm text-gray-500 text-center md:text-right">
                        {material.length} {material.length === 1 ? 'document' : 'documents'} available
                    </div>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                    <div className="grid gap-3 md:gap-4">
                        {material.map((file) => (
                            <div
                                key={file.name}
                                className="group flex items-center p-3 md:p-4 rounded-lg border border-gray-200 
                                         hover:bg-gray-50 hover:border-green-200 transition-all duration-200 
                                         cursor-pointer shadow-sm hover:shadow"
                                onClick={() => handleDocumentClick(file)}
                            >
                                <FileText className="h-5 w-5 md:h-6 md:w-6 text-gray-400 group-hover:text-green-500 
                                                   transition-colors mr-3 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm md:text-base font-medium text-gray-900 truncate">
                                        {file.name}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                    {material.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No documents available at the moment
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Home;