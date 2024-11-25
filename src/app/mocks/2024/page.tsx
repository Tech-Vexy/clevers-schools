import React from 'react';
import Link from 'next/link';
import { FileText } from 'lucide-react';

const ExamLinksGrid = () => {
  const examLinks = [
    { name: 'Bondo Joint', path: './bondo' },
    { name: 'Cekana', path: './cekana' },
    { name: 'Nakuru', path: './nakuru' },
    { name: 'Pangani Girls', path: './pangani' },
    { name: 'Kabianga', path: './kabianga' },
    { name: 'Champions', path: './champions' },
    { name: 'Bukaka Cluster', path: './bukaka-cluster' },
    { name: 'ACK Joint', path: './ack-joint' },
    { name: 'Maranda Joint', path: './loreto-maranda-limuru_joint' },
    { name: 'Maranda', path: './maranda' },
    { name: 'Maseno', path: './maseno' },
    { name: 'Moi Girls', path: './moi-girls' },
    { name: 'Matungu', path: './matungu' },
    { name: 'Mokasa 2', path: './mokasa2' },
    { name: 'Moi Kabarak', path: './moi-kabarak' },
    { name: 'Kisii High', path: './kisii-high' },
    { name: 'Kala Joint', path: './kala-joint' },
    { name: 'Kassu Jet', path: './kassu-jet' },
    { name: 'Starehe 2024', path: './starehe' },
    { name: 'Bokake', path: './bokake-joint' },
    { name: 'Kenya High', path: './kenya-high' },
    { name: 'Musjet', path: './musjet' }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">2024 Mock Exams</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {examLinks.map((exam) => (
          <Link
            key={exam.name}
            href={exam.path}
            className="group flex items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-200"
          >
            <FileText className="w-5 h-5 text-gray-500 group-hover:text-blue-500 mr-3" />
            <span className="text-gray-700 group-hover:text-blue-600 font-medium">
              {exam.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExamLinksGrid;