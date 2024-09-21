"use client";
import CreateLessonDialog from "@/components/CreateLessonDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lesson, Unit } from "@prisma/client";
import { useEffect, useState } from "react";
import UnitLessonItem from "./UnitLessonItem";

const UnitItem = ({ props }: { props: { unit: Unit } }) => {
  const [showLessons, setShowLessons] = useState(false);

  useEffect(() => {
    console.log(props.unit);
  }, [props.unit]);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle className="text-xl">{props.unit.title}</CardTitle>
          <CreateLessonDialog props={{ unitId: props.unit.id }} />
        </div>
        <CardDescription className="mt-2">
          {props.unit.description}
        </CardDescription>
        <div className="flex flex-row">
          <div
            className="text-sm hover:underline cursor-pointer flex"
            onClick={() => {
              setShowLessons(!showLessons);
            }}
          >
            {showLessons ? "Hide lessons" : "Show lessons"}
          </div>
        </div>
      </CardHeader>
      {showLessons && (
        <CardContent>
          <div className="w-full h-[1px] bg-stone-200"></div>
          <div className="flex flex-col gap-2 mt-6">
            {props.unit["lessons"].length === 0 && (
              <p className="text-stone-400 text-sm">No lessons added</p>
            )}
            {props.unit["lessons"].map((lesson: Lesson) => {
              return (
                <UnitLessonItem key={lesson.id} props={{ lesson: lesson }} />
              );
            })}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default UnitItem;
