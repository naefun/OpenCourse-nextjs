import { Lesson } from "@prisma/client";
import Link from "next/link";

const UnitLessonItem = ({ props }: { props: { lesson: Lesson } }) => {
  return (
    <div className="flex flex-row gap-6 hover:bg-stone-50 p-2 rounded-md">
      <Link href={`/lesson/${props.lesson.id}`}>
        <h2 className="font-medium text-stone-700 hover:underline">
          {props.lesson.title}
        </h2>
      </Link>
      <p className="text-stone-500">{props.lesson.description}</p>
    </div>
  );
};

export default UnitLessonItem;
