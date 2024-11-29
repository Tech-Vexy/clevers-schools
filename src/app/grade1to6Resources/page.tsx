import React from 'react';

import Grade1Resources from './grade1/page';
import Grade2Resources from './grade2/page';
import Grade3Resources from './grade3/page';
import Grade4Resources from './grade4/page';
import Grade5Resources from './grade5/page';
import Grade6Resources from './grade6/page';

const Grade1to6ResourcesLayout = () => {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 p-4">
       <div className="w-full border rounded-lg p-4">
        <h2 className="text-lg text-red-500 font-semibold mb-4">Grade 1 Resources</h2>
        <Grade1Resources />
      </div>
      <div className="w-full border rounded-lg p-4">
      <h2 className="text-lg text-red-500 font-semibold mb-4">Grade 2 Resources</h2>
      <Grade2Resources/>
    </div>
    <div className="w-full border rounded-lg p-4">
        <h2 className="text-lg font-semibold text-red-500 mb-4">Grade 3 Resources</h2>
        <Grade3Resources/>
      </div>
      <div className="w-full border rounded-lg p-4">
        <h2 className="text-lg text-red-500 font-semibold mb-4">Grade 4 Resources</h2>
        < Grade4Resources/>
      </div>
      <div className="w-full border rounded-lg p-4">
        <h2 className="text-lg text-red-500 font-semibold mb-4">Grade 5 Resources</h2>
        < Grade5Resources/>
      </div>
      <div className="w-full border rounded-lg p-4">
        <h2 className="text-lg text-red-500 font-semibold mb-4">Grade 6 Resources</h2>
        < Grade6Resources/>
      </div>
    </div>
  )
}

export default Grade1to6ResourcesLayout;
        