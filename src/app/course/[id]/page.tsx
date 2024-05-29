"use client";

import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Unit } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import UnitItem from "../UnitItem";

const Course = ({ params }: { params: { id: string } }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["courseData" + params.id],
    queryFn: () =>
      fetch(`/api/courses/?id=${params.id}`).then((res) => res.json()),
  });

  useEffect(() => {
    console.log(data);
    console.log(params.id);
  }, [data]);

  if (isPending) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error {error.message}</>;
  }

  return (
    <div className="">
      <BackButton />
      <h1 className="text-2xl font-medium text-stone-700">{data.title}</h1>
      <div className="flex flex-row w-full justify-end">
        <Button onClick={() => {}}>+ Add unit</Button>
      </div>
      <div className="flex flex-col mt-8 gap-4">
        {data.units.map((unit: Unit) => {
          return <UnitItem key={unit.id} props={{ unit: unit }} />;
        })}
      </div>
    </div>
  );
};

export default Course;
