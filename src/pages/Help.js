import React from "react";
import YouTube from "react-youtube";

const Help = () => {
  const videoId = "PSmX-A5Cn_E";

  return (
    <div className="relative">
      <YouTube
        videoId={videoId}
        className="w-full items-center justify-center"
      />
    </div>
  );
};

export default Help;
