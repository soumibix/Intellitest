import { UserPlus } from "lucide-react";
import React, { useState } from "react";
import { AddFacultyModal } from "../../utils/AddFacultyModal";
import Button from "../../Components/common/Button";

const AddFaculty = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [faculties, setFaculties] = useState([]);

  const handleAddFaculty = (newFaculty) => {
    const faculty = {
      id: Date.now(),
      ...newFaculty,
      addedAt: new Date().toLocaleString(),
    };
    setFaculties((prev) => [...prev, faculty]);
  };

  const handleDeleteFaculty = (id) => {
    setFaculties((prev) => prev.filter((faculty) => faculty.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="min-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Faculty Management
              </h1>
              <p className="text-gray-600 mt-1 text-lg">Manage your faculty members</p>
            </div>
            <Button
              onClick={() => setIsModalOpen(true)}
              text="Add Faculty"
              icon={<UserPlus />}
              textSize="text-md"
              color="#631891"
            />
          </div>

          <div className="p-6">
            {faculties.length === 0 ? (
              <div className="text-center py-12 md:h-[700px] flex flex-col items-center justify-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <UserPlus size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No faculty members yet
                </h3>
                <p className="text-gray-500 mb-4">
                  Get started by adding your first faculty member
                </p>
                {/* <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Add Your First Faculty
                </button> */}
                <Button
              onClick={() => setIsModalOpen(true)}
              text="Add Your First Faculty"
              icon={<UserPlus />}
              textSize="text-md"
              color="#631891"
            />
              </div>
            ) : (
              <div className="overflow-x-auto">
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
                        Added At
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-medium">
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
                          <div className="text-sm text-gray-500">
                            {faculty.addedAt}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleDeleteFaculty(faculty.id)}
                            className="text-red-600 hover:text-red-900 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <AddFacultyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddFaculty={handleAddFaculty}
      />
    </div>
  );
};

export default AddFaculty;
