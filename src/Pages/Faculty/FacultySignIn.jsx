import React, { useState } from "react";
import AuthenticationComp from "../../Components/common/AuthenticationComp";
import SignInImg from "../../assets/AdminSignIn.jpg";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/common/Button";

export const FacultySignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    setIsLoading(true);
    setErrors({});
    
    // Simulate API call
    setTimeout(() => {
      console.log('Sign In Data:', formData);
      setIsLoading(false);
      // Add your authentication logic here
    }, 2000);
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
        className="text-sm font-medium text-[#2B2B2B] cursor-pointer"
        onClick={() => alert('Forgot password clicked')}
      >
        Forgot password?
      </button>
    </div>
  );

  return (
    <AuthenticationComp
      image={SignInImg}
      leftTitle="IntelliTest Faculty"
      leftDescription="Comprehensive assessment and evaluation platform for modern education"
      heading="Welcome"
      colorHeading="Back"
      fields={fields}
      initialFormData={{
        email: '',
        password: '',
        rememberMe: false,
      }}
      onSubmit={handleSubmit}
      submitButtonText="Sign In"
      isLoading={isLoading}
      additionalElements={additionalElements}
      bottomLinks={[
        {
          text: "Don't have an account? Sign Up",
          action: () => navigate('/admin/signup'),
          className: 'text-gray-700 hover:text-purple-600 font-semibold',
        },
      ]}
      errors={errors}
    />
  );
};