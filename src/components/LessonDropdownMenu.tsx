"use client";

import { Lesson } from "@prisma/client";
import { IconDotsVertical } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";

const LessonDropdownMenu = ({ props }: { props: { lesson: Lesson } }) => {
  const router = useRouter();
  const onDelete = async (lessonId: number) => {
    const response = await fetch(`/api/lessons?id=${lessonId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // Refresh the server component
      router.refresh();
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IconDotsVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{props.lesson.title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {}}>View</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            onDelete(props.lesson.id);
          }}
          className="text-red-600 focus:text-red-600 focus:bg-red-50"
        >
          <div className="flex flex-row gap-4 items-center">Delete</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LessonDropdownMenu;
