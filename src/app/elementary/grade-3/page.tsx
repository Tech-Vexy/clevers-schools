// components/IGCSESection.tsx

import { BookOpen } from 'lucide-react';
import Link from 'next/link';

const Grade6: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 pl-4">
         <Link
            
              href="/elementary/grade-3/notes"
              className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
            >
                <BookOpen size={16} className="text-blue-500" />
              NOTES
            </Link>
            <Link
            
              href="/elementary/grade-3/schemes"
              className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
            >
                <BookOpen size={16} className="text-blue-500" />
              SCHEMES OF WORK
            </Link>
            <Link
            
              href="/elementary/grade-3/exams"
              className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
            >
                <BookOpen size={16} className="text-blue-500" />
             TERM 1 ,2 AND 3 EXAMS
            </Link>
           
    </div>
  );
};

export default Grade6;
