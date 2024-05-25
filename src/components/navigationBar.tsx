import Link from "next/link"

const NavigationBar = () => {
    return (<div className="w-full bg-stone-800 py-6 px-10 flex flex-row justify-between items-center">
        <div className="flex flex-row gap-10 items-center">
            <Link href={"/"}><h1 className="text-2xl">OpenCourse</h1></Link>
            <div className="flex flex-row gap-4">
                <Link href={"/dashboard"}>Dashboard</Link>
                <Link href={"/courses"}>Courses</Link>
            </div>
        </div>
        <div className="h-10 w-10 rounded-full bg-pink-200"></div>
    </div>)
}

export default NavigationBar