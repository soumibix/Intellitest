import React, { useState } from "react";
import AuthenticationComp from "../../Components/common/AuthenticationComp";
import SignInImg from "../../assets/Authentication3.jpg";
import { useNavigate } from "react-router-dom";
import { facultyAuthAPI } from "../../apis/auth/facultyAuth";
import { useHttp } from "../../hooks/useHttps";

export const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const httpHook = useHttp();

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setErrors({});

    try {
      // Call forgot password API to send OTP
      const response = await facultyAuthAPI.forgotPassword(httpHook, formData.email);
      
      if (response.success) {
        console.log("OTP sent successfully to:", formData.email);
        // Navigate to OTP verification page with email
        navigate("/faculty/otp-verification", { 
          state: { email: formData.email } 
        });
      } else {
        // Handle error response
        setErrors({ 
          email: response.message || "Failed to send OTP. Please try again." 
        });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setErrors({ 
        email: "An error occurred. Please try again later." 
      });
    } finally {
      setIsLoading(false);
    }
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
      leftTitle="Forgot your password?"
      leftDescription="Enter your registered email address and we'll send you an OTP to reset your IntelliTest faculty account password."
      rightDescription="Enter your registered email address, and we'll send you an OTP to verify your identity."
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