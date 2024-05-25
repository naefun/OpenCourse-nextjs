"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";

const UnitItem = () => {
  const [showLessons, setShowLessons] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle className="text-xl">Some unit title</CardTitle>
          <Button variant={"ghost"}>Add lesson</Button>
        </div>
        <CardDescription className="mt-2">Some description</CardDescription>
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
            <UnitLessonItem />
            <UnitLessonItem />
            <UnitLessonItem />
          </div>
        </CardContent>
      )}
    </Card>
  );
};

const UnitLessonItem = () => {
  return (
    <div className="flex flex-row gap-6 hover:bg-stone-50 p-2 rounded-md">
      <Link href={"/lesson"}>
        <h2 className="font-medium text-stone-700 hover:underline">
          Some lesson title
        </h2>
      </Link>
      <p className="text-stone-500">Some lesson description goes here</p>
    </div>
  );
};

export default UnitItem;
