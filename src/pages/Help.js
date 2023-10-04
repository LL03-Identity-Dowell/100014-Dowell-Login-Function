import React from "react";

const Help = () => {
  const videoId = "PSmX-A5Cn_E";
  const videoTitle = "Watch a 2 minute video on UX living Lab";

  return (
    <div className="container mx-auto p-2">
      <div className="w-full overflow-hidden">
        <div className=" flex flex-col items-center space-y-2">
          <h2 className="font-semibold text-lg text-white bg-green-500 px-6 py-1 rounded-3xl">
            {videoTitle}
          </h2>
          <div className="aspect-video w-full">
            <iframe
              title="YouTube Video"
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${videoId}`}
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
