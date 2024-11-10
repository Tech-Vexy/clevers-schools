'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, GraduationCap, Users, BookOpen } from 'lucide-react';

type Section = 'undergraduate' | 'postgraduate' | 'doctorate';

const UniversityResources = () => {
  const [expandedSections, setExpandedSections] = useState<Record<Section, boolean>>({
    undergraduate: true,
    postgraduate: false,
    doctorate: false
  });

  const [expandedYears, setExpandedYears] = useState<Record<string, boolean>>({
    '1': false,
    '2': false,
    '3': false,
    '4': false
  })
  const toggleSection = (section: Section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleYear = (year: string) => {
    setExpandedYears(prev => ({
      ...prev,
      [year]: !prev[year]
    }));
  };

  return (
    <div className="w-full  mx-auto p-6 bg-white rounded-lg shadow-md">
    

      <div className="space-y-4">
        {/* Undergraduate Section */}
        <div className="border rounded-lg">
          <button
            onClick={() => toggleSection('undergraduate')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="font-bold text-3xl text-gray-700">Undergraduate</span>
            </div>
            {expandedSections.undergraduate ? 
              <ChevronDown className="w-5 h-5 text-gray-500" /> : 
              <ChevronRight className="w-5 h-5 text-gray-500" />
            }
          </button>
          
          {expandedSections.undergraduate && (
            <div className="p-4 pt-0">
              {[1, 2, 3, 4].map(year => (
                <div key={year} className="ml-4">
                  <button
                    onClick={() => toggleYear(`year${year}`)}
                    className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-600 text-2xl font-bold" >Year {year}</span>
                    </div>
                    {expandedYears[`year${year}`] ? 
                      <ChevronDown className="w-4 h-4 text-gray-400" /> : 
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    }
                  </button>
                  {expandedYears[`year${year}`] && (
                    <div className="ml-6 p-2">
                      <Link 
                        href={`/university/undergraduate/year-${year}`}
                        className="text-xl text-blue-500 hover:text-blue-700 hover:underline flex items-center gap-2"
                      >
                        View Resources
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Postgraduate Section */}
        <div className="border rounded-lg">
          <button
            onClick={() => toggleSection('postgraduate')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-green-500" />
              <span className="font-bold text-3xl text-gray-700">Postgraduate</span>
            </div>
            {expandedSections.postgraduate ? 
              <ChevronDown className="w-5 h-5 text-gray-500" /> : 
              <ChevronRight className="w-5 h-5 text-gray-500" />
            }
          </button>
          {expandedSections.postgraduate && (
            <div className="ml-6 p-4">
              <Link 
                href="/university/postgraduate"
                className="text-sm text-blue-500 hover:text-blue-700 hover:underline flex items-center gap-2"
              >
                View Resources
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Doctorate Section */}
        <div className="border rounded-lg">
          <button
            onClick={() => toggleSection('doctorate')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-500" />
              <span className="font-bold text-3xl text-gray-700">Doctorate</span>
            </div>
            {expandedSections.doctorate ? 
              <ChevronDown className="w-5 h-5 text-gray-500" /> : 
              <ChevronRight className="w-5 h-5 text-gray-500" />
            }
          </button>
          {expandedSections.doctorate && (
            <div className="ml-6 p-4">
              <Link 
                href="/university/doctorate"
                className="text-sm text-blue-500 hover:text-blue-700 hover:underline flex items-center gap-2"
              >
                View Resources
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UniversityResources;