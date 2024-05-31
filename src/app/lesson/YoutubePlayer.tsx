"use client";

import YouTube from "react-youtube";

const YoutubePlayer = ({ videoId = "" }) => {
  const opts = {
    height: "100%",
    width: "100%",
  };

  return (
    <div className="w-full h-full bg-stone-900 rounded-xl overflow-hidden">
      <YouTube videoId={videoId} className="h-full w-full" opts={opts} />
    </div>
  );
};

export default YoutubePlayer;
