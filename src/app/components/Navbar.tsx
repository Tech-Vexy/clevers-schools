import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ... [keeping all the dropdown and links data the same]
  const lessonPlanDropdown = [
    { title: 'All Lesson Plans', href: '/lesson-plans' },
    { title: 'PP1', href: '/lesson-plans/pp1' },
    { title: 'PP2', href: '/lesson-plans/pp2' },
    { title: 'Form 1', href: '/lesson-plans/form1' },
    { title: 'Form 2', href: '/lesson-plans/form2' },
    { title: 'Form 3', href: '/lesson-plans/form3' },
    { title: 'Form 4', href: '/lesson-plans/form4' },
    { title: 'Grade 1', href: '/lesson-plans/grade-1' },
    { title: 'Grade 2', href: '/lesson-plans/grade-2' },
    { title: 'Grade 3', href: '/lesson-plans/grade-3' },
    { title: 'Grade 4', href: '/lesson-plans/grade-4' },
    { title: 'Grade 5', href: '/lesson-plans/grade-5' },
    { title: 'Grade 6', href: '/lesson-plans/grade-6' },
    { title: 'Grade 7', href: '/lesson-plans/grade-7' },
    { title: 'Grade 8', href: '/lesson-plans/grade-8' },
  ];

  const schemesDropdown = [
    { title: 'Schemes of Work', href: '/schemes' },
    { title: 'PP1', href: '/schemes/pp1' },
    { title: 'PP2', href: '/schemes/pp2' },
    { title: 'Grade 1', href: '/schemes/grade-1' },
    { title: 'Grade 2', href: '/schemes/grade-2' },
    { title: 'Grade 3', href: '/schemes/grade-3' },
    { title: 'Grade 4', href: '/schemes/grade-4' },
    { title: 'Grade 5', href: '/schemes/grade-5' },
    { title: 'Grade 6', href: '/schemes/grade-6' },
    { title: 'Grade 7', href: '/schemes/grade-7' },
    { title: 'Grade 8', href: '/schemes/grade-8' },
    { title: 'Form  1', href: '/schemes/form-1' },
    { title: 'Form 2', href: '/schemes/form-2' },
    { title: 'Form  3', href: '/schemes/form-3' },
    { title: 'Form 4', href: '/schemes/form-4' },
  ];

  const row1Links = [
    { title: 'Home', href: '/' },
    { title: 'FORM 1234 Notes', href: '/notes' },
    { title: 'KCSE Past Papers', href: '/kcse' },
    { title: '2008-2024 County Mocks', href: '/mocks' },
    { title: '2024 Form 1234 Termly Exams', href: '/termly-exams' },
    { title: 'Lesson Plans', href: '/lesson-plans', dropdown: true, items: lessonPlanDropdown },
  ];

  const row2Links = [
    { title: '2024 Schemes of Work', href: '/schemes', dropdown: true, items: schemesDropdown },
    { title: 'Setbook Guides', href: '/setbook-guides' },
    { title: 'Revision Booklets', href: '/revision-booklets' },
    { title: 'Topic Tests', href: '/topic-tests' },
    { title: '2024 Assignments', href: '/assignments' },
    { title: '2024 Grade 123456 Resources', href: '/grade-resources' },
  ];

  const row3Links = [
    { title: 'Grade 123456 Revision', href: '/grade-revision' },
    { title: 'Grade 78 JSS Resources', href: '/jss-resources' },
    { title: 'PP1', href: '/pp1' },
    { title: 'PP2 Resources', href: '/pp2' },
    { title: 'IGCSE Resources', href: '/igcse' },
  ];

  const NavLink = ({ item }) => (
      <div className="relative group">
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <div className="px-2 py-1 hover:bg-green-700 cursor-pointer border border-green-600 rounded transition-colors duration-200">
                <div className="flex items-center justify-between">
                  {item.dropdown ? (
                      <span className="text-white text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.title}
                  </span>
                  ) : (
                      <Link href={item.href} className="text-white text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                        {item.title}
                      </Link>
                  )}
                  {item.dropdown && <ChevronDown className="w-3 h-3 text-white ml-1 flex-shrink-0" />}
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-gray-900 text-white px-2 py-1 text-xs rounded">
              {item.title}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {item.dropdown && (
            <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute z-10 mt-1 w-48 bg-green-800 rounded shadow-lg transition-all duration-200 ease-in-out">
              {item.items.map((dropItem, idx) => (
                  <TooltipProvider key={idx}>
                    <Tooltip delayDuration={300}>
                      <TooltipTrigger asChild>
                        <Link
                            href={dropItem.href}
                            className="block px-2 py-1 text-sm text-white hover:bg-green-700 border-b border-green-600 last:border-none transition-colors duration-150"
                        >
                          {dropItem.title}
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="bg-gray-900 text-white px-2 py-1 text-xs rounded">
                        {dropItem.title}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
              ))}
            </div>
        )}
      </div>
  );

  const MobileNavLink = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full">
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <div
                    className="px-2 py-1 hover:bg-green-700 cursor-pointer border border-green-600 rounded w-full transition-colors duration-200"
                    onClick={() => item.dropdown ? setIsOpen(!isOpen) : null}
                >
                  <div className="flex items-center justify-between">
                    {item.dropdown ? (
                        <span className="text-white text-sm">{item.title}</span>
                    ) : (
                        <Link href={item.href} className="text-white text-sm w-full">
                          {item.title}
                        </Link>
                    )}
                    {item.dropdown && (
                        <ChevronDown
                            className={`w-3 h-3 text-white transform transition-transform duration-200 ${
                                isOpen ? 'rotate-180' : ''
                            }`}
                        />
                    )}
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-gray-900 text-white px-2 py-1 text-xs rounded">
                {item.title}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {item.dropdown && isOpen && (
              <div className="mt-0.5 bg-green-800 rounded shadow-lg">
                {item.items.map((dropItem, idx) => (
                    <TooltipProvider key={idx}>
                      <Tooltip delayDuration={300}>
                        <TooltipTrigger asChild>
                          <Link
                              href={dropItem.href}
                              className="block px-2 py-1 text-sm text-white hover:bg-green-700 border-b border-green-600 last:border-none transition-colors duration-150"
                          >
                            {dropItem.title}
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="bg-gray-900 text-white px-2 py-1 text-xs rounded">
                          {dropItem.title}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                ))}
              </div>
          )}
        </div>
    );
  };

  return (
      <nav className="bg-green-800 px-4 py-2 w-full">
        {/* Mobile Menu Button */}
        <div className="md:hidden flex justify-end mb-1">
          <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-1 hover:bg-green-700 rounded transition-colors duration-200"
          >
            {isMobileMenuOpen ? (
                <X className="w-4 h-4" />
            ) : (
                <Menu className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
            className={`md:hidden space-y-1 transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? 'block opacity-100' : 'hidden opacity-0'
            }`}
        >
          {[...row1Links, ...row2Links, ...row3Links].map((link, idx) => (
              <MobileNavLink key={idx} item={link} />
          ))}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:block w-full max-w-screen-2xl mx-auto">
          {/* Row 1 */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-2 mb-2">
            {row1Links.map((link, idx) => (
                <NavLink key={idx} item={link} />
            ))}
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-2 mb-2">
            {row2Links.map((link, idx) => (
                <NavLink key={idx} item={link} />
            ))}
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-2">
            {row3Links.map((link, idx) => (
                <NavLink key={idx} item={link} />
            ))}
          </div>
        </div>
      </nav>
  );
};

export default NavBar;