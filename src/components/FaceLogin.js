import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { toast } from "react-toastify";
import { FaCamera, FaFileUpload } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { uploadPhoto } from "../redux/faceLoginSlice";

const FaceLogin = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const dispatch = useDispatch();
  const { error, upload, picLoading } = useSelector((state) => state.faceLogin);

  const handleCapture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const handleRetake = () => {
    setImgSrc(null);
  };

  const handleUpload = async () => {
    // Check if imageSrc is not null
    if (!imgSrc) {
      toast.error("No image to upload.");
      return;
    }

    const formData = new FormData();
    const imageBlob = await fetch(imgSrc).then((res) => res.blob());
    formData.append("image", imageBlob);

    console.log("Uploading image:", imgSrc);
    dispatch(uploadPhoto(formData));
  };

  //  Use useEffect to show success and error messages using react-toastify
  useEffect(() => {
    const showToast = (message, isSuccess = false) => {
      if (message && !picLoading) {
        isSuccess ? toast.success(message) : toast.error(message);
      }
    };

    showToast(upload, true);
    showToast(error);
  }, [error, upload, picLoading]);

  return (
    <div className="flex justify-center items-center relative">
      <div className="bg-gray-200 rounded-xl p-2">
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
                  className="flex items-center justify-center h-10 px-6 font-semibold rounded-md border bg-green-500 hover:bg-green-700 text-white"
                  onClick={handleRetake}
                >
                  <MdAddAPhoto className="mr-2" />
                  Retake
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center h-10 px-6 font-semibold rounded-md border bg-green-500 hover:bg-green-700 text-white"
                  onClick={handleUpload}
                >
                  <FaFileUpload className="mr-2" />
                  Save
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
              className="flex items-center justify-center w-full h-10 px-4 font-semibold rounded-md border bg-green-500 hover:bg-green-700 text-white"
              onClick={handleCapture}
            >
              <FaCamera className="mr-2" />
              Capture
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FaceLogin;
