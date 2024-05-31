import BackButton from "@/components/BackButton";
import Subtitle from "@/components/Subtitle";
import Title from "@/components/Title";
import { PrismaClient } from "@prisma/client";
import YoutubePlayer from "../YoutubePlayer";

const prisma = new PrismaClient();

const Lesson = async ({ params }: { params: { id: string } }) => {
  // get lesson
  const lessonData = await prisma.lesson.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  const unitData = await prisma.unit.findUnique({
    where: {
      id: Number(lessonData?.unitId),
    },
  });
  const courseData = await prisma.course.findUnique({
    where: {
      id: Number(unitData?.courseId),
    },
  });
  prisma.$disconnect();

  return (
    <div>
      <BackButton />
      <Title label={courseData?.title} />
      <p>{unitData?.title}</p>
      {/* Video player */}
      <div className="w-full h-full h-[80vh] mt-10">
        <YoutubePlayer videoId={lessonData?.videoId!} />
      </div>
      <Subtitle label={lessonData?.title} className="mt-4" />
      <p className="text-stone-400">{lessonData?.description}</p>
    </div>
  );
};

export default Lesson;
