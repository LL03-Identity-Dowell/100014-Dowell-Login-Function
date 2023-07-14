import React, { useState } from "react";
import { Link } from "react-router-dom";
import DoWellVerticalLogo from "../assets/images/Dowell-logo-Vertical.jpeg";
import QR_Code from "../assets/images/QR-Code.png";
import Samanta from "../assets/images/samanta.webp";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/logoutSlice";

const SignOutPage = () => {
  const [clicked, setClicked] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const dispatch = useDispatch();

  const { loading, error, loggedOut } =
    useSelector((state) => state.logout) || {};

  // Handle button click
  const handleClick = (e) => {
    setClicked(e.target.value);
  };

  // Handle sign out
  const handleSignOut = () => {
    dispatch(logoutUser("s20vytmoshxrt6ma0m5rzc59vp35ikv0"));
    setIsLoggedOut(true);
  };

  // Handle cancel
  const handleCancel = () => {
    window.location.href = "/#";
  };

  return (
    <div className="isolate px-2 py-4 sm:py-12 lg:px-8 flex  justify-center">
      <div className="shadow-sm mx-auto max-w-5xl px-2 py-6 md:px-4">
        <div className="flex items-center justify-center">
          <img
            src={DoWellVerticalLogo}
            alt="DoWell logo"
            className="h-28 w-28 md:h-36 md:w-36 rounded-sm drop-shadow-md"
          />
        </div>
        <div className="pt-6 md:p-8 text-center md:text-left space-y-8">
          <div className="md:flex rounded-xl p-6 md:p-0 dark:bg-slate-800 space-y-6 space-x-2 md:space-x-6 text-gray-500 bg-gray-50 drop-shadow-lg overflow-hidden">
            <div className="pt-6 md:p-8 text-center md:text-left space-y-4 flex flex-col justify-between">
              <h3 className="font-base text-slate-900">
                Scan QR Code to contribute your comments and suggestions about
                this application in 2 minutes and get rewarded!
              </h3>

              <div className="flex space-x-4 mx-auto">
                <img
                  src={QR_Code}
                  alt="QR_Code"
                  className="h-28 w-28 md:h-36 md:w-36 md:rounded-none rounded-md drop-shadow-sm"
                  loading="lazy"
                />
                <div>
                  <img
                    src={Samanta}
                    alt="Samanta"
                    className="h-24 w-24 md:h-32 md:w-32 md:rounded-none rounded-md drop-shadow-sm"
                    loading="lazy"
                  />
                  <p className="font-base text-lg text-slate-900 text-center">
                    Samanta
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl p-8  dark:bg-slate-800 text-gray-500 bg-gray-50 drop-shadow-lg overflow-hidden space-y-4">
            <p className="text-gray-600 mb-4 text-center">
              Thank you, Do you want to exit?
            </p>
            <div className="flex flex-row items-center justify-center">
              {isLoggedOut ? (
                <div className="text-center">
                  <p className="text-green-500">{loggedOut}</p>
                  <div className="w-72 mx-auto flex items-center justify-center rounded-md bg-green-300 space-x-2 px-3.5 py-2.5 mt-8 text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700">
                    <Link to="/">Do have an account? Log in</Link>
                  </div>
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col p-8 rounded-xl dark:bg-slate-800 text-gray-500 bg-gray-50 drop-shadow-lg overflow-hidden space-y-4">
            <p className="text-gray-600 mb-4 text-center">
              Do you wish to recommend this application to your friend?
            </p>
            <div className="flex flex-row items-center justify-center space-x-2">
              {clicked ? (
                <p className="text-center bg-green">
                  Thank you for your response!
                </p>
              ) : (
                <>
                  <button
                    value="Yes"
                    type="button"
                    onClick={handleClick}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Yes
                  </button>

                  <button
                    value="Maybe"
                    type="button"
                    onClick={handleClick}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Maybe
                  </button>

                  <button
                    value="No"
                    type="button"
                    onClick={handleClick}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    No
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignOutPage;
