import React, { useState } from "react";
import AuthenticationComp from "../../Components/common/AuthenticationComp";
import { useNavigate } from "react-router-dom";
import SignInImg from "../../assets/Authentication3.jpg";
import { studentAuthAPI } from "../../apis/auth/studentAuth";
import { useHttp } from "../../Hooks/useHttps";

export const UserSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP, Step 3: Full Form
  const [email, setEmail] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const navigate = useNavigate();
  const httpHook = useHttp(); // Initialize your HTTP hook

  // Handle Send OTP - Call verifyEmail with only email
  const handleSendOTP = async (formData) => {
    if (!formData.email) {
      setErrors({ email: "Email is required" });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Send OTP to email (no OTP parameter, so it will send OTP)
      const response = await studentAuthAPI.verifyEmail(httpHook, formData.email);

      setEmail(formData.email);
      setStep(2); // Move to OTP verification step
      if (response.success) {
        // You can show a success message here
      } else {
        setErrors({ email: response.message || "Failed to send OTP" });
      }
    } catch (error) {
      setErrors({ email: "Failed to send OTP. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Verify OTP - Call verifyEmail with both email and OTP
  const handleVerifyOTP = async (formData) => {
    if (!formData.otp || formData.otp.length !== 6) {
      setErrors({ otp: "Please enter a valid 6-digit OTP" });
      return;
    }

    setIsLoading(true);
    setErrors({});

    setIsEmailVerified(true);
    setStep(3); // Move to full registration form
    try {
      // Verify OTP (both email and OTP provided, so it will verify)
      const response = await studentAuthAPI.verifyOTP(httpHook, email, formData.otp);

      if (response.success) {
        // You can show a success message here
      } else {
        setErrors({ otp: response.message || "Invalid OTP" });
      }
    } catch (error) {
      setErrors({ otp: "OTP verification failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Final Signup
  const handleSignup = async (formData) => {
    // Validation
    const newErrors = {};

    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.enrollmentNumber) newErrors.enrollmentNumber = "Enrollment number is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const signupData = {
        name: formData.fullName,
        email: email, // Use the verified email
        enrollmentNumber: formData.enrollmentNumber,
        password: formData.password,
      };

      const response = await studentAuthAPI.signup(httpHook, signupData);

      if (response.success) {
        // Signup successful - navigate to signin or dashboard
        navigate('/signin');
        // You can show a success message here
      } else {
        setErrors({ general: response.message || "Signup failed" });
      }
    } catch (error) {
      setErrors({ general: "Signup failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  // Step 1: Email Input
  const emailFields = [
    {
      name: 'email',
      type: 'text',
      label: 'Email Address',
      placeholder: 'xyz@gmail.com',
    },
  ];

  // Step 2: OTP Input
  const otpFields = [
    {
      name: 'otp',
      type: 'otp',
      label: 'Enter OTP',
      placeholder: '',
      otpLength: 6,
    },
  ];

  // Step 3: Full Registration Form
  const signupFields = [
    {
      name: 'fullName',
      type: 'text',
      label: 'Full Name',
      placeholder: 'Enter your full name',
    },
    {
      name: 'enrollmentNumber',
      type: 'text',
      label: 'Enrollment Number',
      placeholder: 'Enter your enrollment number',
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: '$056978@Abc',
    },
    {
      name: 'confirmPassword',
      type: 'password',
      label: 'Confirm Password',
      placeholder: '$056978@Abc',
    },
  ];

  // Render Additional Elements for OTP Step
  const otpAdditionalElements = (
    <div className="space-y-3">
      <p className="text-sm text-gray-600 text-center">
        We've sent a verification code to <strong>{email}</strong>
      </p>
      <button
        type="button"
        onClick={() => setStep(1)}
        className="text-sm text-[#631891] hover:underline w-full text-center"
      >
        Change Email
      </button>
    </div>
  );

  // Render Additional Elements for Signup Step
  const signupAdditionalElements = (
    <div className="space-y-3">
      <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <p className="text-sm text-green-700">
          Email verified: <strong>{email}</strong>
        </p>
      </div>
    </div>
  );

  // Determine which step to render
  const getCurrentStepProps = () => {
    switch (step) {
      case 1:
        return {
          fields: emailFields,
          initialFormData: { email: '' },
          onSubmit: handleSendOTP,
          submitButtonText: 'Send OTP',
          heading: 'Let’s Get Started —',
          colorHeading: 'Verify Your Email',
          // rightDescription: 'Enter your email to get your code',
          additionalElements: null,
        };
      case 2:
        return {
          fields: otpFields,
          initialFormData: { otp: '' },
          onSubmit: handleVerifyOTP,
          submitButtonText: 'Verify OTP',
          heading: 'Enter',
          colorHeading: 'OTP',
          rightDescription: 'Please enter the 6-digit code sent to your email',
          additionalElements: otpAdditionalElements,
        };
      case 3:
        return {
          fields: signupFields,
          initialFormData: {
            fullName: '',
            enrollmentNumber: '',
            password: '',
            confirmPassword: '',
          },
          onSubmit: handleSignup,
          submitButtonText: 'Sign Up',
          heading: 'Create',
          colorHeading: 'Account',
          rightDescription: 'Complete your registration',
          additionalElements: signupAdditionalElements,
        };
      default:
        return {};
    }
  };

  const stepProps = getCurrentStepProps();

  return (
    <AuthenticationComp
      image={SignInImg}
      leftTitle="Join thousands of educators and students"
      leftDescription="Create your account and start your IntelliTest experience"
      {...stepProps}
      isLoading={isLoading}
      bottomLinks={[
        {
          text: 'Already have an account? Sign In',
          action: () => navigate('/signin'),
          className: 'text-gray-700 hover:text-[#631891] font-semibold cursor-pointer',
        },
      ]}
      errors={errors}
    />
  );
};