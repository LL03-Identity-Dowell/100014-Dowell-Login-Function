import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { toast } from "react-toastify";

const CameraPhoto = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const handleCapture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    try {
      toast.success("Photo captured successfully 🚀");
    } catch (error) {
      toast.error("An error occurred.");
      console.log("Error capture photo:", error);
    }
  }, [webcamRef, setImgSrc]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white rounded-xl p-2">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={320}
          height={240}
          className="mb-4 rounded-md"
        />
        <button
          type="button"
          className="w-full h-12 px-6 font-semibold rounded-md border bg-green-500 hover:bg-green-700 text-white"
          onClick={handleCapture}
        >
          Capture Photo
        </button>
        {imgSrc && (
          <div className="mt-4">
            <img
              src={imgSrc}
              alt="img"
              className="w-full h-auto rounded-md shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraPhoto;
