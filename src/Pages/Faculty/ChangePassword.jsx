// src/pages/faculty/ChangePassword.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthenticationComp from "../../Components/common/AuthenticationComp";
import SignInImg from "../../assets/Authentication3.webp";
import { facultyAuthAPI } from "../../apis/auth/facultyAuth";
import { useHttp } from "../../Hooks/useHttps";

const ChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";   // Email passed from SignIn
  const httpHook = useHttp();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // If user directly accesses this page → redirect to Sign In
  useEffect(() => {
    if (!email) {
      navigate("/faculty/signin");
    }
  }, [email, navigate]);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setErrors({});

    // Validate: passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      setIsLoading(false);
      return;
    }

    // Validate: strong password
    if (formData.newPassword.length < 8) {
      setErrors({ newPassword: "Password must be at least 8 characters long" });
      setIsLoading(false);
      return;
    }

    try {
      // 🚀 Call change password API
      const response = await facultyAuthAPI.changePassword(
        httpHook,
        email,
        formData.newPassword
      );

      if (response.success) {
        console.log("Password changed for:", email);

        navigate("/faculty/signin", {
          state: {
            message: "Password changed successfully. Please log in with your new password."
          }
        });
      } else {
        setErrors({
          newPassword:
            response.message || "Failed to change password. Please try again."
        });
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setErrors({
        newPassword: "An error occurred. Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Form fields same as reset password
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
      leftTitle="Update your security"
      leftDescription="Create a new password to activate and secure your IntelliTest account."
      rightDescription="Set a strong password to proceed with your account."
      heading="Change Password"
      fields={fields}
      initialFormData={{
        newPassword: "",
        confirmPassword: "",
      }}
      onSubmit={handleSubmit}
      submitButtonText="Change Password"
      isLoading={isLoading}
      errors={errors}
    />
  );
};

export default ChangePassword;
