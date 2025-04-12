import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import Physics from "@/app/topic-tests/physics/page";
import Chemistry from "@/app/topic-tests/chemistry/page";
import CRE from "@/app/topic-tests/cre/page";
import Computer from "@/app/topic-tests/computer/page";
import English from "@/app/topic-tests/English/page";
import Mathematics from "@/app/topic-tests/mathematics/page";
import Kiswahili from "@/app/topic-tests/Kiswahili/page";
import Geography from "@/app/topic-tests/Geography/page";
import Business from "@/app/topic-tests/Business/page";
import Biology from "@/app/topic-tests/Biology/page";
import Agriculture from "@/app/topic-tests/Agriculture/page";
import History from "@/app/topic-tests/History/page";

export default function Page() {
    const subjects = [
        { name: 'Agriculture', component: Agriculture },
        { name: 'Biology', component: Biology },
        { name: 'Business', component: Business },
        { name: 'Chemistry', component: Chemistry },
        { name: 'Computer', component: Computer },
        { name: 'CRE', component: CRE },
        { name: 'English', component: English },
        { name: 'Geography', component: Geography },
        { name: 'History', component: History },
        { name: 'Kiswahili', component: Kiswahili },
        { name: 'Mathematics', component: Mathematics },
        { name: 'Physics', component: Physics },
    ];

    return (
        <div className="w-full max-w-4xl mx-auto p-4 border-2 border-gray-300 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">TOPICAL TESTS</h2>
            <Accordion type="multiple" defaultValue={subjects.map((_, index) => `item-${index}`)}>
                {subjects.map((subject, index) => (
                    <AccordionItem
                        value={`item-${index}`}
                        key={subject.name}
                        className="border border-gray-200 mb-2 rounded-lg"
                    >
                        <AccordionTrigger className="hover:bg-gray-100 px-4 py-2 rounded-t-lg">
                            {subject.name.toUpperCase()}
                        </AccordionTrigger>
                        <AccordionContent className="p-4 border-t border-gray-200">
                            <subject.component />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}