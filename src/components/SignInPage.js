import React from "react";
import { Link } from "react-router-dom";

const SignInPage = () => {
  return (
    <>
      <div className="antialiased bg-gray-100">
        <div className="flex w-full min-h-screen items-center justify-center">
          <div className="flex flex-col justify-between md:flex-row md:space-x-6 space-y-6 md:space-y-0 bg-amber-50 w-full max-w-3xl p-8 md:p-10 rounded-xl shadow-lg text-gray-500 overflow-hidden">
            <div className="flex flex-col space-y-8">
              <div className="self-start">
                <h1 className="font-medium text-xl tracking-wide bg-green-500 text-white px-4 py-2 rounded-2xl">
                  Member Login
                </h1>
              </div>

              <div className="flex flex-col space-y-2">
                <p className="pt-2 text-gray-500 text-base">
                  Don't remember username and password?
                </p>
                <span className="bg-green-500 text-white px-3 py-2 rounded-xl self-start">
                  Click here
                </span>
              </div>

              <div className="flex flex-col space-y-2">
                <p className="pt-2 text-gray-500 text-base">
                  Don't have an account?
                </p>
                <Link to="/signup">
                  <span className="bg-green-500 text-white px-3 py-2 rounded-xl self-start">
                    Sign up
                  </span>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-amber-100 rounded-2xl drop-shadow-lg p-8 text-gray-700 md:w-80">
                <form className="flex flex-col space-y-4">
                  <div className="mb-3">
                    <label
                      className="block text-gray-700 text-sm font-medium mb-2"
                      for="name"
                    >
                      User Name
                    </label>
                    <input
                      className="form-input"
                      id="name"
                      type="text"
                      placeholder="Enter your username"
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      className="block text-gray-700 text-sm font-medium mb-2"
                      for="name"
                    >
                      Password
                    </label>
                    <input
                      className="form-input"
                      id="password"
                      type="text"
                      placeholder="Enter your password"
                    />
                  </div>

                  <div className="flex items-center">
                    <button className="btn-send" type="button">
                      Log in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
