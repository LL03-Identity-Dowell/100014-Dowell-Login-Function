import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { toast } from "react-toastify";
import { RiArrowLeftCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const CameraPhoto = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const navigate = useNavigate();

  const handleCapture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    try {
      toast.success("Photo captured successfully 🚀");
    } catch (error) {
      toast.error("An error occurred.");
      console.log("Error capturing photo:", error);
    }
  }, [webcamRef, setImgSrc]);

  const handleRetake = () => {
    setImgSrc(null);
  };

  const handleUpload = () => {
    try {
      toast.success("Photo uploaded successfully 🚀");
    } catch (error) {
      toast.error("An error occurred.");
      console.log("Error uploading photo:", error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50 relative">
      <RiArrowLeftCircleLine
        className="bg-white text-green-500 absolute top-0 left-0 m-4 w-7 h-7 shadow-md rounded-full"
        onClick={handleBack}
      />
      <div className="bg-white rounded-xl p-2">
        {imgSrc ? (
          <div className="mt-4 space-y-2">
            <img
              src={imgSrc}
              alt="CapturedPhoto"
              className="w-full h-auto rounded-md shadow-md"
            />
            <div className="text-center md:text-left space-y-6">
              <div className="flex space-x-3 items-center justify-center">
                <button
                  type="button"
                  className="h-10 px-6 font-semibold rounded-md border bg-green-500 hover:bg-green-700 text-white"
                  onClick={handleRetake}
                >
                  Retake Photo
                </button>

                <button
                  type="button"
                  className="h-10 px-6 font-semibold rounded-md border bg-green-500 hover:bg-green-700 text-white"
                  onClick={handleUpload}
                >
                  Upload Photo
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={320}
              height={240}
              className="mb-2 rounded-md"
            />
            <button
              type="button"
              className="w-full h-10 px-4 font-semibold rounded-md border bg-green-500 hover:bg-green-700 text-white"
              onClick={handleCapture}
            >
              Capture Photo
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CameraPhoto;
