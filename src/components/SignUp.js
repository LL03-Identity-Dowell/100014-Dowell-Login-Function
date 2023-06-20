import React, { useEffect } from "react";
import { MdAddAPhoto } from "react-icons/md";
import DoWellVerticalLogo from "../assets/images/Dowell-logo-Vertical.jpeg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../redux/countriesSlice";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  firstName: yup.string().required("First Name is required").max(20),
  lastName: yup.string().required("Last Name is required").max(20),
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

const SignUp = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const onSubmit = (data) => console.log(data);

  return (
    <div className="isolate bg-gray-50 px-4 py-8 sm:py-12 lg:px-8">
      <div className="shadow-lg bg-yellow-50 mx-auto max-w-5xl px-2 py-6 md:px-4">
        <div className="flex items-center mx-auto max-w-2xl justify-center space-x-2 px-2 sm:px-0">
          <img
            src={DoWellVerticalLogo}
            alt="DoWell logo"
            className="h-38 w-44 rounded-full drop-shadow-sm"
          />
          <h2 className="text-2xl font-bold tracking-tight text-green-600 md:text-4xl">
            Join us new member
          </h2>
        </div>
        <form
          action="#"
          method="POST"
          className="mx-auto mt-8 max-w-xl sm:mt-12"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-semibold leading-6 text-green-700"
              >
                First Name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  autoComplete="firstName"
                  className="input-filed"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-semibold leading-6 text-green-700"
              >
                Last Name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="input-filed"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

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
                htmlFor="user-type"
                className="block text-sm font-semibold leading-6 text-green-700"
              >
                User Type
              </label>
              <div className="mt-2.5">
                <select
                  name="user-type"
                  type="text"
                  placeholder="user-type"
                  required
                  className="select-btn"
                  defaultValue="live-user"
                >
                  <option value="live-user">Live User</option>
                  <option value="beta-tester">Beta Tester</option>
                </select>
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
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
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
                  name="country"
                  type="text"
                  placeholder="countries"
                  required
                  className="select-btn"
                >
                  {countries.map((country) => (
                    <option key={country.id} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div>
                <label
                  htmlFor="phone-number"
                  className="block text-sm font-semibold leading-6 text-green-700"
                >
                  Phone Number
                </label>
                <div className="relative mt-2.5">
                  <PhoneInputWithCountry
                    name="phone"
                    control={control}
                    rules={{ required: true }}
                    numberInputProps={{
                      className: "input-filed",
                    }}
                  />
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
                  {...register("otp")}
                />
                {errors.otp && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.otp.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="OTP-code"
                className="block text-sm font-semibold leading-6 text-green-700"
              >
                Upload Photo
              </label>
              <div className="mt-2.5">
                <div className="flex flex-row items-center space-x-3">
                  <MdAddAPhoto
                    className="h-8 w-8 text-green-500"
                    aria-hidden="true"
                  />
                  <div className="text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500"
                    >
                      <span>Click here</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>
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
                  {...register("otp")}
                />
                {errors.otp && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.otp.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-6">
            <fieldset>
              <div className="mt-4 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <p className="text-gray-600">Do you accept our policies?</p>
                  </div>
                </div>

                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <p className="text-gray-600">
                      Do you want to subscribe to our newsletter?
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="block w-full rounded-md bg-gray-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
            >
              Sign up
            </button>
          </div>

          <div className="text-gray-500 space-x-2 py-3 px-6 text-right">
            Do have an account?
            <Link to="/signin">
              <span className="text-green-600"> Log in</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
