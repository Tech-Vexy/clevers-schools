import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function PrePrimary() {
    return (
        <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
            <CardHeader className="bg-green-600 border-b border-gray-200">
                <CardTitle className="text-3xl font-bold text-center text-white">
                   PP1 AND PP2 RESOURCES
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex flex-col ">

                <Link href='/pre-primary/design-materials' className='text-headertext text-center font-semibold font-serif text-2xl'>
                Curriculum Design Materials
                </Link>
                <Link href='/pre-primary/exams' className='text-headertext text-center font-semibold font-serif  text-2xl'>
                PP1 And PP2 Examinations
                </Link>
                <Link href='/pre-primary/pp1/notes' className='text-headertext text-center font-semibold font-serif text-2xl'>
                PP1 Notes
                </Link>
                <Link href='/pre-primary/pp1/exams' className='text-headertext text-center font-semibold font-serif text-2xl'>
                
                PP1 Mid-Term And End-Term Exams
                </Link>
                <Link href='/pre-primary/pp1/schemes' className='text-headertext text-center font-semibold font-serif  text-2xl'>
               PP1 Schemes Of Work
                </Link>
                <Link href='/lesson-plans/pp1' className='text-headertext text-center font-semibold font-serif text-2xl'>
                PP1 Lesson Plans
                </Link>
                <Link href='/pre-primary/pp2/exams' className='text-headertext text-center font-semibold font-serif text-2xl'>
                PP2 Mid-Term And End-Term Exams
                </Link>
                <Link href='/pre-primary/pp2/notes' className='text-headertext text-center font-semibold font-serif text-2xl'>
                PP2 Notes
                </Link>
                <Link href='/pre-primary/pp2/schemes' className='text-headertext text-center font-semibold font-serif text-2xl'>
                PP2 Schemes Of Work
                </Link>
                <Link href='/lesson-plans/pp2' className='text-headertext text-center font-semibold font-serif text-2xl'>
                PP2 Lesson Plans
                </Link>
            </CardContent>
        </Card>
    );
}