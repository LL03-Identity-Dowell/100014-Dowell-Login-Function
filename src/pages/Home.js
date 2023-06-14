import React, { useState } from "react";
import Side from "../components/Side";
import SignUp from "../components/SignUp";
import Login from "../components/Login";

const Home = () => {
  const [signIn, setSignIn] = useState(false);

  return (
    <>
      <div className="antialiased bg-gray-100">
        <div className="flex w-full min-h-screen items-center justify-center">
          <div className="flex flex-col justify-between md:flex-row md:space-x-6 space-y-6 md:space-y-0 bg-cyan-700 w-full max-w-4xl p-8 md:p-10 rounded-xl shadow-lg text-white overflow-hidden">
            <Side />

            <div className="relative">
              <div className="absolute z-0 w-40 h-40 bg-teal-400 rounded-full -right-28 -top-28"></div>
              <div className="absolute z-0 w-40 h-40 bg-teal-400 rounded-full -left-28 -bottom-16"></div>
              <div className="relative z-10 bg-white rounded-2xl drop-shadow-lg p-8 text-gray-700 md:w-80">
                {/* <Login /> */}
                <SignUp />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
