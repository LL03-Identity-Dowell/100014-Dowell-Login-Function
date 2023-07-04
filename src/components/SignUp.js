import React, { useEffect } from "react";
import { MdAddAPhoto } from "react-icons/md";
import DoWellVerticalLogo from "../assets/images/Dowell-logo-Vertical.jpeg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../redux/countriesSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  registerUser,
  sendEmailOTP,
  sendMobileOTP,
} from "../redux/registrationSlice";
import { Radio } from "react-loader-spinner";

const schema = yup.object({
  first_name: yup.string().required("First Name is required").max(20),
  last_name: yup.string().required("Last Name is required").max(20),
  username: yup
    .string()
    .required("User Name is required")
    .max(20)
    .notOneOf(
      ["administrator", "uxlivinglab", "dowellresearch", "dowellteam", "admin"],
      "username not allowed"
    ),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(99),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),

  upload_photo: yup.string().required("Upload profile photo"),
  country_code: yup
    .number()
    .positive("Phone number must be positive")
    .integer("Phone number must be an integer")
    .transform((value, originalValue) =>
      originalValue < 0 ? undefined : value
    )
    .required("Country code is required"),
  email: yup.string().when("otpSent", {
    is: true,
    then: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
  }),
  otp: yup.string().when("otpSent", {
    is: true,
    then: yup.string().required("OTP is required"),
  }),
  phone_number: yup
    .number()
    .positive("Phone number must be positive")
    .integer("Phone number must be an integer")
    .transform((value, originalValue) =>
      originalValue < 0 ? undefined : value
    )
    .required("Phone number is required"),
  sms: yup.string().when("smsSent", {
    is: true,
    then: yup.string().required("SMS is required"),
  }),
});

const SignUp = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const { loading, error, registered, otpSent, smsSent } = useSelector(
    (state) => state.registration
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const handleEmailOTP = ({ email }) => {
    dispatch(sendEmailOTP({ email }));
  };
  const handleMobileOTP = ({ phone }) => {
    dispatch(sendMobileOTP({ phone }));
  };
  const registeredUserInfo = (data) => {
    const {
      first_name,
      last_name,
      username,
      user_type,
      email,
      password,
      confirm_password,
      user_country,
      phone_code,
      phone,
      otp,
      sms,
    } = data;
    if (otp && sms && email) {
      dispatch(
        registerUser({
          first_name,
          last_name,
          username,
          user_type,
          email,
          password,
          confirm_password,
          user_country,
          phone_code,
          phone,
          otp,
          sms,
        })
      );
    }
  };

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
          onSubmit={handleSubmit(registeredUserInfo)}
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="first_name"
                className="block text-sm font-semibold leading-6 text-green-700"
              >
                First Name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  autoComplete="first_name"
                  className="input-field"
                  {...register("first_name")}
                />
                {errors.first_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.first_name.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="last_name"
                className="block text-sm font-semibold leading-6 text-green-700"
              >
                Last Name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  autoComplete="family-name"
                  className="input-field"
                  {...register("last_name")}
                />
                {errors.last_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold leading-6 text-green-700"
              >
                User Name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="username"
                  className="input-field"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.username.message}
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
                  className="input-field"
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
                htmlFor="confirm_password"
                className="block text-sm font-semibold leading-6 text-green-700"
              >
                Confirm Password
              </label>
              <div className="mt-2.5">
                <input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
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

            <div>
              <label
                htmlFor="country"
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
              <label
                htmlFor="county_code"
                className="block text-sm font-semibold leading-6 text-green-700"
              >
                Country Code
              </label>

              <div className="mt-2.5">
                <select
                  name="country_code"
                  type="text"
                  placeholder="countries code"
                  required
                  className="select-btn"
                >
                  {countries.map((country) => (
                    <option key={country.id} value={country.country_code}>
                      {country.name}(+{country.country_code})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div>
                <label
                  htmlFor="phone_number"
                  className="block text-sm font-semibold leading-6 text-green-700"
                >
                  Phone Number
                </label>
                <div className="relative mt-2.5">
                  <input
                    name="phone_number"
                    type="number"
                    className="input-field"
                    {...register("phone_number")}
                  />
                </div>
                <div className="mt-2.5">
                  <div className="flex flex-row space-x-3 items-center">
                    <button
                      className="btn-send px-2 py-1 self-start"
                      onClick={handleSubmit(handleMobileOTP)}
                      disabled={loading}
                    >
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
                        "Get OTP"
                      )}
                    </button>

                    <p className="text-green-500 font-base">{smsSent}</p>
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
                  className="input-field"
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
                htmlFor="file-upload"
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
                        {...register("upload_photo")}
                      />
                      {errors.upload_photo && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.upload_photo.message}
                        </p>
                      )}
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
                  className={`input-field ${
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
                  <button
                    className="btn-send px-2 py-1 self-start"
                    onClick={handleSubmit(handleEmailOTP)}
                    disabled={loading}
                  >
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
                      "Get OTP"
                    )}
                  </button>
                  <p className="text-base font-normal text-green-600">
                    {otpSent}
                  </p>
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
                  className="input-field"
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
              disabled={loading}
            >
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
                " Sign up"
              )}
            </button>
            <p className="text-base font-normal text-green-600">{registered}</p>

            {error && <p>{error}</p>}
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
