import PrismaConnection from "@/database/PrismaConnection";
import { Course } from "@prisma/client";
import CourseCard from "./CourseCard";

const prisma = PrismaConnection.getInstance();

const Courses = async () => {
  const data = await prisma.course.findMany();
  console.log(data);
  prisma.$disconnect();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 gap-4">
      {data.map((course: Course) => {
        return <CourseCard key={course.id} props={{ course: course }} />;
      })}
    </div>
  );
};

export default Courses;
