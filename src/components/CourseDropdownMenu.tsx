"use client";

import { Course } from "@prisma/client";
import { IconDotsVertical } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const CourseDropdownMenu = ({
  props,
}: {
  props: { course: Course; isEditing: boolean; setIsEditing: Function };
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IconDotsVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{props.course.title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={props.isEditing}
          onSelect={() => {
            props.setIsEditing(!props.isEditing);
          }}
        >
          {props.isEditing ? "Editing" : "Edit"}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-600 focus:text-red-600 focus:bg-red-50"
          onSelect={(e) => e.preventDefault()}
        >
          <DeleteUnitDialog props={{ courseId: props.course.id }} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const DeleteUnitDialog = ({ props }: { props: { courseId: number } }) => {
  const router = useRouter();
  const onDelete = async (courseId: number) => {
    const response = await fetch(`/api/courses?id=${courseId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // Redirect
      router.replace("/courses");
      router.refresh();
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-row gap-4 items-center w-full">Delete</div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete course</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this course? - Deleting this course
            will also delete any units and lessons within this course.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button
            onClick={() => {
              onDelete(props.courseId);
            }}
            variant={"destructive"}
          >
            Delete course
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CourseDropdownMenu;
