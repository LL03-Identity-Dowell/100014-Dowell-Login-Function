import React, { useEffect, useState } from "react";
import MyTabs from "../components/MyTabs";
import { useDispatch, useSelector } from "react-redux";
import { initSessionID } from "../redux/initSlice";
import { Radio } from "react-loader-spinner";
import { Navigate, useLocation } from "react-router-dom";
import useLocationEnabled from "../utils/useLocationEnabled";
import "../../src/index.css";
import samanta from "../assets/images/samanta.png";
import { MdMessage } from "react-icons/md";

const Home = () => {
  const dispatch = useDispatch();
  const { initSession, isLoading, error } = useSelector((state) => state.init);
  const [isFirefox, setIsFireFox] = useState(false);
  const isLocationEnabled = useLocationEnabled();
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

  // Use the useLocation hook to access the URL parameters
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    let userBrowser = navigator.userAgent;
    if (userBrowser.includes("Firefox")) {
      setIsFireFox(true);
    } else {
      setIsFireFox(false);
    }
    // document.getElementById("tooltipText").classList.add("expand");
    setTimeout(() => {
      document.getElementById("tooltipText").classList.add("expand");
    }, 500);
  }, []);

  // Extract the redirect_url parameter from the query parameters
  const redirectUrl = queryParams.get("redirect_url");

  const handleLoadingPage = async (e) => {
    const userData = {
      mainparams,
      redirectUrl,
    };

    try {
      const response = await dispatch(initSessionID(userData));
      const message = response?.payload?.msg;
      const URL = response?.payload?.url;

      if (message === "error") {
        // Redirect to specific url
        window.location.href = `${URL}`;
      }
    } catch (error) {
      throw new Error("An error occurred while initializing session.");
    }
  };

  useEffect(() => {
    if (!initSession) {
      handleLoadingPage();
    }
  }, []);
  const askLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) =>
        //console.log(position)
        position
    );
  };

  useEffect(() => {
    askLocation();
  }, []);

  return (
    <div className="mainContainer">
      {!isLocationEnabled ? (
        <div
          className="locationBanner"
          onClick={() => {
            askLocation();
          }}
        >
          <h1 className="locationText">Click allow location to proceed.</h1>
          {isFirefox && (
            <>
              <p className="smallText">
                Please check the "
                <span className="boldText">Remember this decision</span>" box on
                Firefox
              </p>
              <div className="fireFoxBox smallText">
                {" "}
                <input
                  type="checkbox"
                  checked={true}
                  className="firefoxCheckbox"
                />{" "}
                Remember this decision{" "}
              </div>{" "}
            </>
          )}
        </div>
      ) : (
        <>
          {isLoading ? (
            <div className="flex justify-center items-center h-screen">
              <Radio
                visible={true}
                height={90}
                width={90}
                ariaLabel="radio-loading"
                wrapperStyle={{}}
                wrapperClassName="radio-wrapper"
                color="#1ff507"
              />
            </div>
          ) : error ? (
            <Navigate to="/503" />
          ) : (
            <div className="isolate md:py-4 md:px-4">
              <div className="shadow-sm mx-auto md:mt-14 max-w-5xl px-2 py-2 md:py-6 md:px-6">
                <MyTabs />
              </div>
            </div>
          )}
        </>
      )}
      <div className="samantaContainer">
        <div className="SamantaTooltip">
          <div className="tooltipText" id="tooltipText">
            {" "}
            Samanta is here to help you!{" "}
          </div>
        </div>
        <img src={samanta} alt="Samanta" className="samantaImage" />
        <div className="SamantaMessageIcon">
          {" "}
          <MdMessage fontSize="32px" color="white" />{" "}
        </div>
      </div>
    </div>
  );
};

export default Home;
