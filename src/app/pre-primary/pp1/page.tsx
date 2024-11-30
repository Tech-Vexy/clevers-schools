import PP1MidTerm from "./exams/midterm/page";
import PP1EndTerm from "./exams/end-term/page";
import PP1Notes from "./notes/page";
import PP1Plan from "@/app/lesson-plans/pp1/page";
import PP1Schemes1 from "./schemes/page";
import PP1Schemes  from "@/app/schemes/pp1/page" ;

export default function PP1Resources() {
    return (
        <div className="flex flex-col border-b-2 border-green-50 p-2">
            <PP1EndTerm/>
            <PP1MidTerm/>
            <PP1Plan/>
            <PP1Notes/>
            <PP1Schemes/>
            <PP1Schemes1/>
        </div>
    )
}