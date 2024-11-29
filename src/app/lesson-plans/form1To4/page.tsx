import Form1Plan from '../form-1/page';
import Form2Plan from '../form-2/page';
import Form3Plan from '../form-3/page';
import Form4Plan from '../form-4/page';


export default function Form1To4LessonPlans() {
    return (
        <div className="w-full max-w-3xl mx-auto space-y-6 p-4">
           <div className="w-full border rounded-lg p-4">
            <h2 className="text-lg text-red-500 font-semibold mb-4">Form 1 Lesson Plans</h2>
            <Form1Plan />
          </div>
          <div className="w-full border rounded-lg p-4">
          <h2 className="text-lg text-red-500 font-semibold mb-4">Form 2 Lesson Plans</h2>
          <Form2Plan />
        </div>
        <div className="w-full border rounded-lg p-4">
            <h2 className="text-lg font-semibold text-red-500 mb-4">Form 3 Lesson Plans</h2>
            <Form3Plan />
          </div>
          <div className="w-full border rounded-lg p-4">
            <h2 className="text-lg text-red-500 font-semibold mb-4">Form 4 Lesson Plans</h2>
            <Form4Plan />
          </div>
        </div>
      )
}