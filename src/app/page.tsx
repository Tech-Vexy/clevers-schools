'use client';
import React from 'react';
import IGCSESection from './igcse/page';
import CollegeSection from './college/page';
import SecondarySchoolResources from './secondary/page';
import KCSEPastPapers from './kcse/page';
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
                <div className='container mx-auto p-4 border-b-2 border-black'>
                    <IGCSESection />
                </div>
                <div className='container mx-auto p-4 border-b-2 border-black'>
                    
                    <KCSEPastPapers/>
                </div>
                <div className='container mx-auto p-4 border-b-2  border-black'>
                   
                    <PrePrimary/>
                </div>
                <div className='container mx-auto p-4 border-b-2 border-black'>
                    
                    <Grade1to6ResourcesLayout/>
                </div>
                <div className='container mx-auto p-4 border-b-2 border-black'>
                    
                    <Grade78Resources/>

                </div>

                <div className='container mx-auto p-4 border-b-2 border-black '>
                    
                    <SecondarySchoolResources/>

                </div>
                <div className='container mx-auto p-4 border-b-2 border-black'>
                    
                    <CollegeSection/>
                </div>
               
                <div className='container mx-auto p-4 border-b-2 border-black'>
                    
                    <ThesisResearchSection/>
                </div>
                <div className='container mx-auto p-4 border-b-2 border-black'>
                    
                    <WeeklyQuizzesNavigation/>
                </div>

                <ScrollButtons/>

            </main>
        </>
    );
}