import React, { useState } from "react";
import { User, Lock, ArrowRight } from "lucide-react";
import Input from "../../Components/common/Input";
import Button from "../../Components/common/Button";

const UserDashboard = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    institution: "",
    department: "",
    batch: "",
    enrollmentNumber: "",
    section: "",
    rollNumber: "",
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

  const institutionOptions = [
    { value: "", label: "College Name" },
    { value: "college1", label: "MIT College" },
    { value: "college2", label: "Stanford University" },
    { value: "college3", label: "Harvard University" },
  ];

  const departmentOptions = [
    { value: "", label: "Civil Engineering" },
    { value: "civil", label: "Civil Engineering" },
    { value: "mechanical", label: "Mechanical Engineering" },
    { value: "electrical", label: "Electrical Engineering" },
    { value: "computer", label: "Computer Science" },
  ];

  const batchOptions = [
    { value: "", label: "Your Designation" },
    { value: "2021", label: "2021-2025" },
    { value: "2022", label: "2022-2026" },
    { value: "2023", label: "2023-2027" },
    { value: "2024", label: "2024-2028" },
  ];

  const sectionOptions = [
    { value: "", label: "Section A" },
    { value: "a", label: "Section A" },
    { value: "b", label: "Section B" },
    { value: "c", label: "Section C" },
    { value: "d", label: "Section D" },
  ];

  return (
    <div className="h-full overflow-hidden">
      <div className="">
        {/* Student Details Card */}
        <div className=" p-8">
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <User className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              Student Details
            </h2>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Row 1 */}
            <Input
              type="text"
              label="Name"
              placeholder="Abhirup Ghosh"
              value={formData.name}
              onChange={handleChange("name")}
              size="md"
            />
            <Input
              type="email"
              label="Email Address"
              placeholder="abhirupghosh@gmail.com"
              value={formData.email}
              onChange={handleChange("email")}
              size="md"
            />
            <Input
              type="tel"
              label="Mobile Number"
              placeholder="+91"
              value={formData.mobile}
              onChange={handleChange("mobile")}
              size="md"
            />

            {/* Row 2 */}
            <Input
              type="dropdown"
              label="Institution Name"
              placeholder="College Name"
              value={formData.institution}
              onChange={handleChange("institution")}
              options={institutionOptions}
              size="md"
            />
            <Input
              type="dropdown"
              label="Department"
              placeholder="Civil Engineering"
              value={formData.department}
              onChange={handleChange("department")}
              options={departmentOptions}
              size="md"
            />
            <Input
              type="dropdown"
              label="Batch"
              placeholder="Your Designation"
              value={formData.batch}
              onChange={handleChange("batch")}
              options={batchOptions}
              size="md"
            />

            {/* Row 3 */}
            <Input
              type="text"
              label="Enrollment Number"
              placeholder="ABC123456789"
              value={formData.enrollmentNumber}
              onChange={handleChange("enrollmentNumber")}
              size="md"
            />
            <Input
              type="dropdown"
              label="Section"
              placeholder="Section A"
              value={formData.section}
              onChange={handleChange("section")}
              options={sectionOptions}
              size="md"
            />
            <Input
              type="text"
              label="Roll Number"
              placeholder="12345"
              value={formData.rollNumber}
              onChange={handleChange("rollNumber")}
              size="md"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <Button
              text="Submit"
              color="[#7C3AED]"
              padding="px-8 py-3"
              width="w-40"
              icon={<ArrowRight size={18} />}
              iconPosition="right"
              onClick={handleSubmit}
            />
          </div>
        </div>

        {/* Unlock Tests Card */}
        {!isProfileComplete && (
          <div className="relative bg-gradient-to-br from-[#57157F] to-[#3A0E54] rounded-lg shadow-lg p-12 text-center h-screen">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 border-4 border-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/4 w-24 h-24 border-4 border-white rounded-full"></div>
            </div>

            {/* Lock Icon */}
            <div className="absolute -top-10 right-[48%] z-10 mb-6 flex justify-center">
              <div className="bg-white backdrop-blur-sm rounded-full p-4 inline-block border-2 border-purple-300">
                <Lock className="w-8 h-8 text-black" />
              </div>
            </div>

            {/* Text Content */}
            <div className="relative z-10">
              <p className="text-white/90 text-lg mb-2">
                Complete Your Profile to
              </p>
              <h3 className="text-white text-2xl font-bold">Unlock Tests</h3>
            </div>
          </div>
        )}

        {/* Success Message */}
        {isProfileComplete && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="bg-green-100 rounded-full p-3">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Profile Complete!
            </h3>
            <p className="text-green-700">
              You can now access all available tests
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;