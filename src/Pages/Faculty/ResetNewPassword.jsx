import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthenticationComp from "../../Components/common/AuthenticationComp";
import SignInImg from "../../assets/AdminSignIn.jpg";

const ResetNewPassword = () => {
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
      navigate("/faculty/signin"); // redirect to login page
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
      leftTitle="IntelliTest - Faculty"
      leftDescription="Set a strong password to protect your account."
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

export default ResetNewPassword;