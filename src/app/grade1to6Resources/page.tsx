import React from 'react';

import Link from 'next/link';

const Grade1to6ResourcesLayout = () => {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 p-4 flex flex-col">
       
        <Link href='./grade1' className='text-red-500 font-semibold mb-4 text-lg'>
        Grade 1 Resources
        </Link>

        <Link href='./grade2' className='text-red-500 font-semibold mb-4 text-lg'>
        Grade 2 Resources
        </Link>
        <Link href='./grade3' className='text-red-500 font-semibold mb-4 text-lg'>
        Grade 3 Resources
        </Link>
        <Link href='./grade4' className='text-red-500 font-semibold mb-4 text-lg'>
        Grade 4 Resources
        </Link>
        <Link href='./grade5' className='text-red-500 font-semibold mb-4 text-lg'>
        Grade 5 Resources
        </Link>
        <Link href='./grade6' className='text-red-500 font-semibold mb-4 text-lg'>
        Grade 6 Resources
        </Link>
      
    </div>
  )
}

export default Grade1to6ResourcesLayout;
        