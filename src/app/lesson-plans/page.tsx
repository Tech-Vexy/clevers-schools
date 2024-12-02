'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from 'lucide-react';
import PP2Plan from "@/app/lesson-plans/pp2/page";
import IGCSEPlan from "@/app/lesson-plans/igcse/page";
import PP1Plan from "@/app/lesson-plans/pp1/page";
import Form1Plan from "@/app/lesson-plans/form-1/page";
import Form2Plan from "@/app/lesson-plans/form-2/page";
import Form3Plan from "@/app/lesson-plans/form-3/page";
import Form4Plan from "@/app/lesson-plans/form-4/page";
import Grade1PlAN from "@/app/lesson-plans/grade-1/page";
import Grade2PlAN from "@/app/lesson-plans/grade-2/page";
import Grade3PlAN from "@/app/lesson-plans/grade-3/page";
import Grade4PlAN from "@/app/lesson-plans/grade-4/page";
import Grade5PlAN from "@/app/lesson-plans/grade-5/page";
import Grade6PlAN from "@/app/lesson-plans/grade-6/page";
import Grade7PlAN from "@/app/lesson-plans/grade-7/page";
import Grade8PlAN from "@/app/lesson-plans/grade-8/page";

const LessonPlans = () => {
    const categories = [
        {
            name: "Pre-Primary",
            icon: "🎨",
            plans: [
                { label: "PP1", component: PP1Plan },
                { label: "PP2", component: PP2Plan },
            ]
        },
        {
            name: "CBC Primary",
            icon: "📚",
            plans: [
                { label: "Grade 1", component: Grade1PlAN },
                { label: "Grade 2", component: Grade2PlAN },
                { label: "Grade 3", component: Grade3PlAN },
                { label: "Grade 4", component: Grade4PlAN },
                { label: "Grade 5", component: Grade5PlAN },
                { label: "Grade 6", component: Grade6PlAN },
            ]
        },
        {
            name: "CBC Junior Secondary",
            icon: "🎓",
            plans: [
                { label: "Grade 7", component: Grade7PlAN },
                { label: "Grade 8", component: Grade8PlAN },
            ]
        },
        {
            name: "Secondary",
            icon: "📖",
            plans: [
                { label: "Form 1", component: Form1Plan },
                { label: "Form 2", component: Form2Plan },
                { label: "Form 3", component: Form3Plan },
                { label: "Form 4", component: Form4Plan },
            ]
        },
        {
            name: "International",
            icon: "🌍",
            plans: [
                { label: "IGCSE", component: IGCSEPlan },
            ]
        }
    ];

    return (
        <div className="w-full p-6 bg-gray-50 min-h-screen">
            <Card className="w-full shadow-lg">
                <CardHeader className="border-b bg-white/50 backdrop-blur supports-[backdrop-filter]:bg-white/50">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <BookOpen className="w-6 h-6 text-primary" />
                        <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                            Lesson Plans
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="space-y-6">
                        {categories.map((category) => (
                            <div key={category.name} className="space-y-3">
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    <span>{category.icon}</span>
                                    {category.name}
                                </h2>
                                <div className="ml-6 space-y-2">
                                    {category.plans.map((plan) => (
                                        <a
                                            key={plan.label}
                                            href={`/lesson-plans/${plan.label.toLowerCase().replace(' ', '-')}`}
                                            className="block p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-primary hover:text-primary/80"
                                        >
                                            {plan.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default LessonPlans;