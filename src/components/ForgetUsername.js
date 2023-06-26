import React, { useState } from "react";
import { Link } from "react-router-dom";
import DoWellVerticalLogo from "../assets/images/Dowell-logo-Vertical.jpeg";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { userSendOTP, verifyOTP } from "../redux/usernameSlice";
import { Radio } from "react-loader-spinner";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  otp: yup.string().when("step", {
    is: (step) => step === 2,
    then: yup.string().required("OTP required"),
  }),
});

const ForgotUsername = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [step, setStep] = useState(1);

  const dispatch = useDispatch();
  const { loading, error, usernameList, otpSent } = useSelector(
    (state) => state.username || {},
    shallowEqual
  );

  const handleSendOTP = ({ email }) => {
    dispatch(userSendOTP({ email }));
    setStep(2);
  };

  const handleVerifyOTP = ({ email, otp }) => {
    if (step === 2) {
      dispatch(verifyOTP({ email, otp }));
    }
  };

  return (
    <div>
      <div className="flex relative flex-col md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center">
        <div className="py-8 md:col-span-2 space-y-8 my-10">
          <div className="flex items-center justify-center space-x-2 px-2 sm:px-0">
            <img
              src={DoWellVerticalLogo}
              alt="DoWell logo"
              className="h-28 w-34 rounded-full drop-shadow-sm"
            />
            <h3 className="text-lg uppercase md:text-xl text-center font-bold leading-6 text-green-600">
              Forgot Username
            </h3>
          </div>

          {loading && (
            <Radio
              visible={true}
              height="60"
              width="60"
              ariaLabel="radio-loading"
              wrapperStyle={{}}
              wrapperClass="radio-wrapper"
              color="#4fa94d"
            />
          )}
          {error && <p>{error}</p>}

          <div className="overflow-hidden drop-shadow-2xl sm:rounded-2xl bg-yellow-50">
            <div className="px-4 py-2 sm:p-6 space-y-4">
              <form onSubmit={handleSubmit(handleVerifyOTP)}>
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
                      >
                        Get OTP
                      </button>
                      {otpSent && (
                        <p className="text-base font-normal text-green-600">
                          {otpSent}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {step === 2 && (
                  <>
                    <div>
                      <label
                        className="block text-sm font-semibold leading-6 text-green-700"
                        htmlFor="otp"
                      >
                        Enter OTP from Email
                      </label>
                      <input
                        type="text"
                        name="otp"
                        id="otp"
                        autoComplete="otp"
                        className="input-field"
                        {...register("otp")}
                      />
                      {errors?.otp && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.otp.message}
                        </p>
                      )}
                    </div>

                    <div className="btn-send px-1 py-1 mt-2 self-start">
                      <button type="submit" className="btn-send">
                        Verify
                      </button>
                    </div>
                    {usernameList !== null && (
                      <p className="text-base font-normal text-green-600">
                        {usernameList}
                      </p>
                    )}
                  </>
                )}
              </form>
            </div>
          </div>

          <div className="text-gray-500 space-x-2 py-4 px-6 text-right">
            Do you have an account?{" "}
            <Link to="/signin">
              <span className="text-green-600">Log in</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotUsername;
