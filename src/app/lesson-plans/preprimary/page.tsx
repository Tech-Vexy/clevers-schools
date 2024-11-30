import Link from "next/link";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";

export default function Page() {
    return (
        <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
    <CardHeader className="bg-green-600 border-b border-gray-200">
      <CardTitle className="text-base font-normal text-white">
      PP1 , PP2 CBC LESSON PLANS
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6 gap-4 flex flex-col">
        <Link href='/lesson-plans/pp1' className='text-center text-zinc-800'>
        PP1 LESSON PLANS
        </Link>
        <Link href='/lesson-plans/pp2' className='text-center text-zinc-800'>
        PP2 LESSON PLANS
        </Link>
    </CardContent>
    </Card>
    )
}