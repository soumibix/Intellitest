import React, { useState, useEffect } from "react";
import { User, ArrowRight, LockKeyhole, Unlock } from "lucide-react";
import Input from "../../Components/common/Input";
import Button from "../../Components/common/Button";
import { studentAuthAPI } from "../../apis/auth/studentAuth";
import { useHttp } from "../../Hooks/useHttps";
import { batchOptions, campusOptions, departmentOptions, sectionOptions } from "../../Config/dummyData";
import handLoading from "../../Lottie/handLoading.json";
import Lottie from "lottie-react";

const UserDashboard = () => {
  const httpHook = useHttp();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const token = sessionStorage.getItem('token') || localStorage.getItem('token');

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    institutionName: "",
    department: "",
    batch: "",
    enrollmentNumber: "",
    section: "",
    rollNumber: "",
  });

  const [isProfileComplete, setIsProfileComplete] = useState(false);

  // Fetch profile data on component mount
  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const response = await studentAuthAPI.getProfile(httpHook, token);

      if (response.success && response.data) {
        const userData = response.data;

        // Update form data with fetched profile
        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          mobileNumber: userData.mobileNumber || "",
          institutionName: userData.institutionName || "",
          department: userData.department || "",
          batch: userData.batch || "",
          enrollmentNumber: userData.enrollmentNumber || "",
          section: userData.section || "",
          rollNumber: userData.rollNumber || "",
        });

        // Set profile completion status
        setIsProfileComplete(userData.allFieldsComplete || false);
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
    // Validate if all fields are filled
    const allFieldsFilled = Object.values(formData).every(
      (value) => value.trim() !== ""
    );

    if (!allFieldsFilled) {
      alert("Please fill all fields");
      return;
    }

    setSubmitting(true);
    try {
      // Prepare data for API (matching backend expected field names)
      const profileData = {
        mobileNumber: formData.mobileNumber,
        institutionName: formData.institutionName,
        department: formData.department,
        batch: formData.batch,
        section: formData.section,
        rollNumber: formData.rollNumber,
      };

      const response = await studentAuthAPI.updateProfile(httpHook, token, profileData);

      if (response.success) {
        alert("Profile updated successfully!");

        // Update profile completion status from response
        if (response.data && response.data.allFieldsComplete !== undefined) {
          setIsProfileComplete(response.data.allFieldsComplete);
        } else {
          // If backend doesn't return the field, check manually
          setIsProfileComplete(allFieldsFilled);
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

  // const institutionOptions = [
  //   { value: "", label: "College Campus" },
  //   { value: "IEM, Salt Lake", label: "IEM, Salt Lake" },
  //   { value: "IEM, Newtown", label: "IEM, Newtown" },
  //   { value: "IEM, Jaipur", label: "IEM, Jaipur" },
  // ];

  // const departmentOptions = [
  //   { value: "", label: "Civil Engineering" },
  //   { value: "Civil Engineering", label: "Civil Engineering" },
  //   { value: "Mechanical Engineering", label: "Mechanical Engineering" },
  //   { value: "Electrical Engineering", label: "Electrical Engineering" },
  //   { value: "Computer Science", label: "Computer Science" },
  //   { value: "CSE", label: "CSE" },
  // ];

  // const batchOptions = [
  //   { value: "", label: "Your Batch" },
  //   { value: "2021-2025", label: "2021-2025" },
  //   { value: "2022-2026", label: "2022-2026" },
  //   { value: "2023-2027", label: "2023-2027" },
  //   { value: "2024-2028", label: "2024-2028" },
  //   { value: "2020-2024", label: "2020-2024" },
  // ];

  // const sectionOptions = [
  //   { value: "", label: "Select Section" },
  //   { value: "A", label: "Section A" },
  //   { value: "B", label: "Section B" },
  //   { value: "C", label: "Section C" },
  //   { value: "D", label: "Section D" },
  //   { value: "E", label: "Section E" },
  //   { value: "F", label: "Section F" },
  //   { value: "G", label: "Section G" },
  //   { value: "H", label: "Section H" },
  //   { value: "I", label: "Section I" },
  //   { value: "J", label: "Section J" },
  //   { value: "K", label: "Section K" },
  //   { value: "L", label: "Section L" },
  //   { value: "M", label: "Section M" },
  //   { value: "N", label: "Section N" },
  //   { value: "O", label: "Section O" },
  //   { value: "P", label: "Section P" },
  //   { value: "Q", label: "Section Q" },
  //   { value: "R", label: "Section R" },
  //   { value: "S", label: "Section S" },
  //   { value: "T", label: "Section T" },
  //   { value: "U", label: "Section U" },
  //   { value: "V", label: "Section V" },
  //   { value: "W", label: "Section W" },
  //   { value: "X", label: "Section X" },
  //   { value: "Y", label: "Section Y" },
  //   { value: "Z", label: "Section Z" },
  // ];

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
        {/* Student Details Card */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Student Details
            </h2>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Row 1 - These fields are from signup, so disabled */}
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
            <Input
              type="tel"
              label="Mobile Number"
              placeholder="9876543210"
              value={formData.mobileNumber}
              onChange={handleChange("mobileNumber")}
              size="md"
            />

            {/* Row 2 */}
            <Input
              type="dropdown"
              label="Institution Name"
              placeholder="College Name"
              value={formData.institutionName}
              onChange={handleChange("institutionName")}
              options={campusOptions}
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
              placeholder="Your Batch"
              value={formData.batch}
              onChange={handleChange("batch")}
              options={batchOptions}
              size="md"
            />

            {/* Row 3 - Enrollment number from signup, so disabled */}
            <Input
              type="text"
              label="Enrollment Number"
              placeholder="ABC123456789"
              value={formData.enrollmentNumber}
              onChange={handleChange("enrollmentNumber")}
              size="md"
              disabled={true}
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

        {/* Unlock Tests Card or Unlocked Message */}
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
                  Unlock Tests
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
              All tests are now unlocked
            </p>
            <p className="text-sm sm:text-base text-green-600 mt-2">
              You can now access all available tests
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;