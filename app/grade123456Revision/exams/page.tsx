import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const GradeNavigation = () => {
  const grades = [
    { id: 1, path: '/grade1', title: 'Grade 1 Revision Sets' },
    { id: 2, path: '/grade2', title: 'Grade 2 Revision Sets' },
    { id: 3, path: '/grade3', title: 'Grade 3 Revision Sets' },
    { id: 4, path: '/grade4', title: 'Grade 4 Revision Sets' },
    { id: 5, path: '/grade5', title: 'Grade 5 Revision Sets' },
    { id: 6, path: '/grade6', title: 'Grade 6 Revision Sets' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center mb-6">
            Grade Level Revision Sets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {grades.map((grade) => (
              <Link 
                href={grade.path} 
                key={grade.id}
                className="block"
              >
                <div className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200 hover:bg-gray-50">
                  <h2 className="text-lg font-semibold text-center text-gray-800">
                    {grade.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GradeNavigation;