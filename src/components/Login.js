import React from "react";
import { MdCall, MdEmail, MdLocationOn } from "react-icons/md";
import { SocialIcon } from "react-social-icons";

const Login = () => {
  return (
    <>
      <div className="antialiased bg-gray-100">
        <div className="flex w-full min-screen items-center justify-center">
          <div className="flex flex-col space-y-6 bg-cyan-700 w-full max-w-4xl p-8 rounded-xl shadow-lg text-white">
            <div className="flex flex-col  justify-between space-y-8">
              <div>
                <h1 className="font-bold text-4xl tracking-wide">Contact us</h1>
                <p> This dowell react form </p>
              </div>
              <div className="flex flex-col space-y-6">
                <div className="inline-flex space-x-2 items-center">
                  <MdCall className="text-teal-300 text-xl" />

                  <span>+(123) 456 7890</span>
                </div>
                <div className="inline-flex space-x-2 items-center">
                  <MdEmail className="text-teal-300 text-xl" />
                  <span>dowell@gmail.com</span>
                </div>
                <div className="inline-flex space-x-2 items-center">
                  <MdLocationOn className="text-teal-300 text-xl" />
                  <span>India, keleketa </span>
                </div>
              </div>

              <div className="flex space-x-4 text-lg">
                <SocialIcon
                  url="https://facebook.com"
                  network="facebook"
                  style={{ height: 25, width: 25 }}
                />
                <SocialIcon
                  url="https://twitter.com"
                  network="twitter"
                  style={{ height: 25, width: 25 }}
                />
                <SocialIcon
                  url="https://linkedin.com"
                  network="linkedin"
                  style={{ height: 25, width: 25 }}
                />
                <SocialIcon
                  url="https://github.com"
                  network="github"
                  style={{ height: 25, width: 25 }}
                />
                <SocialIcon
                  url="https://youtube.com"
                  network="youtube"
                  style={{ height: 25, width: 25 }}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl drop-shadow-lg p-8 text-gray-700">
              <form className="flex -flex-col space-y-4">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    for="name"
                  >
                    Name
                  </label>
                  <input
                    className="form-input"
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
                    className="form-input"
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="flex items-center">
                  <button className="btn-send" type="button">
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
