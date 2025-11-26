import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationComp from "../../Components/common/AuthenticationComp";
import SignInImg from "../../assets/Authentication3.webp";
import { useHttp } from "../../Hooks/useHttps";
import { studentAuthAPI } from "../../apis/auth/studentAuth";

function UserForgotPassword() {
  const navigate = useNavigate();
  const httpHook = useHttp();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setErrors({});

    try {
      const response = await studentAuthAPI.forgotPassword(
        httpHook,
        formData.email
      );

      // if (response.success) {
        // Navigate to OTP verification page with email
        navigate("/otp-verification", { 
          state: { 
            email: formData.email,
            fromForgotPassword: true 
          } 
        });
      // } else {
      //   setErrors({ 
      //     email: response.message || "Failed to send OTP. Please try again." 
      //   });
      // }
    } catch (error) {
      setErrors({ 
        email: "An error occurred. Please try again." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    {
      name: "email",
      type: "email",
      label: "Email Address",
      placeholder: "Enter your registered email",
      required: true,
    },
  ];

  return (
    <AuthenticationComp
      image={SignInImg}
      leftTitle="Having trouble signing in?"
      leftDescription="No worries! Reset your password and get back to your IntelliTest account to continue your exams smoothly."
      heading="Forgot Password?"
      rightDescription="Enter your registered email address to receive an OTP for password reset."
      fields={fields}
      initialFormData={{ email: "" }}
      onSubmit={handleSubmit}
      submitButtonText="Send OTP"
      isLoading={isLoading}
      errors={errors}
      bottomLink={{
        text: "Remember your password?",
        linkText: "Sign In",
        to: "/signin",
      }}
    />
  );
}

export default UserForgotPassword;