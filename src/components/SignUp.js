import React, { useEffect, useRef, useState } from "react";
import { MdAddAPhoto } from "react-icons/md";
import DoWellVerticalLogo from "../assets/images/Dowell-logo-Vertical.jpeg";
import { Link, useLocation } from "react-router-dom";
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
import useTimedMessage from "./useTimedMessage";

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
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      [
        "Password must include at least 1 lowercase letter",
        "Password must include at least 1 uppercase letter",
        "Password must include at least 1 digit",
        "Password must include at least 1 special character",
      ]
    ),
  confirm_Password: yup
    .string()
    .oneOf([yup.ref("Password"), null], "Passwords must match")
    .required("Confirm Password is required"),
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
    then: yup
      .string()
      .required("Country Code is required")
      .matches(/^\d{1,3}$/, "Country Code must be 1 to 3 digits"),
  }),
  Phone: yup.string().when("otpSent", {
    is: true,
    then: yup
      .string()
      .required("Phone number is required")
      .matches(/^\d{9,}$/, "Phone number must have at least 9 digits"),
  }),
  sms: yup.string().when(["smsSent", "exempted"], {
    is: (smsSent, exempted) => smsSent && !exempted,
    then: yup.string().required("OTP is required"),
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
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [attemptsOtp, setAttemptsOtp] = useState(5);
  const [attemptsSms, setAttemptsSms] = useState(5);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [smsCountdown, setSmsCountdown] = useState(0);
  const [exempted, setExempted] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [smsOtpSent, setSmsOtpSent] = useState(false);

  // Use the custom hook to handle the email and SMS sent messages
  const [emailMessages, setEmailMessage] = useTimedMessage();
  const [smsMessages, setSmsMessage] = useTimedMessage();

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
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // a hook to redirect the user to the signin page
  const navigate = useNavigate();

  // Use the useLocation hook to access the URL parameters passed from the login page
  const location = useLocation();
  const mainParams = location.search.substring(1); // Remove the leading '?' character

  // dispatch countries list
  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  // Redirect when `registered` changes
  useEffect(() => {
    if (registered) {
      navigate(`/splash/${watch().Username}/${mainParams}`);
    }
  }, [registered, navigate, watch, mainParams]);

  // dispatch email otp
  const handleEmailOTP = (data) => {
    if (attemptsOtp > 0 && !exempted && otpCountdown === 0) {
      setAttemptsOtp((prevAttempts) => prevAttempts - 1);
      const { Email, Username } = data;
      if (Email && Username) {
        dispatch(sendEmailOTP({ Email, Username }));
        setOtpCountdown(60); // Reset the OTP countdown timer to 60 seconds
        setEmailOtpSent(true);
        setEmailMessage(otpSent || emailOtpSent, 10000); // Show the email message for 10 seconds
      }
    }
  };

  // Dispatch mobile sms
  const handleMobileOTP = (data) => {
    if (attemptsSms > 0 && !exempted && smsCountdown === 0) {
      setAttemptsSms((prevAttempts) => prevAttempts - 1);
      const { phonecode, Phone } = data;
      if (phonecode && Phone && Phone.length > 0) {
        dispatch(sendMobileOTP({ phonecode, Phone }));
        setSmsCountdown(60); // Reset the SMS countdown timer to 60 seconds
        setSmsOtpSent(true);
        setSmsMessage(smsSent || smsOtpSent, 10000); // Show the SMS message for 10 seconds
      }
    }
  };

  // Countdown timer for OTP
  useEffect(() => {
    if (otpCountdown > 0) {
      const otpTimer = setTimeout(() => {
        setOtpCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000); // 1 second
      return () => clearTimeout(otpTimer);
    }
  }, [otpCountdown]);

  // Countdown timer for SMS
  useEffect(() => {
    if (smsCountdown > 0) {
      const smsTimer = setTimeout(() => {
        setSmsCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000); // 1 second
      return () => clearTimeout(smsTimer);
    }
  }, [smsCountdown]);

  // Add a useRef hook to get a reference to the password input field:
  const passwordRef = useRef(null);

  // Password requirements
  const requirements = [
    {
      regex: /[a-z]/, // at least 1 lowercase letter
      message: "Password must contain at least 1 lowercase letter",
    },
    {
      regex: /[A-Z]/, // at least 1 uppercase letter
      message: "Password must contain at least 1 uppercase letter",
    },
    {
      regex: /\d/, // at least 1 digit
      message: "Password must contain at least 1 digit",
    },
    {
      regex: /[@$!%*?&]/, // at least 1 special character
      message: "Password must contain at least 1 special character",
    },
    {
      regex: /.{8}/, // at least 8 characters
      message: "Password must be at least 8 characters",
    },
  ];

  // Handle password change
  const handlePasswordChange = () => {
    const newPassword = passwordRef.current.value;
    const { score, feedback } = zxcvbn(newPassword);

    const validationMessages = requirements?.map((requirement) => {
      const isValid = requirement.regex.test(newPassword);
      return {
        message: requirement.message,
        isValid,
      };
    });

    const isValidPassword = validationMessages.every(
      (message) => message.isValid
    );
    const passwordFeedback = feedback.warning || feedback.suggestions[0];

    setValue("Password", newPassword); // Update the form value

    setPasswordStrength(isValidPassword ? score : 0);
    setPasswordMessage(isValidPassword ? passwordFeedback : validationMessages);
  };

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

    // Dispatch the registerUser action with the form data
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
          <div className="mx-auto max-w-2xl items-center justify-center space-y-2">
            <img
              src={DoWellVerticalLogo}
              alt="DoWell logo"
              className="h-34 w-44 rounded-sm drop-shadow-md"
            />
            <h2 className="text-xl font-semibold tracking-wide text-green-500 md:text-2xl">
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
                  onChange={handlePasswordChange}
                />
                {errors.Password && (
                  <p className="text-red-500 text-xs mt-1">
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
                      ? "bg-orange-400"
                      : passwordStrength === 2
                      ? "bg-yellow-400"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${(passwordStrength / 4) * 100}%` }}
                ></div>
              </div>
              {Array.isArray(passwordMessage) ? (
                <div>
                  {passwordMessage.map((message, index) => (
                    <p
                      key={index}
                      className={`text-xs mt-1 ${
                        message.isValid ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {message.message}
                    </p>
                  ))}
                </div>
              ) : (
                <p
                  className={`text-xs mt-1 ${
                    passwordMessage ? "text-green-500" : "text-red-500"
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
                    onClick={() => handleEmailOTP(watch())}
                    disabled={
                      loading ||
                      (emailOtpSent && otpCountdown > 0) ||
                      attemptsOtp === 0
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
                  {emailMessages.map((message) => (
                    <p
                      key={message.id}
                      className="text-base font-normal text-green-600"
                    >
                      {message.message}
                    </p>
                  ))}
                </div>

                {/* Display the countdown timer only after the first OTP attempt */}
                {emailOtpSent && otpCountdown > 0 && (
                  <div className="text-base font-normal text-green-600">
                    Resend OTP in: {otpCountdown}s
                  </div>
                )}

                {/* Display the email OTP attempts remaining */}
                {attemptsOtp > 0 && emailOtpSent && (
                  <div>
                    <p className="text-base font-normal text-green-600">
                      Attempts remaining: {attemptsOtp}
                    </p>
                  </div>
                )}

                {/* Display checkbox to exempt from email OTP */}
                {attemptsOtp === 0 && otpCountdown === 0 && (
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
                        Exempt from OTP requirement
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {emailOtpSent && !exempted && (
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
            )}

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
                    onClick={() => handleMobileOTP(watch())}
                    disabled={
                      loading ||
                      (smsOtpSent && smsCountdown > 0) ||
                      (attemptsSms === 0 && !exempted)
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
                      "Get SMS"
                    )}
                  </button>
                  {smsMessages.map((message) => (
                    <p
                      key={message.id}
                      className="text-base font-normal text-green-600"
                    >
                      {message.message}
                    </p>
                  ))}
                </div>

                {/* Display the countdown timer only after the first SMS attempt */}
                {smsOtpSent && smsCountdown > 0 && (
                  <div className="text-base font-normal text-green-600">
                    Resend SMS in: {smsCountdown}s
                  </div>
                )}

                {attemptsSms > 0 && smsOtpSent && (
                  <div>
                    <p className="text-base font-normal text-green-600">
                      Attempts remaining: {attemptsSms}
                    </p>
                  </div>
                )}

                {attemptsSms === 0 && smsCountdown === 0 && (
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
                )}
              </div>
            </div>

            {smsSent && !exempted && (
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
                    {...register("sms", { required: exempted })}
                    disabled={exempted}
                  />
                  {errors.sms && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.sms.message}
                    </p>
                  )}
                </div>
              </div>
            )}

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
            <button type="submit" className="submit-btn" disabled={loading}>
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
            <Link to="/" className="text-center">
              Do have an account? Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
