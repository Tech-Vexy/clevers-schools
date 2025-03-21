import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

const Notes = () => (
  <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
    <CardHeader className="bg-[#00a651] border-b border-gray-200">
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
    <CardHeader className="bg-[#00a651] border-b border-gray-200">
      <CardTitle className="text-base font-normal text-white">
        KCSE 2023-2026 KISW/ENG GUIDES
      </CardTitle>
    </CardHeader>
    <CardContent className="p-2">
      <h2 className="bg-[#ff69b4] text-sm text-normal">
        KCSE 2023-2026 KISWAHILI/ENGLISH GUDES
      </h2>
      <ol>
        <li>
          <Link href="/setbook-guides" className="block font-medium capitalize text-blue-600">
            <span className="text-red-600">1.</span> A GUIDE OF THE FATHERS OF THE
            NATIONS
          </Link>
        </li>
        <li>
          <Link href="/setbook-guides" className="block font-medium capitalize text-blue-600">
            <span className="text-red-600">2.</span> A STUDY GUIDE TO A SILENT SONG
            AND OTHER STORIES
          </Link>
        </li>
        <li>
          <Link href="/setbook-guides" className="block font-medium capitalize text-blue-600">
            <span className="text-red-600">3.</span> MWONGOZO WA BEMBEA YA MAISHA
          </Link>
        </li>
        <li>
          <Link href="/setbook-guides" className="block font-medium capitalize text-blue-600">
            <span className="text-red-600">4.</span> MWONGOZO WA MAPAMBAZUKO YA
            MACHWEO
          </Link>
        </li>
        <li>
          <Link href="/setbook-guides" className="block font-medium capitalize text-blue-600">
            <span className="text-red-600">5.</span> MWONGOZO WA NGUU ZA JADI
          </Link>
        </li>
        <li>
          <Link href="/setbook-guides" className="block font-medium capitalize text-blue-600">
            <span className="text-red-600">6.</span> ARTIST OF THE FLOATING WORLD
          </Link>
        </li>
      </ol>
    </CardContent>
  </Card>
);

const SchemesOfWork = () => (
  <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
    <CardHeader className="bg-[#00a651] border-b border-gray-200">
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

const LessonPlans = () => {
  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
    <CardHeader className="bg-[#00a651] border-b border-gray-200">
      <CardTitle className="text-base font-normal text-white">
      8-4-4 ;CBC all Lesson Plans
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
    <Link href="../lesson-plans/preprimary" className="text-blue-600 font-semibold block border-b-2 border-gray-950">
    1. PP1 , PP2 <span className='text-black'>CBC LESSON PLANS</span>
    </Link>
    <Link href="../lesson-plans/grade1to8" className="text-blue-600 font-semibold block border-b-2 border-gray-950">
    2.GRADE 1 2 3 4 5 6 7 8 <span className='text-black'> LESSON PLANS</span>
    </Link>
    <Link href="../lesson-plans/form1To4" className="text-blue-600 font-semibold block border-b-2 border-gray-950">
    3.FORM 1 2 3 4<span className='text-black'> LESSON PLANS</span>
    </Link>
    </CardContent>
    </Card>
  )
  
}
const Igcse = () => {
  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
    <CardHeader className="bg-[#00a651] border-b border-gray-200">
      <CardTitle className="text-base font-normal text-white">
      IGCSE RESOURCES
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
    <Link href="../igcse/cambridge" className="text-headers font-semibold block border-b-2 border-gray-950">
    CAMBRIDGE IGCSE RESOURCES
    </Link>
    <Link href="../igcse/edexcel" className="text-headertext font-semibold block border-b-2 border-gray-950">
    EDEXCEL IGCSE RESOURCES
    </Link>
    </CardContent>
    </Card>
  )
}

const PrePrimary = () => {
  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
    <CardHeader className="bg-[#00a651] border-b border-gray-200">
      <CardTitle className="text-base font-normal text-white">
      PP1 AND PP2 RESOURCES
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <Link href="../pre-primary/design-materials" className="block text-blue-500 border-b-2 border-gray-950">
        CURRICULUM DESIGN MATERIALS
      </Link>
      <Link href="../pre-primary/exams" className="text-blue-500 font-semibold block border-b-2 border-gray-950">
        PP1 & PP2 EXAMINATIONS
      </Link>
      <Link href="../pre-primary/revision-materials" className=" text-purple-400  block border-b-2 border-gray-950">
        PP1 & PP2 REVISION MATERIALS
      </Link>
      <Link href="../pre-primary/pp1/notes" className="text-red-600 uppercase font-bold block border-b-2 border-gray-950">
        PP1 NOTES
      </Link>
      <Link href="../pre-primary/pp1/exams" className="text-red-600 uppercase font-bold block border-b-2 border-gray-950 ">
        PP1 MID-TERM & END-TERM EXAMS
      </Link>
      <Link href="../pre-primary/pp2/notes" className="text-red-600 uppercase font-bold block border-b-2 border-gray-950">
        PP2 NOTES
      </Link>
      <Link href="../pre-primary/pp2/schemes" className="text-red-600 uppercase font-bold block border-b-2 border-gray-950">
        PP2 SCHEMES OF WORK
      </Link>
      <Link href="../pre-primary/pp2/exams" className="text-red-600 uppercase font-bold block border-b-2 border-gray-950">
        PP2 MID-TERM & END-TERM EXAMS
      </Link>
    </CardContent>
  </Card>
  )
}
const Grade1To8Resources = () => (
  <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
    <CardHeader className="bg-[#00a651] border-b border-gray-200">
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
    <div className="w-full p-4 flex flex-col space-y-4 ">
      <Notes />
      <SetbookGuides />
      <Igcse/>
      <SchemesOfWork />
      <Grade1To8Resources />
      <PrePrimary/>
      <LessonPlans/>
    </div>
  );
};

export default LeftBar;