// components/IGCSESection.tsx

import { BookOpen } from 'lucide-react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div className="grid bg-amber-950 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 pl-4 mr-6">
         <Link
            
              href="/igcse/cambridge/IGCSE/Accouting"
              className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
            >
                <BookOpen size={16} className="text-blue-500" />
             ACCOUNTING
            </Link>
            <Link
            
              href="/igcse/cambridge/IGCSE/Art&Design"
              className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
            >
                <BookOpen size={16} className="text-blue-500" />
                ART & DESIGN
            </Link>
            <Link
            
              href="/igcse/cambridge/IGCSE/Biology"
              className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
            >
                <BookOpen size={16} className="text-blue-500" />
                BIOLOGY
            </Link>
            <Link
            
            href="/igcse/cambridge/IGCSE/Business"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
              BUSINESS
          </Link>
          <Link
            
            href="/igcse/cambridge/IGCSE/Chemistry"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
                CHEMISTRY
          </Link>
          <Link
            
            href="/igcse/cambridge/IGCSE/ComputerScience"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
                COMPUTER SCIENCE
          </Link>
          <Link
            
            href="/igcse/cambridge/IGCSE/Computing"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
                COMPUTING
          </Link>
          <Link
            
            href="/igcse/cambridge/IGCSE/English"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
            ENGLISH
          </Link>
          <Link
            
            href="/igcse/cambridge/IGCSE/French"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
            FRENCH
          </Link>
          <Link
            
            href="/igcse/cambridge/IGCSE/Geography"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
            GEOGRAPHY
          </Link>
          <Link
            
            href="/igcse/cambridge/IGCSE/History"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
            HISTORY
          </Link>
          <Link
            
            href="/igcse/cambridge/IGCSE/Maths"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
            MATHEMATICS
          </Link>
          <Link
            
            href="/igcse/cambridge/IGCSE/Physics"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
            PHYSICS
          </Link>
          <Link
            
            href="/igcse/cambridge/IGCSE/Music"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
            MUSIC
          </Link>
          <Link
            
            href="/igcse/cambridge/IGCSE/Psychology"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
            PSYCHOLOGY
          </Link>
          <Link
            
            href="/igcse/cambridge/IGCSE/Travel&Tourism"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
            TRAVEL & TOURISM
          </Link>
    </div>
  );
};

export default Home;