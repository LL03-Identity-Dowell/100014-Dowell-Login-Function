import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { toast } from "react-toastify";
import { FaCamera, FaFileUpload } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { CommonData } from "../utils/commonUtils";
// import dataURItoBlob from "../utils/dataURItoBlob";
import { uploadPhoto } from "../redux/faceLoginSlice";
import dataURItoImage from "../utils/dataURItoBlob";

const FaceLogin = () => {
  const {
    time,
    ip,
    os,
    device,
    location,
    timezone,
    language,
    browser,
    mainparams,
    randomSession,
    redirectUrl,
  } = CommonData();

  // Add reference to the webcam
  // access the webcam instance and take a screenshot
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const dispatch = useDispatch();
  const { error, upload, picLoading } = useSelector((state) => state.faceLogin);

  // Get the loading state for initSessionID
  const { isLoading } = useSelector((state) => state.init);

  // create a capture function
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

    try {
      // Convert base64 to Blob
      // const imageBlob = dataURItoBlob(imgSrc);
      // Convert data URI to image
      const imageElement = await dataURItoImage(imgSrc);

      // Additional data
      const additionalData = {
        time,
        ip,
        os,
        device,
        location,
        timezone,
        language,
        browser,
        mainparams,
        randomSession,
        redirectUrl,
      };

      // Create FormData and append the image directly
      let formData = new FormData();
      formData.append("image", imageElement);

      // Append additional data to formData
      Object.keys(additionalData).forEach((key) => {
        formData.append(key, additionalData[key]);
      });

      console.log("Data", imageElement, additionalData);
      // Dispatch the action with both formData and additional data
      await dispatch(uploadPhoto({ formData, ...additionalData }));
    } catch (error) {
      // Handle error
      console.error("Error uploading photo:", error);
    }
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

  // Render loading state while initializing session ID
  if (isLoading) {
    return <div>Loading...</div>;
  }

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
                  Upload
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
