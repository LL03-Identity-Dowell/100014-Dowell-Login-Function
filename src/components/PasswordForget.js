import React from "react";
import { Link } from "react-router-dom";
import DoWellVerticalLogo from "../assets/images/Dowell-logo-Vertical.jpeg";

const PasswordForget = () => {
  return (
    <div className="flex relative flex-col md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center">
      <div className="py-8 md:col-span-2 space-y-4 my-10">
        <div>
          <div className="flex items-center justify-center space-x-2 px-2 sm:px-0">
            <img
              src={DoWellVerticalLogo}
              alt="DoWell logo"
              className="h-28 w-34 rounded-full drop-shadow-sm"
            />
            <h3 className="text-lg uppercase md:text-xl text-center font-bold leading-6 text-green-600">
              Forget Password
            </h3>
          </div>

          <div className="flex text-green-600 space-x-2 py-2 px-2 text-left">
            <p>If you forget username</p>
            <Link to="/username">
              <span className="text-gray-900">Click Here</span>
            </Link>
          </div>
        </div>

        <form>
          <div className="overflow-hidden drop-shadow-2xl sm:rounded-2xl bg-yellow-50">
            <div className="px-4 py-2 sm:p-6 space-y-4">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold leading-6 text-green-700"
                >
                  username
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="input-filed"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 text-green-700"
                >
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="input-filed"
                  />
                </div>
              </div>

              <div className="">
                <label
                  className="block text-sm font-semibold leading-6 text-green-700"
                  for="otp-email"
                >
                  Enter OTP from Email
                </label>
                <input
                  type="text"
                  name="otp-email"
                  placeholder="otp-email"
                  id="otp-email"
                  autoComplete="otp-email"
                  className="input-filed"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="new-password"
                  className="block text-sm font-semibold leading-6 text-green-700"
                >
                  New Password
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="new-password"
                    id="new-password"
                    autoComplete="new-password"
                    className="input-filed"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-semibold leading-6 text-green-700"
                >
                  Confirm Password
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="confirm-password"
                    id="confirm-password"
                    autoComplete="confirm-password"
                    className="input-filed"
                  />
                </div>
              </div>
            </div>

            <div className="px-4 py-2 text-center md:text-left sm:px-6">
              <button type="submit" className="btn-send">
                Change password
              </button>
            </div>

            <div className="text-gray-500 space-x-2 py-2 px-6 text-right">
              Do have an account?
              <Link to="/signin">
                <span className="text-gray-800"> Log in</span>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordForget;
