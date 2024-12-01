'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { FileIcon } from 'lucide-react';

interface File {
  id: string;
  name: string;
  mimeType: string;
  webViewLink: string;
}

const ITEMS_PER_PAGE = 10; // Set the number of items per page

export default function SearchBar({ folderId }: { folderId: string }) {
  const [query, setQuery] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Current page number

  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);
    setCurrentPage(1); // Reset to first page on new search

    try {
      const response = await fetch(`/api/drive/search?folderId=${folderId}&q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch files');
      }
      const data = await response.json();
      // Filter out folders from the search results
      const nonFolderFiles = data.files.filter(
        (file: File) => file.mimeType !== 'application/vnd.google-apps.folder'
      );
      setFiles(nonFolderFiles);
    } catch {
      setError('An error occurred while searching. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentClick = (file: File) => {
    router.push(`/document/${encodeURIComponent(file.id)}?fileData=${encodeURIComponent(JSON.stringify(file))}`);
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedFiles = files.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(files.length / ITEMS_PER_PAGE);

  return (
    <div className="w-full mx-auto p-4">
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Search files..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit" disabled={loading || !query.trim()}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {hasSearched && paginatedFiles.length > 0 && (
        <div className="space-y-2">
          {paginatedFiles.map((file) => (
            <div
              key={file.id}
              onClick={() => handleDocumentClick(file)}
              className="flex items-center gap-3 p-3 pl-8 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
            >
              <FileIcon className="w-5 h-5 text-gray-500" />
              <div className="flex-grow">
                <p className="text-blue-600 hover:underline font-medium">
                  {file.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {hasSearched && files.length === 0 && (
        <p className="text-gray-500 text-center">No files found.</p>
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 space-x-4">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span>Page {currentPage} of {totalPages}</span>
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
