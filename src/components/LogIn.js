import React from "react";
import { Link } from "react-router-dom";
import DoWellVerticalLogo from "../assets/images/Dowell-logo-Vertical.jpeg";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup.object({
  userName: yup
    .string()
    .required("User Name is required")
    .max(20)
    .notOneOf(
      ["administrator", "uxlivinglab", "dowellresearch", "dowellteam", "admin"],
      "Username not allowed"
    ),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(99),
});

const LogIn = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => console.log(data);
  return (
    <>
      <div className="antialiased bg-gray-100">
        <div className="flex w-full min-h-screen items-center justify-center">
          <div className="flex flex-col justify-between md:flex-row md:space-x-6 space-y-6 md:space-y-0 bg-gray-50 w-full max-w-3xl p-8 md:p-10 rounded-xl shadow-lg text-gray-500 overflow-hidden">
            <div className="flex flex-col space-y-8">
              <div className="flex items-center mx-auto max-w-2xl justify-center space-x-2 px-2 sm:px-0">
                <img
                  src={DoWellVerticalLogo}
                  alt="DoWell logo"
                  className="h-28 w-38 rounded-full drop-shadow-sm"
                />
                <h2 className="text-2xl font-bold tracking-tight text-green-600 md:text-3xl">
                  Member Login
                </h2>
              </div>

              <div className="flex flex-col space-y-2">
                <p className="pt-2 text-gray-500 text-base">
                  Don't remember username and password?
                </p>
                <Link to="/password">
                  <span className="text-green-600 text-center">Click here</span>
                </Link>
              </div>

              <div className="flex text-gray-500 text-base space-x-2">
                <p>Don't have an account?</p>
                <Link to="/signup">
                  <span className="text-green-600">Sign up</span>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-yellow-50 rounded-2xl drop-shadow-lg p-8 text-gray-700 md:w-80">
                <form
                  className="flex flex-col space-y-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div>
                    <label
                      htmlFor="userName"
                      className="block text-sm font-semibold leading-6 text-green-700"
                    >
                      User Name
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="userName"
                        id="userName"
                        autoComplete="userName"
                        className="input-filed"
                        {...register("userName")}
                      />
                      {errors.userName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.userName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold leading-6 text-green-700"
                    >
                      Password
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="password"
                        className="input-filed"
                        {...register("password")}
                      />
                      {errors.password && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
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

export default LogIn;
