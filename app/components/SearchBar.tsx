'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { Search, FileIcon, Loader2, XCircle, Book, FileText, File } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  downloadUrl?: string;
}

const ITEMS_PER_PAGE = 10;
const RECENTLY_SEARCHED_KEY = 'recently_searched';

export default function SearchBar({ folderId }: { folderId: string }) {
  const [query, setQuery] = useState('');
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  // Load recent searches from localStorage
  useEffect(() => {
    const storedSearches = localStorage.getItem(RECENTLY_SEARCHED_KEY);
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  // Save a search to recent searches
  const saveToRecentSearches = (searchTerm: string) => {
    const updatedSearches = [
      searchTerm,
      ...recentSearches.filter(term => term !== searchTerm)
    ].slice(0, 5); // Keep only 5 most recent searches
    
    setRecentSearches(updatedSearches);
    localStorage.setItem(RECENTLY_SEARCHED_KEY, JSON.stringify(updatedSearches));
  };

  // Handle clicks outside of suggestions dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) && 
        searchInputRef.current && 
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Generate suggestions based on query
  useEffect(() => {
    if (query.trim().length > 1) {
      // Filter recent searches that match the query
      const matchingRecents = recentSearches.filter(
        term => term.toLowerCase().includes(query.toLowerCase())
      );
      
      // Combine with common educational terms for auto-complete
      const commonTerms = [
        'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English',
        'History', 'Geography', 'Economics', 'Computer Science',
        'Exam', 'Quiz', 'Notes', 'Revision', 'Assignment', 'Syllabus'
      ].filter(term => term.toLowerCase().includes(query.toLowerCase()));
      
      setSuggestions([...matchingRecents, ...commonTerms.filter(term => 
        !matchingRecents.some(recent => recent.toLowerCase() === term.toLowerCase())
      )].slice(0, 6)); // Limit to 6 suggestions
      
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, recentSearches]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setCurrentPage(1);
    setShowSuggestions(false);
    
    // Save this search term
    saveToRecentSearches(query);

    try {
      const response = await fetch(`/api/drive/search?folderId=${folderId}&q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch files');
      }
      const data = await response.json();
      const nonFolderFiles = data.files.filter(
        (file: FileItem) => file.mimeType !== 'application/vnd.google-apps.folder'
      );
      setFiles(nonFolderFiles);
      setHasSearched(true);
    } catch {
      setError('An error occurred while searching. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    searchInputRef.current?.focus();
  };

  const clearSearch = () => {
    setQuery('');
    setFiles([]);
    setHasSearched(false);
    setError(null);
    searchInputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleFileClick = (file: FileItem) => {
    // Use direct URL if it exists or pass file data for rendering
    if (file.webViewLink) {
      window.open(file.webViewLink, '_blank');
    } else if (file.downloadUrl) {
      window.open(file.downloadUrl, '_blank');
    } else {
      router.push(`/document/${encodeURIComponent(file.id)}?fileData=${encodeURIComponent(JSON.stringify(file))}`);
    }
  };

  // Get file icon based on mime type
  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('pdf')) {
      return <FileText className="h-5 w-5 text-red-500" />;
    } else if (mimeType.includes('word') || mimeType.includes('document')) {
      return <FileText className="h-5 w-5 text-blue-500" />;
    } else if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) {
      return <FileText className="h-5 w-5 text-green-500" />;
    } else if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) {
      return <FileText className="h-5 w-5 text-orange-500" />;
    } else {
      return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  // Pagination controls
  const totalPages = Math.ceil(files.length / ITEMS_PER_PAGE);
  const displayedFiles = files.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="relative">
        <form onSubmit={handleSearch} className="flex w-full relative">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Search for notes, quizzes, or revision materials..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query.trim().length > 1 && setShowSuggestions(true)}
              onKeyDown={handleKeyDown}
              className="pl-9 pr-10 py-2 w-full border rounded-l-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button 
            type="submit" 
            disabled={loading || !query.trim()} 
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-r-md px-4"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
          </Button>
        </form>

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div 
            ref={suggestionsRef}
            className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto"
          >
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
              >
                <Book className="h-4 w-4 mr-2 text-emerald-500" />
                <span>{suggestion}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent searches (when input is focused but empty) */}
      {query === '' && showSuggestions && recentSearches.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto"
        >
          <div className="px-4 py-2 text-xs text-gray-500 border-b">Recent searches</div>
          {recentSearches.map((term, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(term)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
            >
              <Search className="h-4 w-4 mr-2 text-gray-400" />
              <span>{term}</span>
            </div>
          ))}
        </div>
      )}

      {/* Search results */}
      {hasSearched && (
        <div className="mt-4">
          {error ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
              {error}
            </div>
          ) : files.length === 0 ? (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-md text-center">
              No results found for &quot;{query}&quot;
            </div>
          ) : (
            <div>
              <div className="text-sm text-gray-500 mb-2">
                Found {files.length} result{files.length !== 1 ? 's' : ''} for &quot;{query}&quot;
              </div>
              
              <div className="space-y-2">
                {displayedFiles.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => handleFileClick(file)}
                    className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer flex items-center transition-colors"
                  >
                    {getFileIcon(file.mimeType)}
                    <span className="ml-3 text-gray-800 flex-1 truncate">{file.name}</span>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-4 gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => 
                      page === 1 || 
                      page === totalPages || 
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    )
                    .map((page, i, arr) => (
                      <React.Fragment key={page}>
                        {i > 0 && arr[i - 1] !== page - 1 && (
                          <span className="px-2">...</span>
                        )}
                        <Button
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => goToPage(page)}
                          className="w-8 h-8 p-0"
                        >
                          {page}
                        </Button>
                      </React.Fragment>
                    ))
                  }
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}