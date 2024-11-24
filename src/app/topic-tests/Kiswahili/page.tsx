import Form1 from "@/app/topic-tests/Kiswahili/form-1/page";
import Form2 from "@/app/topic-tests/Kiswahili/form-2/page";
import Form3 from "@/app/topic-tests/Kiswahili/form-3/page";
import Form4 from "@/app/topic-tests/Kiswahili/form-4/page";

export default function Kiswahili() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Kiswahili Topic Tests</h1>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                    <div className="bg-blue-500 text-white py-3 px-4">
                        <h3 className="text-xl font-semibold">FORM 1 KISWAHILI TOPIC TESTS</h3>
                    </div>
                    <div className="p-4">
                        <Form1/>
                    </div>
                </div>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                    <div className="bg-green-500 text-white py-3 px-4">
                        <h3 className="text-xl font-semibold">FORM 2 KISWAHILI TOPIC TESTS</h3>
                    </div>
                    <div className="p-4">
                        <Form2/>
                    </div>
                </div>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                    <div className="bg-purple-500 text-white py-3 px-4">
                        <h3 className="text-xl font-semibold">FORM 3 KISWAHILI TOPIC TESTS</h3>
                    </div>
                    <div className="p-4">
                        <Form3/>
                    </div>
                </div>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                    <div className="bg-indigo-500 text-white py-3 px-4">
                        <h3 className="text-xl font-semibold">FORM 4 KISWAHILI TOPIC TESTS</h3>
                    </div>
                    <div className="p-4">
                        <Form4/>
                    </div>
                </div>
            </div>
        </div>
    )
}