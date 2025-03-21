'use client';

import React, {  Suspense } from 'react';

import dynamic from 'next/dynamic';
import LeftBar from './LeftBar';
import RightBar from './RightBar';
import SearchBar from './SearchBar';




// Preload components to prevent waterfall loading
const NavBar = dynamic(() => import('./Navbar'), { ssr: false });

// Types
interface AppLayoutProps {
    children: React.ReactNode;
}



// Lightweight fallback components
const NavBarFallback = () => <div className="h-12 bg-green-700" />;

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {

       
    return (
        <div className="min-h-screen flex flex-col bg-pink-100">
            {/* Main Layout */}
            <main className="flex flex-col flex-1  bg-pink-100 max-w-screen-xl mx-auto border-x-2 border-gray-400 w-full">
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
                <div className="flex-1 p-4 max-w-screen-xl mx-auto w-full">
                    <div className="flex gap-4 h-full">
                        {/* Left Sidebar */}
                        <aside className="hidden md:block w-[26%] bg-red-200 rounded shadow-sm">
                            <div className="h-full">
                               <LeftBar/>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <main className="flex-1  w-[48%] rounded bg-gray-100 shadow-sm overflow-hidden flex flex-col">
                        <div className="bg-[#00a651] text-white p-2 font-bold">KCSE REVISION EDUCATION MATERIALS</div>
                            <div className=' p-4   '>
                                <div className='bg-[#00a651]  border-2 text-xl text-white'>
                                    <h2>SEARCH WHAT YOU NEED HERE :-</h2>
                                </div>
                               <div className='bg-fuchsia-100'>
                               <SearchBar folderId=''/>
                               </div>
                            </div>
                            <div className="flex-1 overflow-y-auto px-6 py-4  overflow-x-hidden">
                                {children}
                            </div>
                            
                        </main>

                        {/* Right Sidebar */}
                        <aside className="hidden md:block w-[26%] bg-red-200 rounded shadow-sm">
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
