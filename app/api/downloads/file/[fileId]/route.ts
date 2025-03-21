import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { google } from 'googleapis';
import { cache } from 'react';

// Cache the Google Drive client initialization
const getDriveClient = cache(async () => {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });
    return google.drive({ version: 'v3', auth });
});

// Constants for optimization
const CHUNK_SIZE = 256 * 1024; // 256KB chunks for optimal streaming
const METADATA_CACHE_TIME = 5 * 60 * 1000; // 5 minutes cache for file metadata
const metadataCache = new Map();

export async function GET(
    request: NextRequest,
    context: { params: Record<string, string | string[]> }
) {
    try {
        // Early auth check before any Google API calls
        const session = await getServerSession();
        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 });
        }

        const fileId = context.params.fileId as string;
        const drive = await getDriveClient();

        // Check cache for file metadata
        const cachedMetadata = metadataCache.get(fileId);
        const now = Date.now();
        
        let fileMetadata;
        if (cachedMetadata && (now - cachedMetadata.timestamp) < METADATA_CACHE_TIME) {
            fileMetadata = cachedMetadata.data;
        } else {
            // Fetch fresh metadata
            const file = await drive.files.get({
                fileId: fileId,
                fields: 'name, mimeType, size',
            });
            
            if (!file.data) {
                return new Response('File not found', { status: 404 });
            }
            
            fileMetadata = file.data;
            metadataCache.set(fileId, {
                data: fileMetadata,
                timestamp: now
            });
        }

        // Set up headers with content length if available
        const headers = new Headers({
            'Content-Type': fileMetadata.mimeType || 'application/octet-stream',
            'Content-Disposition': `attachment; filename="${encodeURIComponent(fileMetadata.name || 'download')}"`,
            'Cache-Control': 'public, max-age=3600',
            'Transfer-Encoding': 'chunked'
        });

        if (fileMetadata.size) {
            headers.set('Content-Length', fileMetadata.size.toString());
        }

        // Optimize streaming with larger chunks and parallel processing
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    const response = await drive.files.get(
                        {
                            fileId: fileId,
                            alt: 'media',
                        },
                        { 
                            responseType: 'stream',
                            // Set higher timeout for large files
                            timeout: 30000,
                        }
                    );

                    let buffer = Buffer.alloc(0);
                    
                    response.data.on('data', (chunk: Buffer) => {
                        buffer = Buffer.concat([buffer, chunk]);
                        
                        // Enqueue when we have enough data
                        while (buffer.length >= CHUNK_SIZE) {
                            controller.enqueue(buffer.slice(0, CHUNK_SIZE));
                            buffer = buffer.slice(CHUNK_SIZE);
                        }
                    });

                    response.data.on('end', () => {
                        // Enqueue any remaining data
                        if (buffer.length > 0) {
                            controller.enqueue(buffer);
                        }
                        controller.close();
                    });

                    response.data.on('error', (error: Error) => {
                        console.error('Stream error:', error);
                        controller.error(error);
                    });
                } catch (error) {
                    console.error('Stream initialization error:', error);
                    controller.error(error);
                }
            },
            cancel() {
                // Clean up resources if the download is cancelled
                console.log('Download cancelled by client');
            }
        });

        return new Response(stream, { headers });
    } catch (error) {
        console.error('Download error:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}