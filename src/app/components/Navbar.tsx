'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

// Type definitions
interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

interface NavSectionProps {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}

interface YearListProps {
    baseUrl: string;
}

// Reusable link component for consistent styling
const NavLink: React.FC<NavLinkProps> = ({ href, children, className = '' }) => (
    <Link
        href={href}
        className={`w-full font-semibold text-lg transition-colors duration-200 hover:bg-pink-800 hover:text-opacity-80 p-3 rounded block ${className}`}
    >
        {children}
    </Link>
);

// Component for undergraduate year links
const YearList: React.FC<YearListProps> = ({ baseUrl }) => {
    return (
        <div className="pl-4 bg-opacity-50 bg-pink-900 rounded-lg my-1">
            {['Year 1', 'Year 2', 'Year 3', 'Year 4'].map((year) => (
                <Link
                    key={year}
                    href={`${baseUrl}/${year.toLowerCase().replace(/ /g, '-')}`}
                    className="block text-sm font-medium p-2 hover:bg-pink-800 hover:text-opacity-80 rounded transition-colors duration-200"
                >
                    {year}
                </Link>
            ))}
        </div>
    );
};

const NavSection: React.FC<NavSectionProps> = ({ title, children, isOpen, onToggle }) => {
    return (
        <div className="w-full relative">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between font-semibold text-lg p-3 transition-colors duration-200 hover:bg-pink-800 hover:text-opacity-80 rounded"
            >
                <span>{title}</span>
                {isOpen ?
                    <ChevronUp className="w-5 h-5 ml-2" /> :
                    <ChevronDown className="w-5 h-5 ml-2" />
                }
            </button>
            {isOpen && children && (
                <div className="w-full bg-navbar border border-violet-900 rounded-lg mt-1 shadow-lg overflow-hidden">
                    <div className="py-1">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

const Navbar: React.FC = () => {
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
    const [openUndergrad, setOpenUndergrad] = useState(false);

    const toggleSection = (section: string) => {
        setOpenSections(prev => {
            const newState: Record<string, boolean> = {};
            if (!prev[section]) {
                newState[section] = true;
            }
            return newState;
        });
    };

    const toggleUndergrad = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setOpenUndergrad(prev => !prev);
    };

    return (
        <nav className="bg-navbar text-white w-64 p-4 flex flex-col gap-2 shadow-xl">
            {/* Static Links */}
            <div className="mb-4">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/subscribe" className="text-pink-300">GET ACCESS</NavLink>
            </div>

            {/* KCSE Past Papers Section */}
            <NavSection
                title="KCSE PAST PAPERS"
                isOpen={openSections.kcsePapers}
                onToggle={() => toggleSection('kcsePapers')}
            >
                <div className="pl-4 bg-opacity-50 bg-pink-900 rounded-lg my-1">
                    {[2023, 2022, 2021, 2020, 2019, 2018].map((year) => (
                        <Link
                            key={year}
                            href={`/kcse/${year}`}
                            className="block text-sm font-medium p-2 hover:bg-pink-800 hover:text-opacity-80 rounded transition-colors duration-200"
                        >
                            {year} Past Papers
                        </Link>
                    ))}
                </div>
            </NavSection>

            {/* Academic Sections */}
            <NavSection
                title="IGCSE SECTION"
                isOpen={openSections.igcse}
                onToggle={() => toggleSection('igcse')}
            >
                <NavLink href="/igcse/cambridge">Cambridge</NavLink>
                <NavLink href="/igcse/edexcel">Edexcel</NavLink>
            </NavSection>

            <NavSection
                title="PRE-PRIMARY SECTION"
                isOpen={openSections.prePrimary}
                onToggle={() => toggleSection('prePrimary')}
            >
                <NavLink href="/pre-primary/schemes">Schemes of Work</NavLink>
                <NavLink href="/pre-primary/teaching-aids">Teaching Aids</NavLink>
                <NavLink href="/pre-primary/pp1">PP1 Exams</NavLink>
                <NavLink href="/pre-primary/pp2">PP2 Exams</NavLink>
            </NavSection>

            <NavSection
                title="ELEMENTARY SCHOOL"
                isOpen={openSections.elementary}
                onToggle={() => toggleSection('elementary')}
            >
                <div className="pl-4 bg-opacity-50 bg-pink-900 rounded-lg my-1">
                    {['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'].map((grade) => (
                        <Link
                            key={grade}
                            href={`/elementary/${grade.toLowerCase().replace(/ /g, '-')}`}
                            className="block text-sm font-medium p-2 hover:bg-pink-800 hover:text-opacity-80 rounded transition-colors duration-200"
                        >
                            {grade}
                        </Link>
                    ))}
                </div>
            </NavSection>

            <NavSection
                title="JUNIOR SECONDARY SECTION"
                isOpen={openSections.juniorSec}
                onToggle={() => toggleSection('juniorSec')}
            >
                <div className="pl-4 bg-opacity-50 bg-pink-900 rounded-lg my-1">
                    {['Grade 6', 'Grade 7', 'Grade 8'].map((grade) => (
                        <Link
                            key={grade}
                            href={`/junior/${grade.toLowerCase().replace(/ /g, '-')}`}
                            className="block text-sm font-medium p-2 hover:bg-pink-800 hover:text-opacity-80 rounded transition-colors duration-200"
                        >
                            {grade}
                        </Link>
                    ))}
                </div>
            </NavSection>

            <NavSection
                title="SENIOR SECONDARY SECTION"
                isOpen={openSections.seniorSec}
                onToggle={() => toggleSection('seniorSec')}
            >
                <div className="pl-4 bg-opacity-50 bg-pink-900 rounded-lg my-1">
                    {['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map((grade) => (
                        <Link
                            key={grade}
                            href={`/senior/${grade.toLowerCase().replace(/ /g, '-')}`}
                            className="block text-sm font-medium p-2 hover:bg-pink-800 hover:text-opacity-80 rounded transition-colors duration-200"
                        >
                            {grade}
                        </Link>
                    ))}
                </div>
            </NavSection>

            <NavSection
                title="COLLEGE SECTION"
                isOpen={openSections.college}
                onToggle={() => toggleSection('college')}
            >
                <NavLink href="/college/year-1">First Year</NavLink>
                <NavLink href="/college/year-2">Second Year</NavLink>
                <NavLink href="/college/year-3">Third Year</NavLink>
            </NavSection>

            <NavSection
                title="UNIVERSITY SECTION"
                isOpen={openSections.university}
                onToggle={() => toggleSection('university')}
            >
                <div>
                    <div
                        onClick={toggleUndergrad}
                        className="flex items-center justify-between p-3 hover:bg-pink-800 hover:text-opacity-80 cursor-pointer rounded"
                    >
                        <span className='font-semibold text-xl'>Undergraduate</span>
                        {openUndergrad ?
                            <ChevronUp className="w-4 h-4" /> :
                            <ChevronDown className="w-4 h-4" />
                        }
                    </div>
                    {openUndergrad && <YearList baseUrl="/university/undergraduate" />}
                </div>
                <NavLink href="/university/postgraduate">Postgraduate</NavLink>
                <NavLink href="/university/doctorate">Doctorate</NavLink>
            </NavSection>

            <NavSection
                title="BOOKS & NOVELS"
                isOpen={openSections.books}
                onToggle={() => toggleSection('books')}
            >
                <NavLink href="/books/fiction">Fiction</NavLink>
                <NavLink href="/books/non-fiction">Non-Fiction</NavLink>
                <NavLink href="/books/textbooks">Textbooks</NavLink>
                <NavLink href="/books/reference">Reference Books</NavLink>
                <NavLink href="/books/setbooks">Setbook Guides</NavLink>
            </NavSection>

            <NavSection
                title="THESIS & RESEARCH"
                isOpen={openSections.research}
                onToggle={() => toggleSection('research')}
            >
                <NavLink href="/research/thesis">Thesis</NavLink>
                <NavLink href="/research/essays">Essays</NavLink>
                <NavLink href="/research/papers">Research Papers</NavLink>
                <NavLink href="/research/abstracts">Abstracts</NavLink>
            </NavSection>

            <NavSection
                title="WEEKLY QUIZES"
                isOpen={openSections.quizes}
                onToggle={() => toggleSection('quizes')}
            >
                <NavLink href="/quizes/igcse">IGCSE</NavLink>
                <NavLink href="/quizes/elementary">Elementary</NavLink>
                <NavLink href="/quizes/junior">Junior Secondary</NavLink>
                <NavLink href="/quizes/senior">Senior Secondary</NavLink>
            </NavSection>
        </nav>
    );
};

export default Navbar;