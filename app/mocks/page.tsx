import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

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
                    {[2024, 2023, 2019, 2018, 2017, 2016, 2015,2014,2013,2012,2011].map((year) => (
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

export default CountyMocks;