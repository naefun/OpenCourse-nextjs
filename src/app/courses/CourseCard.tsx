"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const CourseCard = ({ description = "Some description for a course" }) => {
  return (
    <Link href={"/course"}>
      <Card
        className="h-[20rem] hover:bg-stone-50"
        onClick={() => {
          console.log("Pressed card");
        }}
      >
        <CardHeader>
          <CardTitle>Course title</CardTitle>
          <div className="flex flex-row gap-2 flex-wrap">
            <Badge variant={"secondary"}>React</Badge>
            <Badge variant={"secondary"}>React</Badge>
            <Badge variant={"secondary"}>React</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CourseCard;
