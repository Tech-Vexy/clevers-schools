'use client';
import Link from 'next/link';
import React, {useState} from 'react';

export default function Home() {
     
    return (
        <> 
           <div className="p-4 border-b-2">
            <h2 className="text-red-600 text-xl font-bold">KCSE REVISION EDUCATION MATERIALS</h2>
            <div className="text-gray-700 font-bold mt-2 pb-4">REVISION EDUCATION MATERIALS</div>

            <ul className="list-disc pl-6 mt-4 space-y-3">
              <li>2025 FORM 2 3 4 REVISION RESOURCES</li>
              <li>2025 GRADE 7 8 9 CBC JUNIOR SEC. RESOURCES</li>
              <li>2025 GRADE 1 2 3 4 5 6 CBC RESOURCES</li>
              <li>2025 PP1 PP2 CBC RESOURCES</li>
              <li>PLAYGROUP/BABYCLASS</li>
            </ul>
            </div>
            <div>
            <h2 className="text-red-600 text-xl font-bold mt-6 border-b-2">
              A. HIGH SCHOOL RESOURCES - <span className="text-sm">Revision Education materials</span>
            </h2>

            <ol className="list-decimal pl-6 mt-4 space-y-2 pb-4">
              <li>
                <a href="#" className="text-blue-800 text-sm font-serif font-bold underline">
                  FORM 2 3 4 TERM 1 2 3 OPENER, MID AND END TERM EXAMS
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-800 text-sm font-serif font-bold underline">
                  1995-2025 KCSE KNEC PAPERS QUESTIONS ANSWERS AND REPORT
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-800 text-sm font-serif font-bold underline">
                  2008-2025 KCSE FORM 4 COUNTY MOCKS
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-800 text-sm font-serif font-bold underline">
                  FORM 2 3 4 SCHEMES OF WORK
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-800 text-sm font-serif font-bold underline">
                  FORM 2 3 4 LESSON PLANS
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-800 text-sm font-serif font-bold underline">
                  FORM 2 3 4 CLASS REVISION NOTES
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-800 text-sm font-serif font-bold underline">
                  FORM 2 3 4 TERM 1 2 3 HOLIDAY ASSIGNMENTS
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-800 text-sm font-serif font-bold underline">
                  FORM 3 4 SETBOOKS STUDY GUIDES
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-800 text-sm font-serif font-bold underline">
                  FORM 2 3 4 TOPICAL TESTS
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-800 text-sm font-serif font-bold underline">
                  FORM 2 3 4 REVISION BOOKLETS
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-800 text-sm font-serif font-bold underline">
                  LIFE SKILLS NOTES
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-800 text-sm font-serif font-bold underline">
                  FORM 2 3 4 SYLLABUS
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-800 text-sm font-serif font-bold underline">
                  KENYA SCHOOL CODES
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-800 text-sm font-serif font-bold underline">
                  HOW TO REVISE AND PASS EXAMS
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-800 text-sm font-serif font-bold underline">
                  GUIDANCE AND COUNSELLING NOTES
                </a>
              </li>
            </ol>

            <Link  href="/subscribe" className=" p-0 mt-6 text-blue-800 underline font-bold">
              GET UNLIMITED ACCESS NOW - ALL SECONDARY RESOURCES
            </Link>
            </div>
            <h2 className=" border-b-2 text-red-600 text-xl font-bold mt-6 pb-2">
              GRADE 7, 8 AND 9 JUNIOR SECONDARY RESOURCES
            </h2>
            <div className='text-normal font-light text-black border-b-2 pb-4'>
            GRADE 9 JUNIOR SECONDARY RESOURCES
            </div>
            <div className='border-b-2 pb-4'>
                <h2 className='text-normal font-light text-black '>
                GRADE 8 JUNIOR SECONDARY RESOURCES
                </h2>
                <ol className='list-decimal pl-6 mt-4 space-y-2'>
                    <li className='text-blue-800 underline font-bold text-sm font-serif'>
                        <Link href="#">GRADE 8 SCHEMES OF WORK</Link>
                    </li>
                    <li className='text-blue-800 underline font-bold text-sm font-serif'>
                    <Link href="#">GRADE 8 EXAMS</Link>
                    </li>
                    <li className='text-blue-800 underline font-bold text-sm font-serif'>
                    <Link href="#">GRADE 8 ASSIGNMENTS</Link>
                    </li>
                    <li className='text-blue-800 underline font-bold text-sm font-serif'>
                    <Link href="#">GRADE 8 NOTES </Link>
                    </li>
                    <li className='text-blue-800 underline font-bold text-sm font-serif'>
                    <Link href="#">GRADE 8 LESSON PLANS</Link>
                    </li>
                    <li className='text-blue-800 underline font-bold text-sm font-serif'>
                    <Link href="#">GRADE 8 CURRICULUM DESIGNS</Link>
                    </li>
                    <li className='text-blue-800 underline font-bold text-sm font-serif'>
                    <Link href="#">GRADE 8 ASSESSMENT AND SCORESHEET</Link>
                    </li>
                    <li className='text-blue-800 underline font-bold text-sm font-serif'>
                    <Link href="#">GRADE 8 TERM 1 2 3 OPENER MID END EXAMS</Link>
                    </li>
                    <li className='text-blue-800 underline font-bold text-sm font-serif'>
                    <Link href="#">2024 GRADE 8 TERM 1 2 3 SCHEMES OF WORK</Link>
                    </li>
                </ol>
            </div>
            <div className='border-b-2 pb-4'>
            <h2 className='text-normal font-light text-black '>
                GRADE 7 JUNIOR SECONDARY RESOURCES
                </h2>
                <ol className='list-decimal pl-6 mt-4 space-y-2'>
                <li className='text-blue-800 underline font-bold text-sm font-serif'>
                    <Link href="#">GRADE 7 SCHEMES OF WORK</Link>
                    </li>
                    <li className='text-blue-800 underline font-bold text-sm font-serif'>
                    <Link href="#">GRADE 7 EXAMS</Link>
                    </li>
                    <li className='text-blue-800 underline font-bold text-sm font-serif'>
                    <Link href="#">2024 GRADE 7 JSS ASSIGNMENTS TERM 1 2 3</Link>
                    </li>
                    <li className='text-blue-800 underline font-bold text-sm font-serif'>
                    <Link href="#">GRADE 7 NOTES</Link>
                    </li>
                    <li className='text-blue-800 underline font-bold text-sm font-serif'>
                    <Link href="#">GRADE 7 LESSON PLANS</Link>
                    </li>
                    <li className='text-blue-800 underline font-bold text-sm font-serif'>
                    <Link href="#">GRADE 7 CURRICULUM DESIGNS</Link>
                    </li>
                    <li className='text-blue-800 underline font-bold text-sm font-serif'>
                    <Link href="#">GRADE 7 ASSESSMENT AND SCORESHEET</Link>
                    </li>

                </ol>

            </div>
            <h2 className="text-red-600 text-xl font-bold mt-6 border-b-2 pb-4">
            GRADE  1 2 3 4 5 6 CBC RESOURCES
            </h2>
            <div className='border-b-2 pb-4'>
            <h2 className='text-normal font-light text-black '>
            GRADE 6 CBC REVISION RESOURCES
            </h2>
            <ol className='list-decimal pl-6 mt-4 space-y-2'>
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                <Link href="#">GRADE 6 SCHEMES OF WORK</Link>
            </li>
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                <Link href="#">GRADE 6 EXAMS EXAMS</Link>
            </li>
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 6 ASSIGNMENTS</Link>
            </li>
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 6 NOTES </Link>
            </li>
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 6 LESSON PLANS</Link>
            </li>
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 6 CURRICULUM DESIGNS</Link>
            </li>

            </ol>
            </div>
            <div className='border-b-2 pb-4'>
            <h2 className='text-normal font-light text-black '>
            GRADE 5 CBC REVISION RESOURCES
            </h2>
            <ol className='list-decimal pl-6 mt-4 space-y-2'>
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 5 SCHEMES OF WORK</Link>
            </li>
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 5 EXAMS EXAMS</Link>
            </li>
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 5 ASSIGNMENTS</Link>
            </li>
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 5 NOTES </Link>
            </li>
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 5 LESSON PLANS</Link>
            </li>
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 5 CURRICULUM DESIGNS</Link>
            </li>
            </ol>
            </div>
            <div className='border-b-2 pb-4'>
            <h2 className='text-normal font-light text-black '>
            GRADE 4 CBC REVISION RESOURCES
            </h2>
            <ol className='list-decimal pl-6 mt-4 space-y-2'>
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 4 SCHEMES OF WORK</Link>
            </li> 
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 4 EXAMS EXAMS</Link>
            </li> 
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 4 ASSIGNMENTS</Link>
            </li> 
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 4 NOTES </Link>
            </li> 
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 4 LESSON PLANS</Link>
            </li> 
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 4 CURRICULUM DESIGNS</Link>
            </li> 
            </ol>
            </div>
            <div className='border-b-2 pb-4'>
            <h2 className='text-normal font-light text-black '>
            GRADE 3 CBC REVISION RESOURCES
            </h2>
            <ol className='list-decimal pl-6 mt-4 space-y-2'>
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 3 SCHEMES OF WORK</Link>
            </li> 
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 3 EXAMS EXAMS</Link>
            </li> 
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 3 ASSIGNMENTS</Link>
            </li> 
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 3 NOTES </Link>
            </li> 
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 3 LESSON PLANS</Link>
            </li> 
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 3 CURRICULUM DESIGNS</Link>
            </li> 
            </ol>
            </div>
            <div className='border-b-2 pb-4'>
            <h2 className='text-normal font-light text-black '>
            GRADE 2 CBC REVISION RESOURCES
            </h2>
            <ol className='list-decimal pl-6 mt-4 space-y-2'>
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 2 SCHEMES OF WORK</Link>
            </li> 
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 2 EXAMS EXAMS</Link>
            </li> 
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 2 ASSIGNMENTS</Link>
            </li> 
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 2 NOTES </Link>
            </li> 
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 2 LESSON PLANS</Link>
            </li> 
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 2 CURRICULUM DESIGNS</Link>
            </li> 
            </ol>
            </div>
            <div className='border-b-2 pb-4'>
            <h2 className='text-normal font-light text-black '>
            GRADE 1 CBC REVISION RESOURCES
            </h2>
            <ol className='list-decimal pl-6 mt-4 space-y-2'>
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 1 SCHEMES OF WORK</Link>
            </li> 
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 1 EXAMS EXAMS</Link>
            </li> 
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 1 ASSIGNMENTS</Link>
            </li> 
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 1 NOTES </Link>
            </li> 
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 1 LESSON PLANS</Link>
            </li> 
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">GRADE 1 CURRICULUM DESIGNS</Link>
            </li> 
            </ol>
            </div>
            <div className='pb-4 border-b-2 '>
            <h2 className='text-xl font-bold mt-6  text-black underline'>
            PRE-PRIMARY 1 2- REVISION RESOURCES + PLAYGROUP 
            </h2>
            <span className='text-x-sm font-light '>REVISION EDUCATION MATERIALS</span>
            </div>
            <div className='border-b-2 pb-4'>
            <ul className='list-bullets space-y-2'>
            <li className='text-blue-800 underline font-semibold text-sm font-serif'>
                 <Link href="#">Pre-primary 1 And 2  KICD Approved syllabus </Link>
            </li>
            <li className='text-blue-800 underline font-semibold text-sm font-serif'>
                 <Link href="#">C.B.C 2025 TERM 1 2 3 Pre-primary 1 Schemes of work </Link>
            </li>
            <li className='text-blue-800 underline font-semibold text-sm font-serif'>
                 <Link href="#">2025 TERM 1 2 3 Pre-primary 2 Schemes of work</Link>
            </li>
            <li className='text-blue-800 underline font-semibold text-sm font-serif'>
                 <Link href="#">Pre-primary 1 NOTES</Link>
            </li>
            <li className='text-blue-800 underline font-semibold text-sm font-serif'>
                 <Link href="#">P.P 2 NOTES </Link>
            </li>
            <li className='text-blue-800 underline font-bold text-sm font-serif'>
                 <Link href="#">2025 PP1, PP2 TERM 1,2,3 MID/END TERM EXAMS QUE AND ANSWERS </Link>
            </li>
            <li className='text-black'>
                 And <Link className='text-blue-800 underline font-bold text-sm font-serif' href="#">K.I.C.D. Competency Based Curriculum Design Materials</Link>
            </li>
            <li className='text-black underline font-bold text-sm font-serif'>
                <Link href="">PP12 CBC ASSESSMENT TOOLS- ASSESSMENT BOOK TEMPLATE</Link>
            </li>
            <li className='text-black underline font-bold text-sm font-serif'>
                <Link href="">PP 1,2 CBC ASSESSMENT TOOLS- RECORD OF WORK TEMPLATE</Link>
            </li>
            <li className='text-black underline font-bold text-sm font-serif'>
                <Link href="">PP 1&2 CBC ASSESSMENT TOOLS- REPORT CARD TEMPLATE</Link>
            </li>
            <li className='text-black underline font-bold text-sm font-serif'>
                <Link href="">SCHOOL YEAR REPORT FOR EARLY YEARS OF EDUCATION</Link>
            </li>
            <li className='text-black underline font-bold text-sm font-serif'>
                <Link href="">CBC ASSESSMENT RUBRIC</Link>
            </li>
            </ul>
           
            </div>
            <Link href="/subscribe" className='text-blue-800 pl-12 text-center underline font-bold text-xl pb-2'>GET UNLIMITED ACCESS NOW</Link>
    
        </>  
    );
}