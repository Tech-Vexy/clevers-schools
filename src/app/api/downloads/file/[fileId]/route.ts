import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { google } from 'googleapis';

export async function GET(
    req: NextRequest,
    { params }: { params: { fileId: string } }
) {
    try {
        const { fileId } = params;

        // Check authentication
        const session = await getServerSession();
        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        // Initialize Google Drive client
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        });

        const drive = google.drive({ version: 'v3', auth });

        // Get file metadata first to verify existence and get mimeType
        const file = await drive.files.get({
            fileId: fileId,
            fields: 'name, mimeType',
        });

        if (!file.data) {
            return new NextResponse('File not found', { status: 404 });
        }

        // Get the file content
        const response = await drive.files.get(
            {
                fileId: fileId,
                alt: 'media',
            },
            { responseType: 'stream' }
        );

        // Set appropriate headers for the download
        const headers = new Headers();
        headers.set('Content-Type', file.data.mimeType || 'application/octet-stream');
        headers.set(
            'Content-Disposition',
            `attachment; filename="${encodeURIComponent(file.data.name || 'download')}"`,
        );

        // Create a ReadableStream from the response data
        const stream = new ReadableStream({
            async start(controller) {
                response.data.on('data', (chunk: Buffer) => {
                    controller.enqueue(chunk);
                });

                response.data.on('end', () => {
                    controller.close();
                });

                response.data.on('error', (error: Error) => {
                    controller.error(error);
                });
            },
        });

        return new NextResponse(stream, {
            headers,
        });
    } catch (error) {
        console.error('Download error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}