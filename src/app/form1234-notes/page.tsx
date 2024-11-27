import React from 'react';


import Form1Notes from "./form1/page";
import Form2Notes from "./form2/page";
import Form3Notes from "./form3/page";
import Form4Notes from "./form4/page";

const FormsLayout = () => {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 p-4">
       <div className="w-full border rounded-lg p-4">
        <h2 className="text-lg text-red-500 font-semibold mb-4">Form 1 Notes</h2>
        <Form1Notes />
      </div>
      <div className="w-full border rounded-lg p-4">
      <h2 className="text-lg text-red-500 font-semibold mb-4">Form 2 Notes</h2>
      <Form2Notes />
    </div>
    <div className="w-full border rounded-lg p-4">
        <h2 className="text-lg font-semibold text-red-500 mb-4">Form 3 Notes</h2>
        <Form3Notes />
      </div>
      <div className="w-full border rounded-lg p-4">
        <h2 className="text-lg text-red-500 font-semibold mb-4">Form 4 Notes</h2>
        <Form4Notes />
      </div>
    </div>
  )
}
export default FormsLayout;
        