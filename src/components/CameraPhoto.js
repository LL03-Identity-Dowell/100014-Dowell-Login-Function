import React, { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import { toast } from "react-toastify";

const CameraPhoto = () => {
  const webcamRef = useRef(null);

  const handleCapture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    try {
      toast.success("Photo captured successfully 🚀");
    } catch (error) {
      toast.error("An error occurred.");
      console.log("Error capture photo:", error);
    }
  }, [webcamRef]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 rounded-xl p-2">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={320}
          height={240}
          className="mb-4"
        />
        <button
          type="button"
          className="w-full h-12 px-6 font-semibold rounded-md border bg-green-500 hover:bg-green-700 text-white"
          onClick={handleCapture}
        >
          Capture Photo
        </button>
      </div>
    </div>
  );
};

export default CameraPhoto;
