import React from "react";
import { useNavigate } from "react-router-dom";
import DoWellVerticalLogo from "../assets/images/Dowell-logo-Vertical.jpeg";

const ProfilePicture = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="md:flex max-w-md mx-auto bg-gray-100 rounded-xl drop-shadow-lg overflow-hidden md:max-w-3xl">
        <div className="md:shrink-0">
          <img
            class="h-24 w-24 mx-auto object-cover rounded-full md:w-48 md:h-auto md:rounded-none"
            src={DoWellVerticalLogo}
            alt="Dowell logo"
            loading="lazy"
          />
        </div>

        <div className="p-8 text-center md:text-left space-y-8 mx-auto">
          <h1 className="uppercase tracking-wide text-sm text-gray-900 font-semibold">
            Face Authentication by FaceIO
          </h1>

          <div className="text-center md:text-left space-y-6">
            <div className="flex space-x-4">
              <button
                className="h-10 px-6 font-semibold rounded-md border bg-green-500 hover:bg-green-700 text-white"
                type="submit"
                onClick={() => navigate("/camera-photo")}
              >
                Open Camera
              </button>
              <button
                className="h-10 px-6 font-semibold rounded-md border bg-green-500 hover:bg-green-700 text-white"
                type="button"
                onClick={() => navigate("/upload-photo")}
              >
                Upload Photo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePicture;
