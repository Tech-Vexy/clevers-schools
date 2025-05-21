'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import LeftBar from './LeftBar';
import RightBar from './RightBar';
import SearchBar from './SearchBar';
import PaymentCheck from './PaymentCheck';
import Footer from './Footer';
// Preload components to prevent waterfall loading
const NavBar = dynamic(() => import('./Navbar'), { ssr: false });

// Types
interface AppLayoutProps {
    children: React.ReactNode;
}

// Lightweight fallback components
const NavBarFallback = () => <div className="h-12 bg-green-700" />;

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    // Get the current pathname
    const pathname = usePathname();
    
    // Check if current route is "/unpaid"
    const isUnpaidRoute = pathname === '/unpaid';
    
    // If we're on the unpaid route, render children without the layout
    if (isUnpaidRoute) {
        return <>{children}</>;
    }
    
    // Otherwise, render the full layout
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Main Layout */}
            <main className="flex flex-col flex-1 max-w-screen-xl mx-auto w-full px-4 md:px-6 lg:px-8 border-x border-gray-200">
                {/* Navigation */}
                <nav className="w-full bg-white shadow-sm sticky top-0 z-10">
                    <Suspense fallback={<NavBarFallback />}>
                        <NavBar />
                    </Suspense>
                </nav>

                {/* Banner */}
                <div className="w-full bg-orange-50 shadow-sm">
                    <div className="h-16 mx-4 my-4 bg-white rounded shadow-inner border border-gray-200" />
                </div>

                {/* Content Grid */}
                <div className="flex-1 py-4 w-full">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Left Sidebar */}
                        <aside className="hidden lg:block w-full lg:w-[25%] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="h-full">
                               <LeftBar/>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <main className="flex-1 w-full lg:w-[50%] rounded-lg bg-white shadow-sm overflow-hidden flex flex-col border border-gray-200">
                            <div className="bg-[#00a651] text-white p-3 font-bold border-b border-gray-200 sticky top-0 z-[5]">
                                KCSE REVISION EDUCATION MATERIALS
                            </div>
                            <div className='p-4 border-b border-gray-200'>
                                <div className='bg-[#00a651] border text-xl text-white p-2 rounded-t-md'>
                                    <h2>SEARCH WHAT YOU NEED HERE :-</h2>
                                </div>
                                <div className='bg-white border border-gray-200 border-t-0 p-3 rounded-b-md shadow-inner'>
                                    <SearchBar folderId=''/>
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto px-4 py-4 overflow-x-hidden">
                                {children}
                            </div>
                        </main>

                        {/* Right Sidebar */}
                        <aside className="hidden lg:block w-full lg:w-[25%] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="h-full">
                               <RightBar/>
                            </div>
                        </aside>
                    </div>
                </div>
                
                {/* Footer */}
                <Footer />
            </main>
        </div>
    );
};

export default AppLayout;