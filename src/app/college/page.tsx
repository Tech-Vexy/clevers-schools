// components/IGCSESection.tsx

import { BookOpen } from 'lucide-react';
import Link from 'next/link';

const CollegeSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 pl-4">
         <Link
            
              href="/college/year-1"
              className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
            >
                <BookOpen size={16} className="text-blue-500" />
             YEAR 1
            </Link>
            <Link
            
              href="/college/year-2"
              className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
            >
                <BookOpen size={16} className="text-blue-500" />
              YEAR 2
            </Link>
            <Link
            
              href="/college/year-3"
              className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-400 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
            >
                <BookOpen size={16} className="text-blue-500" />
              YEAR 3
            </Link>
    </div>
  );
};

export default CollegeSection;
