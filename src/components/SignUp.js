import React, { useEffect, useRef, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import zxcvbn from "zxcvbn";

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
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must include at least 1 uppercase letter, 1 lowercase letter, 1 special character, and 1 digit"
    ),
  confirm_Password: yup
    .string()
    .oneOf([yup.ref("Password"), null], "Passwords must match"),
  Email: yup
    .string()
    .email("Invalid Email format")
    .required("Email is required"),
  otp: yup.string().when("otpSent", {
    is: true,
    then: yup.string().required("OTP is required"),
  }),
  user_country: yup.string().when("otpSent", {
    is: true,
    then: yup.string().required("Country is required"),
  }),
  phonecode: yup.string().when("otpSent", {
    is: true,
    then: yup.string().required("Country Code is required"),
  }),
  Phone: yup.string().when("otpSent", {
    is: true,
    then: yup
      .string()
      .required("Phone number is required")
      .matches(/^\d+$/, "Phone number must be numeric"),
  }),
  sms: yup.string().when("smsSent", {
    is: true,
    then: yup.string(),
  }),

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

  policy_status: yup.boolean().when(["otpSent", "smsSent"], {
    is: (otpSent, smsSent) => otpSent || smsSent,
    then: yup
      .boolean()
      .required("Please accept the Terms & Conditions")
      .oneOf([true], "Please accept the Terms & Conditions"),
  }),
  newsletter: yup.boolean().when(["otpSent", "smsSent"], {
    is: (otpSent, smsSent) => otpSent || smsSent,
    then: yup.boolean().oneOf([true], "Accept Newsletter Terms & Conditions"),
  }),
});

