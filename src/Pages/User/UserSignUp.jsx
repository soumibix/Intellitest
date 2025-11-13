import React, { useState } from "react";
import AuthenticationComp from "../../Components/common/AuthenticationComp";
import { useNavigate } from "react-router-dom";
import SignInImg from "../../assets/Authentication3.jpg";

export const UserSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    setIsLoading(true);
    setErrors({});
    
    // Simulate API call
    setTimeout(() => {
      console.log('Sign Up Data:', formData);
      setIsLoading(false);
      // Add your registration logic here
    }, 2000);
  };

  const fields = [
    {
      name: 'fullName',
      type: 'text',
      label: 'Full Name',
      placeholder: 'Enter your full name',
    },
    {
      name: 'email',
      type: 'text',
      label: 'Email Address',
      placeholder: 'xyz@gmail.com',
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
      placeholder: '$056978@Abc',
    },
    {
      name: 'confirmPassword',
      type: 'password',
      label: 'Confirm Password',
      placeholder: '$056978@Abc',
    },
  ];


  return (
    <AuthenticationComp
      image={SignInImg}
      leftTitle="Join thousands of educators and students"
      leftDescription="Create your account and start your IntelliTest experience"
      heading="Create"
      colorHeading="Account"
      fields={fields}
      initialFormData={{
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      onSubmit={handleSubmit}
      submitButtonText="Sign Up"
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