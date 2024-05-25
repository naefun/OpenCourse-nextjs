"use client";

import { Button } from "./ui/button";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      variant={"link"}
      className="text-stone-400"
      onClick={() => {
        router.back();
      }}
    >
      <IconArrowNarrowLeft />
      Back
    </Button>
  );
};

export default BackButton;
