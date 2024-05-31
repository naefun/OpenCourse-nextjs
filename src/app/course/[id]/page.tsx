import BackButton from "@/components/BackButton";
import CreateUnitDialog from "@/components/CreateUnitDialog";
import { PrismaClient, Unit } from "@prisma/client";
import UnitItem from "../UnitItem";

const prisma = new PrismaClient();

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
      <div className="flex flex-row w-full justify-end">
        <CreateUnitDialog props={{ courseId: data!.id! }} />
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
