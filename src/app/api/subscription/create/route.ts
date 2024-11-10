import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request: Request) {
    try {
        // Get the user session
        const session = await getServerSession();
        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized - Valid email required' },
                { status: 401 }
            );
        }

        // Parse and validate request body
        const { reference, amount, duration } = await request.json();

        if (!reference || !amount || !duration) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        if (typeof duration !== 'number' || duration <= 0) {
            return NextResponse.json(
                { error: 'Invalid duration' },
                { status: 400 }
            );
        }

        // Connect to database
        const { db } = await connectToDatabase();

        // Calculate expiry date
        const startDate = new Date();
        const expiryDate = new Date(startDate);
        expiryDate.setDate(expiryDate.getDate() + duration);

        // Create subscription object
        const subscription = {
            email: session.user.email,
            userId: session.user.id,
            reference,
            amount,
            startDate,
            expiryDate,
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date()
        };

        // Check for existing active subscription
        const existingSubscription = await db.collection('subscriptions').findOne({
            email: session.user.email,
            status: 'active',
            expiryDate: { $gt: new Date() }
        });

        if (existingSubscription) {
            return NextResponse.json(
                { error: 'Active subscription already exists' },
                { status: 409 }
            );
        }

        // Insert new subscription
        const result = await db.collection('subscriptions').insertOne(subscription);

        // Create index on email for faster queries if it doesn't exist
        await db.collection('subscriptions').createIndex(
            { email: 1 },
            { background: true }
        );

        return NextResponse.json({
            success: true,
            subscription: {
                ...subscription,
                _id: result.insertedId
            }
        });

    } catch (error) {
        console.error('Error creating subscription:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}