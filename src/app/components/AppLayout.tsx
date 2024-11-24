'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Bell, X } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Logo } from '@/app/components/Logo';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Login from "@/app/components/Login";

// Dynamic imports for better performance
const NavProfile = dynamic(() => import('@/app/profile/page'), {
    loading: () => <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
});

const NavBar = dynamic(() => import('./Navbar'), {
    loading: () => <div className="h-12 bg-gray-100 animate-pulse" />
});

const AIChatInterface = dynamic(() => import('./AIchatInterface'), {
    loading: () => <div className="w-full h-32 bg-gray-100 animate-pulse" />
});

// Types
interface AppLayoutProps {
    children: React.ReactNode;
}

interface WelcomePopupProps {
    greeting: string;
    onClose: () => void;
}

// Constants
const WELCOME_TIMEOUT = 5000;

// Components
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

const NotificationBell: React.FC = () => (
    <button
        type="button"
        className="hover:text-opacity-80 transition-colors relative group"
        aria-label="Notifications"
    >
        <Bell className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
            3
        </span>
        <span className="absolute -bottom-8 right-0 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Notifications
        </span>
    </button>
);

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
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
        }, 60000); // Update every minute

        return () => clearInterval(interval);
    }, [getGreeting]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsWelcomeVisible(false);
        }, WELCOME_TIMEOUT);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Header - Reduced height */}
            <header className="fixed top-0 left-0 right-0 bg-headers text-headertext h-14 shadow-md z-50">
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
                    <div className="flex items-center space-x-6">
                        <NotificationBell/>
                        <NavProfile/>
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

            {/* Main Layout - Adjusted for full window coverage */}
            <main className="flex flex-col flex-1 pt-14 bg-gray-300">
                {/* Navigation Container - Slim design */}
                <div className="w-full bg-white shadow-sm">
                    <div className="w-full px-6 bg-gray-300">
                        <NavBar/>
                    </div>
                </div>

                {/* Content Container - Three column layout */}
                <div className="flex-1 w-full px-6">
                    <div className="h-full">
                        <div className="flex h-full gap-4">
                            {/* Left Sidebar */}
                            <div className="w-64 bg-white rounded-lg shadow-sm p-4">
                                {/*<LeftSidebar/>*/}
                            </div>

                            {/* Center Content Area */}
                            <div className="flex-1">
                                <div className="flex flex-col h-full">
                                    {/* Main Content Area - Maximized space */}
                                    <div className="flex-1 overflow-hidden bg-white rounded-lg shadow-sm px-6 py-4">
                                        {children}
                                    </div>
                                    {/* Chat Interface - Fixed height */}
                                    <div className="h-32 mt-4">
                                        <AIChatInterface/>
                                    </div>
                                </div>
                            </div>

                            {/* Right Sidebar */}
                            <div className="w-64 bg-white rounded-lg shadow-sm p-4">
                                {/*<RightSidebar/>*/}
                                <Login/>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AppLayout;