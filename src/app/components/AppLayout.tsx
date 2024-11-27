'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Logo } from '@/app/components/Logo';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Login from "@/app/components/Login";
import { useSession } from 'next-auth/react';

const NavBar = dynamic(() => import('./Navbar'), {
    loading: () => <div className="h-12 bg-gray-100 animate-pulse" />
});

const AIChatInterface = dynamic(() => import('./AIchatInterface'), {
    loading: () => <div className="w-full h-32 bg-gray-100 animate-pulse" />
});

const Profile = dynamic(() => import('@/app/profile/page'), {
    loading: () => <div className="animate-pulse bg-gray-200 rounded-lg p-4">Loading profile...</div>
});

const LeftSideBar = dynamic( () => import('./LeftSideBar'), {
    loading: () => <div className='w-full h-32 bg-gray-100 animate-pulse'/>
})
interface AppLayoutProps {
    children: React.ReactNode;
}

interface WelcomePopupProps {
    greeting: string;
    onClose: () => void;
}

const WELCOME_TIMEOUT = 5000;

const WelcomePopup: React.FC<WelcomePopupProps> = ({ greeting, onClose }) => (
    <Alert className="fixed top-16 right-4 z-50 animate-fade-in-down max-w-md bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <AlertDescription className="flex justify-between items-center">
            <span className="text-sm md:text-base font-medium">
                {greeting}! Welcome to Clevers School Academic Resources Hub
            </span>
            <button
                onClick={onClose}
                className="ml-4 text-white hover:text-gray-200 transition-colors"
                aria-label="Close welcome message"
            >
                <X className="h-4 w-4" />
            </button>
        </AlertDescription>
    </Alert>
);

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    const { data: session, status } = useSession();
    const [greeting, setGreeting] = useState('');
    const [isWelcomeVisible, setIsWelcomeVisible] = useState(true);

    const getGreeting = useCallback(() => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    }, []);

    useEffect(() => {
        setGreeting(getGreeting());
        const interval = setInterval(() => {
            setGreeting(getGreeting());
        }, 60000);

        return () => clearInterval(interval);
    }, [getGreeting]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsWelcomeVisible(false);
        }, WELCOME_TIMEOUT);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-pink-100 border-x-2 border-solid ">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50">
                <div className="h-14">
                    <div className="max-w-screen-xl mx-auto h-full border-x-2 border-solid border-headers bg-headers shadow-md">
                        <div className="flex items-center justify-between h-full px-6">
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/"
                                    className="flex items-center space-x-4 group"
                                    aria-label="Go to homepage"
                                >
                                    <Logo/>
                                    <h1 className="text-xl font-bold uppercase bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
                                        Clevers Schools Academic Resources
                                    </h1>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Welcome Popup */}
            {isWelcomeVisible && (
                <WelcomePopup
                    greeting={greeting}
                    onClose={() => setIsWelcomeVisible(false)}
                />
            )}

            {/* Main Layout */}
            <main className="flex flex-col flex-1 pt-14 bg-pink-100 max-w-screen-xl mx-auto border-x-2 border-solid border-gray-400">
                {/* Navigation Container */}
                <div className="w-full bg-white shadow-sm">
                    <div className="w-full px-0">
                        <NavBar/>
                    </div>
                </div>

                {/* Empty Box */}
                <div className="w-full h-24 bg-orange-50 shadow-sm mt-0 mb-0 mx-auto">
                    <div className="h-16 mx-4 my-4 bg-gray-100 rounded-none shadow-inner">
                    </div>
                </div>

                {/* Content Container with Responsive Layout */}
                <div className="flex-1 w-full px-0 mt-0 ">
                    <div className="h-full">
                        <div className="flex h-full gap-4">
                            {/* Left Sidebar - Hidden on mobile */}
                            <div className="hidden md:block w-64 bg-white rounded-none shadow-sm p-8 mt-4 ml-4 mb-4">
                                <LeftSideBar/>
                            </div>

                            {/* Center Content Area - Full width on mobile */}
                            <div className="flex-1 md:w-[800px] bg-gray-100 rounded-none W-800px shadow-sm mt-4 mb-4 mx-4 md:mx-0">
                                <div className="flex flex-col h-full">
                                    {/* Main Content Area */}
                                    <div className="flex-1 overflow-y-auto px-6 py-4 overflow-x-hidden bg-">
                                        {children}
                                    </div>
                                    {/* Chat Interface */}
                                    <div className="h-32 mt-auto">
                                        <AIChatInterface/>
                                    </div>
                                </div>
                            </div>

                            {/* Right Sidebar - Hidden on mobile */}
                            <div className="hidden md:block w-64 bg-white rounded-none shadow-sm mt-4 mr-4 p-4 mb-4">
                                {status === 'loading' ? (
                                    <div className="animate-pulse bg-gray-200 rounded-lg p-4">
                                        Loading...
                                    </div>
                                ) : session?.user ? (
                                    <Profile />
                                ) : (
                                    <Login />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AppLayout;