import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function NationalSchoolsMocks() {
    return (
        <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
            <CardHeader className="bg-green-600 border-b border-gray-200">
                <CardTitle className="text-base font-normal text-white">
                    NATIONAL SCHOOLS MOCKS 
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 block divide-x-2 divide-blue-900">
                <ol>
                    <li>
                        <Link href='/nationals/2016'
                            className='text-gray-950'>
                               NATIONAL SHOOL MOCKS 2016
                            
                        </Link>
                    </li>
                    <li>
                        <Link href='/nationals/sunshine'
                            className='text-gray-950'>
                             SUNSHINE SCHOOL MOCK
                            
                        </Link>
                    </li>
                    <li>
                        <Link href='/nationalS/mangu'
                            className='text-gray-950'>
                             MANGU HIGH SCHOOL MOCK
                            
                        </Link>
                    </li>
                    <li>
                        <Link href='/nationals/aliance'
                            className='text-gray-950'>
                            ALLIANCE HIGH SCHOOL MOCK
                            
                        </Link>
                    </li>
                    <li>
                        <Link href='/nationals/aliance-girls'
                            className='text-gray-950'>
                            ALLIANCE GIRLS HIGH SCHOOL MOCK
                            
                        </Link>
                    </li>
                    <li>
                        <Link href='/nationals/2017'
                            className='text-gray-950'>
                            ALLIANCE HIGH SCHOOL MOCK 2017
                            
                        </Link>
                    </li>
                    <li>
                        <Link href='/nationals/2019'
                            className='text-gray-950'>
                           SUNSHINE HIGH SCHOOL MOCK
                            
                        </Link>
                    </li>
                </ol>
            </CardContent>
        </Card>
    );
}