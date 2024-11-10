import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request: Request) {
    try {
        const session = await getServerSession();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { fileName, downloadDate } = await request.json();
        const { db } = await connectToDatabase();

        const downloadLog = {
            userId: session.user.id,
            fileName,
            downloadDate: new Date(downloadDate),
            timestamp: new Date()
        };

        await db.collection('downloads').insertOne(downloadLog);

        return NextResponse.json({ success: true, downloadLog });
    } catch (error) {
        console.error('Error logging download:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}