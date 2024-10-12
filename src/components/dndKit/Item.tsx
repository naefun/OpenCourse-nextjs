import UnitItem from "@/app/course/UnitItem";
import { forwardRef } from "react";

const Item = forwardRef(({ ...props }, ref) => {
  return (
    <div {...props} ref={ref}>
      <UnitItem props={{ unit: props.data }} />
    </div>
  );
});

Item.displayName = "Item";
export default Item;
