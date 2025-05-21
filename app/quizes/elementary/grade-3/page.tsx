'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllFilesInFolder } from '@/lib/firebaseUtils';

// Define FileItem interface
interface FileItem {
    id: string;
    name: string;
    downloadUrl?: string;
    mimeType: string;
    lastModified?: string;
}

// Loading component
const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
    </div>
);

export default function Page() {
    const [material, setMaterial] = useState<FileItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 10;
    const router = useRouter();
    const folderPath = 'gs://clevers-school-resources.appspot.com/WEEKLY QUIZES/ELEMENTARY/GRADE 3';
    
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const filesList = await getAllFilesInFolder(folderPath);
                
                // Sort files by most recent
                const sortedFiles = filesList.sort((a, b) => {
                    if (a.lastModified && b.lastModified) {
                        return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
                    }
                    return 0;
                });
                
                setMaterial(sortedFiles);
            } catch (error) {
                console.error("Error fetching files:", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchFiles();
    }, [folderPath]);

    const handleDocumentClick = (file: FileItem) => {
        const searchParams = new URLSearchParams({
            fileData: JSON.stringify(file)
        });
        router.push(`/document/${encodeURIComponent(file.name)}?${searchParams.toString()}`);
    };

    // Filter files based on search query
    const filteredMaterial = searchQuery 
        ? material.filter(file => file.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : material;

    const totalPages = Math.ceil(filteredMaterial.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentFiles = filteredMaterial.slice(startIndex, endIndex);
    
    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
                <div className="border-b border-gray-200 bg-gray-50 p-4 flex flex-col md:flex-row justify-between items-center rounded-t-lg">
                    <h1 className="text-2xl font-bold text-emerald-600 mb-4 md:mb-0">
                        Grade 3 Weekly Quizzes
                    </h1>
                    
                    {/* Search Input */}
                    <div className="relative w-full md:w-64">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search className="w-4 h-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search quizzes..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1); // Reset to first page on search
                            }}
                            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md 
                                      focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery('')}
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                            >
                                <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                            </button>
                        )}
                    </div>
                </div>
                
                <div className="p-4">
                    {currentFiles.length > 0 ? (
                        <div className="space-y-2">
                            {currentFiles.map((file) => (
                                <div
                                    key={file.id}
                                    onClick={() => handleDocumentClick(file)}
                                    className="flex items-center p-3 rounded-md border border-gray-200 
                                             hover:bg-gray-50 hover:border-emerald-500 transition-all cursor-pointer"
                                >
                                    <FileText className="text-gray-500 mr-3 h-5 w-5" />
                                    <div>
                                        <h3 className="font-medium text-gray-800">{file.name}</h3>
                                        {file.lastModified && (
                                            <p className="text-xs text-gray-500">
                                                Last modified: {new Date(file.lastModified).toLocaleDateString()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center p-8 bg-gray-50 rounded-md border border-gray-200">
                            {searchQuery 
                                ? `No quizzes found matching "${searchQuery}"` 
                                : "No quizzes available at the moment"}
                        </div>
                    )}
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center mt-6 gap-2">
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`flex items-center px-3 py-1 rounded ${
                                    currentPage === 1 
                                        ? 'text-gray-400 cursor-not-allowed' 
                                        : 'text-emerald-600 hover:bg-emerald-50'
                                }`}
                            >
                                <ChevronLeft className="w-5 h-5" />
                                <span>Previous</span>
                            </button>
                            
                            <span className="text-gray-600">
                                Page {currentPage} of {totalPages}
                            </span>
                            
                            <button
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`flex items-center px-3 py-1 rounded ${
                                    currentPage === totalPages 
                                        ? 'text-gray-400 cursor-not-allowed' 
                                        : 'text-emerald-600 hover:bg-emerald-50'
                                }`}
                            >
                                <span>Next</span>
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}