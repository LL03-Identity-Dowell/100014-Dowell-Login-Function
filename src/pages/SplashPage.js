import React from "react";
import { useNavigate, useParams } from "react-router-dom";

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
      <div className="w-full space-y-4 md:space-y-8 text-gray-500 bg-gray-50 shadow-lg max-w-3xl rounded-xl p-6">
        <h1 className="text-2xl mb-4 text-center">
          Welcome to our Splash Page!
        </h1>
        <p id="message" className="text-gray-600 mb-4 text-center">
          User <strong className="underline text-green-500">{Username}</strong>
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
  );
};

export default SplashPage;
