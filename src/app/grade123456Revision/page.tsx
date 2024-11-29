import GradeNavigation from "./exams/page";
import Grade1To6HolidayAssignment from "./holidayAssignment/page";
import Grade1To6RevisionNotes from "./Notes/page";
import Grade1To6Schemes from "./schemes/page";

const Grade1To6Revision = () => {
    return (
        <div className="w-full max-w-3xl mx-auto space-y-6 p-4">
        <div className="w-full border rounded-lg p-4">
         <h2 className="text-lg text-red-500 text-center font-semibold mb-4">Revision Notes</h2>
         <Grade1To6RevisionNotes />
       </div>
       <div className="w-full border rounded-lg p-4">
       <h2 className="text-lg text-red-500 text-center font-semibold mb-4">Schemes of Work</h2>
       <Grade1To6Schemes />
     </div>
     <div className="w-full border rounded-lg p-4">
         <h2 className="text-lg font-semibold text-center text-red-500 mb-4">Holiday Assiggnments</h2>
         <Grade1To6HolidayAssignment />
       </div>
       <div className="w-full border rounded-lg p-4">
         <h2 className="text-lg text-red-500 text-center font-semibold mb-4">Examination Revision Sets</h2>
         <GradeNavigation />
       </div>
     </div>
    )
}


export default Grade1To6Revision;