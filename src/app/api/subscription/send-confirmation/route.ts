// app/api/subscription/send-confirmation/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { email, name, subscriptionDetails } = await request.json();

        const { startDate, expiryDate, amount, reference, currency } = subscriptionDetails;

        const formattedStartDate = new Date(startDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const formattedExpiryDate = new Date(expiryDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const formattedAmount = new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: currency
        }).format(amount / 100);

        await resend.emails.send({
            from: 'CLEVERS SCHOOLS <notifications@schoolresources.clevers.co.ke>',
            to: email,
            subject: 'Subscription Confirmation',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h1 style="color: #16a34a; text-align: center;">Subscription Confirmed!</h1>
                    
                    <p>Dear ${name},</p>
                    
                    <p>Thank you for subscribing to our service. Your subscription status has been successfully updated.</p>
                    
                    <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h2 style="color: #374151; margin-bottom: 15px;">Subscription Details:</h2>
                        <ul style="list-style: none; padding: 0;">
                            <li style="margin-bottom: 10px;"><strong>Start Date:</strong> ${formattedStartDate}</li>
                            <li style="margin-bottom: 10px;"><strong>Expiry Date:</strong> ${formattedExpiryDate}</li>
                            <li style="margin-bottom: 10px;"><strong>Amount Paid:</strong> ${formattedAmount}</li>
                            <li style="margin-bottom: 10px;"><strong>Reference:</strong> ${reference}</li>
                        </ul>
                    </div>
                    
                    <p>You now have full access to all our premium features and study materials.</p>
                    
                    <div style="margin-top: 30px;">
                        <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
                        
                        <p style="margin-top: 20px;">Best regards,<br>CLEVERS SCHOOLS</p>
                    </div>
                </div>
            `
        });

        return NextResponse.json(
            { message: 'Confirmation email sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending confirmation email:', error);
        return NextResponse.json(
            { error: 'Failed to send confirmation email' },
            { status: 500 }
        );
    }
}