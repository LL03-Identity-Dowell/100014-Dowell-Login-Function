import React from "react";
import { Link } from "react-router-dom";
import DoWellVerticalLogo from "../assets/images/Dowell-logo-Vertical.jpeg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  userName: yup
    .string()
    .required("User Name is required")
    .max(20)
    .notOneOf(
      ["administrator", "uxlivinglab", "dowellresearch", "dowellteam", "admin"],
      "Username not allowed"
    ),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(99),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  otp: yup.string().required("OTP required"),
});

const PasswordForget = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => console.log(data);

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

          <div className="flex text-gray-600 space-x-2 py-2 px-2 text-left">
            <p>Do you forget username?</p>
            <Link to="/username">
              <span className="text-green-600">Click here</span>
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="overflow-hidden drop-shadow-2xl sm:rounded-2xl bg-yellow-50">
            <div className="px-4 py-2 sm:p-6 space-y-4">
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
                    className={`input-filed ${
                      errors.userName ? "border-red-500" : ""
                    }`}
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
                    className={`input-filed ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="mt-2.5">
                  <div className="flex flex-row space-x-3 items-center">
                    <button className="btn-send px-2 py-1 self-start">
                      Get OTP
                    </button>
                    <p className="text-green-500 font-base">message</p>
                  </div>
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
                  id="otp-email"
                  autoComplete="otp-email"
                  className="input-filed"
                  {...register("otp")}
                />
                {errors.otp && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.otp.message}
                  </p>
                )}
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

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-semibold leading-6 text-green-700"
                >
                  Confirm Password
                </label>
                <div className="mt-2.5">
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirm-password"
                    autoComplete="confirm-password"
                    className="input-filed"
                    {...register("confirmPassword", { min: 8, max: 99 })}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="px-4 py-2 text-center md:text-left sm:px-6">
              <button type="submit" className="btn-send">
                Change password
              </button>
            </div>

            <div className="text-gray-500 space-x-2 py-4 px-6 text-right">
              Do have an account?
              <Link to="/signin">
                <span className="text-green-600"> Log in</span>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordForget;
