import PP12EndTerm from "./exams/page";
import PP2Notes from "./notes/page";
import PP2Plan from "@/app/lesson-plans/pp2/page";

import PP2Schemes from "@/app/schemes/pp2/page";
import PP2Schemes1 from "./schemes/page";

export default function PP2Resources() {
    return (
        <div className="flex flex-col p-4 border-b-2 border-gray-800">
            <PP12EndTerm/>
            <PP2Notes/>
            <PP2Plan/>
            <PP2Schemes1/>
            <PP2Schemes/>
        </div>
    )
}