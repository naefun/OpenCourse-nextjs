"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Course } from "@prisma/client";

import Link from "next/link";

const CourseCard = ({ props }: { props: { course: Course } }) => {
  return (
    <Link href={`/course/${props.course.id}`}>
      <Card
        className="h-[20rem] hover:bg-stone-50"
        onClick={() => {
          console.log("Pressed card");
        }}
      >
        <CardHeader className="gap-4">
          <CardTitle>{props.course.title}</CardTitle>
          <div className="flex flex-row gap-2 flex-wrap">
            <Badge variant={"secondary"}>React</Badge>
            <Badge variant={"secondary"}>React</Badge>
            <Badge variant={"secondary"}>React</Badge>
          </div>
        </CardHeader>
        <CardContent className="mt-2">
          <CardDescription>{props.course.description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CourseCard;
