'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useSession } from 'next-auth/react';
import NavProfile from '@/app/profile/page'; // Assuming NavProfile is in the same directory

const Login = () => {
    return (
        <Card className="w-full max-w-md shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-green-400 border-b border-gray-200 py-4">
                <CardTitle className="text-2xl text-center font-normal text-white flex items-center justify-center">
                    LOGIN AREA
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="text-center space-y-4">
                    <p className="text-gray-600 mb-4">
                        Access your personal account securely
                    </p>
                    <Link href="/auth/signin" target="_self" className="block">
                        <Button className="w-full" variant="default">
                            Log In
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    <div className="text-sm text-gray-500 mt-4">
                        Don&#39;t have an account?
                        <Link href="/auth/register" target="_self" className="text-primary hover:underline ml-1">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const CountyMocks = () => {
    return (
        <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
            <CardHeader className="bg-green-600 border-b border-gray-200">
                <CardTitle className="text-base font-normal text-white">
                    COUNTY MOCKS BY YEAR
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 block">
                <ol>
                    {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015].map((year) => (
                        <li key={year}>
                            <Link href={`../mocks/${year}`} className="text-gray-900 border-b-2">
                                20<span className="text-red-600">{year.toString().slice(-2)}</span> COUNTY MOCKS
                            </Link>
                        </li>
                    ))}
                </ol>
            </CardContent>
        </Card>
    );
};

const RevisionBooklets = () => {
    return (
        <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
            <CardHeader className="bg-green-600 border-b border-gray-200">
                <CardTitle className="text-base font-normal text-white">
                    KCSE REVISION BOOKLETS
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <Link href="../revision-booklets" className="text-blue-500">
                    FORM <span className="text-red-600">1 2 3 4</span> END TOPIC <span className="text-red-600">QUESTIONS</span> & <span className="text-purple-600">ANSWERS</span> ALL SUBJECTS
                </Link>
            </CardContent>
        </Card>
    );
};

const HolidayAssignments = () => {
    return (
        <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
            <CardHeader className="bg-green-600 border-b border-gray-200">
                <CardTitle className="text-base font-normal text-white">
                    HOLIDAYS ASSIGNMENTS
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <Link href="../assignments" className="text-blue-500">
                    FORM <span className="text-red-600">1 2 3 4</span> TERM 1 2 3 HOLIDAY ASSIGNMENTS
                </Link>
            </CardContent>
        </Card>
    );
};

const TopicTests = () => {
    return (
        <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
            <CardHeader className="bg-green-600 border-b border-gray-200">
                <CardTitle className="text-base font-normal text-white">
                    TOPIC BY TOPIC TEST
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <Link href="../topic-tests" className="text-blue-500">
                    FORM <span className="text-red-600">1 2 3 4</span> END TOPIC <span className="text-purple-400">QUE&apos;S</span> & ANS&apos;S ALL SUBJECTS
                </Link>
            </CardContent>
        </Card>
    );
};

const NationalSchools = () => {
    return (
        <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
            <CardHeader className="bg-green-600 border-b border-gray-200">
                <CardTitle className="text-base font-normal text-white">
                NATIONAL SCHOOLS EXAMS
                </CardTitle>
            </CardHeader>
            <CardContent className="">
                <Link href='/mocks/national' className='text-gray-950'>
                NATIONAL SCHOOLS EXAMS
                </Link>
            </CardContent>
        </Card>
    )
}

const LifeskillsNotes = () => {
    return (
        <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
            <CardHeader className="bg-green-600 border-b border-gray-200">
                <CardTitle className="text-base font-normal text-white">
                LIFE SKILLS NOTES
                </CardTitle>
            </CardHeader>
            <CardContent className="">
                <Link href='/lifeskills' className='text-gray-950'>
                FORM 1-4 LIFE SKILLS NOTES
                </Link>
            </CardContent>
        </Card>
    )
}

const Syllabus = () => {
    return (
        <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
            <CardHeader className="bg-green-600 border-b border-gray-200">
                <CardTitle className="text-base font-normal text-white">
                SYLLABUS
                </CardTitle>
            </CardHeader>
            <CardContent className="">
                <Link href='/syllabus' className='text-gray-950'>
                FORM 1 TO FORM 4 SYLLABUS
                </Link>
            </CardContent>
        </Card>
    )
}
const KCSEPastPapers = () => {
    return (
        <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
            <CardHeader className="bg-green-600 border-b border-gray-200">
                <CardTitle className="text-base font-normal text-white">
                    KCSE KNEC PASTPAPERS
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                {[2023, 2022, 2021, ...Array.from({ length: 13 }, (_, i) => 2020 - i)].map((year) => (
                    <Link
                        key={year}
                        href={`../kcse/${year}`}
                        className={`block text-blue-600 ${year >= 2023 ? 'font-light' : 'uppercase font-bold'}`}
                    >
                        {year >= 2021 ? (
                            <>All {year} KNEC PAST PAPERS QUE AND MS / REPORTS</>
                        ) : (
                            <>{year} KNEC PAST PAPERS QUE AND MS</>
                        )}
                    </Link>
                ))}
            </CardContent>
        </Card>
    );
};

const RightBar = () => {
    const { data: session } = useSession();

    return (
        <div className="flex flex-col space-y-4 w-full max-w-md p-4">
            {session ? <NavProfile /> : <Login />}
            <KCSEPastPapers />
            <CountyMocks />
            <TopicTests />
            <RevisionBooklets />
            <HolidayAssignments />
            <NationalSchools/>
            <LifeskillsNotes/>
            <Syllabus/>
        </div>
    );
};

export default RightBar;