import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
                <li>

            <Link href='../mocks/2024' className='text-gray-900 border-b-2'>
            20<span className='text-red-600'>24</span> COUNTY MOCKS 
            </Link>
                </li>
                <li>
                <Link href='../mocks/2023' className='text-gray-900 border-b-2'>
            20<span className='text-red-600'>23</span> COUNTY MOCKS 
            </Link>
                </li>
                <li>
                <Link href='../mocks/2022' className='text-gray-900 border-b-2'>
            20<span className='text-red-600'>22</span> COUNTY MOCKS 
            </Link>
                </li>
                <li>
                <Link href='../mocks/2021' className='text-gray-900 border-b-2'>
            20<span className='text-red-600'>21</span> COUNTY MOCKS 
            </Link>
                </li>
                <li>
                <Link href='../mocks/2020' className='text-gray-900 border-b-2'>
            20<span className='text-red-600'>20</span> COUNTY MOCKS 
            </Link>
                </li>
                <li>
                <Link href='../mocks/2019' className='text-gray-900 border-b-2'>
            20<span className='text-red-600'>19</span> COUNTY MOCKS 
            </Link>
                </li>
                <li>
                <Link href='../mocks/2018' className='text-gray-900 border-b-2'>
            20<span className='text-red-600'>18</span> COUNTY MOCKS 
            </Link>
                </li>
                <li>
                <Link href='../mocks/2017' className='text-gray-900 border-b-2'>
            20<span className='text-red-600'>17</span> COUNTY MOCKS 
            </Link>
                </li>
                <li>
                <Link href='../mocks/2016' className='text-gray-900 border-b-2'>
            20<span className='text-red-600'>16</span> COUNTY MOCKS 
            </Link>
                </li>
                <li>
                <Link href='../mocks/2015' className='text-gray-900 border-b-2'>
            20<span className='text-red-600'>15</span> COUNTY MOCKS 
            </Link>
                </li>
            </ol>
        </CardContent>
        </Card>
    )
}
const RevisionBooklets = () => {
    return (
        <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
        <CardHeader className="bg-green-600 border-b border-gray-200">
            <CardTitle className="text-base font-normal text-white">
            KCSE REVISION BOOKLETS
            </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
            <Link href='../revision-booklets' className='text-blue-500'>
            FORM <span className='text-red-600'>1 2 3 4</span> END TOPIC <span className='text-red-600'>QUESTIONS</span> & <span className='text-purple-600'>ANSWERS</span> ALL SUBJECTS
            </Link>

        </CardContent>
        </Card>
    )
}


const HolidayAssignments = () => {
    return (
        <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
        <CardHeader className="bg-green-600 border-b border-gray-200">
            <CardTitle className="text-base font-normal text-white">
            HOLIDAYS ASSIGNMENTS
            </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
            <Link href='../assignments' className='text-blue-500'>
            FORM <span className='text-red-600'>1 2 3 4</span> TERM 1 2 3 HOLIDAY ASSIGNMENTS 
            </Link>

        </CardContent>
        </Card>
    )
}
const TopicTests = () => {
    return (
        <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
        <CardHeader className="bg-green-600 border-b border-gray-200">
            <CardTitle className="text-base font-normal text-white">
            TOPIC BY TOPIC TEST
            </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
            <Link href='../topic-tests' className='text-blue-500'>
            FORM <span className='text-red-600'>1 2 3 4</span> END TOPIC <span className='text-purple-400'>QUE&apos;S</span> & ANS&apos;S ALL SUBJECTS
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
                <Link href="../kcse/2023" className="block text-blue-600">
                    20<span className='text-red-600'>23</span> KCSE KNEC PAST PAPERS
                </Link>
                <Link href="../kcse/2022" className="text-blue-500 font-semibold block">
                    All 2022 KNEC PAST PAPERS QUE AND MS / REPORTS 
                </Link>
                <Link href="../kcse/2021" className="font-light text-blue-600 block">
                    All 2021 KNEC PAST PAPERS QUE AND MS/ REPORTS 
                </Link>
                {[2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008].map((year) => (
                    <Link 
                        key={year}
                        href={`../kcse/${year}`} 
                        className="text-blue-600 uppercase font-bold block"
                    >
                        {year} KNEC PAST PAPERS QUE AND MS
                    </Link>
                ))}
            </CardContent>
        </Card>
    );
};

const RightBar = () => {
    return (
        <div className="flex flex-col space-y-4 w-full max-w-md p-4">
            <Login />
            <KCSEPastPapers />
            <CountyMocks/>
            <TopicTests/>
            <RevisionBooklets/>
            <HolidayAssignments/>
        </div>
    );
};

export default RightBar;