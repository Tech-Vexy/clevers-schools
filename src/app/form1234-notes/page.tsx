import React from 'react';
import Link from 'next/link';

const FormsLayout = () => {
  const forms = [
    { id: 1, title: "Form 1 Notes All Subjects", path: "/form1234-notes/form1" },
    { id: 2, title: "Form 2 Notes All Subjects", path: "/form1234-notes/form2" },
    { id: 3, title: "Form 3 Notes All Subjects", path: "/form1234-notes/form3" },
    { id: 4, title: "Form 4 Notes All Subjects", path: "/form1234-notes/form4" }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-2 p-4 border-b-2 border-gray-950">
     <div className='h-full bg-green-500'>
     <h2 className='text-center underline uppercase text-purple-500 text-3xl font-bold'>FORM 1 TO FORM 4 NOTES FOR ALL SUBJECTS</h2>
     </div>
      {forms.map((form) => (
        <Link 
          href={form.path} 
          key={form.id}
          className="block w-full border rounded-lg  hover:shadow-md transition-shadow duration-200 cursor-pointer"
        >
          <h2 className="text-lg text-headers hover:text-blue-950 text-center font-semibold  uppercase">
            {form.title}
          </h2>
        </Link>
      ))}
    </div>
  );
};

export default FormsLayout;