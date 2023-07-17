import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/loginSlice";
import { getOperatingSystem, getDeviceType } from "../utils/deviceUtils";
import Coordinate from "../utils/Coordinate";
import { detectBrowser } from "../utils/browserUtils";
import { Radio } from "react-loader-spinner";
import LanguageDropdown from "./LanguageDropdown";

const LogIn = () => {
  const { userInfo, loading, error } =
    useSelector((state) => state.login) || {};
  const dispatch = useDispatch();

  const currentTime = new Date().toLocaleTimeString();
  const operatingSystem = getOperatingSystem();
  const device = getDeviceType();
  const location = Coordinate();
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [userLanguage, setUserLanguage] = useState(navigator.language);
  const browserType = detectBrowser();

  // Handle user information
  const handleUserInfo = async (e) => {
    e.preventDefault();

    const { username, password } = e.target.elements;

    const userData = {
      username: username.value,
      password: password.value,
      time: currentTime,
      ip: "",
      os: operatingSystem,
      device: device,
      location: location,
      timezone: userTimezone,
      language: userLanguage,
      browser: browserType,
    };

    try {
      const response = await dispatch(loginUser(userData));
      const sessionID = response.payload.session_id;

      // Redirect to the desired page
      window.location.href = `https://100093.pythonanywhere.com/home?session_id=${sessionID}`;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  // Handle language change
  const handleLanguageChange = (language) => {
    setUserLanguage(language);
  };

  return (
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
            <Link to="/password">
              <span className="text-green-500 text-base">Click here</span>
            </Link>
          </div>

          <div className="text-gray-500 text-base">
            <p>Don't have an account?</p>
            <Link to="/signup">
              <span className="text-green-500 text-base">Sign up</span>
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="relative z-10 bg-yellow-50 rounded-2xl drop-shadow-md p-6 text-gray-700 w-full">
            <div className="flex space-x-2">
              <p>Select your language</p>
              <LanguageDropdown
                selectedLanguage={userLanguage}
                onLanguageChange={handleLanguageChange}
              />
            </div>
            <form className="flex flex-col space-y-4" onSubmit={handleUserInfo}>
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
                  Password <span className="text-red-500">*</span>
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
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? (
                    <Radio
                      visible={true}
                      height={30}
                      width={30}
                      ariaLabel="radio-loading"
                      wrapperStyle={{}}
                      wrapperClassName="radio-wrapper"
                      color="#1ff507"
                    />
                  ) : (
                    "Login"
                  )}
                </button>
                <p className="text-green-500 font-base">{userInfo}</p>
                {error && <p>{error}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
