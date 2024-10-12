import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Unit } from "@prisma/client";
import Item from "./Item";

export default function SortableItem({
  props,
}: {
  props: { data: Unit; id: number; disabled: boolean };
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id, disabled: props.disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Item
      ref={setNodeRef}
      id={props.id}
      style={style}
      data={props.data}
      {...attributes}
      {...listeners}
    />
  );
}
