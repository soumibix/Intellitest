import { UserPlus, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import Button from "../Components/common/Button";
import Input from "../Components/common/Input";
import { campusOptions, departmentOptions } from "../Config/dummyData";

export const AddFacultyModal = ({ isOpen, onClose, onAddFaculty, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    designation: "",
    department: "",
    campus: "",
  });
  const [errors, setErrors] = useState({});

  // Get campus from session storage on component mount or when modal opens
  useEffect(() => {
    if (isOpen) {
      const user = sessionStorage.getItem("user");
      if (user) {
        try {
          const userData = JSON.parse(user);
          setFormData((prev) => ({
            ...prev,
            campus: userData.campus || "",
          }));
        } catch (error) {
          console.error("Error parsing user from session storage:", error);
        }
      }
    }
  }, [isOpen]);

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
      onAddFaculty(formData);
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
      setFormData({
        name: "",
        email: "",
        designation: "",
        department: "",
        campus: "",
      });
      setErrors({});
      onClose();
    }
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
              placeholder="Enter Designation (e.g., Professor, Assistant Professor)"
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
              value={formData.department}
              onChange={(e) =>
                handleChange({ target: { name: "department", value: e.target.value } })
              }
              options={departmentOptions}
              error={errors.department}
              disabled={isSubmitting}
            />
          </div>

          {/* Display Institution as read-only text */}
          <div className="mb-6">
            <label className="block text-md font-medium text-[#2B2B2B] mb-2 text-left">
              Institution
            </label>
            <div className="px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 text-gray-700">
              {campusOptions.find((opt) => opt.value === formData.campus)?.label || "Not assigned"}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <Button
              onClick={handleSubmit}
              text={isSubmitting ? "Adding Faculty..." : "Add Faculty"}
              icon={!isSubmitting && <UserPlus size={18} />}
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