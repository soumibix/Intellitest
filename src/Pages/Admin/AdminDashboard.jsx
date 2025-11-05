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

  const institutionOptions = [
    { value: "", label: "College Campus" },
    { value: "college1", label: "IEM, Salt Lake" },
    { value: "college2", label: "IEM, Newtown" },
    { value: "college3", label: "IEM, Jaipur" },
  ];

  const departmentOptions = [
    { value: "", label: "Civil Engineering" },
    { value: "civil", label: "Civil Engineering" },
    { value: "mechanical", label: "Mechanical Engineering" },
    { value: "electrical", label: "Electrical Engineering" },
    { value: "computer", label: "Computer Science" },
  ];

  const designationOptions = [
    { value: "", label: "Your Designation" },
    { value: "professor", label: "Professor" },
    { value: "associateProfessor", label: "Associate Professor" },
    { value: "assistantProfessor", label: "Assistant Professor" },
    { value: "lecturer", label: "Lecturer" },
    { value: "instructor", label: "Instructor" }
  ];

  const sectionOptions = [
    { value: "", label: "Section A" },
    { value: "a", label: "Section A" },
    { value: "b", label: "Section B" },
    { value: "c", label: "Section C" },
    { value: "d", label: "Section D" },
  ];

  return (
    <div className="relative">
      <div className="mx-4 sm:mx-6 lg:mx-8">
        {/* Student Details Card */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Faculty Details
            </h2>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Row 1 */}
            <Input
              type="text"
              label="Name"
              placeholder="Firstname Lastname"
              value={formData.name}
              onChange={handleChange("name")}
              size="md"
            />
            <Input
              type="email"
              label="Email Address"
              placeholder="xyz@gmail.com"
              value={formData.email}
              onChange={handleChange("email")}
              size="md"
            />
            <Input
              type="tel"
              label="Mobile Number"
              placeholder="9874563219"
              value={formData.mobile}
              onChange={handleChange("mobile")}
              size="md"
            />

            {/* Row 2 */}
            <Input
              type="dropdown"
              label="Institution Campus Name"
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
              label="Designation"
              placeholder="Your Designation"
              value={formData.designation}
              onChange={handleChange("designation")}
              options={designationOptions}
              size="md"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6 sm:mt-8">
            <Button
              text="Submit"
              color="[#631891]"
              padding="py-3 sm:py-4"
              width="w-32 sm:w-40"
              icon={<ArrowRight size={18} />}
              iconPosition="right"
              onClick={handleSubmit}
            />
          </div>
        </div>

        {/* Unlock Tests Card */}
        {!isProfileComplete && (
          <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 mt-8 sm:mt-10 lg:mt-12 px-12 bottom-0">
            <div
              className="relative p-6 sm:p-8 lg:p-12 text-center w-full rounded-t-3xl sm:rounded-t-4xl h-full"
              style={{
                background: "linear-gradient(to bottom, #631891, #1D072B)",
              }}
            >
              {/* IntelliTest background text */}
              <div className="relative flex items-center justify-center z-0 overflow-hidden">
                <span
                  className="font-extrabold text-transparent bg-clip-text select-none translate-y-0"
                  style={{
                    fontSize: "15vw", // scales with screen width
                    lineHeight: 1,
                    backgroundImage: "linear-gradient(to bottom, #59158100, #6D209A)",
                    backgroundSize: "100% 100%",
                    backgroundPosition: "bottom",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    whiteSpace: "nowrap",
                    
                  }}
                >
                  IntelliTest
                </span>
              </div>

              {/* Foreground content */}
              <div className="absolute flex-col left-1/2 transform -translate-x-1/2 top-20 justify-center z-10">
                <p className="text-[#DEA7FF] text-base sm:text-xl lg:text-2xl font-semibold mb-2">
                  Complete Your Profile to
                </p>
                <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-bold tracking-wide">
                  Unlock Tests
                </h3>
              </div>

              {/* Lock Icon */}
              <div className="absolute -top-6 sm:-top-8 lg:-top-10 left-1/2 transform -translate-x-1/2 flex justify-center z-10">
                <div className="bg-white backdrop-blur-sm rounded-full p-4 sm:p-5 lg:p-6 inline-block border-2 border-[#631891]">
                  <LockKeyhole className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#631891]" />
                </div>
              </div>
            </div>
          </div>
        )}




        {/* Success Message */}
        {isProfileComplete && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6 text-center mt-6 sm:mt-8">
            <div className="flex justify-center mb-3">
              <div className="bg-green-100 rounded-full p-2 sm:p-3">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-green-600"
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
            <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-2">
              Profile Complete!
            </h3>
            <p className="text-sm sm:text-base text-green-700">
              You can now access all available tests
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;