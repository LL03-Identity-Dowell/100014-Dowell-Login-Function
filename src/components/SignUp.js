import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="flex relative flex-col md:text-left md:flex-row  max-w-7xl px-10 justify-evenly mx-auto items-center">
      <div className="py-8 md:col-span-2 space-y-8 my-10">
        <div className="px-4 sm:px-0">
          <h3 className="text-xl uppercase md:text-2xl text-center font-bold leading-6 text-gray-900">
            Join us new member
          </h3>
        </div>
        <form>
          <div className="overflow-hidden drop-shadow-2xl sm:rounded-2xl bg-amber-100 ">
            <div className=" px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    for="name"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Sender name"
                    id="name"
                    autoComplete="name"
                    className="form-input"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    for="name"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Sender name"
                    id="name"
                    autoComplete="name"
                    className="form-input"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    for="name"
                  >
                    User Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Sender name"
                    id="name"
                    autoComplete="name"
                    className="form-input"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    for="name"
                  >
                    User Type
                  </label>

                  <select
                    name="product"
                    placeholder="Products"
                    required
                    className="mt-1 block w-full border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option selected>Live User</option>
                    <option value="betatester">Beta Tester</option>
                  </select>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    for="name"
                  >
                    Password
                  </label>
                  <input
                    type="text"
                    name=" Password"
                    placeholder="Password"
                    id=" Password"
                    autoComplete=" Password"
                    className="form-input"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    for="name"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="text"
                    name="Confirm Password"
                    placeholder="Confirm Password"
                    id="Confirm Password"
                    autoComplete="Confirm Password"
                    className="form-input"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    for="name"
                  >
                    Country
                  </label>

                  <select
                    name="product"
                    placeholder="Products"
                    required
                    className="mt-1 block w-full border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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

                <div className="col-span-6 sm:col-span-3">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    for="name"
                  >
                    Country Code
                  </label>
                  <input
                    type="text"
                    name="country-code"
                    placeholder="Country Code"
                    id="country-code"
                    autoComplete="country-ode"
                    className="form-input"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    for="phone"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="Phone"
                    autoComplete="phone"
                    className="form-input"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    for="phone"
                  >
                    Enter OTP from SMS
                  </label>
                  <input
                    type="text"
                    name="receiver-name"
                    placeholder="Enter OTP from SMS"
                    id="receiver-name"
                    autoComplete="receiver-name"
                    className="form-input"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    for="name"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="email-address"
                    placeholder="Sender Email"
                    id="email-address"
                    autoComplete="email"
                    className="form-input"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    for="name"
                  >
                    Enter OTP from email
                  </label>
                  <input
                    type="text"
                    name="email-address"
                    placeholder="Receiver Email"
                    id="email-address"
                    autoComplete="email"
                    className="form-input"
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 text-center md:text-left sm:px-6">
              <button type="submit" className="btn-send">
                SignUp
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

export default SignUp;
