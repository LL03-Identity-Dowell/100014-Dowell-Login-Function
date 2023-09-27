import React, { useEffect } from "react";
import MyTabs from "../components/MyTabs";
import { useMediaQuery } from "react-responsive";
import DoWellVerticalLogo from "../assets/images/Dowell-logo-Vertical.jpeg";
import sideImage from "../assets/images/sideImage.webp";
import { useDispatch, useSelector } from "react-redux";
import { initSessionID } from "../redux/initSlice";
import { Radio } from "react-loader-spinner";

const Home = () => {
  // Use media queries to determine the screen size
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const dispatch = useDispatch();
  const { initSession, isLoading, error } = useSelector((state) => state.init);

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

  const handleLoadingPage = async (e) => {
    const userData = {
      mainparams,
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

  return (
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
      ) : (
        <div className="isolate py-4 md:px-4">
          <div className="shadow-sm mx-auto max-w-5xl px-2 py-4 md:px-6">
            <div
              className={isMobile ? "flex flex-col items-center" : "flex p-2"}
            >
              {isMobile ? (
                <img
                  src={DoWellVerticalLogo}
                  alt="DoWell logo"
                  className="h-28 w-28 rounded-full drop-shadow-md"
                />
              ) : (
                <img
                  src={sideImage}
                  alt="DoWell logo"
                  className="mt-4 h-full w-32 drop-shadow-lg border border-solid border-black"
                />
              )}

              <MyTabs />
            </div>
          </div>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};

export default Home;
