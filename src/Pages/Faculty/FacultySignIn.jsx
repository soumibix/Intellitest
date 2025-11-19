import React, { useContext, useState } from "react";
import AuthenticationComp from "../../Components/common/AuthenticationComp";
import SignInImg from "../../assets/Authentication3.jpg";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../../hooks/useHttps"; 
import { facultyAuthAPI } from "../../apis/auth/facultyAuth"; 
import { useAuth } from "../../AppRouter";

export const FacultySignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const httpHook = useHttp(); 

  const { login } = useAuth();

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setErrors({});
    
    try {
      const credentials = {
        email: formData.email,
        password: formData.password,
      };

      const response = await facultyAuthAPI.signin(httpHook, {
        email: formData.email, 
        password: formData.password
      });
      
      if (response.success) {
        // Check if user is verified
        if (response.data?.isVerified) {
          // Call login with correct parameters
          login(
            response.data.user || response.data, // userData
            response.data.role || 'faculty',      // userRole
            response.token,                  // token
            formData.rememberMe || false          // rememberMe
          );

          // Navigate to dashboard based on role
          const role = response.data.role || 'faculty';
          navigate(`/${role.toLowerCase()}/dashboard`);
          
        } else {
          // User is not verified, redirect to reset password
          navigate('/faculty/reset-new-password', { 
            state: { email: formData.email } 
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
        general: "An unexpected error occurred. Please try again." 
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
    <div className="text-right">
      <button
        type="button"
        className="text-sm font-medium text-[#2B2B2B] cursor-pointer hover:underline"
        onClick={() => navigate('/faculty/forgot-password')}
      >
        Forgot password?
      </button>
    </div>
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