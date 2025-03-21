import React from 'react';
import { BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CambridgeALevel from './A-Level/page';
import CambridgeOLevel from './O-Level/page';
import CambridgeGCSELevel from './GCSE/page';

interface LevelComponentProps {
  children: React.ReactNode;
}

const LevelSection: React.FC<LevelComponentProps> = ({ children }) => (
  <div className="w-full p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
    {children}
  </div>
);

const IGCSESection: React.FC = () => {
  const levels = [
    { Component: CambridgeALevel, key: 'a-level' },
    { Component: CambridgeOLevel, key: 'o-level' },
    { Component: CambridgeGCSELevel, key: 'gcse' },
  ];

  return (
    <Card className="w-full border border-gray-200 rounded-lg overflow-hidden">
      <CardHeader className="bg-green-500 border-b border-green-600">
        <CardTitle className="text-xl text-white flex items-center gap-3">
          <BookOpen className="h-6 w-6" />
          <span className="font-semibold">IGCSE CAMBRIDGE RESOURCES</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex flex-col gap-6 p-6">
        {levels.map(({ Component, key }) => (
          <LevelSection key={key}>
            <Component />
          </LevelSection>
        ))}
      </CardContent>
    </Card>
  );
};

export default IGCSESection;