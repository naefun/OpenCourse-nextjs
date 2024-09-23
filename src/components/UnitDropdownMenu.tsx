"use client";

import { Unit } from "@prisma/client";
import { IconDotsVertical } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

const UnitDropdownMenu = ({ props }: { props: { unit: Unit } }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IconDotsVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{props.unit.title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {}}>View</DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-600 focus:text-red-600 focus:bg-red-50"
          onSelect={(e) => e.preventDefault()}
        >
          <DeleteUnitDialog props={{ unitId: props.unit.id }} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const DeleteUnitDialog = ({ props }: { props: { unitId: number } }) => {
  const router = useRouter();
  const onDelete = async (unitId: number) => {
    const deleteUnitLessonsResponse = await fetch(
      `/api/lessons?unitId=${unitId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!deleteUnitLessonsResponse.ok) {
      // Refresh the server component
      return;
    }
    const deleteUnitResponse = await fetch(`/api/units?id=${unitId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (deleteUnitResponse.ok) {
      // Refresh the server component
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
          <DialogTitle>Delete unit</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this unit? - Deleting this unit will
            also delete any lessons within this unit.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button
            onClick={() => {
              onDelete(props.unitId);
            }}
            variant={"destructive"}
          >
            Delete unit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UnitDropdownMenu;
