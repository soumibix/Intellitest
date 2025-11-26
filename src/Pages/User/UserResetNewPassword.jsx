import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthenticationComp from "../../Components/common/AuthenticationComp";
import SignInImg from "../../assets/Authentication3.webp";
import { useHttp } from "../../Hooks/useHttps";
import { studentAuthAPI } from "../../apis/auth/studentAuth";

const UserResetNewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const httpHook = useHttp();
  
  const email = location.state?.email || "";
  const isVerified = location.state?.isVerified || false;

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Redirect if not verified or no email
    if (!email || !isVerified) {
      navigate("/forgot-password");
    }
  }, [email, isVerified, navigate]);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setErrors({});

    // Client-side validation
    if (formData.newPassword !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      setIsLoading(false);
      return;
    }

    if (formData.newPassword.length < 8) {
      setErrors({ 
        newPassword: "Password must be at least 8 characters long" 
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await studentAuthAPI.resetPassword(
        httpHook,
        email,
        formData.newPassword
      );

      if (response.success) {
        // Show success message and navigate to signin
        alert("Password reset successfully! Please sign in with your new password.");
        navigate("/signin");
      } else {
        setErrors({ 
          newPassword: response.message || "Failed to reset password. Please try again." 
        });
      }
    } catch (error) {
      setErrors({ 
        newPassword: "An error occurred. Please try again." 
      });
    } finally {
      setIsLoading(false);
    }
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
      leftTitle="Having trouble signing in?"
      leftDescription="No worries! Reset your password and get back to your IntelliTest account to continue your exams smoothly."
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