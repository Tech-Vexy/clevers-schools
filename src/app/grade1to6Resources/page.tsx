import React from 'react';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Grade1to6ResourcesLayout = () => {
  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
            <CardHeader className="bg-green-600 border-b border-gray-200">
                <CardTitle className="text-3xl font-bold text-center text-white">
                   GRADE 1 TO GRADE 6 RESOURCES
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex flex-col ">

                <Link href='/grade1to6Resources/curriculum' className='text-navbar text-center font-semibold font-serif text-2xl'>
                Curriculum Design Materials
                </Link>
                <Link href='/grade1to6Resources/grade1' className='text-navbar text-center font-semibold font-serif  text-2xl'>
                All Grade 1 Resources
                </Link>
                <Link href='/grade1to6Resources/grade2' className='text-navbar text-center font-semibold font-serif text-2xl'>
                All Grade 2 Resources
                </Link>
                <Link href='/grade1to6Resources/grade3' className='text-navbar text-center font-semibold font-serif text-2xl'>
                All Grade 3 Resources
                </Link>
                <Link href='/grade1to6Resources/grade4' className='text-navbar text-center font-semibold font-serif  text-2xl'>
                All Grade 4 Resources
                </Link>
                <Link href='/grade1to6Resources/grade5' className='text-navbar text-center font-semibold font-serif text-2xl'>
                All Grade 5 Resources
                </Link>
                <Link href='/grade1to6Resources/grade6' className='text-navbar text-center font-semibold font-serif text-2xl'>
                All Grade 6 Resources
                </Link>
            </CardContent>
        </Card>
  )
}

export default Grade1to6ResourcesLayout;
        