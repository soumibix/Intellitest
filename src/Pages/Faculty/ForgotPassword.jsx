import React, { useState } from "react";
import AuthenticationComp from "../../Components/common/AuthenticationComp";
import SignInImg from "../../assets/Authentication3.jpg";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    setIsLoading(true);
    setErrors({});

    // Simulate API call
    setTimeout(() => {
      console.log("Email Submitted:", formData.email);
      setIsLoading(false);
      // After successful email validation, go to OTP Verification
      navigate("/faculty/otp-verification", { state: { email: formData.email } });
    }, 1500);
  };

  const fields = [
    {
      name: "email",
      type: "text",
      label: "Email Address",
      placeholder: "name@company.com",
      required: true,
    },
  ];

  return (
    <AuthenticationComp
      image={SignInImg}
      leftTitle = "Forgot your password?"
      leftDescription = "Enter your registered email address and we’ll send you a otp to reset your IntelliTest faculty account password."
      rightDescription="Enter your registered email address, and we’ll send you an OTP to verify your identity."
      heading="Reset Your Password"
      fields={fields}
      initialFormData={{ email: "" }}
      onSubmit={handleSubmit}
      submitButtonText="Proceed"
      isLoading={isLoading}
      errors={errors}
    />
  );
};