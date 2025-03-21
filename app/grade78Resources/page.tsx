import Link from "next/link";


const Grade78Resources = () => {
    return (
        <div className="flex flex-col gap-4">
            <Link href='/grade78Resources/curricum-grade7' className='text-blue-500 font-semibold mb-4 text-2xl border-b-2 text-center'>
        Grade 7 Curriculum Design Materials
        </Link>
        <Link href='/grade78Resources/curricum-grade8' className='text-blue-500 font-semibold mb-4 text-2xl border-b-2 text-center'>
        Grade 8 Curriculum Design Materials
        </Link>
        <Link href='/grade78Resources/Notes' className='text-blue-500 font-semibold mb-4 text-2xl border-b-2 text-center'>
        Grade 7 Notes
        </Link>
        </div>
    )

}

export default Grade78Resources;