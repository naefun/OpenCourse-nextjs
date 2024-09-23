"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import YouTube from "react-youtube";

const YoutubePlayer = ({ videoId = "" }) => {
  const opts = {
    height: "100%",
    width: "100%",
  };

  return (
    <div className="w-full bg-black flex justify-center rounded-2xl overflow-clip">
      <div className="w-full md:w-[80vw]">
        <AspectRatio className="" ratio={16 / 9}>
          <YouTube
            videoId={videoId}
            iframeClassName="outline-none outline-transparent focus:outline-none focus:outline-transparent"
            className="h-full w-full "
            opts={opts}
          />
        </AspectRatio>
      </div>
    </div>
  );
};

export default YoutubePlayer;
