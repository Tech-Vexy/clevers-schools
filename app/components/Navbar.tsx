"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"

interface NavItem {
  title: string
  href: string
  dropdown?: boolean
  items?: NavItem[]
}

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationData = {
    lessonPlans: [
      { title: "All Lesson Plans", href: "/lesson-plans" },
      { title: "PP1", href: "/lesson-plans/pp1" },
      { title: "PP2", href: "/lesson-plans/pp2" },
      { title: "Form 1", href: "/lesson-plans/form-1" },
      { title: "Form 2", href: "/lesson-plans/form-2" },
      { title: "Form 3", href: "/lesson-plans/form-3" },
      { title: "Form 4", href: "/lesson-plans/form-4" },
      { title: "Grade 1", href: "/lesson-plans/grade-1" },
      { title: "Grade 2", href: "/lesson-plans/grade-2" },
      { title: "Grade 3", href: "/lesson-plans/grade-3" },
      { title: "Grade 4", href: "/lesson-plans/grade-4" },
      { title: "Grade 5", href: "/lesson-plans/grade-5" },
      { title: "Grade 6", href: "/lesson-plans/grade-6" },
      { title: "Grade 7", href: "/lesson-plans/grade-7" },
      { title: "Grade 8", href: "/lesson-plans/grade-8" },
    ],
    schemes: [
      { title: "Schemes of Work", href: "/schemes" },
      { title: "PP1", href: "/schemes/pp1" },
      { title: "PP2", href: "/schemes/pp2" },
      { title: "Grade 1", href: "/schemes/grade-1" },
      { title: "Grade 2", href: "/schemes/grade-2" },
      { title: "Grade 3", href: "/schemes/grade-3" },
      { title: "Grade 4", href: "/schemes/grade-4" },
      { title: "Grade 5", href: "/schemes/grade-5" },
      { title: "Grade 6", href: "/schemes/grade-6" },
      { title: "Grade 7", href: "/schemes/grade-7" },
      { title: "Grade 8", href: "/schemes/grade-8" },
      { title: "Form 1", href: "/schemes/form-1" },
      { title: "Form 2", href: "/schemes/form-2" },
      { title: "Form 3", href: "/schemes/form-3" },
      { title: "Form 4", href: "/schemes/form-4" },
    ],
  }

  const navigationRows = [
    [
      { title: "Home", href: "/" },
      { title: "FORM 1234 Notes", href: "/form1234-notes" },
      { title: "KCSE Past Papers", href: "/kcse" },
      { title: "County Mocks", href: "/mocks" },
      { title: "Lesson Plans", href: "/lesson-plans", dropdown: true, items: navigationData.lessonPlans },
      { title: "Form 1-4 Resources", href: "/secondary" },
    ],
    [
      { title: "Schemes of Work", href: "/schemes", dropdown: true, items: navigationData.schemes },
      { title: "Setbook Guides", href: "/setbook-guides" },
      { title: "Revision Booklets", href: "/revision-booklets" },
      { title: "Topic Tests", href: "/topic-tests" },
      { title: "2024 Assignments", href: "/assignments" },
      { title: "Grade 1-6 Resources", href: "/grade1to6Resources" },
    ],
    [
      { title: "Grade 1-6 Revision", href: "/grade123456Revision" },
      { title: "Grade 78 Resources", href: "/grade78Resources" },
      { title: "PP1 Resources", href: "/pre-primary/pp1" },
      { title: "PP2 Resources", href: "/pre-primary/pp2" },
      { title: "IGCSE Cambridge", href: "/igcse/cambridge" },
      { title: "IGCSE Edexcel", href: "/igcse/edexcel" },
    ],
  ]

  const NavLink = ({ item }: { item: NavItem }) => (
    <div className="relative group flex-1">
      <div className="px-2 py-1 hover:bg-white hover:text-black cursor-pointer border border-green-900 shadow-md rounded transition-colors duration-200 w-full">
        <div className="flex items-center justify-between">
          {item.dropdown ? (
            <span className="text-white hover:text-black uppercase text-sm font-medium overflow-hidden text-ellipsis">
              {item.title}
            </span>
          ) : (
            <Link
              href={item.href}
              className="text-white hover:text-black text-sm uppercase font-medium whitespace-nowrap overflow-hidden text-ellipsis w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.title}
            </Link>
          )}
          {item.dropdown && <ChevronDown className="w-3 h-3 text-white group-hover:text-black ml-1 flex-shrink-0" />}
        </div>
      </div>

      {item.dropdown && (
        <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute z-10 mt-1 w-48 bg-green-800 rounded shadow-md transition-all duration-200 ease-in-out">
          {item.items &&
            item.items.map((dropItem: NavItem, idx: number) => (
              <Link
                key={idx}
                href={dropItem.href}
                className="block px-2 py-1 text-sm text-white uppercase hover:text-black hover:bg-white border-b border-green-700 last:border-none transition-colors duration-150"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {dropItem.title}
              </Link>
            ))}
        </div>
      )}
    </div>
  )

  const MobileNavLink = ({ item }: { item: NavItem }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div className="w-full">
        <div
          className="px-2 py-1 hover:bg-green-700 bg-green-800 cursor-pointer border border-green-600 rounded w-full transition-colors duration-200"
          onClick={() => (item.dropdown ? setIsOpen(!isOpen) : null)}
        >
          <div className="flex items-center justify-between">
            {item.dropdown ? (
              <span className="text-white text-sm uppercase">{item.title}</span>
            ) : (
              <Link
                href={item.href}
                className="text-white text-sm uppercase w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            )}
            {item.dropdown && (
              <ChevronDown
                className={`w-3 h-3 text-white transform transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </div>
        </div>

        {item.dropdown && isOpen && (
          <div className="mt-0.5 bg-[#00a651] rounded shadow-lg">
            {item.items?.map((dropItem, idx) => (
              <Link
                key={idx}
                href={dropItem.href}
                className="block px-2 py-1 text-sm text-white uppercase hover:bg-green-700 border-b border-green-600 last:border-none transition-colors duration-150"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {dropItem.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <nav className="bg-[#00a651] py-2 w-full shadow-md font-sans border-x-2 border-green-800">
      <div className="md:hidden flex justify-center mb-1">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white p-1 hover:bg-green-700 rounded transition-colors duration-200"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden mx-auto space-y-1 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "block opacity-100 w-64" : "hidden opacity-0"
        }`}
      >
        {navigationRows.flat().map((link, idx) => (
          <MobileNavLink key={idx} item={link} />
        ))}
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:block w-full px-0 max-w-full">
        {navigationRows.map((row, rowIdx) => (
          <div key={rowIdx} className="grid grid-cols-6 gap-1 mb-1 last:mb-0 w-full">
            {row.map((link, idx) => (
              <NavLink key={idx} item={link} />
            ))}
          </div>
        ))}
      </div>
    </nav>
  )
}

export default NavBar

