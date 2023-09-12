import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PasswordInput from "./passwordInput";

const schema = yup.object().shape({
  otp: yup
    .string()
    .required("OTP is required")
    .matches(/^[0-9]+$/, "OTP must contain only numbers"),
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

const ResetPasswordForm = () => {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({ resolver: yupResolver(schema) });

  return (
    <form>
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
          {...register("otp")}
        />
        {errors?.otp && (
          <p className="text-red-500 text-xs mt-1">{errors.otp.message}</p>
        )}
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
    </form>
  );
};

export default ResetPasswordForm;
