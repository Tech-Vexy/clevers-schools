// app/api/auth/verify-email/route.ts
import { NextResponse } from 'next/server';
import dns from 'dns';
import { promisify } from 'util';

const resolveMx = promisify(dns.resolveMx);

// Domain reputation data - this could be moved to a database
const DOMAIN_REPUTATION = new Map([
    ['gmail.com', 'high'],
    ['outlook.com', 'high'],
    ['yahoo.com', 'high'],
    ['hotmail.com', 'high'],
    ['aol.com', 'medium'],
    // Add more domains as needed
]);

// Extended list of disposable email domains
const DISPOSABLE_DOMAINS = new Set([
    'tempmail.com',
    'guerrillamail.com',
    'temporary-mail.net',
    'throwawaymail.com',
    'yopmail.com',
    '10minutemail.com',
    'mailinator.com',
    'tempmail.net',
    'temp-mail.org',
    'disposablemail.com',
    'sharklasers.com',
    'spam4.me',
    'grr.la',
    'maildrop.cc',
    'getairmail.com',
    'mohmal.com',
    'tempmail.ninja',
    // Add more disposable domains as needed
]);

interface EmailValidationResponse {
    valid: boolean;
    disposable?: boolean;
    reputation?: string;
    formatValid?: boolean;
    mxValid?: boolean;
    error?: string;
}

async function checkEmailFormat(email: string): Promise<boolean> {
    // Enhanced email regex that checks for more edge cases
    const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
    return emailRegex.test(email);
}

async function checkDisposableDomain(domain: string): Promise<boolean> {
    return DISPOSABLE_DOMAINS.has(domain.toLowerCase());
}

async function checkDomainReputation(domain: string): Promise<string> {
    return DOMAIN_REPUTATION.get(domain.toLowerCase()) || 'unknown';
}

async function verifyEmailWithService(email: string): Promise<boolean> {
    try {
        // Replace with your preferred email verification service
        // This is an example using Abstract API
        const apiKey = process.env.EMAIL_VERIFICATION_API_KEY;
        const response = await fetch(
            `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`
        );
        
        if (!response.ok) {
            throw new Error('Email verification service error');
        }

        const data = await response.json();
        
        // Check various validation factors from the API response
        return (
            data.is_valid_format &&
            data.is_mx_found &&
            !data.is_disposable &&
            data.deliverability === 'DELIVERABLE'
        );
    } catch {
        // Fallback to basic validation if service is unavailable
        return true;
    }
}

async function checkMXRecords(domain: string): Promise<boolean> {
    try {
        const mxRecords = await resolveMx(domain);
        return Array.isArray(mxRecords) && mxRecords.length > 0;
    } catch {
        return false;
    }
}

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        const domain = email.split('@')[1]?.toLowerCase();
        if (!domain) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Perform all validation checks
        const validationResult: EmailValidationResponse = {
            valid: false,
            formatValid: false,
            mxValid: false,
            disposable: false,
            reputation: 'unknown'
        };

        // 1. Check email format
        validationResult.formatValid = await checkEmailFormat(email);
        if (!validationResult.formatValid) {
            return NextResponse.json(
                { error: 'Invalid email format', details: validationResult },
                { status: 400 }
            );
        }

        // 2. Check MX records
        validationResult.mxValid = await checkMXRecords(domain);
        if (!validationResult.mxValid) {
            return NextResponse.json(
                { error: 'Invalid email domain', details: validationResult },
                { status: 400 }
            );
        }

        // 3. Check if domain is disposable
        validationResult.disposable = await checkDisposableDomain(domain);
        if (validationResult.disposable) {
            return NextResponse.json(
                { error: 'Disposable email addresses are not allowed', details: validationResult },
                { status: 400 }
            );
        }

        // 4. Check domain reputation
        validationResult.reputation = await checkDomainReputation(domain);

        // 5. Verify email with external service
        const serviceVerified = await verifyEmailWithService(email);
        if (!serviceVerified) {
            return NextResponse.json(
                { error: 'Email verification failed', details: validationResult },
                { status: 400 }
            );
        }

        // If all checks pass
        validationResult.valid = true;
        return NextResponse.json({
            valid: true,
            details: validationResult
        });

    } catch (error) {
        console.error('Email verification error:', error);
        return NextResponse.json(
            { error: 'Server error during email verification' },
            { status: 500 }
        );
    }
}