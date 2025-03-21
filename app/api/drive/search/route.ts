import { google } from 'googleapis';
import { NextResponse } from 'next/server';

interface SearchResult {
  files: Array<{
    id: string;
    name: string;
    mimeType: string;
    webViewLink: string;
    modifiedTime: string;
    size?: string;
    thumbnailLink?: string;
    description?: string;
    fullText?: string;
    matchScore?: number;
  }>;
  nextPageToken?: string;
  totalItems: number;
  searchMetadata?: {
    executionTime: number;
    matchQuality: 'exact' | 'partial' | 'fuzzy';
    searchDepth: number;
  };
}

interface SearchOptions {
  pageToken?: string;
  pageSize?: number;
  orderBy?: string;
  fields?: string;
  fuzzyMatch?: boolean;
  includeContent?: boolean;
  fileTypes?: string[];
  dateRange?: {
    start?: Date;
    end?: Date;
  };
  minMatchScore?: number;
}

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_id: process.env.GOOGLE_CLIENT_ID,
  },
  scopes: [
    'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/drive.metadata.readonly'
  ],
});

const drive = google.drive({ version: 'v3', auth });

class SearchCache {
  private cache: Map<string, { data: SearchResult; timestamp: number }>;
  private readonly maxSize: number;
  private readonly ttl: number;

  constructor(maxSize = 1000, ttl = 5 * 60 * 1000) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttl = ttl;
  }

  get(key: string) {
    const item = this.cache.get(key);
    if (!item) return null;
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    return item.data;
  }

  set(key: string, data: SearchResult) {
    if (this.cache.size >= this.maxSize) {
      const oldestKey = Array.from(this.cache.entries())
        .sort(([, a], [, b]) => a.timestamp - b.timestamp)[0][0];
      this.cache.delete(oldestKey);
    }
    this.cache.set(key, { data, timestamp: Date.now() });
  }
}

const searchCache = new SearchCache();

function calculateSimilarity(str1: string, str2: string): number {
  const matrix: number[][] = [];
  const len1 = str1.length;
  const len2 = str2.length;

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  const maxLength = Math.max(len1, len2);
  return 1 - matrix[len1][len2] / maxLength;
}

