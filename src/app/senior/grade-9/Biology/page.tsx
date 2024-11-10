'use client';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    
    <div className=" container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  pl-4 items-center justify-center mt-40">
         <Link
            
              href="/senior/grade-9/Biology/notes"
              className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
            >
                <BookOpen size={16} className="text-blue-500" />
              NOTES
            </Link>
            <Link
            
              href="/senior/grade-9/Biology/schemes"
              className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
            >
                <BookOpen size={16} className="text-blue-500" />
              SCHEMES OF WORK
            </Link>
            <Link
            
              href="/senior/grade-9/Biology/exams"
              className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
            >
                <BookOpen size={16} className="text-blue-500" />
              TERM 1,2 AND 3 EXAMS
            </Link>
    </div>
   
  );
};

export default Home;
