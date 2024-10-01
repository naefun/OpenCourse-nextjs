import BackButton from "@/components/BackButton";
import CourseDropdownMenu from "@/components/CourseDropdownMenu";
import CreateUnitDialog from "@/components/CreateUnitDialog";
import PrismaConnection from "@/database/PrismaConnection";
import { Unit } from "@prisma/client";
import UnitItem from "../UnitItem";

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
      <BackButton />
      <h1 className="text-2xl font-medium text-stone-700">{data!.title}</h1>
      <div className="flex flex-row w-full justify-end gap-4">
        <CreateUnitDialog props={{ courseId: data!.id! }} />
        <CourseDropdownMenu props={{ course: data! }} />
      </div>
      <div className="flex flex-col mt-8 gap-4">
        {data!.units.map((unit: Unit) => {
          return <UnitItem key={unit.id} props={{ unit: unit }} />;
        })}
      </div>
    </div>
  );
};

export default Course;
