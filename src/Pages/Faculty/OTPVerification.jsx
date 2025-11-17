import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthenticationComp from "../../Components/common/AuthenticationComp";
import SignInImg from "../../assets/Authentication3.jpg";
import Button from "../../Components/common/Button";
import { facultyAuthAPI } from "../../apis/auth/facultyAuth";
import { useHttp } from "../../Hooks/useHttps";

function OTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const httpHook = useHttp();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [timer, setTimer] = useState(30);

  // Redirect to forgot password if no email
  useEffect(() => {
    if (!email) {
      navigate("/faculty/forgot-password");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer((t) => t - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setErrors({});

    try {
      // Call verify OTP API (using forgotPassword endpoint with both email and otp)
      const response = await facultyAuthAPI.verifyOTP(httpHook, email, formData.otp);
      
      if (response.success) {
        console.log("OTP verified successfully");
        // Navigate to reset password page
        navigate("/faculty/reset-new-password", { 
          state: { email } 
        });
      } else {
        // Handle error response
        setErrors({ 
          otp: response.message || "Invalid OTP. Please try again." 
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setErrors({ 
        otp: "An error occurred. Please try again." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      // Resend OTP by calling forgot password API again
      const response = await facultyAuthAPI.forgotPassword(httpHook, email);
      
      if (response.success) {
        setTimer(30);
        console.log("OTP resent to:", email);
        // Optionally show a success message
      } else {
        console.error("Failed to resend OTP:", response.message);
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
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
      leftDescription="Enter the OTP sent to your registered email to confirm your identity and activate your IntelliTest faculty account."
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

export default OTPVerification;