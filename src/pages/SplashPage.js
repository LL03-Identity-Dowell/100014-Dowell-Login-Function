import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import DoWellVerticalLogo from "../assets/images/Dowell-logo-Vertical.jpeg";

const SplashPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/signin");
  };

  const handleCancel = () => {
    navigate("/signup");
  };

  const { Username } = useParams();

  return (
    <div className="antialiased bg-gray-100 flex items-center justify-center h-screen">
      <div className="w-full flex flex-col md:flex-row space-y-6 space-x-2 md:space-x-6 p-6 items-center justify-center  text-gray-500 bg-gray-50 drop-shadow-lg max-w-3xl rounded-xl">
        <img
          src={DoWellVerticalLogo}
          alt="DoWell logo"
          className="h-38 w-44 rounded-lg drop-shadow-sm bg-slate-100 "
          width="60"
          height="88"
        />
        <div className="min-w-0 relative flex-auto space-y-8">
          <h1 className="font-bold text-xl text-slate-900 truncate text-center">
            Welcome to UXLiving Lab!
          </h1>
          <p className="text-gray-600 mb-4 text-center">
            User{" "}
            <strong className="underline text-green-500">{Username}</strong>
            successfully registered!
          </p>
          <div className="flex flex-row items-center justify-center mt-20">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
