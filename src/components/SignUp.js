import React from "react";
import { MdCall } from "react-icons/md";
import DoWellVerticalLogo from "../assets/images/Dowell-logo-Vertical.jpeg";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="isolate bg-gray-50 px-6 py-14 sm:py-18 lg:px-8">
      <div className="flex items-center mx-auto max-w-2xl justify-center space-x-2 px-2 sm:px-0">
        <img src={DoWellVerticalLogo} alt="DoWell logo" className="h-36 w-44" />
        <h2 className="text-2xl font-bold tracking-tight text-green-600 md:text-4xl">
          Join us new member
        </h2>
      </div>
      <form
        action="#"
        method="POST"
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-green-700"
            >
              First name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="input-filed"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold leading-6 text-green-700"
            >
              Last name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className="input-filed"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="user-name"
              className="block text-sm font-semibold leading-6 text-green-700"
            >
              user name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="user-name"
                id="user-name"
                autoComplete="user-name"
                className="input-filed"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="user-type"
              className="block text-sm font-semibold leading-6 text-green-700"
            >
              user type
            </label>
            <div className="mt-2.5">
              <select
                name="user-type"
                placeholder="user-type"
                required
                className="input-filed"
              >
                <option selected>Live User</option>
                <option value="beta-tester">Beta Tester</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold leading-6 text-green-700"
            >
              password
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="password"
                id="password"
                autoComplete="password"
                className="input-filed"
              />
            </div>
          </div>

          <div>
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

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-semibold leading-6 text-green-700"
            >
              Country
            </label>

            <div className="mt-2.5">
              <select
                name="product"
                placeholder="Products"
                required
                className="input-filed"
              >
                <option selected>India</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Germany">Germany</option>
                <option value="USA">USA</option>
                <option value="Ghana">Ghana</option>
                <option value="England">England</option>
                <option value="Bangladish">Bangladish</option>
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="country-code"
              className="block text-sm font-semibold leading-6 text-green-700"
            >
              Country Code
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="country-code"
                id="country-code"
                autoComplete="country-code"
                className="input-filed"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phone-number"
              className="block text-sm font-semibold leading-6 text-green-700"
            >
              Phone number
            </label>

            <div className="relative mt-2.5">
              <div className="absolute inset-y-0 left-0 flex items-center">
                <label htmlFor="country" className="sr-only">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                >
                  <option>US</option>
                  <option>CA</option>
                  <option>EU</option>
                </select>
                <MdCall
                  className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="tel"
                name="phone-number"
                id="phone-number"
                autoComplete="tel"
                className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="otp-sms"
              className="block text-sm font-semibold leading-6 text-green-700"
            >
              Enter OTP from sms
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="otp-sms"
                id="otp-sms"
                autoComplete="otp-sms"
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

          <div>
            <label
              htmlFor="otp-email"
              className="block text-sm font-semibold leading-6 text-green-700"
            >
              Enter OTP from email
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="otp-email"
                id="otp-email"
                autoComplete="otp-email"
                className="input-filed"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-gray-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
          >
            Sign up
          </button>
        </div>

        <div className="text-gray-500 space-x-2 py-2 px-6 text-right">
          Do have an account?
          <Link to="/signin">
            <span className="text-gray-800"> Log in</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
