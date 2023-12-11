import React, { useState } from "react";
import DoWellVerticalLogo from "../assets/images/Dowell-logo-Vertical.jpeg";
import CameraPhoto from "../components/CameraPhoto";
import UploadPhoto from "../components/UploadPhoto";

const ProfilePicture = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="md:flex max-w-md mx-auto bg-gray-100 rounded-xl drop-shadow-lg md:max-w-3xl">
        <div className="md:shrink-0">
          <img
            className="h-24 w-24 mx-auto object-cover rounded-full md:w-48 md:h-auto md:rounded-none"
            src={DoWellVerticalLogo}
            alt="Dowell logo"
            loading="lazy"
          />
        </div>

        <div className="p-8 text-center md:text-left space-y-8 mx-auto">
          <h1 className="uppercase tracking-wide text-sm text-gray-900 font-semibold">
            Face Authentication by FaceIO
          </h1>

          <div className="text-center md:text-left space-y-8">
            <div className="flex space-x-4">
              <button
                className="h-10 px-6 font-semibold rounded-md border bg-green-500 hover:bg-green-700 text-white"
                type="submit"
                onClick={() => handleComponentChange(<CameraPhoto />)}
              >
                Open Camera
              </button>
              <button
                className="h-10 px-6 font-semibold rounded-md border bg-green-500 hover:bg-green-700 text-white"
                type="button"
                onClick={() => handleComponentChange(<UploadPhoto />)}
              >
                Upload Photo
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">{activeComponent}</div>
    </div>
  );
};

export default ProfilePicture;
