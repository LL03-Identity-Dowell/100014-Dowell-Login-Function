import React from "react";

const SignUp = () => {
  return (
    <>
      <div>
        <h1 className="font-bold text-3xl tracking-wide mb-2 -mt-2">Sign up</h1>
      </div>
      <form className="flex flex-col space-y-4">
        <div className="mb-3">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            for="name"
          >
            username
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

        <div className="mb-3">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            for="name"
          >
            Confirm Password
          </label>
          <input
            className="form-input"
            id="confirm-password"
            type="text"
            placeholder="Confirm your password"
          />
        </div>

        <div className="mb-3">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            for="name"
          >
            Country
          </label>
          <input
            className="form-input"
            id="country"
            type="text"
            placeholder="Country"
          />
        </div>

        <div className="mb-3">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            for="name"
          >
            Phone
          </label>
          <input
            className="form-input"
            id="phone"
            type="number"
            placeholder="Phone number"
          />
        </div>

        <div className="flex items-center">
          <button className="btn-send" type="button">
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};

export default SignUp;
