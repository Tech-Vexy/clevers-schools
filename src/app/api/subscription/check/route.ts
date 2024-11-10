import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
    try {
        const session = await getServerSession();
        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized - Valid email required' },
                { status: 401 }
            );
        }

        const { db } = await connectToDatabase();

        // First check for subscription by email
        let subscription = await db.collection('subscriptions').findOne(
            {
                email: session.user.email,
                status: 'active',
                expiryDate: { $gt: new Date() }
            },
            {
                sort: { expiryDate: -1 },
                projection: {
                    _id: 1,
                    startDate: 1,
                    expiryDate: 1,
                    status: 1,
                    reference: 1,
                    amount: 1
                }
            }
        );

        // If no subscription found by email, check by userId as fallback
        if (!subscription && session.user.id) {
            subscription = await db.collection('subscriptions').findOne(
                {
                    userId: session.user.id,
                    status: 'active',
                    expiryDate: { $gt: new Date() }
                },
                {
                    sort: { expiryDate: -1 },
                    projection: {
                        _id: 1,
                        startDate: 1,
                        expiryDate: 1,
                        status: 1,
                        reference: 1,
                        amount: 1
                    }
                }
            );
        }

        // Calculate remaining days if subscription exists
        const remainingDays = subscription
            ? Math.ceil((new Date(subscription.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
            : 0;

        return NextResponse.json({
            isSubscribed: !!subscription,
            subscription: subscription ? {
                id: subscription._id,
                startDate: subscription.startDate,
                expiryDate: subscription.expiryDate,
                remainingDays,
                status: subscription.status,
                reference: subscription.reference,
                amount: subscription.amount
            } : null,
            checkedAt: new Date()
        });

    } catch (error) {
        console.error('Error checking subscription:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}