import React from "react";
import MyTabs from "../components/MyTabs";
import { useMediaQuery } from "react-responsive";
import DoWellVerticalLogo from "../assets/images/Dowell-logo-Vertical.jpeg";
import sideImage from "../assets/images/sideImage.webp";

const Home = () => {
  // Use media queries to determine the screen size
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <>
      <div className="isolate px-2 py-4 sm:py-8 lg:px-8">
        <div className="shadow-sm  mx-auto max-w-5xl px-2 py-6 md:px-4">
          <div
            className={isMobile ? "flex flex-col items-center" : "flex px-2"}
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
                className="h-full w-32 drop-shadow-lg"
              />
            )}
            <MyTabs />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
