'use client';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    
    <div className=" container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  pl-4 items-center justify-center mt-40">
         <Link
            
              href="/senior/grade-9/Agriculture"
              className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
            >
                <BookOpen size={16} className="text-blue-500" />
             AGRICULTURE
            </Link>
            <Link
            
              href="/senior/grade-9/Biology"
              className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
            >
                <BookOpen size={16} className="text-blue-500" />
             BIOLOGY
            </Link>
            <Link
            
              href="/senior/grade-9/Business Studies"
              className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
            >
                <BookOpen size={16} className="text-blue-500" />
              BUSINESS STUDIES
            </Link>
            <Link
            
            href="/senior/grade-9/Chemistry"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
            CHEMISTRY
          </Link>
          <Link
            
            href="/senior/grade-9/Computer Studies"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
           COMPUTER STUDIES
          </Link>
          <Link
            
            href="/senior/grade-9/CRE"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
          CRE
          </Link>
          <Link
            
            href="/senior/grade-9/English"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
            ENGLISH
          </Link>
          <Link
            
            href="/senior/grade-9/Geography"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
           GEOGRAPHY
          </Link>
          <Link
            
            href="/senior/grade-9/History"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
            HISTORY
          </Link>
          <Link
            
            href="/senior/grade-9/Kiswahili"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
            KISWAHILI
          </Link>
          <Link
            
            href="/senior/grade-9/mathematics"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
            MATHEMATICS
          </Link>
          <Link
            
            href="/senior/grade-9/Physics"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
            PHYSICS
          </Link>
    </div>
   
  );
};

export default Home;
