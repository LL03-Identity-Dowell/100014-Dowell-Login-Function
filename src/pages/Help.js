import React from "react";
import YouTube from "react-youtube";

const Help = () => {
  const videoId = "PSmX-A5Cn_E";
  const videoTitle = "Watch a 2 minute video on UX living Lab";

  return (
    <div className="relative">
      <div className="w-full flex justify-center items-center">
        <div className="max-w-2xl space-y-2 flex flex-col items-center">
          <h2 className="font-semibold text-lg text-white bg-green-500 px-6 py-2 rounded-3xl">
            {videoTitle}
          </h2>
          <YouTube videoId={videoId} />
        </div>
      </div>
    </div>
  );
};

export default Help;
