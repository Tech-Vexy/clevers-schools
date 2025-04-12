import Form1 from "@/app/topic-tests/cre/form-1/page";
import Form2 from "@/app/topic-tests/cre/form-2/page";
import Form3 from "@/app/topic-tests/cre/form-3/page";
import Form4 from "@/app/topic-tests/cre/form-4/page";

export default function CRE() {
    return (
        <>
            <div className="border-2 ">
                <h3>FORM 1 C.R.E TOPIC TESTS</h3>
                <Form1/>
            </div>
            <div className="border-2 ">
                <h3>FORM 2 C.R.E TOPIC TESTS</h3>
                <Form2/>
            </div>
            <div className="border-2 ">
                <h3>FORM 3 C.R.E  TOPIC TESTS</h3>
                <Form3/>
            </div>
            <div className="border-2 ">
                <h3>FORM 4 C.R.E  TOPIC TESTS</h3>
                <Form4/>
            </div>
        </>
    )
}