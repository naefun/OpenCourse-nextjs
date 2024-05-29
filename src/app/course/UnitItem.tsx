"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lesson, Unit } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

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
          <Button variant={"ghost"}>Add lesson</Button>
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

const UnitLessonItem = ({ props }: { props: { lesson: Lesson } }) => {
  return (
    <div className="flex flex-row gap-6 hover:bg-stone-50 p-2 rounded-md">
      <Link href={"/lesson"}>
        <h2 className="font-medium text-stone-700 hover:underline">
          {props.lesson.title}
        </h2>
      </Link>
      <p className="text-stone-500">{props.lesson.description}</p>
    </div>
  );
};

export default UnitItem;
