import React, { useState } from "react";
import { MdAddAPhoto } from "react-icons/md";
import { RiArrowLeftCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UploadPhoto = () => {
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const handlePicUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("avatar", avatar);
      console.log("FormData:", formData);
      toast.success("Photo uploaded successfully 🚀");
    } catch (error) {
      toast.error("An error occurred during photo upload.");
      console.log("Error during photo upload:", error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4 mx-auto">
      <RiArrowLeftCircleLine
        className="bg-white text-green-500 absolute top-0 left-0 m-4 w-7 h-7 shadow-md rounded-full"
        onClick={handleBack}
      />
      <div className="mt-4 p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center justify-center">
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-white p-4 rounded-lg border border-gray-300 hover:border-gray-400 focus:outline-none focus:border-cyan-500"
        >
          {avatar ? (
            <img
              src={URL.createObjectURL(avatar)}
              alt="User Avatar"
              className="h-24 w-24 object-cover rounded-full mb-4"
            />
          ) : (
            <MdAddAPhoto className="h-24 w-24 text-gray-400 object-cover" />
          )}
          <span className="text-sm text-green-500">
            {avatar ? "Change avatar" : "Upload a file"}
          </span>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="sr-only"
            onChange={(e) => {
              setAvatar(e.target.files[0]);
              console.log("Selected avatar:", e.target.files[0]);
            }}
          />
        </label>
        <p className="text-xs text-gray-600 mt-2">
          {avatar ? "PNG, JPG, GIF up to 10MB" : "or drag and drop"}
        </p>
      </div>

      <button
        type="button"
        className="h-10 px-6 font-semibold rounded-md border bg-green-500 hover:bg-green-700 text-white"
        onClick={handlePicUpload}
      >
        Upload Photo
      </button>
    </div>
  );
};

export default UploadPhoto;
