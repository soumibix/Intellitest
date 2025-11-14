// src/utils/AddFacultyModal.jsx
import { UserPlus, X } from "lucide-react";
import React, { useState } from "react";
import Button from "../Components/common/Button";
import Input from "../Components/common/Input";

// Institution options
const INSTITUTIONS = [
  { value: "college_campus", label: "College Campus" },
  { value: "iem_salt_lake", label: "IEM, Salt Lake" },
  { value: "iem_newtown", label: "IEM, Newtown" },
  { value: "iem_jaipur", label: "IEM, Jaipur" },
];

// Department options
const DEPARTMENTS = [
  { value: "computer_science", label: "Computer Science & Engineering" },
  { value: "electronics", label: "Electronics & Communication Engineering" },
  { value: "electrical", label: "Electrical Engineering" },
  { value: "mechanical", label: "Mechanical Engineering" },
  { value: "civil", label: "Civil Engineering" },
  { value: "information_technology", label: "Information Technology" },
  { value: "mathematics", label: "Mathematics" },
  { value: "physics", label: "Physics" },
  { value: "chemistry", label: "Chemistry" },
  { value: "management", label: "Management Studies" },
  { value: "other", label: "Other" },
];

export const AddFacultyModal = ({ isOpen, onClose, onAddFaculty }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    designation: "",
    department: "",
    institution: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.designation.trim()) {
      newErrors.designation = "Designation is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.department) {
      newErrors.department = "Department is required";
    }

    if (!formData.institution) {
      newErrors.institution = "Institution is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onAddFaculty(formData);
      setFormData({
        fullName: "",
        email: "",
        designation: "",
        department: "",
        institution: "",
      });
      setErrors({});
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleClose = () => {
    setFormData({
      fullName: "",
      email: "",
      designation: "",
      department: "",
      institution: "",
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur shadow-top bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b sticky top-0 bg-white z-10">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Add New Faculty
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-red-600 transition cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="mb-4">
            <Input
              type="text"
              name="fullName"
              label="Full Name"
              placeholder="Enter Full Name"
              value={formData.fullName}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              error={errors.fullName}
            />
          </div>

          <div className="mb-4">
            <Input
              type="email"
              name="email"
              label="Email Address"
              placeholder="Enter Email Address"
              value={formData.email}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              error={errors.email}
            />
          </div>

          <div className="mb-4">
            <Input
              type="text"
              name="designation"
              label="Designation"
              placeholder="Enter Designation (e.g., Professor, Assistant Professor)"
              value={formData.designation}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              error={errors.designation}
            />
          </div>

          <div className="mb-4">
            <Input
              type="dropdown"
              name="department"
              label="Department"
              placeholder="Select Department"
              value={formData.department}
              onChange={(e) =>
                handleChange({ target: { name: "department", value: e.target.value } })
              }
              options={DEPARTMENTS}
              error={errors.department}
            />
          </div>

          <div className="mb-6">
            <Input
              type="dropdown"
              name="institution"
              label="Institution"
              placeholder="Select Institution"
              value={formData.institution}
              onChange={(e) =>
                handleChange({ target: { name: "institution", value: e.target.value } })
              }
              options={INSTITUTIONS}
              error={errors.institution}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <Button
              onClick={handleSubmit}
              text="Add Faculty"
              icon={<UserPlus size={18} />}
              textSize="text-sm sm:text-md"
              color="#631891"
              padding="w-full sm:w-auto px-4 py-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};