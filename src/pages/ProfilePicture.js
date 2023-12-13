import React, { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { MdAddAPhoto, MdLogin } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import DoWellVerticalLogo from "../assets/images/Dowell-logo-Vertical.jpeg";
import CameraPhoto from "../components/CameraPhoto";
import UploadPhoto from "../components/UploadPhoto";

const ProfilePicture = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();

  const handleComponentChange = (component, buttonName) => {
    setActiveComponent(component);
    setActiveButton(buttonName);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 mx-auto mt-0">
      <div className="max-w-screen-lg bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="p-8 text-center">
          <img
            className="h-28 w-28 mx-auto object-cover rounded-full mb-4"
            src={DoWellVerticalLogo}
            alt="Dowell logo"
            loading="lazy"
          />
          <h1 className="uppercase tracking-wide text-sm text-gray-900 font-semibold mb-6">
            Log-in using different ways
          </h1>

          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <button
              className={`flex items-center justify-center h-10 px-6 font-semibold rounded-md border md:mb-0 ${
                activeButton === "camera" ? "bg-green-900" : "bg-green-500"
              } hover:bg-green-600 text-white`}
              type="submit"
              onClick={() => handleComponentChange(<CameraPhoto />, "camera")}
            >
              <MdAddAPhoto className="mr-2" />
              Take Photo
            </button>

            <button
              className={`flex items-center justify-center h-10 px-6 font-semibold rounded-md border mb-2 md:mb-0 ${
                activeButton === "upload" ? "bg-green-900" : "bg-green-500"
              } hover:bg-green-600 text-white`}
              type="button"
              onClick={() => handleComponentChange(<UploadPhoto />, "upload")}
            >
              <FaFileUpload className="mr-2" />
              Upload Photo
            </button>

            <button
              className={`flex items-center justify-center h-10 px-6 font-semibold rounded-md border ${
                activeButton === "login" ? "bg-green-900" : "bg-green-500"
              } hover:bg-green-600 text-white`}
              type="button"
              onClick={() => navigate("/")}
              disabled={!activeComponent}
            >
              <MdLogin className="mr-2" />
              Login
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto">{activeComponent}</div>
    </div>
  );
};

export default ProfilePicture;
