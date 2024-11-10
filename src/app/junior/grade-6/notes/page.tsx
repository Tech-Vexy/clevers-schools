// components/IGCSESection.tsx

import { BookOpen } from 'lucide-react';
import Link from 'next/link';

const Notes: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 pl-4">
         <Link
            
              href="/junior/grade-6/notes/agriculture"
              className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
            >
                <BookOpen size={16} className="text-blue-500" />
              AGRICULTURE
            </Link>
            <Link
            
              href="/junior/grade-6/notes/english"
              className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
            >
                <BookOpen size={16} className="text-blue-500" />
              ENGLISH
            </Link>
            <Link
            
            href="/junior/grade-6/notes/health-education"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
            HEALTH EDUCATION
          </Link>
          <Link
            
            href="/junior/grade-6/notes/homescience"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
            HOME SCIENCE
          </Link>
          <Link
            
            href="/junior/grade-6/notes/kiswahili"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
            KISWAHILI
          </Link>
          <Link
            
            href="/junior/grade-6/notes/lifeskills"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
            LIFE SKILLS
          </Link>
          <Link
            
            href="/junior/grade-6/notes/maths"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
           MATHEMATICS
          </Link>
          <Link
            
            href="/junior/grade-6/notes/pre-technology"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
           PRE-TECHNOLOGY
          </Link>
          <Link
            
            href="/junior/grade-6/notes/science"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
            SCIENCE
          </Link>
          <Link
            
            href="/junior/grade-6/notes/social-studies"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
            SOCIAL STUDIES
          </Link>
    </div>
  );
};

export default Notes;