const SignUp = () => {
  const [attempts, setAttempts] = useState(5);
  const [exempted, setExempted] = useState(false);
  const [showAttempts, setShowAttempts] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordMessage, setPasswordMessage] = useState("");

  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const { loading, error, registered, otpSent, smsSent } = useSelector(
    (state) => state.registration
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // a hook to redirect the user to the signin page
  const navigate = useNavigate();

  // dispatch countries list
  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  // Redirect when `registered` changes
  useEffect(() => {
    if (registered) {
      navigate(`/splash/${watch().Username}`);
    }
  }, [registered, navigate, watch]);

  // dispatch email otp
  const handleEmailOTP = (data) => {
    const { Email, Username } = data;
    if (Email && Username) {
      dispatch(sendEmailOTP({ Email, Username }));
    }
  };

  // dispatch mobile otp
  const handleMobileOTP = (data) => {
    if (attempts === 0 && !exempted) {
      return; // No more attempts remaining and not exempted
    }
    // Decrease attempts
    if (attempts > 0) {
      setAttempts((prevAttempts) => prevAttempts - 1);
    }

    const { phonecode, Phone } = data;
    if (phonecode && Phone && Phone.length > 0 && !smsSent) {
      dispatch(sendMobileOTP({ phonecode, Phone }));
      setCountdown(60); // Reset the countdown timer to 60 seconds
    } else {
      setShowAttempts(true);
    }
    // Start the countdown timer
    setCountdown(60);
  };

  useEffect(() => {
    if (countdown > 0) {
      // Start the countdown timer
      const timer = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000); // 1 second

      // Clear the countdown timer when it reaches 0
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const passwordRef = useRef(null);

  // dispatch registered user
  const registeredUserInfo = () => {
    const {
      Firstname,
      Lastname,
      Username,
      user_type,
      Email,
      Password,
      confirm_Password,
      user_country,
      phonecode,
      Phone,
      otp,
      sms,
      Profile_Image,
      policy_status,
      newsletter,
    } = watch();

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
        phonecode,
        Phone,
        otp,
        sms,
        Profile_Image,
        policy_status,
        newsletter,
      })
    );
  };

  return (
    <div className="isolate px-2 py-4 sm:py-12 lg:px-8">
      <div className="shadow-sm  mx-auto max-w-5xl px-2 py-6 md:px-4">
        <div className="flex items-center justify-center">
          <div className="mx-auto max-w-2xl items-center justify-center space-x-2 space-y-2">
            <img
              src={DoWellVerticalLogo}
              alt="DoWell logo"
              className="h-34 w-44 rounded-sm drop-shadow-md"
            />
            <h2 className="text-base font-base tracking-tight text-green-400 md:text-xl">
              Join us New Member
            </h2>
          </div>
        </div>
        <form
          className="mx-auto mt-8 max-w-xl sm:mt-12"
          onSubmit={handleSubmit(registeredUserInfo)}
        >
          <div className="grid grid-cols-1 gap-y-6">
            <div>
              <label htmlFor="Firstname" className="label">
                First Name <span className="text-red-500">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="Firstname"
                  id="Firstname"
                  placeholder="Your First Name"
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
              <label htmlFor="Lastname" className="label">
                Last Name <span className="text-red-500">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="Lastname"
                  id="Lastname"
                  placeholder="Your Last Name"
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
              <label htmlFor="Username" className="label">
                User Name <span className="text-red-500">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="Username"
                  id="Username"
                  placeholder="Enter Your Username"
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
              <label htmlFor="user-type" className="label">
                User Type <span className="text-red-500">*</span>
              </label>
              <div className="mt-2.5">
                <select
                  name="user-type"
                  placeholder="user-type"
                  required
                  className="input-field"
                  defaultValue="live-user"
                  {...register("user_type")}
                >
                  <option value="live-user">Live User</option>
                  <option value="beta-tester">Beta Tester</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="Password" className="label">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="mt-2.5 relative">
                <input
                  name="Password"
                  type="password"
                  id="Password"
                  placeholder="Enter Your Password"
                  autoComplete="Password"
                  className="input-field"
                  {...register("Password")}
                  ref={passwordRef}
                  onChange={() => {
                    const newPassword = passwordRef.current.value;
                    const { score, feedback } = zxcvbn(newPassword);

                    setPasswordStrength(score);
                    setPasswordMessage(
                      feedback.warning || feedback.suggestions[0]
                    );
                  }}
                />
                {errors.Password && (
                  <p className="text-red-500 text-xs mt-1 absolute bottom-0 left-0">
                    {errors.Password.message}
                  </p>
                )}
              </div>
              <div className="h-2 bg-gray-300 rounded overflow-hidden w-11/12">
                <div
                  className={`h-full strength-${passwordStrength} ${
                    passwordStrength === 0
                      ? "bg-red-500"
                      : passwordStrength === 1
                      ? "bg-yellow-500"
                      : passwordStrength === 2
                      ? "bg-yellow-400"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${(passwordStrength / 4) * 100}%` }}
                ></div>
              </div>
              {passwordMessage && (
                <p
                  className={`text-xs mt-1 ${
                    passwordMessage === "Weak"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {passwordMessage}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="confirm_Password" className="label">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  name="confirm_Password"
                  type="password"
                  placeholder="Confirm Your Password"
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
              <label htmlFor="Email" className="label">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  type="Email"
                  name="Email"
                  id="Email"
                  placeholder="Enter Your Email"
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
              <label htmlFor="otp-Email" className="label">
                Enter OTP from Email <span className="text-red-500">*</span>
              </label>

              <div className="mt-2.5">
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  placeholder="Enter OTP from Email"
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
            </div>

            <div>
              <label htmlFor="user_country" className="label">
                Country <span className="text-red-500">*</span>
              </label>

              <div className="mt-2.5">
                <select
                  name="user_country"
                  type="text"
                  placeholder="Select Your Country"
                  required
                  className="input-field"
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
              <label htmlFor="county_code" className="label">
                Country Code <span className="text-red-500">*</span>
              </label>

              <div className="mt-2.5">
                <select
                  name="phonecode"
                  type="text"
                  placeholder="countries code"
                  required
                  className="input-field"
                  {...register("phonecode")}
                >
                  {countries.map((country) => (
                    <option key={country.id} value={country.country_code}>
                      {country.name}(+{country.country_code})
                    </option>
                  ))}
                </select>
                {errors.phonecode && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phonecode.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="Phone" className="label">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-2.5">
                  <input
                    name="Phone"
                    type="text"
                    placeholder="Enter Your Phone Number"
                    className="input-field"
                    {...register("Phone")}
                  />
                </div>
                <div className="mt-2.5">
                  <div className="flex flex-row space-x-3 items-center">
                    <button
                      className="btn-send px-2 py-1 self-start"
                      onClick={handleSubmit(handleMobileOTP)}
                      disabled={
                        loading ||
                        countdown > 0 || // Disable the button while the countdown is active
                        (attempts === 0 && !exempted)
                      }
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

                  {/* Display the countdown timer only after the first SMS attempt */}
                  {smsSent && countdown > 0 && (
                    <div className="text-base font-normal text-green-600">
                      Resend OTP in: {countdown}s
                    </div>
                  )}

                  {showAttempts && (
                    <div>
                      <p className="text-base font-normal text-green-600">
                        Attempts remaining: {attempts}
                      </p>
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            id="exempt-checkbox"
                            name="exempt-checkbox"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                            onChange={() => setExempted(!exempted)}
                            checked={exempted}
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <p className="text-gray-600">
                            Exempt from SMS requirement
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="sms" className="label">
                Enter OTP from SMS <span className="text-red-500">*</span>
              </label>

              <div className="mt-2.5">
                <input
                  type="text"
                  name="sms"
                  id="sms"
                  placeholder="Enter OTP from SMS"
                  autoComplete="sms"
                  className="input-field"
                  {...register("sms")}
                />
                {errors.sms && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.sms.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="Profile_Image" className="label">
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
              className="block w-full rounded-md bg-green-300 px-3.5 py-2.5 text-center font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
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
                "Join as a new member"
              )}
            </button>
            <p className="text-base font-normal text-green-600">{registered}</p>

            {error && <p className="text-red-500">{error}</p>}
          </div>

          <div className="w-72 mx-auto flex items-center justify-center rounded-md bg-green-300 space-x-2 px-3.5 py-2.5 mt-8 text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700">
            <Link to="/signin" className="text-center">
              Do have an account? Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
