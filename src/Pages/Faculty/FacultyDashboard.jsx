import React, { useState, useEffect } from "react";
import { User, ArrowRight, LockKeyhole, Unlock } from "lucide-react";
import Input from "../../Components/common/Input";
import Button from "../../Components/common/Button";
import { facultyAuthAPI } from "../../apis/auth/facultyAuth";
import { useHttp } from "../../Hooks/useHttps";
import { departmentOptions } from "../../Config/dummyData";
import Lottie from "lottie-react";
import handLoading from "../../Lottie/handLoading.json"
const FacultyDashboard = () => {
  const httpHook = useHttp();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const token= sessionStorage.getItem('token');
  
  // Get user data from sessionStorage
  const userDataStr = sessionStorage.getItem('user');
  const userData = userDataStr ? JSON.parse(userDataStr) : null;
  const facultyId = userData?._id;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    campus: "",
    department: "",
    designation: "",
  });

  const [isProfileComplete, setIsProfileComplete] = useState(false);

  // Fetch profile data on component mount
  useEffect(() => {
    if (facultyId) {
      fetchProfileData();
    }
  }, [facultyId]);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const response = await facultyAuthAPI.getProfile(httpHook, token, facultyId);

      if (response.success && response.data) {
        const profileData = response.data;

        // Update form data with fetched profile
        setFormData({
          name: profileData.name || "",
          email: profileData.email || "",
          campus: profileData.campus || "",
          department: profileData.department || "",
          designation: profileData.designation || "",
        });

        // Check if profile is complete
        const isComplete = 
          profileData.campus && 
          profileData.department && 
          profileData.designation;
        setIsProfileComplete(isComplete);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      alert("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    // Validate if required fields are filled
    const requiredFields = ['campus', 'department', 'designation'];
    const allFieldsFilled = requiredFields.every(
      (field) => formData[field].trim() !== ""
    );

    if (!allFieldsFilled) {
      alert("Please fill all required fields");
      return;
    }

    setSubmitting(true);
    try {
      // Prepare data for API
      const profileData = {
        campus: formData.campus,
        department: formData.department,
        designation: formData.designation,
      };

      const response = await facultyAuthAPI.updateProfile(
        httpHook,
        token,
        facultyId,
        profileData
      );

      if (response.success) {
        alert("Profile updated successfully!");
        
        // Update profile completion status
        setIsProfileComplete(true);
        
        // Update sessionStorage with new data
        if (response.data) {
          sessionStorage.setItem('user', JSON.stringify(response.data));
        }
      } else {
        alert(response.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating profile");
    } finally {
      setSubmitting(false);
    }
  };

  const campusOptions = [
    { value: "", label: "Select Campus" },
    { value: "IEM Salt Lake", label: "IEM SaltLake" },
    { value: "IEM Newtown", label: "IEM Newtown" },
    { value: "UEM Jaipur", label: "UEM Jaipur" },
  ];

  // const departmentOptions = [
  //   { value: "", label: "Select Department" },
  //   { value: "Civil Engineering", label: "Civil Engineering" },
  //   { value: "Mechanical Engineering", label: "Mechanical Engineering" },
  //   { value: "Electrical Engineering", label: "Electrical Engineering" },
  //   { value: "Computer Science", label: "Computer Science" },
  //   { value: "CSE", label: "CSE" },
  // ];

  const designationOptions = [
    { value: "", label: "Select Designation" },
    { value: "Professor", label: "Professor" },
    { value: "Associate Professor", label: "Associate Professor" },
    { value: "Assistant Professor", label: "Assistant Professor" },
    { value: "Lecturer", label: "Lecturer" },
    { value: "Teaching Assistant", label: "Teaching Assistant" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Lottie 
            animationData={handLoading} 
            loop={true}
            style={{ width: 500, height: 500 }}
          />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="mx-4 sm:mx-6 lg:mx-8 flex flex-col justify-between min-h-screen">
        {/* Faculty Details Card */}
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
            {/* Row 1 - Name and Email (disabled, from signup) */}
            <Input
              type="text"
              label="Name"
              placeholder="Firstname Lastname"
              value={formData.name}
              onChange={handleChange("name")}
              size="md"
              disabled={true}
            />
            <Input
              type="email"
              label="Email Address"
              placeholder="xyz@gmail.com"
              value={formData.email}
              onChange={handleChange("email")}
              size="md"
              disabled={true}
            />

            {/* Row 2 - Campus, Department, Designation */}
            <Input
              type="dropdown"
              label="Campus"
              placeholder="Select Campus"
              value={formData.campus}
              onChange={handleChange("campus")}
              options={campusOptions}
              size="md"
            />
            <Input
              type="dropdown"
              label="Department"
              placeholder="Select Department"
              value={formData.department}
              onChange={handleChange("department")}
              options={departmentOptions}
              size="md"
            />
            <Input
              type="dropdown"
              label="Designation"
              placeholder="Select Designation"
              value={formData.designation}
              onChange={handleChange("designation")}
              options={designationOptions}
              size="md"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6 sm:mt-8">
            <Button
              text={
                submitting
                  ? "Submitting..."
                  : isProfileComplete
                    ? "Update"
                    : "Submit"
              }
              color="[#631891]"
              padding="py-3 sm:py-4"
              width="w-32 sm:w-40"
              icon={<ArrowRight size={18} />}
              iconPosition="right"
              onClick={handleSubmit}
              disabled={submitting}
            />
          </div>
        </div>

        {/* Unlock Features Card or Unlocked Message */}
        {!isProfileComplete ? (
          <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 mt-8 sm:mt-10 lg:mt-12 px-12 bottom-0">
            <div
              className="relative p-6 sm:p-8 lg:p-12 text-center w-full rounded-t-3xl sm:rounded-t-4xl"
              style={{
                background: "linear-gradient(to bottom, #631891, #1D072B)",
              }}
            >
              {/* IntelliTest background text */}
              <div className="relative flex items-center justify-center z-0 overflow-hidden">
                <span
                  className="font-extrabold text-transparent bg-clip-text select-none translate-y-0"
                  style={{
                    fontSize: "15vw",
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
              <div className="absolute flex-col left-1/2 transform -translate-x-1/2 top-5 lg:top-20 md:top-10 justify-center z-10">
                <p className="text-[#DEA7FF] text-base sm:text-xl lg:text-2xl font-semibold mb-2">
                  Complete Your Profile to
                </p>
                <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-bold tracking-wide">
                  Unlock All Features
                </h3>
              </div>

              {/* Lock Icon */}
              <div className="absolute -top-10 lg:-top-10 md:-top-9 left-1/2 transform -translate-x-1/2 flex justify-center z-10">
                <div className="bg-white rounded-full p-4 sm:p-5 lg:p-6 inline-block border-2 border-[#631891]">
                  <LockKeyhole className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#631891]" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-6 sm:p-8 text-center mt-6 sm:mt-8 shadow-lg">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-3 sm:p-4 shadow-lg">
                <Unlock className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-2">
              Profile Complete!
            </h3>
            <p className="text-base sm:text-lg text-green-700 font-medium">
              All features are now unlocked
            </p>
            <p className="text-sm sm:text-base text-green-600 mt-2">
              You can now access all faculty features and tools
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyDashboard;