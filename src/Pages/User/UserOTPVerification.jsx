import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthenticationComp from "../../Components/common/AuthenticationComp";
import SignInImg from "../../assets/Authentication3.webp";
import Button from "../../Components/common/Button";

function UserOTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer((t) => t - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  const handleSubmit = (formData) => {
    setIsLoading(true);
    setErrors({});

    setTimeout(() => {
      if (formData.otp === "123456") {
        navigate("/reset-new-password", { state: { email } });
      } else {
        setErrors({ otp: "Invalid OTP. Please try again." });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleResend = () => {
    setTimer(30);
    console.log("OTP resent to:", email);
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
      leftTitle = "Verify your account"
      leftDescription = "Enter the OTP sent to your email to confirm your identity and secure your IntelliTest account."
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