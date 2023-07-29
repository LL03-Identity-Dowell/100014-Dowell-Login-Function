import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
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
  old_password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(99)
    .required("Password is required"),
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

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Submitting form with data:", data);
    setLoading(false);
    reset();
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

            <div className="flex text-gray-600 py-2 text-left space-x-2">
              <p>Do you forget password?</p>
              <Link to="/password">
                <span className="text-green-600">Click here</span>
              </Link>
            </div>
          </div>
        </div>

        <FormProvider {...register}>
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
                register={register}
                value={getValues("new_password")}
                errors={errors}
                isConfirm={false}
                onChange={setValue}
              />
            </div>

            <div className="mt-2">
              <PasswordInput
                name="confirm_password"
                register={register}
                value={getValues("confirm_password")}
                errors={errors}
                isConfirm={true}
                onChange={setValue}
              />
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
        </FormProvider>
      </div>
    </div>
  );
};

export default ChangePassword;
