import Link from 'next/link';
import { BookOpen } from 'lucide-react';

const BooksAndNovels = () => {
  const sections = [
    { name: 'Textbooks', href: '/books/textbooks' },
    { name: 'Fiction', href: '/books/fiction' },
    { name: 'Non-Fiction', href: '/books/non-fiction' },
    { name: 'Reference', href: '/books/reference' },
    { name: 'Setbook Guides', href: '/books/setbooks' },
  ];

  return (
    <div className="p-8 bg-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <BookOpen className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">Books & Novels</h1>
      </div>
      <ul className="space-y-4">
        {sections.map((section) => (
          <li key={section.name}>
            <Link href={section.href} className="block p-4 bg-white rounded-lg shadow hover:bg-blue-50 transition">
        
              <span className="text-2xl font-semibold text-gray-700">{section.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksAndNovels;
