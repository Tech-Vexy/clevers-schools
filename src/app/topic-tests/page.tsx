import React from "react";
import Agriculture from "./Agriculture/page";
import Biology from "./Biology/page";
import Business from "./Business/page";
import Chemistry from "./chemistry/page";
import Computer from "./computer/page";
import CRE from "./cre/page";
import English from "./English/page";
import Geography from "./Geography/page";
import History from "./History/page";
import Kiswahili from "./Kiswahili/page";
import Mathematics from "./mathematics/page";
import Physics from "./physics/page";
import Mapwork from "./mapwork/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

interface LevelComponentProps {
    children: React.ReactNode;
  }
  
  const LevelSection: React.FC<LevelComponentProps> = ({ children }) => (
    <div className="w-full p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      {children}
    </div>
  );
  
  const TopicTests: React.FC = () => {
    const levels = [
        {Component: Agriculture, key: 'agriculture'},
        {Component: Biology, key: 'biology'},
        {Component: Business, key: 'business'},
        {Component: Chemistry, key: 'chemistry'},
        {Component: Computer, key: 'computer'},
        {Component: CRE, key: 'cre'},
        {Component: English, key: 'english'},
        {Component: Geography, key: 'geography'},
        {Component: History, key: 'history'},
        {Component: Kiswahili, key: 'kiswahili'},
        {Component: Mathematics, key: 'mathematics'},
        {Component: Physics, key: 'physics'},
        {Component: Mapwork, key: 'mapwork'}
    ];
  
    return (
      <Card className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <CardHeader className="bg-green-500 border-b border-green-600">
          <CardTitle className="text-xl text-white flex items-center gap-3">
            <BookOpen className="h-6 w-6" />
            <span className="font-semibold">TOPIC TESTS ALL SUBJECTS</span>
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
  
  export default TopicTests;