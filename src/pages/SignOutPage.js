import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DoWellVerticalLogo from "../assets/images/Dowell-logo-Vertical.jpeg";
import QR_Code from "../assets/images/QR-Code.png";
import Samanta from "../assets/images/samanta.webp";

const SignOutPage = () => {
  const navigate = useNavigate();
  const [recommendation, setRecommendation] = useState("");

  const handleClick = (e) => {
    setRecommendation(e.target.value);
    document.querySelector(".thank-you").classList.add("show");
  };

  const handleSignOut = () => {
    navigate("/");
  };

  const handleCancel = () => {
    // navigate(`https://100093.pythonanywhere.com/home?session_id=${session_id}`);
  };

  return (
    <div className="isolate px-2 py-4 sm:py-12 lg:px-8 flex justify-center">
      <div className="shadow-sm mx-auto max-w-5xl px-2 py-6 md:px-4">
        <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
          <img
            src={DoWellVerticalLogo}
            alt="DoWell logo"
            className="h-34 w-44 rounded-sm drop-shadow-md"
          />

          <div className="md:flex rounded-xl p-8 md:p-0 dark:bg-slate-800 space-y-6 space-x-2 md:space-x-6 text-gray-500 bg-gray-50 drop-shadow-lg overflow-hidden">
            <div className="pt-6 md:p-8 text-center md:text-left space-y-4 flex flex-col justify-between">
              <p className="font-base text-xl text-slate-900">
                Scan QR Code to contribute your comments and suggestions about
                this application in 2 minutes and get rewarded!
              </p>

              <div className="flex space-x-4 mx-auto">
                <img
                  src={QR_Code}
                  alt="QR_Code"
                  className="w-24 h-24 md:w-36 md:h-52 md:rounded-none rounded-md drop-shadow-sm"
                />
                <div>
                  <img
                    src={Samanta}
                    alt="Samanta"
                    className="w-24 h-24 md:w-32 md:h-48 md:rounded-none rounded-md drop-shadow-sm"
                  />
                  <p className="font-base text-lg text-slate-900 text-center">
                    Samanta
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-gray-600 mb-4 text-center">
              Thank you, Do you want to exit?
            </p>
            <div className="flex flex-row items-center justify-center mt-20">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
                onClick={handleSignOut}
              >
                Yes
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleCancel}
              >
                No
              </button>
            </div>
          </div>

          <div className="md:flex rounded-xl p-8 md:p-0 dark:bg-slate-800 space-y-6 space-x-2 md:space-x-6 text-gray-500 bg-gray-50 drop-shadow-lg overflow-hidden">
            <h3>Do you wish to recommend this application to your friend?</h3>
            <button
              value="Yes"
              type="button"
              onClick={handleClick}
              className="btn btn-primary"
            >
              Yes
            </button>
            <button
              value="No"
              type="button"
              onClick={handleClick}
              className="btn btn-secondary"
            >
              No
            </button>
            <button
              value="Maybe"
              type="button"
              onClick={handleClick}
              className="btn btn-warning"
            >
              Maybe
            </button>
            <div
              class="thank-you text-center bg-primary"
              style={{ display: "none" }}
            >
              Thank you for your response!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignOutPage;
