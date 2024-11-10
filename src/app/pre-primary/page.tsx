// components/IGCSESection.tsx

import { BookOpen } from 'lucide-react';
import Link from 'next/link';

const PrePrimarySection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 pl-4">
         <Link
            
              href="/pre-primary/pp1"
              className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
            >
                <BookOpen size={16} className="text-blue-500" />
              PRE-PRIMARY 1 EXAMS
            </Link>
            <Link
            
              href="/pre-primary/pp2"
              className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
            >
                <BookOpen size={16} className="text-blue-500" />
            PRE-PRIMARY 2 EXAMS
            </Link>
            <Link
            
            href="/pre-primary/schemes"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
          PRE-PRIMARY SCHOOL SCHEMES OF WORK
          </Link>
          <Link
            
            href="/pre-primary/teaching-aids"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
          PRE-PRIMARY SCHOOL TEACHING AIDS
          </Link>
    </div>
  );
};

export default PrePrimarySection;
