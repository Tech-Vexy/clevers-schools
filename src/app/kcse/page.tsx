import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const KCSEPastPapers = () => {
    return (
        <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
            <CardHeader className="bg-green-600 border-b border-gray-200">
                <CardTitle className="text-3xl font-bold text-center text-white">
                    KCSE KNEC PASTPAPERS
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                {[2023, 2022, 2021, ...Array.from({ length: 13 }, (_, i) => 2020 - i)].map((year) => (
                    <Link
                        key={year}
                        href={`../kcse/${year}`}
                        className={`block text-blue-950 ${year >= 2023 ? 'font-sans text-center text-red-600' : 'uppercase font-bold text-center'}`}
                    >
                        {year >= 2023 ? (
                            <>All {year} KNEC PAST PAPERS QUE AND MS / REPORTS</>
                        ) : (
                            <>{year} KNEC PAST PAPERS QUE AND MS</>
                        )}
                    </Link>
                ))}
            </CardContent>
        </Card>
    );
};
 export default KCSEPastPapers;