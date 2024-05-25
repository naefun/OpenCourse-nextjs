import BackButton from "@/components/BackButton";
import Subtitle from "@/components/Subtitle";
import Title from "@/components/Title";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Lesson = () => {
  return (
    <div>
      <BackButton />
      <Title label="Some course title" />
      <p>Some unit title</p>
      {/* Video player */}
      <AspectRatio ratio={16 / 9} className="mt-8">
        <div className="w-full h-full bg-stone-900 rounded-xl"></div>
      </AspectRatio>
      <Subtitle label="Some lesson title" className="mt-4" />
      <p className="text-stone-400">Some lesson description</p>
    </div>
  );
};

export default Lesson;
