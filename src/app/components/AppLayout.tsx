'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, Bell } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from './Navbar';
import NavProfile from '@/app/profile/page';
import AIChatInterface from './AIchatInterface';
import { Logo } from '@/app/components/Logo';
import { NextSeo } from 'next-seo';

interface AppLayoutProps {
    children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
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
        }, 60000); // Update greeting every minute

        return () => clearInterval(interval);
    }, [getGreeting]);

    // Hide welcome banner after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsWelcomeVisible(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleResize = useCallback(() => {
        if (window.innerWidth >= 768) {
            setIsMobileNavOpen(false);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.body.style.overflow = isMobileNavOpen ? 'hidden' : '';
            return () => {
                document.body.style.overflow = '';
            };
        }
    }, [isMobileNavOpen]);

    const toggleMobileNav = useCallback(() => {
        setIsMobileNavOpen((prev) => !prev);
    }, []);

    const handleOverlayClick = useCallback(() => {
        setIsMobileNavOpen(false);
    }, []);

    return (
        <>
        <NextSeo
        title="Home Page"
        description="Welcome to our website"
        openGraph={{
          images: [
            {
              url: 'https://schoolresources.clevers.co.ke/image.png',
              width: 1200,
              height: 630,
              alt: 'Clevers Schools Logo',
            },
          ],
        }}
      />
        <div className="min-h-screen flex flex-col">
            {/* Animated Welcome Banner */}
            <div
                className={`
          bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2
          transform transition-all duration-1000 ease-in-out
          ${isWelcomeVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
        `}
            >
                <p className="text-sm md:text-base font-medium animate-pulse">
                    {greeting}! Welcome to Clevers School Academic Resources Hub
                </p>
            </div>

            <header className="bg-headers text-headertext p-4 shadow-md fixed top-0 left-0 right-0 z-50">
                <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
                    <div className="flex items-center space-x-4">
                        <button
                            type="button"
                            onClick={toggleMobileNav}
                            className="md:hidden p-1 hover:bg-pink-800 rounded-lg transition-colors duration-200"
                            aria-label="Toggle mobile menu"
                            aria-expanded={isMobileNavOpen}
                        >
                            {isMobileNavOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                        <Link href="/" className="flex items-center space-x-4 group">
                            <Logo/>
                            <h1 className="text-2xl font-bold uppercase bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
                                Clevers Schools Academic Resources
                            </h1>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-6">
                        <button
                            type="button"
                            className="hover:text-opacity-80 transition-colors relative group"
                            aria-label="Notifications"
                        >
                            <Bell className="h-6 w-6" />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-pulse">

              </span>
                            <span className="absolute -bottom-8 right-0 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Notifications
              </span>
                        </button>
                        <NavProfile />
                    </div>
                </div>
            </header>

            <div className="flex flex-1 relative mt-20 mb-24">
                <aside className="hidden md:block fixed left-0 top-20 bottom-0 overflow-y-auto overflow-x-hidden w-64 pb-0">
                    <Navbar />
                </aside>

                {isMobileNavOpen && (
                    <div
                        role="presentation"
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                        onClick={handleOverlayClick}
                    />
                )}

                <div
                    className={`
            fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden
            ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
                    aria-label="Mobile navigation"
                >
                    <div className="overflow-y-auto">
                        <Navbar />
                    </div>
                </div>

                <main className="flex-1 overflow-y-auto bg-amber-200 overflow-x-hidden">
                    <div className="max-w-screen-xl mx-auto pl-0 pr-0 mr-0">
                        {children}
                    </div>
                    <AIChatInterface />
                </main>
            </div>
        </div>
        </>
    );
};

export default AppLayout;