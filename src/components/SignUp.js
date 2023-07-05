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

// Schema for validation inputs
const schema = yup.object().shape({
  Firstname: yup.string().required("First Name is required").max(20),
  Lastname: yup.string().required("Last Name is required").max(20),
  Username: yup
    .string()
    .required("User Name is required")
    .max(20)
    .notOneOf(
      ["administrator", "uxlivinglab", "dowellresearch", "dowellteam", "admin"],
      "Username not allowed"
    ),
  user_type: yup.string().required("User Type is required"),
  Password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(99),
  confirm_Password: yup
    .string()
    .oneOf([yup.ref("Password"), null], "Passwords must match"),
  user_country: yup.string().required("Country is required"),
  country_code: yup.string().required("Country Code is required"),
  Profile_Image: yup
    .mixed()
    .required("Upload profile photo")
    .test("fileFormat", "Unsupported file format", (value) => {
      if (!value || !value[0]) return true; // Allow empty value
      return (
        value[0].type === "image/jpeg" ||
        value[0].type === "image/png" ||
        value[0].type === "image/gif"
      );
    })
    .test("fileSize", "File size is too large", (value) => {
      if (!value || !value[0]) return true; // Allow empty value
      return value[0].size <= 1024 * 1024;
    }),
  otp: yup.string().required("OTP is required"),
  Email: yup
    .string()
    .email("Invalid Email format")
    .required("Email is required"),
  Phone: yup
    .number()
    .positive("Phone number must be positive")
    .integer("Phone number must be an integer")
    .transform((value, originalValue) =>
      originalValue < 0 ? undefined : value
    )
    .required("Phone number is required"),
  sms: yup.string().required("SMS is required"),
  newsletter: yup
    .boolean()
    .oneOf([true], "Accept Newsletter Terms & Conditions"),
  policy_status: yup
    .boolean()
    .oneOf([true], "Please accept the Terms & Conditions"),
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
  } = useForm({
    resolver: yupResolver(schema),
  });

  // dispatch countries list
  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  // dispatch email otp
  const handleEmailOTP = ({ Email }) => {
    dispatch(sendEmailOTP({ Email }));
  };

  // dispatch mobile otp
  const handleMobileOTP = ({ Phone }) => {
    dispatch(sendMobileOTP({ Phone }));
  };

  // dispatch registered user
  const registeredUserInfo = (data) => {
    const {
      Firstname,
      Lastname,
      Username,
      user_type,
      Email,
      Password,
      confirm_Password,
      user_country,
      country_code,
      Phone,
      otp,
      sms,
      Profile_Image,
      policy_status,
      newsletter,
    } = data;

    if (otp && sms && Email && Phone) {
      dispatch(
        registerUser({
          Firstname,
          Lastname,
          Username,
          user_type,
          Email,
          Password,
          confirm_Password,
          user_country,
          country_code,
          Phone,
          otp,
          sms,
          Profile_Image,
          policy_status,
          newsletter,
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
          className="mx-auto mt-8 max-w-xl sm:mt-12"
          onSubmit={handleSubmit(registeredUserInfo)}
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="Firstname"
                className="block text-sm font-semibold leading-6 text-green-700"
              >
                First Name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="Firstname"
                  id="Firstname"
                  autoComplete="Firstname"
                  className="input-field"
                  {...register("Firstname")}
                />
                {errors.Firstname && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.Firstname.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="Lastname"
                className="block text-sm font-semibold leading-6 text-green-700"
              >
                Last Name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="Lastname"
                  id="Lastname"
                  autoComplete="family-name"
                  className="input-field"
                  {...register("Lastname")}
                />
                {errors.Lastname && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.Lastname.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="Username"
                className="block text-sm font-semibold leading-6 text-green-700"
              >
                User Name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="Username"
                  id="Username"
                  autoComplete="Username"
                  className="input-field"
                  {...register("Username")}
                />
                {errors.Username && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.Username.message}
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
                  {...register("user_type")}
                >
                  <option value="live-user">Live User</option>
                  <option value="beta-tester">Beta Tester</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="Password"
                className="block text-sm font-semibold leading-6 text-green-700"
              >
                Password
              </label>
              <div className="mt-2.5">
                <input
                  type="Password"
                  name="Password"
                  id="Password"
                  autoComplete="Password"
                  className="input-field"
                  {...register("Password")}
                />
                {errors.Password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.Password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm_Password"
                className="block text-sm font-semibold leading-6 text-green-700"
              >
                Confirm Password
              </label>
              <div className="mt-2.5">
                <input
                  name="confirm_Password"
                  type="password"
                  autoComplete="confirm_Password"
                  className="input-field"
                  {...register("confirm_Password")}
                />
                {errors.confirm_Password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirm_Password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="user_country"
                className="block text-sm font-semibold leading-6 text-green-700"
              >
                Country
              </label>

              <div className="mt-2.5">
                <select
                  name="user_country"
                  type="text"
                  placeholder="countries"
                  required
                  className="select-btn"
                  {...register("user_country")}
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
                  {...register("country_code")}
                >
                  {countries.map((country) => (
                    <option key={country.id} value={country.country_code}>
                      {country.name}(+{country.country_code})
                    </option>
                  ))}
                </select>
                {errors.country_code && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.country_code.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div>
                <label
                  htmlFor="Phone"
                  className="block text-sm font-semibold leading-6 text-green-700"
                >
                  Phone Number
                </label>
                <div className="relative mt-2.5">
                  <input
                    name="Phone"
                    type="text"
                    className="input-field"
                    {...register("Phone")}
                  />
                </div>
                <div className="mt-2.5">
                  <div className="flex flex-row space-x-3 items-center">
                    <button
                      className="btn-send px-2 py-1 self-start"
                      onClick={handleMobileOTP}
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
                htmlFor="sms"
                className="block text-sm font-semibold leading-6 text-green-700"
              >
                OTP from SMS
              </label>

              <div className="mt-2.5">
                <input
                  type="text"
                  name="sms"
                  id="sms"
                  autoComplete="sms"
                  className="input-field"
                  {...register("sms")}
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
                      htmlFor="Profile_Image"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500"
                    >
                      <span>Click here</span>
                      <input
                        id="Profile_Image"
                        name="Profile_Image"
                        type="file"
                        className="sr-only"
                        {...register("Profile_Image")}
                        accept="image/jpeg, image/png, image/gif"
                      />
                    </label>
                  </div>
                </div>
              </div>
              {errors.Profile_Image && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.Profile_Image.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="Email"
                className="block text-sm font-semibold leading-6 text-green-700"
              >
                Email
              </label>
              <div className="mt-2.5">
                <input
                  type="Email"
                  name="Email"
                  id="Email"
                  autoComplete="Email"
                  className="input-field"
                  {...register("Email")}
                />
                {errors.Email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.Email.message}
                  </p>
                )}
              </div>
              <div className="mt-2.5">
                <div className="flex flex-row space-x-3 items-center">
                  <button
                    className="btn-send px-2 py-1 self-start"
                    onClick={handleEmailOTP}
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
                htmlFor="otp-Email"
                className="block text-sm font-semibold leading-6 text-green-700"
              >
                Enter OTP from Email
              </label>
              {otpSent && (
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="otp"
                    id="otp"
                    autoComplete="otp"
                    className="input-field"
                    {...register("otp")}
                  />
                  {errors.otp && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.otp.message}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 space-y-6">
            <fieldset>
              <div className="mt-4 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="policy_status"
                      name="policy_status"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                      {...register("policy_status")}
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <p className="text-gray-600">Do you accept our policies?</p>
                  </div>
                </div>

                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="newsletter"
                      name="newsletter"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                      {...register("newsletter")}
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
