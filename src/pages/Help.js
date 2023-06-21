import React from "react";
import YouTube from "react-youtube";

const Help = () => {
  const videoId = "PSmX-A5Cn_E";

  return (
    <div className="relative">
      <div className="w-full flex justify-center items-center">
        <div className="max-w-2xl">
          <YouTube videoId={videoId} />
        </div>
      </div>
    </div>
  );
};

export default Help;
