import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/loginSlice";
import { getOperatingSystem, getDeviceType } from "../utils/deviceUtils";
import { detectBrowser } from "../utils/browserUtils";
import { Radio, RotatingLines } from "react-loader-spinner";
import LanguageDropdown from "./LanguageDropdown";
import Coordinate from "../utils/Coordinate";
import Timer from "../assets/images/count_up.gif";
import Iframe from "react-iframe";

const LogIn = () => {
  const [userLanguage, setUserLanguage] = useState("en");
  const [showTimer, setShowTimer] = useState(false);

  // Define a ref for username
  const usernameRef = useRef("");

  const { userInfo, loading, error } =
    useSelector((state) => state.login) || {};

  // Get the random session ID from the Redux store
  const { initSession } = useSelector((state) => state.init);

  const randomSession = initSession.random_session;

  // Access the dispatch function
  const dispatch = useDispatch();

  const time = new Date().toLocaleTimeString();
  const os = getOperatingSystem();
  const device = getDeviceType();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const browser = detectBrowser();
  const location = Coordinate();

  // Get the query parameters
  const urlString = window.location.href;
  const paramString = urlString.split("?")[1];
  const queryString = new URLSearchParams(paramString);
  const query = queryString.toString();

  // Check if there are query parameters before proceeding
  const mainparams = query
    ? Array.from(queryString.entries())
        .map(([key, value]) => `${key}=${value}`)
        .join("&")
    : "";

  // Handle user information
  const handleUserInfo = async (e) => {
    e.preventDefault();

    const { username, password } = e.target.elements;

    const userData = {
      username: username.value,
      password: password.value,
      time,
      ip: "",
      os,
      device,
      timezone,
      language: userLanguage,
      browser,
      location,
      randomSession,
      mainparams,
    };

    try {
      const response = await dispatch(loginUser(userData));
      const sessionID = response?.payload?.session_id;
      const URL = response?.payload?.url;

      if (sessionID) {
        // Redirect to specific url
        window.location.href = `${URL}`;
      }

      // Update the username ref
      usernameRef.current = username.value;
    } catch (error) {
      throw new Error(error.response?.data.info);
    }
  };

  // Handle language change
  const handleLanguageChange = (language) => {
    setUserLanguage(language);
  };

  // use setTimeout to hide the timer after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTimer(true);
    }, 1000);

    // Cleanup the timer when component unmounts or loading is complete
    return () => clearTimeout(timer);
  }, []);

  // Iframe URL
  const iframeURL = () => {
    const url = `https://100014.pythonanywhere.com/check_status?username=${usernameRef.current}`;
    console.log("Iframe URL:", url);
    return url;
  };

  // Create a variable for the content to be displayed in the iframe
  const iframeContent = `
  <html>
    <head>
      <!-- Any necessary CSS or head content can be placed here -->
    </head>
    <body>
    <p>Logging In</p>
    <p>Connecting to UX Living Lab</p>
    <p>Verifying User</p>
    </body>
  </html>
`;

  return (
    <>
      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="flex relative w-48 h-48">
            {/* Spinner */}
            <div className="block absolute top-0 left-0 w-full h-full justify-center items-center z-20">
              <RotatingLines
                visible={true}
                height={96}
                width={96}
                ariaLabel="radio-loading"
                wrapperStyle={{}}
                color="#1ff507"
                strokeWidth="5"
              />
            </div>

            {/* Timer (background) */}
            {showTimer && (
              <div className="block bg-no-repeat w-10 h-12 absolute top-10 left-8 z-10 opacity-60">
                <img src={Timer} alt="Loading timer" />
              </div>
            )}
          </div>
          <Iframe
            url={iframeURL()}
            width="100%"
            height="330px"
            id="myiFrame"
            className="py-4 px-6"
            display="initial"
            srcDoc={iframeContent} // Use srcDoc to set the HTML content of the iframe
          />
        </div>
      ) : (
        <div className="flex w-full items-center justify-center">
          <div className="flex flex-col justify-between md:flex-row md:space-x-4 space-y-2 md:space-y-0 bg-yellow-50 w-full max-w-3xl p-4 md:p-6 rounded-xl shadow-lg text-gray-500 overflow-hidden">
            <div className="flex flex-col space-y-8 bg-gradient-to-r from-yellow-50 to-gray-50">
              <h2 className="text-2xl bg-green-600 bg-clip-text text-transparent">
                Member Login
              </h2>

              <div className="flex flex-col space-y-2">
                <p className=" text-gray-500 text-base">
                  Don't remember username and password?
                </p>
                <Link to="/beta/forgotPassword">
                  <span className="text-green-500 text-base">Click here</span>
                </Link>
              </div>

              <div className="text-gray-500 text-base">
                <p>Don't have an account?</p>
                <Link to={`/beta/signup?${mainparams}`}>
                  <span className="text-green-500 text-base">Sign up</span>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-yellow-50 rounded-2xl drop-shadow-md p-6 text-gray-700 w-80 space-y-2">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <p className="label">Select your language</p>
                  <LanguageDropdown
                    selectedLanguage={userLanguage}
                    onLanguageChange={handleLanguageChange}
                  />
                </div>
                <form
                  className="flex flex-col space-y-4"
                  onSubmit={handleUserInfo}
                >
                  <div>
                    <label htmlFor="username" className="label">
                      User Name <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter Your Username"
                        autoComplete="username"
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="label">
                      Password<span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter Your Password"
                        autoComplete="password"
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="submit-btn"
                      disabled={loading}
                    >
                      Login
                    </button>

                    {userInfo && (
                      <p className="text-green-500 font-base">
                        {userInfo.info}
                      </p>
                    )}

                    {error && <p className="text-red-500">{error}</p>}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogIn;
