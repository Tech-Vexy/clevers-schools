'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from 'lucide-react';

const KCSEPastPapers = () => {
    const papers = [
        {
            year: "2023",
            path: "/kcse/2023",
            description: "Access the latest KCSE examination papers from 2023, including all subjects and marking schemes"
        },
        {
            year: "2022",
            path: "/kcse/2022",
            description: "Complete set of 2022 KCSE examination papers with detailed answers and marking guidelines"
        },
        {
            year: "2021",
            path: "/kcse/2021",
            description: "Comprehensive 2021 KCSE papers covering all subjects with solutions and marking schemes"
        },
        {
            year: "2020",
            path: "/kcse/2020",
            description: "Full collection of 2020 KCSE examination papers with detailed marking schemes"
        },
        {
            year: "2019",
            path: "/kcse/2019",
            description: "Complete set of 2019 KCSE papers with answers and examination guidelines"
        },
        {
            year: "2018",
            path: "/kcse/2018",
            description: "2018 KCSE examination papers with comprehensive solutions and marking criteria"
        },
        {
            year: "2017",
            path: "/kcse/2017",
            description: "Full set of 2017 KCSE papers including all subjects and marking schemes"
        },
        {
            year: "2016",
            path: "/kcse/2016",
            description: "Complete 2016 KCSE examination papers with detailed answers and guidelines"
        },
        {
            year: "2015",
            path: "/kcse/2015",
            description: "Comprehensive collection of 2015 KCSE papers with solutions and marking schemes"
        },
        {
            year: "2014",
            path: "/kcse/2014",
            description: "2014 KCSE examination papers with detailed marking schemes and answers"
        },
        {
            year: "2013",
            path: "/kcse/2013",
            description: "Complete set of 2013 KCSE papers with comprehensive solutions and guidelines"
        },
        {
            year: "2012",
            path: "/kcse/2012",
            description: "Full collection of 2012 KCSE examination papers and marking schemes"
        },
        {
            year: "2011",
            path: "/kcse/2011",
            description: "2011 KCSE papers with detailed solutions and examination guidelines"
        },
        {
            year: "2010",
            path: "/kcse/2010",
            description: "Complete set of 2010 KCSE examination papers with marking schemes"
        },
        {
            year: "2009",
            path: "/kcse/2009",
            description: "Comprehensive 2009 KCSE papers with solutions and marking criteria"
        },
        {
            year: "2008",
            path: "/kcse/2008",
            description: "Full collection of 2008 KCSE examination papers and marking schemes"
        }
    ];

    return (
        <div className="w-full p-6 min-h-screen">
            <Card className="w-full shadow-lg bg-green-600">
                <CardHeader className="sticky top-0 z-50">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <BookOpen className="w-6 h-6 text-primary" />
                        <CardTitle className="text-3xl font-bold text-center">
                            KCSE Past Papers
                        </CardTitle>
                    </div>
                  
                </CardHeader>

                <CardContent className="p-6">
                    <ul className="space-y-4">
                        {papers.map(({ year, path, description }) => (
                            <li key={year} className="rounded-xl bg-white shadow-sm border hover:shadow-md transition-shadow">
                                <a
                                    href={path}
                                    className="block p-6"
                                >
                                    <h2 className="text-xl font-semibold text-primary mb-2">
                                        KCSE {year} Past Papers
                                    </h2>
                                    <p className="text-gray-600">
                                        {description}
                                    </p>
                                </a>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
};

export default KCSEPastPapers;