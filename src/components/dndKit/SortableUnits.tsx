"use client";

import SortableItem from "@/components/dndKit/SortableItem";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Unit } from "@prisma/client";
import { useEffect, useState } from "react";
import Item from "./Item";

export default function SortableUnits({
  props,
}: {
  props: {
    data: Unit[];
    allowDrag: boolean;
    triggerSave: boolean;
    setTriggerSave: Function;
    triggerCancel: boolean;
    setTriggerCancel: Function;
  };
}) {
  const {
    data,
    allowDrag,
    triggerSave,
    setTriggerSave,
    triggerCancel,
    setTriggerCancel,
  } = props;
  const [activeId, setActiveId] = useState(null);
  const [items, setItems] = useState([
    ...props.data.sort((a, b) => {
      return (
        a.position - b.position || a.createdAt.getTime() - b.createdAt.getTime()
      );
    }),
  ]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setItems([...data]);
  }, [data]);

  useEffect(() => {
    if (triggerCancel) {
      setItems([...data]);
      setTriggerCancel(false);
    }
  }, [triggerCancel, data, setTriggerCancel]);

  useEffect(() => {
    if (triggerSave) {
      let updatedItems = [...items];
      console.log(items);
      for (let i = 0; i < updatedItems.length; i++) {
        updatedItems[i].position = i;
      }
      fetch("/api/units", {
        method: "PUT",
        body: JSON.stringify(updatedItems),
      });
      setItems(updatedItems);
      setTriggerSave(false);
    }
  }, [triggerSave, items, setTriggerSave]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
      id="aa1b"
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col mt-8 gap-4">
          {items.map((item) => (
            <SortableItem
              key={item.id}
              props={{ id: item.id, disabled: !props.allowDrag, data: item }}
            />
          ))}
        </div>
      </SortableContext>
      <DragOverlay modifiers={[restrictToParentElement]}>
        {activeId ? (
          <Item
            className={"opacity-70 scale-95"}
            id={activeId}
            data={items.filter((item) => item.id === activeId)[0]}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );

  function handleDragStart(event) {
    const { active } = event;

    console.log(active);
    setActiveId(active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    console.log(active, over);

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.map((item) => item.id).indexOf(active.id);

        const newIndex = items.map((item) => item.id).indexOf(over.id);

        console.log(`old index: ${oldIndex}`);
        console.log(`new index: ${newIndex}`);

        const newItems = arrayMove(items, oldIndex, newIndex);
        console.log(items, newItems);
        return newItems;
      });
    }

    setActiveId(null);
  }
}
