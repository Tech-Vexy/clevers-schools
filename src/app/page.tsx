'use client';
import React from 'react';
import JuniorSecondarySubjects from '@/app/junior/page';
import SeniorSecondarySubjects from '@/app/senior/page';
import IGCSESection from './igcse/page';
import CollegeSection from './college/page';
import UniversityResources from './university/page';
import KCSESection from './kcse/page';
import ScrollButtons from './components/ScrollButtons';
import BooksAndNovels from './books/page';
import ThesisResearchSection from './research/page';
import WeeklyQuizzesNavigation from './quizes/page';
import PrePrimarySection from './pre-primary/page';
import ElementarySchoolSection from './elementary/page';
export default function SecondarySchoolPage() {
    return (
        <>
            <main className="min-h-screen bg-gray-50">
                <div className='container mx-auto px-0 py-8 border-2 '>
                    <h1 className='text-3xl font-bold text-center text-gray-950'>IGCSE CURRICULUM RESOURCES</h1>
                    <IGCSESection />
                </div>
                <div className='container mx-auto px-4 py-8 border-2 bg-fuchsia-400'>
                    <h1 className='text-3xl font-bold text-center text-gray-950'>
                        KCSE PAST PAPERS FROM 2018 TO 2023
                    </h1>
                    <KCSESection/>
                </div>
                <div className='container mx-auto px-4 py-8 border-2 bg-chart-1'>
                    <h1 className='text-3xl font-bold text-center text-gray-950'>
                        PRE-PRIMARY SCHOOL RESOURCES
                    </h1>
                    <PrePrimarySection/>
                </div>
                <div className='container mx-auto px-4 py-8 border-2 bg-slate-200'>
                    <h1 className='text-3xl font-bold text-center text-gray-950'>
                        ELEMENTARY SCHOOL RESOURCES
                    </h1>
                    <ElementarySchoolSection/>
                </div>
                <div className='container mx-auto px-4 py-8 border-2 bg-amber-200'>
                    <h1 className='text-3xl font-bold text-center text-gray-950'>
                        JUNIOR SECONDARY SCHOOL RESOURCES
                    </h1>
                    <JuniorSecondarySubjects/>

                </div>

                <div className='container mx-auto px-4 py-8 border-2 bg-emerald-500'>
                    <h1 className='text-3xl font-bold text-center text-gray-950'>
                        SENIOR SECONDARY SCHOOL RESOURCES
                    </h1>
                    <SeniorSecondarySubjects/>

                </div>
                <div className='container mx-auto px-4 py-8 border-2 bg-indigo-400'>
                    <h1 className='text-3xl font-bold text-center text-gray-950'>
                        COLLEGE RESOURCES
                    </h1>
                    <CollegeSection/>
                </div>
                <div className='container mx-auto px-4 py-8 border-2 bg-pink-300'>
                    <h1 className='text-3xl font-bold text-center text-gray-950'>
                        UNIVERSITY RESOURCES
                    </h1>
                    <UniversityResources/>
                </div>
                <div className='container mx-auto px-4 py-8 border-2 bg-homeback'>
                    <h1 className='text-3xl font-bold text-center text-gray-950'>
                        BOOKS AND NOVELS
                    </h1>
                    <BooksAndNovels/>
                </div>
                <div className='container mx-auto px-4 py-8 border-2 bg-stone-700'>
                    <h1 className='text-3xl font-bold text-center text-gray-950'>
                        THESIS AND RESEARCH
                    </h1>
                    <ThesisResearchSection/>
                </div>
                <div className='container mx-auto px-4 py-8 border-2 bg-rose-400'>
                    <h1 className='text-3xl font-bold text-center text-gray-950'>
                        WEEKLY QUIZES
                    </h1>
                    <WeeklyQuizzesNavigation/>
                </div>

                <ScrollButtons/>

            </main>
        </>
    );
}