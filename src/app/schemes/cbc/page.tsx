import Grade1Schemes from "../grade-1/page";
import Grade2Schemes from  "../grade-2/page";
import Grade3Schemes from "../grade-3/page";
import Grade4Schemes from "../grade-4/page";
import Grade5Schemes from "../grade-5/page";
import Grade6Schemes from "../grade-6/page";
import Grade7Schemes from "../grade-7/page";
import Grade8Schemes from "../grade-8/page";
import PP1Schemes from "../pp1/page";
import PP2Schemes from "../pp2/page";

export default function Grade1To8Schemes() {
    return (
        <div className="w-full max-w-3xl mx-auto space-y-6 p-4">
            <div className="w-full border rounded-lg p-4">
            <h2 className="text-lg text-red-500 font-semibold mb-4">PP 1 Schemes of Work</h2>
            <PP1Schemes/>
          </div>
          <div className="w-full border rounded-lg p-4">
            <h2 className="text-lg text-red-500 font-semibold mb-4">PP 2 Schemes of Work</h2>
            <PP2Schemes/>
          </div>
           <div className="w-full border rounded-lg p-4">
            <h2 className="text-lg text-red-500 font-semibold mb-4">Grade 1 Schemes of Work</h2>
            <Grade1Schemes/>
          </div>
          <div className="w-full border rounded-lg p-4">
          <h2 className="text-lg text-red-500 font-semibold mb-4">Grade 2 Schemes of Work</h2>
          <Grade2Schemes/>
        </div>
        <div className="w-full border rounded-lg p-4">
            <h2 className="text-lg font-semibold text-red-500 mb-4">Grade 3 Schemes of Work</h2>
            <Grade3Schemes />
          </div>
          <div className="w-full border rounded-lg p-4">
            <h2 className="text-lg text-red-500 font-semibold mb-4">Grade 4 Schemes of Work</h2>
            <Grade4Schemes />
          </div>
          <div className="w-full border rounded-lg p-4">
            <h2 className="text-lg text-red-500 font-semibold mb-4">Grade 5 Schemes of Work</h2>
            <Grade5Schemes />
          </div>
          <div className="w-full border rounded-lg p-4">
            <h2 className="text-lg text-red-500 font-semibold mb-4">Grade 6 Schemes of Work</h2>
            <Grade6Schemes />
          </div>
          <div className="w-full border rounded-lg p-4">
            <h2 className="text-lg text-red-500 font-semibold mb-4">Grade 7 Schemes of Work</h2>
            <Grade7Schemes />
          </div>
          <div className="w-full border rounded-lg p-4">
            <h2 className="text-lg text-red-500 font-semibold mb-4">Grade 8 Schemes of Work</h2>
            <Grade8Schemes />
          </div>
        </div>
    )
}