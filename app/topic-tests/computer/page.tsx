import Form1 from "@/app/topic-tests/computer/form-1/page";
import Form2 from "@/app/topic-tests/computer/form-2/page";
import Form3 from "@/app/topic-tests/computer/form-3/page";
import Form4 from "@/app/topic-tests/computer/form-4/page";

export default function Computer() {
    return (
        <>
            <div className="border-2 ">
                <h3>FORM 1 COMPUTER STUDIES TOPIC TESTS</h3>
                <Form1/>
            </div>
            <div className="border-2 ">
                <h3>FORM 2 COMPUTER STUDIES TOPIC TESTS</h3>
                <Form2/>
            </div>
            <div className="border-2 ">
                <h3>FORM 3 COMPUTER STUDIES TOPIC TESTS</h3>
                <Form3/>
            </div>
            <div className="border-2 ">
                <h3>FORM 4 COMPUTER STUDIES TOPIC TESTS</h3>
                <Form4/>
            </div>
        </>
    )
}