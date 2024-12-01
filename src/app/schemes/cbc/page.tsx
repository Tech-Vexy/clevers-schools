import Link from "next/link";

export default function Grade1To8Schemes() {
    return (
        <div className="w-full max-w-3xl mx-auto space-y-6 p-4">
            <div className="w-full border rounded-lg p-4">
            <Link href='/schemes/pp1' className="text-navbar">
             PP1 Schemes of Work
            </Link>
          </div>
          <div className="w-full border rounded-lg p-4">
          <Link href='/schemes/pp2' className="text-navbar">
             PP2 Schemes of Work
            </Link>
          </div>
           <div className="w-full border rounded-lg p-4">
           <Link href='/schemes/grade-1' className="text-navbar">
            Grade 1 Schemes of Work
            </Link>
          </div>
          <div className="w-full border rounded-lg p-4">
          <Link href='/schemes/grade-2' className="text-navbar">
            Grade 2 Schemes of Work
            </Link>
        </div>
        <div className="w-full border rounded-lg p-4">
        <Link href='/schemes/grade-3' className="text-navbar">
            Grade 3 Schemes of Work
            </Link>
          </div>
          <div className="w-full border rounded-lg p-4">
          <Link href='/schemes/grade-4' className="text-navbar">
            Grade 4 Schemes of Work
            </Link>
          </div>
          <div className="w-full border rounded-lg p-4">
          <Link href='/schemes/grade-5' className="text-navbar">
            Grade 5 Schemes of Work
            </Link>
          </div>
          <div className="w-full border rounded-lg p-4">
          <Link href='/schemes/grade-6' className="text-navbar">
            Grade 6 Schemes of Work
            </Link>
          </div>
          <div className="w-full border rounded-lg p-4">
          <Link href='/schemes/grade-7' className="text-navbar">
            Grade 7 Schemes of Work
            </Link>
          </div>
          <div className="w-full border rounded-lg p-4">
          <Link href='/schemes/grade-8' className="text-navbar">
            Grade 8 Schemes of Work
            </Link>
          </div>
        </div>
    )
}