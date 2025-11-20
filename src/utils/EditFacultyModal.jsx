// src/utils/EditFacultyModal.jsx
import { Edit2, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import Button from "../Components/common/Button";
import Input from "../Components/common/Input";
import { campusOptions, departmentOptions } from "../Config/dummyData";

// Institution options
// const INSTITUTIONS = [
//   { value: "IEM Saltlake", label: "IEM, Salt Lake" },
//   { value: "IEM Newtown", label: "IEM, Newtown" },
//   { value: "UEM Jaipur", label: "IEM, Jaipur" },
// ];

// Department options
// const DEPARTMENTS = [
//   { value: "computer_science", label: "Computer Science & Engineering" },
//   { value: "electronics", label: "Electronics & Communication Engineering" },
//   { value: "electrical", label: "Electrical Engineering" },
//   { value: "mechanical", label: "Mechanical Engineering" },
//   { value: "civil", label: "Civil Engineering" },
//   { value: "information_technology", label: "Information Technology" },
//   { value: "mathematics", label: "Mathematics" },
//   { value: "physics", label: "Physics" },
//   { value: "chemistry", label: "Chemistry" },
//   { value: "management", label: "Management Studies" },
//   { value: "other", label: "Other" },
// ];

export const EditFacultyModal = ({
  isOpen,
  onClose,
  onUpdateFaculty,
  faculty,
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    designation: "",
    department: "",
    campus: "",
  });
  const [errors, setErrors] = useState({});

  // Populate form when faculty changes
  useEffect(() => {
    if (faculty) {
      setFormData({
        name: faculty.name || "",
        email: faculty.email || "",
        designation: faculty.designation || "",
        department: faculty.department || "",
        campus: faculty.campus || "",
      });
    }
  }, [faculty]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
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

    if (!formData.campus) {
      newErrors.campus = "Institution is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm() && !isSubmitting) {
      onUpdateFaculty(formData);
      // Don't close modal or reset form here - parent will handle it after API success
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
    if (e.key === "Enter" && !isSubmitting) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setErrors({});
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b sticky top-0 bg-white z-10">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Edit Faculty
          </h2>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className={`text-gray-400 hover:text-red-600 transition ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="mb-4">
            <Input
              type="text"
              name="name"
              label="Full Name"
              placeholder="Enter Full Name"
              value={formData.name}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              error={errors.name}
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-4">
            <Input
              type="text"
              name="designation"
              label="Designation"
              placeholder="Enter Designation"
              value={formData.designation}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              error={errors.designation}
              disabled={isSubmitting}
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
                handleChange({
                  target: { name: "department", value: e.target.value },
                })
              }
              options={departmentOptions}
              error={errors.department}
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-6">
            <Input
              type="dropdown"
              name="campus"
              label="Institution"
              placeholder="Select Institution"
              value={formData.campus}
              onChange={(e) =>
                handleChange({ target: { name: "campus", value: e.target.value } })
              }
              options={campusOptions}
              error={errors.campus}
              disabled={isSubmitting}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <Button
              onClick={handleClose}
              text="Cancel"
              textSize="text-sm sm:text-md"
              color="#6B7280"
              padding="w-full sm:w-auto px-4 py-2"
              disabled={isSubmitting}
            />
            <Button
              onClick={handleSubmit}
              text={isSubmitting ? "Updating..." : "Update Faculty"}
              icon={!isSubmitting && <Edit2 size={18} />}
              textSize="text-sm sm:text-md"
              color="#631891"
              padding="w-full sm:w-auto px-4 py-2"
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
};