import Form1Schemes from '@/app/schemes/form-1/page';
import Form2Schemes from '../form-2/page';
import Form3Schemes from '../form-3/page';
import Form4Schemes from '../form-4/page';


export default function Form1To4schemes() {
    return (
        <div className="w-full max-w-3xl mx-auto space-y-6 p-4">
           <div className="w-full border rounded-lg p-4">
            <h2 className="text-lg text-red-500 font-semibold mb-4">Form 1 Schemes of Work</h2>
            <Form1Schemes />
          </div>
          <div className="w-full border rounded-lg p-4">
          <h2 className="text-lg text-red-500 font-semibold mb-4">Form 2 Schemes of Work</h2>
          <Form2Schemes />
        </div>
        <div className="w-full border rounded-lg p-4">
            <h2 className="text-lg font-semibold text-red-500 mb-4">Form 3 Schemes of Work</h2>
            <Form3Schemes />
          </div>
          <div className="w-full border rounded-lg p-4">
            <h2 className="text-lg text-red-500 font-semibold mb-4">Form 4 Schemes of Work</h2>
            <Form4Schemes />
          </div>
        </div>
      )
}