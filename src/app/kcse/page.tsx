'use client';
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar } from 'lucide-react';
import KCSE2008 from "@/app/kcse/2008/page";
import KCSE2009 from "@/app/kcse/2009/page";
import KCSE2010 from "@/app/kcse/2010/page";
import KCSE2011 from "@/app/kcse/2011/page";
import KCSE2012 from "@/app/kcse/2012/page";
import KCSE2013 from "@/app/kcse/2013/page";
import KCSE2014 from "@/app/kcse/2014/page";
import KCSE2015 from "@/app/kcse/2015/page";
import KCSE2016 from "@/app/kcse/2016/page";
import KCSE2017 from "@/app/kcse/2017/page";
import KCSE2018 from "@/app/kcse/2018/page";
import KCSE2019 from "@/app/kcse/2019/page";
import KCSE2020 from "@/app/kcse/2020/page";
import KCSE2021 from "@/app/kcse/2021/page";
import KCSE2022 from "@/app/kcse/2022/page";
import KCSE2023 from "@/app/kcse/2023/page";

const KCSEPastPapers = () => {
    const years = [
        { year: "2023", component: KCSE2023 },
        { year: "2022", component: KCSE2022 },
        { year: "2021", component: KCSE2021 },
        { year: "2020", component: KCSE2020 },
        { year: "2019", component: KCSE2019 },
        { year: "2018", component: KCSE2018 },
        { year: "2017", component: KCSE2017 },
        { year: "2016", component: KCSE2016 },
        { year: "2015", component: KCSE2015 },
        { year: "2014", component: KCSE2014 },
        { year: "2013", component: KCSE2013 },
        { year: "2012", component: KCSE2012 },
        { year: "2011", component: KCSE2011 },
        { year: "2010", component: KCSE2010 },
        { year: "2009", component: KCSE2009 },
        { year: "2008", component: KCSE2008 },
    ];

    const [activeYear, setActiveYear] = useState(null);
    const contentRefs = useRef({});

    const scrollToYear = (year) => {
        contentRefs.current[year]?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        setActiveYear(year);
    };

    return (
        <div className="w-full p-6 bg-navbar min-h-screen">
            <Card className="w-full shadow-lg">
                <CardHeader className="sticky top-0 z-50 ">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <BookOpen className="w-6 h-6 text-primary" />
                        <CardTitle className="text-3xl font-bold text-center ">
                            KCSE Past Papers
                        </CardTitle>
                    </div>
                    <p className="text-center text-muted-foreground mb-4">
                        Access comprehensive KCSE past papers from 2008 to 2023
                    </p>
                </CardHeader>

                <CardContent className="p-6">
                    <div className="space-y-8">
                        {years.map(({ year, component: Component }) => (
                            <div
                                key={year}
                                ref={el => contentRefs.current[year] = el}
                                className="scroll-mt-48"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Calendar className="w-5 h-5 text-primary" />
                                        <h2 className="text-xl font-semibold text-primary">
                                            KCSE {year} Past Paper
                                        </h2>
                                    </div>
                                    <div className="rounded-xl bg-white p-6 shadow-sm border">
                                        <Component />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default KCSEPastPapers;