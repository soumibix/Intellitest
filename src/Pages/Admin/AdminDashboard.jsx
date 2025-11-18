import React, { useState } from "react";
import { User, ArrowRight, LockKeyhole } from "lucide-react";
import Input from "../../Components/common/Input";
import Button from "../../Components/common/Button";

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    institution: "",
    department: "",
    designation: "",
  });

  const [isProfileComplete, setIsProfileComplete] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    // Validate if all fields are filled
    const allFieldsFilled = Object.values(formData).every(
      (value) => value.trim() !== ""
    );

    if (allFieldsFilled) {
      setIsProfileComplete(true);
      alert("Profile submitted successfully!");
    } else {
      alert("Please fill all fields");
    }
  };

  const institutionOptions =  [
    { value: "", label: "College Campus" },
    { value: "college1", label: "IEM, Salt Lake" },
    { value: "college2", label: "IEM, Newtown" },
    { value: "college3", label: "IEM, Jaipur" },
  ];


  const designationOptions = [
    { value: "", label: "Your Designation" },
    { value: "professor", label: "Professor" },
    { value: "associateProfessor", label: "Associate Professor" },
    { value: "assistantProfessor", label: "Assistant Professor" },
    { value: "lecturer", label: "Lecturer" },
    { value: "instructor", label: "Instructor" }
  ];



  return (
    <div className="relative h-full">
      <div className="w-full justify-center flex h-full items-center text-[3rem] font-bold text-[#593994] text-center">An Amazing Dashboard <br /> Share Your Thoughts</div>
    </div>
  );
};

export default AdminDashboard;