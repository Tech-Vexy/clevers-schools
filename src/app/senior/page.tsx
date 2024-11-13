'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen } from 'lucide-react';

interface Subject {
  name: string;
  path: string;
}

interface Grade {
  name: string;
  subjects: Subject[];
}

const seniorSecondaryData: Grade[] = [
  {
    name: 'GRADE 9',
    subjects: [
      { name: 'Maths', path: '/senior/grade-9/mathematics' },
      { name: 'Agriculture', path: '/senior/grade-9/Agriculture' },
      { name: 'Biology', path: '/senior/grade-9/Biology' },
      { name: 'Physics', path: '/senior/grade-9/Physics' },
      { name: 'CRE', path: '/senior/grade-9/CRE' },
      { name: 'Chemistry', path: '/senior/grade-9/Chemistry' },
      { name: 'Business Studies', path: '/senior/grade-9/BusinessStudies' },
      { name: 'Computer Studies', path: '/senior/grade-9/ComputerStudies' },
      { name: 'English', path: '/senior/grade-9/English' },
      { name: 'Kiswahili', path: '/senior/grade-9/Kiswahili' },
      { name: 'Geography', path: '/senior/grade-9/Geography' },
      { name: 'History', path: '/senior/grade-9/History' }
    ]
  },
  {
    name: 'GRADE 10',
    subjects: [
      { name: 'Maths', path: '/senior/grade-10/mathematics' },
      { name: 'Agriculture', path: '/senior/grade-10/Agriculture' },
      { name: 'Biology', path: '/senior/grade-10/Biology' },
      { name: 'Physics', path: '/senior/grade-10/Physics' },
      { name: 'CRE', path: '/senior/grade-10/CRE' },
      { name: 'Chemistry', path: '/senior/grade-10/Chemistry' },
      { name: 'Business Studies', path: '/senior/grade-10/BusinessStudies' },
      { name: 'Computer Studies', path: '/senior/grade-10/ComputerStudies' },
      { name: 'English', path: '/senior/grade-10/English' },
      { name: 'Kiswahili', path: '/senior/grade-10/Kiswahili' },
      { name: 'Geography', path: '/senior/grade-10/Geography' },
      { name: 'History', path: '/senior/grade-10/History' }
    ]
  },
  {
    name: 'GRADE 11',
    subjects: [
      { name: 'Maths', path: '/senior/grade-11/mathematics' },
      { name: 'Agriculture', path: '/senior/grade-11/Agriculture' },
      { name: 'Biology', path: '/senior/grade-11/Biology' },
      { name: 'Physics', path: '/senior/grade-11/Physics' },
      { name: 'CRE', path: '/senior/grade-11/CRE' },
      { name: 'Chemistry', path: '/senior/grade-11/Chemistry' },
      { name: 'Business Studies', path: '/senior/grade-11/BusinessStudies' },
      { name: 'Computer Studies', path: '/senior/grade-11/ComputerStudies' },
      { name: 'English', path: '/senior/grade-11/English' },
      { name: 'Kiswahili', path: '/senior/grade-11/Kiswahili' },
      { name: 'Geography', path: '/senior/grade-11/Geography' },
      { name: 'History', path: '/senior/grade-11/History' }
    ]
  }
];

const GradeSection = ({ grade }: { grade: Grade }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <div className="flex items-center gap-2">
          <BookOpen size={20} className="text-blue-600" />
          <h3 className="text-lg font-semibold">{grade.name}</h3>
        </div>
        {isExpanded ? (
          <ChevronDown size={20} className="text-gray-600" />
        ) : (
          <ChevronRight size={20} className="text-gray-600" />
        )}
      </button>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 pl-4">
          {grade.subjects.map((subject, index) => (
            <Link
              key={index}
              href={subject.path}
              className="p-3 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
            >
              <BookOpen size={16} className="text-blue-500" />
              <span className="text-gray-700 hover:text-blue-600 transition-colors">
                {subject.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default function SeniorSecondaryContent() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Senior Secondary</h1>
        <div className="space-y-4">
          {seniorSecondaryData.map((grade, index) => (
            <GradeSection key={index} grade={grade} />
          ))}
        </div>
        <Link
            
            href="/senior/grade-12"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-blue-500" />
            GRADE 12
          </Link>
      </div>
    </div>
  );
}