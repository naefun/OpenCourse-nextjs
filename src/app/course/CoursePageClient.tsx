"use client";

import BackButton from "@/components/BackButton";
import CourseDropdownMenu from "@/components/CourseDropdownMenu";
import CreateUnitDialog from "@/components/CreateUnitDialog";
import SortableUnits from "@/components/dndKit/SortableUnits";
import { Button } from "@/components/ui/button";
import { Course } from "@prisma/client";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";
import { useState } from "react";

const CoursePageClient = ({ props }: { props: { data: Course } }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [triggerSave, setTriggerSave] = useState(false);
  const [triggerCancel, setTriggerCancel] = useState(false);
  return (
    <div className="">
      <div className="flex flex-row w-full justify-between gap-4">
        <BackButton />
        <div className="flex flex-row items-center justify-between gap-4">
          {isEditing ? (
            <>
              <p className="text-stone-500">Editing</p>
              <Button
                variant={"secondary"}
                className="gap-2"
                onClick={() => {
                  setTriggerCancel(true);
                  setIsEditing(false);
                }}
              >
                <IconX size={18} /> Cancel
              </Button>
              <Button
                className="gap-2"
                variant={"success"}
                onClick={() => {
                  setTriggerSave(true);
                  setIsEditing(false);
                }}
              >
                <IconDeviceFloppy size={18} /> Save
              </Button>
            </>
          ) : (
            <CreateUnitDialog props={{ courseId: props.data!.id! }} />
          )}

          <CourseDropdownMenu
            props={{
              course: props.data!,
              isEditing: isEditing,
              setIsEditing: setIsEditing,
            }}
          />
        </div>
      </div>
      <h1 className="text-2xl font-medium text-stone-700">
        {props.data!.title}
      </h1>
      <SortableUnits
        props={{
          data: props.data!.units,
          allowDrag: isEditing,
          triggerSave: triggerSave,
          setTriggerSave: setTriggerSave,
          triggerCancel: triggerCancel,
          setTriggerCancel: setTriggerCancel,
        }}
      />
    </div>
  );
};

export default CoursePageClient;
