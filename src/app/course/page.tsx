import { Button } from "@/components/ui/button";
import UnitItem from "./UnitItem";
import BackButton from "@/components/BackButton";

const Course = () => {
  return (
    <div className="">
      <BackButton />
      <h1 className="text-2xl font-medium text-stone-700">Some course title</h1>
      <div className="flex flex-row w-full justify-end">
        <Button>+ Add unit</Button>
      </div>
      <div className="flex flex-col mt-8 gap-4">
        <UnitItem />
        <UnitItem />
        <UnitItem />
      </div>
    </div>
  );
};

export default Course;
