import PrismaConnection from "@/database/PrismaConnection";
import CoursePageClient from "../CoursePageClient";

const prisma = PrismaConnection.getInstance();

const Course = async ({ params }: { params: { id: string } }) => {
  const data = await prisma.course.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      units: {
        include: {
          lessons: true,
        },
      },
    },
  });

  return (
    <div className="">
      <CoursePageClient props={{ data: data! }} />
    </div>
  );
};

export default Course;
