import { UserPlus, Edit2, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { AddFacultyModal } from "../../utils/AddFacultyModal";
import { EditFacultyModal } from "../../utils/EditFacultyModal";
import { ConfirmationModal } from "../../utils/ConfirmationModal";
import Button from "../../Components/common/Button";
import { useHttp } from "../../Hooks/useHttps";
import { useAuth } from "../../AppRouter";
import { adminFacultyAPI } from "../../apis/auth/adminAuth";

const AddFaculty = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const http = useHttp();
  const { token } = useAuth();

  // Fetch all faculties on component mount
  useEffect(() => {
    fetchFaculties();
  }, [token]);

  const fetchFaculties = async () => {
    setIsLoading(true);
    try {
      const response = await adminFacultyAPI.getAllFaculties(http, token);

      if (response?.success) {
        setFaculties(response.data);
      } else {
        console.error("Failed to fetch faculties:", response?.message);
      }
    } catch (error) {
      console.error("Error fetching faculties:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle adding new faculty
  const handleAddFaculty = async (newFacultyData) => {
    setIsSubmitting(true);
    try {
      const response = await adminFacultyAPI.addFaculty(
        http,
        newFacultyData,
        token
      );

      if (response?.success) {
        // Add the new faculty to the state immediately
        setFaculties((prev) => [...prev, response.data]);

        // Close modal
        setIsAddModalOpen(false);

        console.log("Faculty added successfully!");
      } else {
        console.error("Failed to add faculty:", response?.message);
        alert(response?.message || "Failed to add faculty. Please try again.");
      }
    } catch (error) {
      console.error("Error adding faculty:", error);
      alert("An error occurred while adding faculty. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (faculty) => {
    setSelectedFaculty(faculty);
    setIsEditModalOpen(true);
  };

  // Handle updating faculty with API
  const handleUpdateFaculty = async (updatedFacultyData) => {
    setIsSubmitting(true);
    try {
      const response = await adminFacultyAPI.updateFaculty(
        http,
        selectedFaculty._id,
        updatedFacultyData,
        token
      );
      console.log(selectedFaculty._id)

      if (response?.success) {
        // Update the faculty in the state
        setFaculties((prev) =>
          prev.map((faculty) =>
            faculty._id === selectedFaculty._id
              ? { ...faculty, ...response.data }
              : faculty
          )
        );

        // Close modal
        setIsEditModalOpen(false);
        setSelectedFaculty(null);

        console.log("Faculty updated successfully!");
      } else {
        console.error("Failed to update faculty:", response?.message);
        alert(
          response?.message || "Failed to update faculty. Please try again."
        );
      }
    } catch (error) {
      console.error("Error updating faculty:", error);
      alert("An error occurred while updating faculty. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (faculty) => {
    setSelectedFaculty(faculty);
    setIsDeleteModalOpen(true);
  };

  // Handle deleting faculty with API
  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await adminFacultyAPI.deleteFaculty(
        http,
        selectedFaculty.id,
        token
      );

      if (response?.success) {
        // Remove the faculty from the state
        setFaculties((prev) =>
          prev.filter((faculty) => faculty.id !== selectedFaculty.id)
        );

        // Close modal
        setIsDeleteModalOpen(false);
        setSelectedFaculty(null);

        console.log("Faculty deleted successfully!");
      } else {
        console.error("Failed to delete faculty:", response?.message);
        alert(
          response?.message || "Failed to delete faculty. Please try again."
        );
      }
    } catch (error) {
      console.error("Error deleting faculty:", error);
      alert("An error occurred while deleting faculty. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Helper function to get department label
  const getDepartmentLabel = (value) => {
    const departments = {
      computer_science: "Computer Science & Engineering",
      electronics: "Electronics & Communication Engineering",
      electrical: "Electrical Engineering",
      mechanical: "Mechanical Engineering",
      civil: "Civil Engineering",
      information_technology: "Information Technology",
      mathematics: "Mathematics",
      physics: "Physics",
      chemistry: "Chemistry",
      management: "Management Studies",
      other: "Other",
    };
    return departments[value] || value;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="min-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md">
          {/* Header Section - Responsive */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 border-b border-gray-200 gap-4">
            <div className="w-full sm:w-auto">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Faculty Management
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base lg:text-lg">
                Manage your faculty members
              </p>
            </div>
            <div className="w-full sm:w-auto">
              <Button
                onClick={() => setIsAddModalOpen(true)}
                text="Add Faculty"
                icon={<UserPlus size={18} />}
                textSize="text-sm sm:text-md"
                color="#631891"
                padding="w-full sm:w-auto px-4 py-2"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 sm:p-6">
            {isLoading ? (
              // Loading State
              <div className="text-center py-12 md:py-16 lg:h-[700px] flex flex-col items-center justify-center px-4">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full mb-4 animate-pulse">
                  <UserPlus
                    size={24}
                    className="text-purple-400 sm:w-8 sm:h-8"
                  />
                </div>
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                  Loading faculties...
                </h3>
              </div>
            ) : faculties?.length === 0 ? (
              // Empty State - Responsive
              <div className="text-center py-12 md:py-16 lg:h-[700px] flex flex-col items-center justify-center px-4">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full mb-4">
                  <UserPlus size={24} className="text-gray-400 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                  No faculty members yet
                </h3>
                <p className="text-sm sm:text-base text-gray-500 mb-4 max-w-md">
                  Get started by adding your first faculty member
                </p>
                <Button
                  onClick={() => setIsAddModalOpen(true)}
                  text="Add Your First Faculty"
                  icon={<UserPlus size={18} />}
                  textSize="text-sm sm:text-md"
                  color="#631891"
                  padding="px-4 py-2"
                />
              </div>
            ) : (
              <>
                {/* Mobile Card View */}
                <div className="block lg:hidden space-y-4">
                  {faculties.map((faculty) => (
                    <div
                      key={faculty.id}
                      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center flex-1">
                          <div className="flex-shrink-0 h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 font-semibold text-lg">
                              {faculty.name?.charAt(0).toUpperCase() || "F"}
                            </span>
                          </div>
                          <div className="ml-3 flex-1 min-w-0">
                            <div className="text-base font-semibold text-gray-900 truncate">
                              {faculty.name}
                            </div>
                            <div className="text-sm text-gray-600 mt-0.5">
                              {faculty.designation}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center text-sm">
                          <span className="text-gray-500 font-medium w-24">
                            Email:
                          </span>
                          <span className="text-gray-900 truncate">
                            {faculty.email}
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="text-gray-500 font-medium w-24">
                            Department:
                          </span>
                          <span className="text-gray-900 truncate">
                            {getDepartmentLabel(faculty.department)}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-3 border-t border-gray-100">
                        <button
                          onClick={() => handleEditClick(faculty)}
                          className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-3 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition font-medium text-sm"
                        >
                          <Edit2 size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(faculty)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium text-sm cursor-pointer"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email Address
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Designation
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {faculties?.map((faculty) => (
                        <tr
                          key={faculty._id}
                          className="hover:bg-gray-50 transition"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            {/* <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                                <span className="text-purple-600 font-medium">
                                  {faculty.fullName?.charAt(0).toUpperCase() ||
                                    "F"}
                                </span>
                              </div> */}
                              {/* <div className="ml-4"> */}
                                <div className="text-sm font-medium text-gray-900">
                                  {faculty.name}
                                </div>
                              {/* </div> */}
                            {/* </div> */}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {faculty.email}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-700">
                              {faculty.designation}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-700">
                              {getDepartmentLabel(faculty.department)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="flex items-center justify-center gap-3">
                              <button
                                onClick={() => handleEditClick(faculty)}
                                className="text-purple-600 hover:text-purple-900 transition p-1"
                                title="Edit Faculty"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(faculty)}
                                className="text-red-600 hover:text-red-900 transition p-1"
                                title="Delete Faculty"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddFacultyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddFaculty={handleAddFaculty}
        isSubmitting={isSubmitting}
      />

      <EditFacultyModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedFaculty(null);
        }}
        onUpdateFaculty={handleUpdateFaculty}
        faculty={selectedFaculty}
        isSubmitting={isSubmitting}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedFaculty(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Faculty"
        message={`Are you sure you want to delete ${
          selectedFaculty?.fullName || "this faculty"
        }? This action cannot be undone.`}
        confirmText={isDeleting ? "Deleting..." : "Delete Faculty"}
        confirmIcon={!isDeleting && <Trash2 size={18} />}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default AddFaculty;