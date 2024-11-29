import Link from "next/link";

export default function PrePrimary() {
    return (
        <div className="flex flex-col gap-4 p-4  bg-gray-300">
            <Link href='/pre-primary/pp1/exams/end-term' className='text-blue-500 font-semibold mb-4 text-2xl border-b-2 text-center'>
        PP1 End Term Exams
        </Link>
        <Link href='/pre-primary/pp1/exams/mid-term' className='text-blue-500 border-b-2 text-center font-semibold mb-4 text-2xl'>
        PP1 Mid Term Exams
        </Link>
        <Link href='/pre-primary/pp1/notes' className='text-blue-500 border-b-2 text-center font-semibold mb-4 text-2xl'>
        PP1 Notes 
        </Link>
        <Link href='/pre-primary/pp1/schemes' className='text-blue-500 border-b-2 text-center font-semibold mb-4 text-2xl'>
        PP1 Schemes Of Work
        </Link>
        <Link href='/pre-primary/pp2/schemes' className='text-blue-500 border-b-2 text-center font-semibold mb-4 text-2xl'>
        PP2 Schemes Of Work
        </Link>
        <Link href='/pre-primary/pp2/notes' className='text-blue-500 border-b-2 text-center font-semibold mb-4 text-2xl'>
        PP2 Notes 
        </Link>
        <Link href='/pre-primary/design-materials' className='text-blue-500 border-b-2 text-center font-semibold mb-4 text-2xl'>
        Pre-Primary School Curriculum Design Materials
        </Link>
        <Link href='/pre-primary/revision-materials' className='text-blue-500 border-b-2 text-center font-semibold mb-4 text-2xl'>
        All Pre-Primary School Revision Materials And Resources
        </Link>

        </div>
    );
}