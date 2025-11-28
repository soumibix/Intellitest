import { Edit2, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import Button from "../Components/common/Button";
import Input from "../Components/common/Input";
import { campusOptions, departmentOptions, designationOptions } from "../Config/dummyData";

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

  // Populate form when faculty changes or modal opens
  useEffect(() => {
    if (isOpen && faculty) {
      setFormData({
        name: faculty.name || "",
        email: faculty.email || "",
        designation: faculty.designation || "",
        department: faculty.department || "",
        campus: faculty.campus || "",
      });
    } else if (isOpen && !faculty) {
      // If no faculty is passed, get campus from session storage
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
  }, [isOpen, faculty]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.designation) {
      newErrors.designation = "Designation is required";
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
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
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

          {/* Email - Read Only */}
          <div className="mb-4">
            <label className="block text-md font-medium text-[#2B2B2B] mb-2 text-left">
              Email Address
            </label>
            <div className="px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 text-gray-700 cursor-not-allowed">
              {formData.email}
            </div>
          </div>

          <div className="mb-4">
            <Input
              type="dropdown"
              name="designation"
              label="Designation"
              value={formData.designation}
              onChange={(e) =>
                handleChange({
                  target: { name: "designation", value: e.target.value },
                })
              }
              options={designationOptions}
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

          {/* Institution - Read Only */}
          <div className="mb-6">
            <label className="block text-md font-medium text-[#2B2B2B] mb-2 text-left">
              Institution
            </label>
            <div className="px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 text-gray-700 cursor-not-allowed">
              {campusOptions.find((opt) => opt.value === formData.campus)?.label || "Not assigned"}
            </div>
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