function buildSearchQuery(folderId: string, query: string | undefined, options: SearchOptions): string {
  const queryParts = [`'${folderId}' in parents and trashed = false`];

  if (query) {
    const sanitizedQuery = query.replace(/['"\\]/g, '\\$&').split(' ')
      .filter(term => term.length > 0)
      .map(term => `(name contains '${term}' or fullText contains '${term}')`)
      .join(' or ');
    queryParts.push(`and (${sanitizedQuery})`);
  }

  if (options.fileTypes?.length) {
    const mimeTypes = options.fileTypes
      .map(type => `mimeType contains '${type}'`)
      .join(' or ');
    queryParts.push(`and (${mimeTypes})`);
  }

  if (options.dateRange) {
    if (options.dateRange.start) {
      queryParts.push(`and modifiedTime >= '${options.dateRange.start.toISOString()}'`);
    }
    if (options.dateRange.end) {
      queryParts.push(`and modifiedTime <= '${options.dateRange.end.toISOString()}'`);
    }
  }

  return queryParts.join(' ');
}

async function searchFolder(
  folderId: string,
  query: string | undefined,
  depth: number = 0,
  maxDepth: number = 5,
  options: SearchOptions = {}
): Promise<SearchResult> {
  const startTime = Date.now();
  const cacheKey = `${folderId}-${query}-${JSON.stringify(options)}`;
  
  const cachedResult = searchCache.get(cacheKey);
  if (cachedResult) {
    return cachedResult;
  }

  try {
    const searchQuery = buildSearchQuery(folderId, query, options);
    const fields = options.fields || 'nextPageToken, files(id, name, mimeType, webViewLink, modifiedTime, size, thumbnailLink, description)';
    
    const response = await drive.files.list({
      q: searchQuery,
      fields,
      orderBy: options.orderBy || 'modifiedTime desc',
      pageSize: options.pageSize || 1000,
      pageToken: options.pageToken,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
      includePermissionsForView: 'published',
    });

    let files = response.data.files || [];
    
    if (options.fuzzyMatch && query) {
      files = files.map(file => {
        const nameScore = file.name ? calculateSimilarity(query.toLowerCase(), file.name.toLowerCase()) : 0;
        const descriptionScore = file.description 
          ? calculateSimilarity(query.toLowerCase(), file.description.toLowerCase())
          : 0;
        
        return {
          ...file,
          matchScore: Math.max(nameScore, descriptionScore)
        };
      }).filter(file => file.matchScore >= (options.minMatchScore || 0.3));
    }

    let allFiles = files.filter(file => file.id) as SearchResult['files'];

    if (depth < maxDepth) {
      const subfolders = files.filter(
        file => file.mimeType === 'application/vnd.google-apps.folder'
      );

      const concurrencyLimit = 5;
      for (let i = 0; i < subfolders.length; i += concurrencyLimit) {
        const batch = subfolders.slice(i, i + concurrencyLimit);
        const subfolderResults = await Promise.allSettled(
          batch.map(folder =>
            searchFolder(folder.id!, query, depth + 1, maxDepth, {
              ...options,
              pageToken: undefined,
            })
          )
        );

        allFiles = allFiles.concat(
          subfolderResults
            .filter((result): result is PromiseFulfilledResult<SearchResult> => 
              result.status === 'fulfilled'
            )
            .flatMap(result => result.value.files)
        );
      }
    }

    if (options.fuzzyMatch) {
      allFiles.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    }

    const result: SearchResult = {
      files: allFiles,
      nextPageToken: response.data.nextPageToken ?? undefined,
      totalItems: allFiles.length,
      searchMetadata: {
        executionTime: Date.now() - startTime,
        matchQuality: options.fuzzyMatch ? 'fuzzy' : query ? 'exact' : 'partial',
        searchDepth: depth,
      },
    };

    searchCache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error(`Error searching folder ${folderId}:`, error);
    throw error;
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const folderId = searchParams.get('folderId');
    const query = searchParams.get('q') || undefined;
    const pageToken = searchParams.get('pageToken') || undefined;
    const pageSizeParam = searchParams.get('pageSize');
    const maxDepth = parseInt(searchParams.get('maxDepth') || '5', 10);
    const orderBy = searchParams.get('orderBy') || 'modifiedTime desc';
    const fuzzyMatch = searchParams.get('fuzzyMatch') === 'true';
    const includeContent = searchParams.get('includeContent') === 'true';
    const fileTypes = searchParams.get('fileTypes')?.split(',');
    const minMatchScore = parseFloat(searchParams.get('minMatchScore') || '0.3');

    if (!folderId) {
      return NextResponse.json(
        { error: 'Folder ID is required' },
        { status: 400 }
      );
    }

    const pageSize = pageSizeParam ? Math.min(parseInt(pageSizeParam, 10), 1000) : 100;

    const dateRange = {
      start: searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined,
      end: searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined,
    };

    const searchOptions: SearchOptions = {
      pageToken,
      pageSize,
      orderBy,
      fuzzyMatch,
      includeContent,
      fileTypes,
      dateRange,
      minMatchScore,
      fields: includeContent 
        ? 'nextPageToken, files(id, name, mimeType, webViewLink, modifiedTime, size, thumbnailLink, description, fullText)'
        : 'nextPageToken, files(id, name, mimeType, webViewLink, modifiedTime, size, thumbnailLink, description)',
    };

    const result = await searchFolder(folderId, query, 0, maxDepth, searchOptions);

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error('Error searching files:', error);
    
    const errorResponses: Record<number, string> = {
      400: 'Invalid request parameters',
      401: 'Authentication required',
      403: 'Access denied to folder',
      404: 'Folder not found',
      429: 'Too many requests',
    };

    let statusCode = (error as { code?: number }).code || 500;
    statusCode = Math.max(200, Math.min(599, statusCode));
    
    const errorMessage = errorResponses[statusCode] || 'Failed to search files';

    return NextResponse.json(
      { 
        error: errorMessage, 
        details: (error as Error).message,
        requestId: Date.now().toString(36)
      },
      { status: statusCode }
    );
  }
}