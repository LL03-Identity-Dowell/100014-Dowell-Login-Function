import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import DoWellVerticalLogo from "../assets/images/Dowell-logo-Vertical.jpeg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, sendOTP } from "../redux/passwordSlice";
import { Radio } from "react-loader-spinner";
import zxcvbn from "zxcvbn";

const schema = yup.object().shape({
  username: yup
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
  otp: yup.string().when("otpSent", {
    is: true,
    then: yup.string().required("OTP is required"),
  }),
  new_password: yup.string().when("otpSent", {
    is: true,
    then: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(99)
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
  }),
  confirm_password: yup.string().when("otpSent", {
    is: true,
    then: yup
      .string()
      .oneOf([yup.ref("new_password")], "Passwords must match")
      .required("Confirm Password is required"),
  }),
});

const PasswordResetForm = () => {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordMessage, setPasswordMessage] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const dispatch = useDispatch();
  const { passwordReset, loading, error, otpSent } = useSelector(
    (state) => state.password
  );

  const handleSendOTP = ({ username, email }) => {
    dispatch(sendOTP({ username, email }));
  };

  const handleResetPassword = (data) => {
    const { username, email, otp, new_password, confirm_password } = data;
    if (otp && new_password && confirm_password) {
      dispatch(
        resetPassword({ username, email, otp, new_password, confirm_password })
      );
    }
  };

  // Add a useRef hook to get a reference to the password input field:
  const passwordRef = useRef(null);

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
    setPasswordStrength(isValidPassword ? score : 0);
    setPasswordMessage(isValidPassword ? passwordFeedback : validationMessages);
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
            <h2 className="text-xl font-semibold tracking-wide text-green-500 md:text-2xl">
              Forget Password
            </h2>

            <div className="flex text-gray-600 space-x-2 py-2 px-2 text-left">
              <p>Do you forget username?</p>
              <Link to="/username">
                <span className="text-green-600">Click here</span>
              </Link>
            </div>
          </div>
        </div>

        <form
          className="mx-auto mt-8 max-w-xl sm:mt-12"
          onSubmit={handleSubmit(handleResetPassword)}
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
            <label htmlFor="email" className="label">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email"
                autoComplete="email"
                className="input-field"
                {...register("email")}
              />
              {errors?.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors?.email?.message}
                </p>
              )}
            </div>
            <div className="mt-2.5">
              <div className="flex flex-row space-x-3 items-center">
                <button
                  className="btn-send px-2 py-1 self-start"
                  onClick={handleSubmit(handleSendOTP)}
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

          <div className="mt-2.5">
            <label className="label" htmlFor="otp">
              Enter OTP from Email <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="otp"
              id="otp"
              placeholder="Enter OTP from Email"
              autoComplete="otp"
              className="input-field"
              {...register("otp", { required: otpSent })}
            />
            {errors?.otp && (
              <p className="text-red-500 text-xs mt-1">{errors.otp.message}</p>
            )}
          </div>

          <div className="mt-2.5">
            <label htmlFor="new_password" className="label">
              New Password <span className="text-red-500">*</span>
            </label>
            <div className="mt-2.5">
              <input
                type="password"
                name="new_password"
                id="new_password"
                placeholder="Enter Your Password"
                autoComplete="new_password"
                className="input-field"
                {...register("new_password", { required: otpSent })}
                ref={passwordRef}
                onChange={handlePasswordChange}
              />
              {errors?.new_password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.new_password.message}
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
                {...register("confirm_password", { required: otpSent })}
              />
              {errors.confirm_password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4">
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
                "Reset Password"
              )}
            </button>
          </div>
          <p className="text-base font-normal text-green-600">
            {passwordReset}
          </p>

          {error && <p>{error}</p>}

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

export default PasswordResetForm;
