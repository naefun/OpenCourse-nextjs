import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "./ui/input"

const NavigationBar = () => {
    return (<div className="w-full bg-stone-100 py-6 px-10 flex flex-row justify-between items-center">
        <div className="flex flex-row gap-10 items-center">
            <Link href={"/"}><h1 className="text-2xl">OpenCourse</h1></Link>
            <div className="flex flex-row gap-4">
                <Link href={"/dashboard"}>Dashboard</Link>
                <Link href={"/courses"}>Courses</Link>
            </div>
            <Input type="text" placeholder="Search" />
            <Button>+ Create course</Button>
        </div>
        <div className="h-10 w-10 rounded-full bg-pink-200"></div>
    </div>)
}

export default NavigationBar