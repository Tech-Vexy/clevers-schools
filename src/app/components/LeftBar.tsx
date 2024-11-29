import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

const Notes = () => (
  <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
    <CardHeader className="bg-green-600 border-b border-gray-200">
      <CardTitle className="text-base font-normal text-white">
        TEACHING NOTES-FORM 1,2,3,4
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <Link href="/form1234-notes" target="_self" className="block font-bold">
        FORM <span className="text-green-400">1</span>{" "}
        <span className="text-red-600">2</span>{" "}
        <span className="text-blue-600">3</span>{" "}
        <span className="text-red-600">4</span> NOTES FOR{" "}
        <span className="text-red-500">ALL</span>{" "}
        <span className="text-blue-800">SUBJECTS</span>
      </Link>
    </CardContent>
  </Card>
);

const SetbookGuides = () => (
  <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
    <CardHeader className="bg-green-600 border-b border-gray-200">
      <CardTitle className="text-base font-normal text-white">
        KCSE 2023-2026 KISW/ENG GUIDES
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <h2 className="bg-pink-500 text-sm text-normal">
        KCSE 2023-2026 KISWAHILI/ENGLISH GUDES
      </h2>
      <ol>
        <li>
          <Link href="#" className="block font-medium capitalize text-blue-600">
            <span className="text-red-600">1.</span> A GUIDE OF THE FATHERS OF THE
            NATIONS
          </Link>
        </li>
        <li>
          <Link href="#" className="block font-medium capitalize text-blue-600">
            <span className="text-red-600">2.</span> A STUDY GUIDE TO A SILENT SONG
            AND OTHER STORIES
          </Link>
        </li>
        <li>
          <Link href="#" className="block font-medium capitalize text-blue-600">
            <span className="text-red-600">3.</span> MWONGOZO WA BEMBEA YA MAISHA
          </Link>
        </li>
        <li>
          <Link href="#" className="block font-medium capitalize text-blue-600">
            <span className="text-red-600">4.</span> MWONGOZO WA MAPAMBAZUKO YA
            MACHWEO
          </Link>
        </li>
        <li>
          <Link href="#" className="block font-medium capitalize text-blue-600">
            <span className="text-red-600">5.</span> MWONGOZO WA NGUU ZA JADI
          </Link>
        </li>
        <li>
          <Link href="#" className="block font-medium capitalize text-blue-600">
            <span className="text-red-600">6.</span> ARTIST OF THE FLOATING WORLD
          </Link>
        </li>
      </ol>
    </CardContent>
  </Card>
);

const SchemesOfWork = () => (
  <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
    <CardHeader className="bg-green-600 border-b border-gray-200">
      <CardTitle className="text-base font-normal text-white">
        2024 SCHEMES OF WORK
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <Link href="../schemes/form1To4">
        <span className="text-black">20</span>{" "}
        <span className="text-black">FORM</span>{" "}
        <span className="text-red-600">1</span>{" "}
        <span className="text-black">2</span>{" "}
        <span className="text-red-600">3</span>{" "}
        <span className="text-black">4</span>
        <br />
      </Link>
      <Link href="../schemes" className="text-blue-500 font-semibold block">
        SCHEMES OF WORK
      </Link>
      <Link href="../schemes/cbc" className="font-light text-purple-400 border-b-2 block">
        GRADE 1 2 3 4 5 6 , grade 7 8 AND PP1 PP2
      </Link>
      <Link href="../lesson-plans/form1To4" className="text-red-600 uppercase font-bold block">
        FORM 1 2 3 4 LESSON PLANS
      </Link>
    </CardContent>
  </Card>
);

const Grade1To8Resources = () => (
  <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
    <CardHeader className="bg-green-600 border-b border-gray-200">
      <CardTitle className="text-base font-normal text-white">
        GRADE 12345678 - RESOURCES
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <Link href="../grade1to6Resources/curriculum" className="block">
        <span className="text-red-600">Grade 1,2,3.4 And 5 6 7 8</span>{" "}
        <span className="text-blue-700">CURRICULUM DESIGN MATERIALS</span>
      </Link>
      <Link href="../schemes/grade-1" className="text-blue-500 font-semibold block">
        2024 Grade <span className="text-red-600">1</span> Schemes of work
      </Link>
      <Link href="../schemes/cbc" className="font-light text-purple-400 border-b-2 block">
        GRADE 1 2 3 4 5 6 , grade 7 8 AND PP1 PP2 SCHEMES OF WORK
      </Link>
      <Link href="../grade123456Revision/Notes" className="text-red-600 uppercase font-bold block">
        GRADE 1 2 3 4 5 6 NOTES
      </Link>
      <Link href="../grade123456Revision/holidayAssignment" className="text-red-600 uppercase font-bold block">
        GRADE 1 2 3 4 5 6 HOLIDAY ASSIGNMENTS
      </Link>
      <Link href="../grade123456Revision/exams" className="text-red-600 uppercase font-bold block">
        GRADE 1 2 3 4 5 6 EXAMS
      </Link>
    </CardContent>
  </Card>
);

const LeftBar = () => {
  return (
    <div className="w-72 p-4 flex flex-col space-y-4 bg-gray-50">
      <Notes />
      <SetbookGuides />
      <SchemesOfWork />
      <Grade1To8Resources />
    </div>
  );
};

export default LeftBar;