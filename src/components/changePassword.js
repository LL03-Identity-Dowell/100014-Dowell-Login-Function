import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import DoWellVerticalLogo from "../assets/images/Dowell-logo-Vertical.jpeg";
import { Radio } from "react-loader-spinner";
import PasswordInput from "./passwordInput";

// Validation schema
const schema = yup.object().shape({
  username: yup
    .string()
    .required("User Name is required")
    .max(20)
    .notOneOf(
      ["administrator", "uxlivinglab", "dowellresearch", "dowellteam", "admin"],
      "Username not allowed"
    ),
  old_password: yup.string().required("Old Password is required"),
  new_password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(99)
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("new_password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Submitting form with data:", data);
    setLoading(false);
  };

  const onChangePassword = (name, value) => {
    setNewPassword(value);
  };

  return (
    <div className="isolate px-2 py-4 sm:py-12 lg:px-8">
      <div className="shadow-sm  mx-auto max-w-5xl px-2 py-6 md:px-4">
        <div className="flex items-center justify-center">
          <div className="mx-auto max-w-2xl items-center justify-center space-y-2">
            <img
              src={DoWellVerticalLogo}
              alt="DoWell logo"
              className="h-34 w-44 rounded-sm drop-shadow-md"
            />
            <h2 className="text-xl font-semibold tracking-wide text-green-500 md:text-2xl">
              Change Password
            </h2>

            <div className="flex text-gray-600 py-2 text-left">
              <p>Do you forget username?</p>
              <Link to="/username">
                <span className="text-green-600"> Click here</span>
              </Link>
            </div>
          </div>
        </div>

        <form
          className="mx-auto mt-8 max-w-xl sm:mt-12"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label htmlFor="username" className="label">
              Username <span className="text-red-500">*</span>
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter Your Username"
                autoComplete="username"
                className="input-field"
                {...register("username")}
              />
              {errors?.username && (
                <p className="text-red-500 text-xs mt-1">
                  {errors?.username?.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-2.5">
            <label htmlFor="old_password" className="label">
              Old Password <span className="text-red-500">*</span>
            </label>
            <div className="mt-2.5">
              <input
                type="password"
                name="old_password"
                id="old_password"
                placeholder="Enter old Password"
                autoComplete="old_password"
                className="input-field"
                {...register("old_password")}
              />
              {errors.old_password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.old_password.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-2">
            <PasswordInput
              name="new_password"
              value={newPassword}
              errors={errors}
              {...register("new_password")}
              onChange={onChangePassword}
            />
          </div>

          <div className="mt-2.5">
            <label htmlFor="confirm_password" className="label">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="mt-2.5">
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                placeholder="Confirm Your Password"
                autoComplete="confirm_password"
                className="input-field"
                {...register("confirm_password")}
              />
              {errors.confirm_password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <button type="submit" className="submit-btn">
              {loading ? (
                <Radio
                  visible={true}
                  height={30}
                  width={30}
                  ariaLabel="radio-loading"
                  wrapperStyle={{}}
                  wrapperClassName="radio-wrapper"
                  color="#1ff507"
                />
              ) : (
                "Change Password"
              )}
            </button>
          </div>

          <div className="w-72 mx-auto flex items-center justify-center rounded-md bg-green-300 space-x-2 px-3.5 py-2.5 mt-8 text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700">
            <Link to="/" className="text-center">
              Do have an account? Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
