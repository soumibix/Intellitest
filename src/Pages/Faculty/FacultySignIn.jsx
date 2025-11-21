import React, { useState } from "react";
import AuthenticationComp from "../../Components/common/AuthenticationComp";
import SignInImg from "../../assets/Authentication3.webp";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../../Hooks/useHttps"; 
import { facultyAuthAPI } from "../../apis/auth/facultyAuth"; 
import { useAuth } from "../../AppRouter";

export const FacultySignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const httpHook = useHttp(); 

  const { login } = useAuth();

  // Validation function for email
  const validateEmail = (email) => {
    if (!email || email.trim() === '') {
      return 'Email is required';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return 'Please enter a valid email address';
    }
    
    return null;
  };

  // Validation function for password
  const validatePassword = (password) => {
    if (!password || password.trim() === '') {
      return 'Password is required';
    }
    
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    
    return null;
  };

  // Validate entire form
  const validateForm = (formData) => {
    const newErrors = {};
    
    const emailError = validateEmail(formData.email);
    if (emailError) {
      newErrors.email = emailError;
    }
    
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }
    
    return newErrors;
  };

  const handleSubmit = async (formData) => {
    // Clear previous errors
    setErrors({});
    
    // Validate form before making API call
    const validationErrors = validateForm(formData);
    
    // If there are validation errors, set them and stop execution
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // API will NOT be called
    }
    
    // If validation passes, proceed with API call
    setIsLoading(true);
    
    try {
      const response = await facultyAuthAPI.signin(httpHook, {
        email: formData.email.trim(), 
        password: formData.password
      });
      
      if (response.success) {
        // Check if user is verified
        if (response.data?.isVerified) {
          // Store remember me preference
          if (formData.rememberMe) {
            localStorage.setItem('rememberFacultyEmail', formData.email.trim());
          } else {
            localStorage.removeItem('rememberFacultyEmail');
          }

          // Call login with correct parameters
          login(
            response.data.user || response.data, // userData
            response.data.role || 'faculty',      // userRole
            response.token,                       // token
            formData.rememberMe || false          // rememberMe
          );

          // Navigate to dashboard based on role
          const role = response.data.role || 'faculty';
          navigate(`/${role.toLowerCase()}/dashboard`);
          
        } else {
          // User is not verified, redirect to reset password
          navigate('/faculty/reset-new-password', { 
            state: { email: formData.email.trim() } 
          });
        }
      } else {
        // Handle error response
        setErrors({ 
          general: response.message || "Sign in failed. Please check your credentials." 
        });
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setErrors({ 
        general: error.response?.data?.message || "An unexpected error occurred. Please try again." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    {
      name: 'email',
      type: 'text',
      label: 'Email Address',
      placeholder: 'Enter your email',
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Enter your password',
      showRememberMe: true,
      rememberMeName: 'rememberMe',
      rememberMeLabel: 'Remember me',
    },
  ];

  const additionalElements = (
    <>
      <div className="text-right">
        <button
          type="button"
          className="text-sm font-medium text-[#2B2B2B] cursor-pointer hover:underline"
          onClick={() => navigate('/faculty/forgot-password')}
        >
          Forgot password?
        </button>
      </div>
      
      {/* General error message */}
      {/* {errors.general && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{errors.general}</p>
        </div>
      )} */}
    </>
  );

  return (
    <AuthenticationComp
      image={SignInImg}
      leftTitle="Welcome back, educator!"
      leftDescription="Sign in to manage your assessments, monitor student progress, and continue your IntelliTest teaching journey."
      heading="Welcome"
      colorHeading="Back"
      fields={fields}
      initialFormData={{
        email: localStorage.getItem('rememberFacultyEmail') || '',
        password: '',
        rememberMe: !!localStorage.getItem('rememberFacultyEmail'),
      }}
      onSubmit={handleSubmit}
      submitButtonText="Sign In"
      isLoading={isLoading}
      additionalElements={additionalElements}
      bottomLinks={[
        {
          text: "Not faculty? Sign In as Admin",
          action: () => navigate('/admin/signin'),
          className: 'text-gray-700 hover:text-[#6B21A8] font-semibold cursor-pointer',
        },
      ]}
      errors={errors}
    />
  );
};