// Home.tsx
'use client';

import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

const Home: FC = () => {
  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-4 items-center justify-center mt-40">
      {[
        { href: '/senior/grade-12/Agriculture', label: 'AGRICULTURE' },
        { href: '/senior/grade-12/Biology', label: 'BIOLOGY' },
        { href: '/senior/grade-12/BusinessStudies', label: 'BUSINESS STUDIES' },
        { href: '/senior/grade-12/Chemistry', label: 'CHEMISTRY' },
        { href: '/senior/grade-12/ComputerStudies', label: 'COMPUTER STUDIES' },
        { href: '/senior/grade-12/CRE', label: 'CRE' },
        { href: '/senior/grade-12/English', label: 'ENGLISH' },
        { href: '/senior/grade-12/Geography', label: 'GEOGRAPHY' },
        { href: '/senior/grade-12/History', label: 'HISTORY' },
        { href: '/senior/grade-12/Kiswahili', label: 'KISWAHILI' },
        { href: '/senior/grade-12/mathematics', label: 'MATHEMATICS' },
        { href: '/senior/grade-12/Physics', label: 'PHYSICS' }
      ].map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
        >
          <BookOpen size={16} className="text-blue-500" />
          {label}
        </Link>
      ))}
    </div>
  );
};

export default Home;