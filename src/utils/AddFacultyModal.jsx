import { UserPlus, X } from "lucide-react";
import React, { useState } from "react";
import Button from "../Components/common/Button";
import Input from "../Components/common/Input";

export const AddFacultyModal = ({ isOpen, onClose, onAddFaculty }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onAddFaculty(formData);
      setFormData({ fullName: '', email: '' });
      setErrors({});
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Add New Faculty</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-600 transition cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
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

          <div className="mb-6">
            <Input
                type="email"
                name="email"
                label="Email address"
                placeholder="Enter Email address"
                value={formData.email}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                error={errors.email}
            />
          </div>

          <div className="flex gap-3">
            <Button
              onClick={onClose}
              text="Cancel"
              textSize="text-md"
              color="#DD0303"
              padding="flex-1 px-4 py-2"
            />
            <Button
              onClick={handleSubmit}
              text="Add Faculty"
              icon={<UserPlus />}
              textSize="text-md"
              color="#631891"
              padding="flex-1 px-4 py-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};