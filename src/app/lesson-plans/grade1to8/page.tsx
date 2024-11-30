import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import Grade1Plan from "../grade-1/page";
import Grade2Plan from "../grade-2/page";
import Grade3Plan from "../grade-3/page";
import Grade4Plan from "../grade-4/page";
import Grade5Plan from "../grade-5/page";
import Grade6Plan from "../grade-6/page";
import Grade7Plan from "../grade-7/page";
import Grade8Plan from "../grade-8/page";

export default function Grade1To8Plans() {
    return (
        <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
    <CardHeader className="bg-green-600 border-b border-gray-200">
      <CardTitle className="text-base font-normal text-white">
      GRADE 1 2 345678  LESSON PLANS
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6 gap-4 flex flex-col">
        <Grade1Plan/>
        <Grade2Plan/>
        <Grade3Plan/>
        <Grade4Plan/>
        <Grade5Plan/>
        <Grade6Plan/>
        <Grade7Plan/>
        <Grade8Plan/>
    </CardContent>
    </Card>
    )
}