import React, { useState, useEffect } from "react";
import { User, Unlock, LockKeyhole, ArrowRight } from "lucide-react";
import Input from "../../Components/common/Input";
import Lottie from "lottie-react";
import handLoading from "../../Lottie/handLoading.json";

const AdminProfilePage = () => {
  const [loading, setLoading] = useState(true);

  // GET ADMIN DATA FROM SESSION STORAGE
  const userDataStr = sessionStorage.getItem("user");
  const adminData = userDataStr ? JSON.parse(userDataStr) : null;

  const [formData, setFormData] = useState({
    email: "",
    role: "",
    campus: "",
  });

  useEffect(() => {
    if (adminData) {
      setFormData({
        email: adminData.email || "",
        role: adminData.role || "",
        campus: adminData.campus || "",
      });

      setLoading(false);
    }
  }, [adminData]);

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
      <div className="mx-4 sm:mx-6 lg:mx-6 flex flex-col justify-between min-h-screen">
        
        {/* Page Header */}
        <div className="p-4 sm:p-6 lg:p-6">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#6D28D9]" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Admin Details
            </h2>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

            <Input
              type="email"
              label="Email Address"
              value={formData.email}
              disabled={true}
              placeholder="Admin Email"
              size="md"
            />

            <Input
              type="text"
              label="Role"
              value={formData.role}
              disabled={true}
              placeholder="Admin Role"
              size="md"
            />

            <Input
              type="text"
              label="Campus"
              value={formData.campus}
              disabled={true}
              placeholder="Campus"
              size="md"
            />
          </div>

          {/* No Update Button — Admin fields are fixed */}
          <div className="flex justify-center mt-8">
            <div className="bg-purple-100 text-[#631891] font-medium px-6 py-3 rounded-lg shadow-sm">
              Admin profile is locked — details cannot be edited
            </div>
          </div>
        </div>

        {/* Unlocked Card (Always for Admin) */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-6 sm:p-8 text-center mt-6 sm:mt-8 shadow-lg">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-3 sm:p-4 shadow-lg">
              <Unlock className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-2">
            Full Access Enabled
          </h3>
          <p className="text-base sm:text-lg text-green-700 font-medium">
            You have full admin-level permissions
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
