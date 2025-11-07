import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthenticationComp from "../../Components/common/AuthenticationComp";
import SignInImg from "../../assets/AdminSignIn.jpg";

function OTPVerification () {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (formData) => {
    setIsLoading(true);
    setErrors({});

    // Simulate OTP check
    setTimeout(() => {
      if (formData.otp === "123456") {
        console.log("OTP Verified");
        navigate("/faculty/reset-new-password", { state: { email } });
      } else {
        setErrors({ otp: "Invalid OTP. Please try again." });
      }
      setIsLoading(false);
    }, 1500);
  };

  const fields = [
    {
      name: "otp",
      type: "text",
      label: "Enter OTP",
      placeholder: "6-digit code",
      required: true,
    },
  ];

  return (
    <AuthenticationComp
      image={SignInImg}
      leftTitle="IntelliTest - Faculty"
      leftDescription="Secure verification for resetting your password."
      rightDescription={`We’ve sent a 6-digit OTP to ${email}. Please enter it below to continue.`}
      heading="Verify OTP"
      fields={fields}
      initialFormData={{ otp: "" }}
      onSubmit={handleSubmit}
      submitButtonText="Verify OTP"
      isLoading={isLoading}
      errors={errors}
    />
  );
};
export default OTPVerification;