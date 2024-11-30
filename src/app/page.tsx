'use client';
import React from 'react';
import IGCSESection from './igcse/page';
import CollegeSection from './college/page';
import SecondarySchoolResources from './secondary/page';
import KCSESection from './kcse/page';
import ScrollButtons from './components/ScrollButtons';
import Grade78Resources from './grade78Resources/page';
import Grade1to6ResourcesLayout from './grade1to6Resources/page';
import ThesisResearchSection from './research/page';
import WeeklyQuizzesNavigation from './quizes/page';
import PrePrimary from './pre-primary/page';

export default function Home() {
    return (
        <>
            <main className="min-h-screen ">
                <div className='container mx-auto px-0 py-8 border-b-2 '>
                    <h1 className='text-3xl font-bold text-center text-gray-950'>IGCSE CURRICULUM RESOURCES</h1>
                    <IGCSESection />
                </div>
                <div className='container mx-auto px-4 py-8 border-b-2 '>
                    <h1 className='text-3xl font-bold text-center text-gray-950'>
                        KCSE PAST PAPERS FROM 2008
                    </h1>
                    <KCSESection/>
                </div>
                <div className='container mx-auto px-4 py-8 border-b-2 '>
                    <h1 className='text-3xl font-bold text-center text-gray-950'>
                        PRE-PRIMARY SCHOOL RESOURCES
                    </h1>
                    <PrePrimary/>
                </div>
                <div className='container mx-auto px-4 py-8 border-b-2 '>
                    <h1 className='text-3xl font-bold text-center text-gray-950'>
                        GRADE 1 TO 6 RESOURCES
                    </h1>
                    <Grade1to6ResourcesLayout/>
                </div>
                <div className='container mx-auto px-4 py-8 border-b-2'>
                    <h1 className='text-3xl font-bold text-center text-gray-950'>
                        GRADE 7 AND GRADE 8 RESOURCES
                    </h1>
                    <Grade78Resources/>

                </div>

                <div className='container mx-auto px-4 py-8 border-b-2 '>
                    <h1 className='text-3xl font-bold text-center text-gray-950'>
                       FORM 1 2 3 4 RESOURCES
                    </h1>
                    <SecondarySchoolResources/>

                </div>
                <div className='container mx-auto px-4 py-8 border-b-2'>
                    <h1 className='text-3xl font-bold text-center text-gray-950'>
                        COLLEGE RESOURCES
                    </h1>
                    <CollegeSection/>
                </div>
               
                <div className='container mx-auto px-4 py-8 border-b-2'>
                    <h1 className='text-3xl font-bold text-center text-gray-950'>
                        THESIS AND RESEARCH
                    </h1>
                    <ThesisResearchSection/>
                </div>
                <div className='container mx-auto px-4 py-8 border-b-2'>
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