// src/Pages/Admin/AddFaculty.jsx
import { UserPlus, Edit2, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { AddFacultyModal } from "../../utils/AddFacultyModal";
import { EditFacultyModal } from "../../utils/EditFacultyModal";
import { ConfirmationModal } from "../../utils/ConfirmationModal";
import Button from "../../Components/common/Button";

const AddFaculty = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  const handleAddFaculty = (newFaculty) => {
    const faculty = {
      id: Date.now(),
      ...newFaculty,
      addedAt: new Date().toLocaleString(),
    };
    setFaculties((prev) => [...prev, faculty]);
  };

  const handleEditClick = (faculty) => {
    setSelectedFaculty(faculty);
    setIsEditModalOpen(true);
  };

  const handleUpdateFaculty = (updatedFaculty) => {
    setFaculties((prev) =>
      prev.map((faculty) =>
        faculty.id === selectedFaculty.id
          ? { ...faculty, ...updatedFaculty }
          : faculty
      )
    );
    setSelectedFaculty(null);
  };

  const handleDeleteClick = (faculty) => {
    setSelectedFaculty(faculty);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setFaculties((prev) =>
      prev.filter((faculty) => faculty.id !== selectedFaculty.id)
    );
    setSelectedFaculty(null);
    setIsDeleteModalOpen(false);
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
            {faculties.length === 0 ? (
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
                              {faculty.fullName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-3 flex-1 min-w-0">
                            <div className="text-base font-semibold text-gray-900 truncate">
                              {faculty.fullName}
                            </div>
                            <div className="text-sm text-gray-600 mt-0.5">
                              {faculty.designation}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center text-sm">
                          <span className="text-gray-500 font-medium w-20">
                            Email:
                          </span>
                          <span className="text-gray-900 truncate">
                            {faculty.email}
                          </span>
                        </div>
                        {/* <div className="flex items-center text-sm">
                          <span className="text-gray-500 font-medium w-20">Added:</span>
                          <span className="text-gray-700">{faculty.addedAt}</span>
                        </div> */}
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
                          Full Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Designation
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {faculties.map((faculty) => (
                        <tr
                          key={faculty.id}
                          className="hover:bg-gray-50 transition"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                                <span className="text-purple-600 font-medium">
                                  {faculty.fullName.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {faculty.fullName}
                                </div>
                              </div>
                            </div>
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
      />

      <EditFacultyModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedFaculty(null);
        }}
        onUpdateFaculty={handleUpdateFaculty}
        faculty={selectedFaculty}
      />

      {/* <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedFaculty(null);
        }}
        onConfirm={handleConfirmDelete}
        facultyName={selectedFaculty?.fullName}
      /> */}
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
        confirmText="Delete Faculty"
        confirmIcon={<Trash2 size={18} />}
      />
    </div>
  );
};

export default AddFaculty;
