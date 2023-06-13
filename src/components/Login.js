import React from "react";
import { FaBeer } from "react-icons/fa";

const Login = () => {
  return (
    <>
      <div className="antialiased bg-gray-100">
        <div className="flex w-full min-screen items-center justify-center">
          <div className="flex flex-col space-y-6 bg-cyan-700 w-full max-w-4xl p-8 rounded-xl shadow-lg text-white">
            <div className="flex flex-col justify-between space-y-8">
              <div>
                <h1 className="font-bold text-4xl tracking-wide">Contact us</h1>
                <p> This dowell react form </p>
              </div>
              <div className="flex flex-col space-y-6">
                <div className="inline-flex space-x-2 items-center">
                  <FaBeer className="text-teal-300 text-xl" />

                  <span>+(123) 456 7890</span>
                </div>
                <div className="inline-flex space-x-2 items-center">
                  <FaBeer className="text-teal-300 text-xl" />
                  <span>+(123) 456 7890</span>
                </div>
                <div className="inline-flex space-x-2 items-center">
                  <FaBeer className="text-teal-300 text-xl" />
                  <span>+(123) 456 7890</span>
                </div>
              </div>
            </div>

            <div>
              <form>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    for="name"
                  >
                    Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    for="email"
                  >
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="flex items-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
