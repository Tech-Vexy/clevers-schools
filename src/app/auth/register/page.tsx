'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';

// Email validation regex pattern
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// Common disposable email domains
const DISPOSABLE_DOMAINS = [
    'tempmail.com',
    'throwawaymail.com',
    'temp-mail.org',
    'guerrillamail.com',
    'sharklasers.com',
    // Add more as needed
];

export default function RegisterPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [emailError, setEmailError] = useState<string | null>(null);

    const validateEmail = (email: string): boolean => {
        // Reset email error
        setEmailError(null);

        // Check basic email format
        if (!EMAIL_REGEX.test(email)) {
            setEmailError('Please enter a valid email address');
            return false;
        }

        // Check for disposable email domains
        const domain = email.split('@')[1].toLowerCase();
        if (DISPOSABLE_DOMAINS.includes(domain)) {
            setEmailError('Please use a non-disposable email address');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setEmailError(null);

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        // Validate email format
        if (!validateEmail(email)) {
            setIsLoading(false);
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        try {
            // First, verify email validity
            const verifyResponse = await fetch('/api/auth/verify-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok) {
                const errorMessage = verifyData.error || 'Invalid email address';
                const details = verifyData.details;
                
                // Handle specific validation failures
                if (details?.disposable) {
                    throw new Error('Please use a non-disposable email address');
                }
                if (details?.reputation === 'low') {
                    throw new Error('This email domain has a low reputation score');
                }
                if (!details?.mxValid) {
                    throw new Error('Invalid email domain');
                }
                
                throw new Error(errorMessage);
            }

            // If email is valid, proceed with registration
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            // Automatically redirect to sign in after successful registration
            router.push('/auth/signin');
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const email = e.target.value;
        if (email) {
            validateEmail(email);
        }
    };

    return (
        <div className="min-h-screen flex items-center  w-full px-4 bg-[url('/bg1.jpg')] text-headertext">
            <Card className="w-full  bg-gray-100">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Register</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                required
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="Enter your email"
                                onBlur={handleEmailBlur}
                                className={emailError ? 'border-red-500' : ''}
                            />
                            {emailError && (
                                <div className="text-sm text-red-500">
                                    {emailError}
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                placeholder="Confirm your password"
                            />
                        </div>
                        {error && (
                            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                {error}
                            </div>
                        )}
                        <Button
                            type="submit"
                            className="w-full bg-green-400"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Loading...' : 'Register'}
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/auth/signin" className="text-green-600 hover:underline">
                            Login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}