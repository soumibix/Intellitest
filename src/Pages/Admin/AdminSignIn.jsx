import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationComp from "../../Components/common/AuthenticationComp";
import SignInImg from "../../assets/Authentication3.jpg";
import { useNotification } from "../../context/NotificationContext";
import { adminAuthAPI } from "../../apis/auth/adminAuth";
import { useAuth } from "../../context/AuthContext";
import { useHttp } from "../../Hooks/useHttps";

export const AdminSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const httpHook = useHttp();
  const { login } = useAuth();
  const { showNotification } = useNotification();

  // Validate form data
  const validateForm = (formData) => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (formData) => {
    // Reset errors
    setErrors({});

    // Validate form
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Prepare credentials
      const credentials = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };

      // Call API
      const response = await adminAuthAPI.signin(httpHook, credentials);

      if (response.success) {
        // Extract data from response
        const { token } = response.data;
        const userData = response.data;

        if (!userData || !token) {
          throw new Error("Invalid response from server");
        }

        // Determine storage type based on rememberMe
        // const storage = formData.rememberMe ? localStorage : sessionStorage;

        // Store authentication data
        // storage.setItem("token", token);
        // storage.setItem("role", userData.role);
        // storage.setItem("user", JSON.stringify({
        //   _id: userData._id,
        //   email: userData.email,
        //   role: userData.role,
        //   campus: userData.campus,
        //   createdAt: userData.createdAt,
        //   updatedAt: userData.updatedAt
        // }));


        // Also update auth context
        login(userData, userData.role, token, formData.rememberMe || false);

        // Show success message with correct variant
        showNotification("Sign in successful! Redirecting...", "success");

        // Redirect to admin dashboard
        setTimeout(() => {
          navigate("/admin/dashboard", { replace: true });
        }, 1000);
      } else {
        // Handle error response
        const errorMessage = response.message || "Sign in failed. Please try again.";
        setErrors({ form: errorMessage });
        showNotification(errorMessage, "error");
      }
    } catch (error) {
      console.error("Admin sign in error:", error);
      const errorMessage = error.message || "An unexpected error occurred. Please try again.";
      setErrors({ form: errorMessage });
      showNotification(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Form fields configuration
  const fields = [
    {
      name: "email",
      type: "email",
      label: "Email Address",
      placeholder: "admin@intellitest.com",
      autoComplete: "email",
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter your password",
      showRememberMe: true,
      rememberMeName: "rememberMe",
      rememberMeLabel: "Keep me signed in",
      autoComplete: "current-password",
    },
  ];

  // Additional elements (if you need forgot password later)
  const additionalElements = (
    <div className="text-right">
      {/* Uncomment when forgot password is implemented
      <button
        type="button"
        className="text-sm font-medium text-[#2B2B2B] hover:text-[#6B21A8] transition-colors cursor-pointer"
        onClick={() => navigate('/admin/forgot-password')}
      >
        Forgot password?
      </button>
      */}
    </div>
  );

  return (
    <AuthenticationComp
      image={SignInImg}
      leftTitle="IntelliTest Administration Portal"
      leftDescription="Log in to manage platform operations, review test activities, and ensure smooth functioning across all accounts."
      heading="Welcome"
      colorHeading="Back"
      fields={fields}
      initialFormData={{
        email: "",
        password: "",
        rememberMe: false,
      }}
      onSubmit={handleSubmit}
      submitButtonText="Sign In"
      isLoading={isLoading}
      additionalElements={additionalElements}
      bottomLinks={[
        {
          text: "Not admin? Sign In as Faculty",
          action: () => navigate("/faculty/signin"),
          className: "text-gray-700 hover:text-[#6B21A8] font-semibold cursor-pointer transition-colors",
        },
      ]}
      errors={errors}
    />
  );
};