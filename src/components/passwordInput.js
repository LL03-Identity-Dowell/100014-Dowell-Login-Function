import React, { useRef, useState } from "react";
import zxcvbn from "zxcvbn";

const PasswordInput = ({ name, value, errors, onChange }) => {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordMessage, setPasswordMessage] = useState("");
  const passwordRef = useRef("");

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

    const validationMessages = requirements.map((requirement) => {
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

    onChange(name, newPassword);

    setPasswordStrength(isValidPassword ? score : 0);
    setPasswordMessage(isValidPassword ? passwordFeedback : validationMessages);
  };

  return (
    <div>
      <label htmlFor="Password" className="label">
        New Password <span className="text-red-500">*</span>
      </label>
      <div className="mt-2.5 relative">
        <input
          name={name}
          type="password"
          id={name}
          placeholder="Enter Your Password"
          autoComplete="Password"
          className="input-field"
          value={value}
          ref={passwordRef}
          onChange={handlePasswordChange}
        />
        {errors[name] && (
          <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>
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
  );
};

export default PasswordInput;
