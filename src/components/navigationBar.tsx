import Link from "next/link";
import CreateCourseDialog from "./CreateCourseDialog";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const NavigationBar = () => {
  return (
    <div className="w-full bg-stone-100 py-6 px-10 flex flex-row justify-between items-center">
      <div className="flex flex-row gap-10 items-center">
        <Link href={"/"}>
          <h1 className="text-2xl">OpenCourse</h1>
        </Link>
        <div className="flex flex-row gap-4">
          <Link href={"/dashboard"}>Dashboard</Link>
          <Link href={"/courses"}>Courses</Link>
        </div>
        <Input type="text" placeholder="Search" />
        <CreateCourseDialog />
      </div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default NavigationBar;
