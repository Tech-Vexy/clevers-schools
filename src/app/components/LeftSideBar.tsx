import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function LeftSidebar() {
    return (
        <div className="h-4 w-full bg-white p-auto top-auto">
        <Card className="w-full max-w-md shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-green-400 border-b border-gray-200 py-4">
                <CardTitle className="text-xl  font-normal text-white ">
                   
                    TEACHING NOTES-FORM 1,2,3,4
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className=" space-y-4">
                    
                    <Link href="/form1234-notes"  target="_self"  className="block">
                    FORM 1,2,3,4 NOTES FOR ALL SUBJECTS
                    </Link>
                    
                </div>
            </CardContent>
        </Card>
    </div>
    )
}