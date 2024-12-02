import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { Readable } from 'stream';

const drive = google.drive({ version: 'v3', auth: new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS || ''),
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
}) });

export async function GET(
  request: NextRequest,
  { params }: { params: { fileId: string } }
) {
  const fileId = params.fileId;

  try {
    // Fetch file metadata
    const fileResponse = await drive.files.get({
      fileId: fileId,
      fields: 'id, name, mimeType, webContentLink',
    });

    const file = fileResponse.data;

    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // For supported preview types, generate a temporary URL
    if (file.mimeType === 'application/pdf' || 
        file.mimeType?.startsWith('image/') || 
        file.mimeType === 'text/plain') {
      
      const previewResponse = await drive.files.get({
        fileId: fileId,
        alt: 'media',
      }, { responseType: 'stream' });

      // Ensure the response data is a Readable stream
      if (previewResponse.data instanceof Readable) {
        // Create a ReadableStream from the Node.js Readable
        const stream = new ReadableStream({
          start(controller) {
            previewResponse.data.on('data', (chunk) => controller.enqueue(chunk));
            previewResponse.data.on('end', () => controller.close());
            previewResponse.data.on('error', (err) => controller.error(err));
          },
        });

        // Return a streaming response
        return new NextResponse(stream, {
          headers: {
            'Content-Type': file.mimeType || 'application/octet-stream',
            'Content-Disposition': `inline; filename="${file.name}"`,
          },
        });
      } else {
        throw new Error('Invalid response data type');
      }
    }

    // For unsupported types, return file metadata
    return NextResponse.json({
      id: file.id,
      name: file.name,
      mimeType: file.mimeType,
      webContentLink: file.webContentLink,
    });

  } catch (error) {
    console.error('Error fetching file:', error);
    return NextResponse.json({ error: 'Failed to fetch file' }, { status: 500 });
  }
}

