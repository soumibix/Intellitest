import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthenticationComp from "../../Components/common/AuthenticationComp";
import SignInImg from "../../assets/Authentication3.jpg";
import { facultyAuthAPI } from "../../apis/auth/facultyAuth";
import { useHttp } from "../../Hooks/useHttps";

const ResetNewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const httpHook = useHttp();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Redirect to forgot password if no email
  useEffect(() => {
    if (!email) {
      navigate("/faculty/forgot-password");
    }
  }, [email, navigate]);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setErrors({});

    // Validate password match
    if (formData.newPassword !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      setIsLoading(false);
      return;
    }

    // Optional: Add password strength validation
    if (formData.newPassword.length < 8) {
      setErrors({ newPassword: "Password must be at least 8 characters long" });
      setIsLoading(false);
      return;
    }

    try {
      // Call reset password API
      const response = await facultyAuthAPI.resetPassword(
        httpHook,
        email,
        formData.newPassword
      );

      if (response.success) {
        console.log("Password reset successfully for:", email);
        // Optional: Show success message before redirect
        // You can use a toast notification here
        
        // Redirect to login page
        navigate("/faculty/signin", {
          state: { 
            message: "Password reset successful. Please login with your new password." 
          }
        });
      } else {
        // Handle error response
        setErrors({
          newPassword: response.message || "Failed to reset password. Please try again."
        });
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setErrors({
        newPassword: "An error occurred. Please try again later."
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
      leftTitle="Let's get you back in"
      leftDescription="Reset your password securely and continue managing your IntelliTest assessments without interruption."
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