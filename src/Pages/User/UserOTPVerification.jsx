import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthenticationComp from "../../Components/common/AuthenticationComp";
import SignInImg from "../../assets/Authentication3.webp";
import Button from "../../Components/common/Button";
import { useHttp } from "../../Hooks/useHttps";
import { studentAuthAPI } from "../../apis/auth/studentAuth";

function UserOTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const httpHook = useHttp();
  
  const email = location.state?.email || "";
  const fromForgotPassword = location.state?.fromForgotPassword || false;

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    // Redirect if no email is provided
    if (!email) {
      navigate("/forgot-password");
      return;
    }

    if (timer > 0) {
      const countdown = setTimeout(() => setTimer((t) => t - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer, email, navigate]);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setErrors({});

    try {
      const response = await studentAuthAPI.forgotPassword(
        httpHook,
        email,
        formData.otp
      );

      if (response.success && response.isVerified) {
        // Navigate to reset password page with email and verification flag
        navigate("/reset-new-password", { 
          state: { 
            email,
            isVerified: true 
          } 
        });
      } else {
        setErrors({ 
          otp: response.message || "Invalid OTP. Please try again." 
        });
      }
    } catch (error) {
      setErrors({ 
        otp: "Verification failed. Please try again." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const response = await studentAuthAPI.forgotPassword(httpHook, email);
      
      if (response.success) {
        setTimer(30);
        setErrors({});
        console.log("OTP resent to:", email);
      } else {
        setErrors({ 
          otp: response.message || "Failed to resend OTP" 
        });
      }
    } catch (error) {
      setErrors({ 
        otp: "Failed to resend OTP. Please try again." 
      });
    }
  };

  const fields = [
    {
      type: "otp",
      name: "otp",
      label: "",
      otpLength: 6,
    },
  ];

  const additionalElements = (
    <div className="space-y-4">
      <p className="text-center text-gray-500">
        OTP sent to <span className="font-medium">{email}</span>.{" "}
        {timer > 0 ? (
          <span>Resend in {timer}s</span>
        ) : (
          <Button
            text="Resend OTP"
            color="#631891"
            variant="ghost"
            padding="px-3 py-1"
            width="w-auto"
            textSize="text-md"
            onClick={handleResend}
          />
        )}
      </p>
    </div>
  );

  return (
    <AuthenticationComp
      image={SignInImg}
      leftTitle="Verify your account"
      leftDescription="Enter the OTP sent to your email to confirm your identity and secure your IntelliTest account."
      heading="Verify OTP to proceed"
      rightDescription="Please enter the 6-digit code below to verify your identity."
      fields={fields}
      initialFormData={{ otp: "" }}
      onSubmit={handleSubmit}
      submitButtonText="Submit OTP"
      isLoading={isLoading}
      errors={errors}
      additionalElements={additionalElements}
    />
  );
}

export default UserOTPVerification;