import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthenticationComp from "../../Components/common/AuthenticationComp";
import SignInImg from "../../assets/Authentication3.jpg";
import { facultyAuthAPI } from "../../apis/auth/facultyAuth"; 
import { useHttp } from "../../Hooks/useHttps";


const ResetNewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const httpHook = useHttp(); 

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async(formData) => {
    setIsLoading(true);
    setErrors({});

    if (formData.newPassword !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      setIsLoading(false);
      return;
    }

    const response = await facultyAuthAPI.resetPassword(httpHook , email, formData.newPassword)
    // console.log(response)

    // Simulate API call
    setTimeout(() => {
      console.log("Password reset for:", email);
      setIsLoading(false);
      navigate("/faculty/signin"); // redirect to login page
    }, 1500);
  };

  const fields = [
    {
      name: "newPassword",
      type: "password",
      label: "New Password",
      placeholder: "Enter new password",
      required: true,
    },
    {
      name: "confirmPassword",
      type: "password",
      label: "Confirm Password",
      placeholder: "Re-enter new password",
      required: true,
    },
  ];

  return (
    <AuthenticationComp
      image={SignInImg}
      leftTitle = "Let’s get you back in"
      leftDescription = "Reset your password securely and continue managing your IntelliTest assessments without interruption."
      rightDescription="Create a new password to regain access to your IntelliTest account."
      heading="Set New Password"
      fields={fields}
      initialFormData={{
        newPassword: "",
        confirmPassword: "",
      }}
      onSubmit={handleSubmit}
      submitButtonText="Reset Password"
      isLoading={isLoading}
      errors={errors}
    />
  );
};

export default ResetNewPassword;