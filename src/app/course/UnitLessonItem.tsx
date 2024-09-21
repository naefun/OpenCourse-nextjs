import LessonDropdownMenu from "@/components/LessonDropdownMenu";
import { Lesson } from "@prisma/client";
import Link from "next/link";

const UnitLessonItem = ({ props }: { props: { lesson: Lesson } }) => {
  return (
    <div className="flex flex-row gap-6 hover:bg-stone-50 p-2 rounded-md items-center justify-between group">
      <div className="flex flex-row gap-6 rounded-md items-center overflow-hidden">
        <Link href={`/lesson/${props.lesson.id}`}>
          <h2 className="font-medium text-stone-700 hover:underline text-nowrap">
            {props.lesson.title}
          </h2>
        </Link>
        <p className="text-stone-500 truncate w-full">
          {props.lesson.description}
        </p>
      </div>
      <div className="flex flex-row h-min opacity-0 group-hover:opacity-100 focus:opacity-100">
        <LessonDropdownMenu props={{ lesson: props.lesson }} />
      </div>
    </div>
  );
};

export default UnitLessonItem;
