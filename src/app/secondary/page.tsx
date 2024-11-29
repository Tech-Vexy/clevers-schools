import Link from "next/link";

const SecondarySchoolResources = () => {
    return (
        <div className="flex flex-col gap-2">
            <Link href='/form1234-notes' className="text-2xl text-indigo-400 font-serif">
            All Form 1 2 3 4 Notes For All Subjects
            </Link>
            <Link href='/revision-booklets' className="text-2xl text-indigo-400 font-serif">
            All Form 1 2 3 4 Revision Booklets
            </Link>
            <Link href='/schemes/form1To4' className="text-2xl text-indigo-400 font-serif">
            All Form 1 2 3 4 Schemes Of Work
            </Link>
            <Link href='/lesson-plans/form1To4' className="text-2xl text-indigo-400 font-serif">
            All Form 1 2 3 4 Lesson Plans
            </Link>

        </div>
    )
}

export default SecondarySchoolResources;