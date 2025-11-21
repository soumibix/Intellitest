import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthenticationComp from "../../Components/common/AuthenticationComp";
import SignInImg from "../../assets/Authentication3.webp";

const UserResetNewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (formData) => {
    setIsLoading(true);
    setErrors({});

    if (formData.newPassword !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      console.log("Password reset for:", email);
      setIsLoading(false);
      navigate("/signin");
    }, 1500);
  };

  const fields = [
    {
      name: "newPassword",
      type: "password",
      label: "New Password",
      placeholder: "Enter new password",
      required: true,
    },
    {
      name: "confirmPassword",
      type: "password",
      label: "Confirm Password",
      placeholder: "Re-enter new password",
      required: true,
    },
  ];

  return (
    <AuthenticationComp
      image={SignInImg}
      leftTitle = "Having trouble signing in?"
      leftDescription = "No worries! Reset your password and get back to your IntelliTest account to continue your exams smoothly."
      rightDescription="Create a new password to regain access to your IntelliTest account."
      heading="Set New Password"
      fields={fields}
      initialFormData={{
        newPassword: "",
        confirmPassword: "",
      }}
      onSubmit={handleSubmit}
      submitButtonText="Reset Password"
      isLoading={isLoading}
      errors={errors}
    />
  );
};

export default UserResetNewPassword;