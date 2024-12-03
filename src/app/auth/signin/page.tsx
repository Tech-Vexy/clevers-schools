'use client';

import { Suspense, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from "next/link";
import { Eye, EyeOff } from 'lucide-react';

// Separate component for the form to handle search params
function SignInForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Get the callbackUrl from query parameters, default to '/' if not provided
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                if (result.error === 'MAX_SESSIONS_REACHED') {
                    const errorParams = new URLSearchParams();
                    errorParams.set('type', 'MAX_SESSIONS_REACHED');
                    errorParams.set('callbackUrl', callbackUrl);
                    router.push(`/auth/error?${errorParams.toString()}`);
                    return;
                }
                if (['CredentialsSignin', 'AccessDenied'].includes(result.error)) {
                    const errorParams = new URLSearchParams();
                    errorParams.set('type', result.error);
                    errorParams.set('callbackUrl', callbackUrl);
                    router.push(`/auth/error?${errorParams.toString()}`);
                    return;
                }
                setError(result.error);
            } else {
                router.push(callbackUrl);
            }
        } catch {
            setError('An error occurred during sign-in');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
                <div className="text-red-500 text-center text-sm">
                    {error}
                </div>
            )}
            <div className="rounded-md shadow-sm space-y-4">
                <div>
                    <label htmlFor="email" className="sr-only">
                        Email address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="relative">
                    <label htmlFor="password" className="sr-only">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Sign in
                </button>
            </div>
            <div className="text-sm text-center">
                <Link
                    href="/auth/register"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                    Don&#39;t Have An Account? Sign up
                </Link>
            </div>
        </form>
    );
}


export default function SignIn() {
    return (
        <div className="min-h-screen h-full flex items-center w-full justify-center bg-gray-50">
            <div className=" w-full space-y-8 p-8 bg-white rounded-lg shadow">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <Suspense fallback={
                    <div className="text-center text-gray-500">
                        Loading...
                    </div>
                }>
                    <SignInForm />
                </Suspense>
            </div>
        </div>
    );
}