'use client';
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

    const [activeCategory, setActiveCategory] = useState(categories[0].name);
    const [activePlan, setActivePlan] = useState(categories[0].plans[0].label);

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
                    <p className="text-center text-muted-foreground">
                        Select a category and grade level to view lesson plans
                    </p>
                </CardHeader>
                <CardContent className="p-6">
                    <Tabs
                        value={activeCategory}
                        onValueChange={category => {
                            setActiveCategory(category);
                            const selectedCategory = categories.find(c => c.name === category);
                            if (selectedCategory) {
                                setActivePlan(selectedCategory.plans[0].label);
                            }
                        }}
                        className="w-full"
                    >
                        {/* Main category tabs */}
                        <TabsList className="flex flex-wrap gap-3 mb-8 p-1 bg-muted/20">
                            {categories.map(category => (
                                <TabsTrigger
                                    key={category.name}
                                    value={category.name}
                                    className="px-4 py-2 text-sm font-medium rounded-lg transition-all data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
                                >
                                    <span className="mr-2">{category.icon}</span>
                                    {category.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {/* Category content with nested tabs */}
                        {categories.map(category => (
                            <TabsContent key={category.name} value={category.name}>
                                <Tabs
                                    value={activePlan}
                                    onValueChange={setActivePlan}
                                    className="w-full"
                                >
                                    <TabsList className="flex flex-wrap gap-2 mb-6 justify-center bg-transparent">
                                        {category.plans.map(plan => (
                                            <TabsTrigger
                                                key={plan.label}
                                                value={plan.label}
                                                className="px-4 py-2 text-sm font-medium rounded-full border border-muted transition-all hover:bg-muted/10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary"
                                            >
                                                {plan.label}
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>

                                    {category.plans.map(plan => (
                                        <TabsContent
                                            key={plan.label}
                                            value={plan.label}
                                            className="rounded-xl bg-white p-6 shadow-sm border animate-in fade-in-50 duration-200"
                                        >
                                            <div className="mb-4">
                                                <h3 className="text-xl font-semibold text-primary mb-1">
                                                    {plan.label} Lesson Plans
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {category.name} • {plan.label}
                                                </p>
                                            </div>
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <plan.component />
                                            </div>
                                        </TabsContent>
                                    ))}
                                </Tabs>
                            </TabsContent>
                        ))}
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
};

export default LessonPlans;