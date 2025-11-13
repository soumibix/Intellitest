import React, { useState } from "react";
import AuthenticationComp from "../../Components/common/AuthenticationComp";
import SignInImg from "../../assets/Authentication3.jpg";
import { useNavigate } from "react-router-dom";

const UserSignIn = () => {
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
      name: 'enrollmentNumber',
      type: 'number',
      label: 'Enrollment Number',
      placeholder: 'Enter your enrollment number',
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
        onClick={() => navigate('/forgot-password')}
      >
        Forgot password?
      </button>
    </div>
  );

  return (
    <AuthenticationComp
      image={SignInImg}
      leftTitle = "Welcome back, learner!"
      leftDescription = "Sign in to take your next test, check your scores, and stay on top of your goals with IntelliTest."
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
          action: () => navigate('/signup'),
          className: 'text-gray-700 hover:text-[#631891] font-semibold cursor-pointer',
        },
      ]}
      errors={errors}
    />
  );
};
export default UserSignIn;