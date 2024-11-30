'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Logo } from '@/app/components/Logo';
import { Alert, AlertDescription } from '@/components/ui/alert';
import RightBar from './RightBar';


import LeftBar from './LeftBar';

// Constants
const WELCOME_TIMEOUT = 5000;

// Preload components to prevent waterfall loading
const NavBar = dynamic(() => import('./Navbar'), { ssr: false });
const AIChatInterface = dynamic(() => import('./AIchatInterface'), { ssr: false });

// Types
interface AppLayoutProps {
    children: React.ReactNode;
}

interface WelcomePopupProps {
    greeting: string;
    onClose: () => void;
}

// Lightweight fallback components
const NavBarFallback = () => <div className="h-12 bg-green-700" />;
const ChatFallback = () => <div className="h-32" />;

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
                type="button"
            >
                <X className="h-4 w-4" />
            </button>
        </AlertDescription>
    </Alert>
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
        
        // Update greeting every minute
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
        <div className="min-h-screen flex flex-col bg-pink-100">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50">
                <div className="h-14">
                    <div className="max-w-screen-xl mx-auto h-full border-x-2 border-headers bg-headers shadow-md">
                        <div className="flex items-center justify-between h-full px-6">
                            <Link
                                href="/"
                                className="flex items-center space-x-4 group"
                                aria-label="Go to homepage"
                            >
                                <Logo />
                                <h1 className="text-xl font-bold uppercase bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
                                    Clevers Schools Academic Resources
                                </h1>
                            </Link>
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
            <main className="flex flex-col flex-1 pt-14 bg-pink-100 max-w-screen-xl mx-auto border-x-2 border-gray-400">
                {/* Navigation */}
                <nav className="w-full bg-white shadow-sm">
                    <Suspense fallback={<NavBarFallback />}>
                        <NavBar />
                    </Suspense>
                </nav>

                {/* Banner */}
                <div className="w-full bg-orange-50 shadow-sm">
                    <div className="h-16 mx-4 my-4 bg-gray-100 rounded shadow-inner" />
                </div>

                {/* Content Grid */}
                <div className="flex-1 p-4">
                    <div className="flex gap-4 h-full">
                        {/* Left Sidebar */}
                        <aside className="hidden md:block w-72 bg-purple-200 rounded shadow-sm">
                            <div className="h-full">
                                <LeftBar />
                            </div>
                        </aside>

                        {/* Main Content */}
                        <main className="flex-1 bg-purple-200 rounded shadow-sm overflow-hidden flex flex-col">
                            <div className="flex-1 overflow-y-auto px-6 py-4 overflow-x-hidden">
                                {children}
                            </div>
                            <div className="h-32 mt-auto">
                                <Suspense fallback={<ChatFallback />}>
                                    <AIChatInterface />
                                </Suspense>
                            </div>
                        </main>

                        {/* Right Sidebar */}
                        <aside className="hidden md:block w-72 bg-purple-200 rounded shadow-sm">
                            <div className="h-full ">
                               <RightBar/>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AppLayout;