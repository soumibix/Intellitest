import { UserPlus, Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { AddFacultyModal } from "../../utils/AddFacultyModal";
import { EditFacultyModal } from "../../utils/EditFacultyModal";
import { ConfirmationModal } from "../../utils/ConfirmationModal";
import Button from "../../Components/common/Button";
import FacultySearchFilter from "../../Components/common/FacultySearchFilter";
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

  // Pagination & Search States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCampus, setSelectedCampus] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const limit = 20;

  // Department mapping
  const departments = [
    { value: "", label: "All Departments" },
    { value: "computer_science", label: "Computer Science & Engineering" },
    { value: "electronics", label: "Electronics & Communication Engineering" },
    { value: "electrical", label: "Electrical Engineering" },
    { value: "mechanical", label: "Mechanical Engineering" },
    { value: "civil", label: "Civil Engineering" },
    { value: "information_technology", label: "Information Technology" },
    { value: "mathematics", label: "Mathematics" },
    { value: "physics", label: "Physics" },
    { value: "chemistry", label: "Chemistry" },
    { value: "management", label: "Management Studies" },
  ];

  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Fetch faculties with pagination and filters
  const fetchFaculties = async (page = 1, search = "", department = "", campus = "") => {
    setIsLoading(true);
    try {
      // Build query string
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('limit', limit);
      if (search) params.append('search', search);
      if (department) params.append('department', department);
      if (campus) params.append('campus', campus);

      const response = await adminFacultyAPI.getAllFaculties(http, token, params.toString());

      if (response?.success) {
        setFaculties(response.data || []);
        
        // Handle pagination data - adjust based on your API response structure
        if (response) {
          setCurrentPage(response.page || page);
          setTotalPages(response.totalPages || 1);
          setTotalCount(response.total || 0);
        } else {
          // Fallback if pagination is not in response
          setCurrentPage(page);
          setTotalPages(1);
          setTotalCount(response.data?.length || 0);
        }
      } else {
        console.error("Failed to fetch faculties:", response?.message);
        setFaculties([]);
      }
    } catch (error) {
      console.error("Error fetching faculties:", error);
      setFaculties([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((search, department, campus) => {
      setCurrentPage(1);
      fetchFaculties(1, search, department, campus);
    }, 500),
    []
  );

  // Effect for initial load
  useEffect(() => {
    fetchFaculties(1);
  }, [token]);

  // Effect for search and filters
  useEffect(() => {
    if (searchTerm || selectedDepartment || selectedCampus) {
      debouncedSearch(searchTerm, selectedDepartment, selectedCampus);
    }
  }, [searchTerm, selectedDepartment, selectedCampus, debouncedSearch]);

  // Page change handler
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchFaculties(newPage, searchTerm, selectedDepartment, selectedCampus);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedDepartment("");
    setSelectedCampus("");
    setCurrentPage(1);
    fetchFaculties(1);
  };

  // Handle adding new faculty
  const handleAddFaculty = async (newFacultyData) => {
    setIsSubmitting(true);
    try {
      const response = await adminFacultyAPI.addFaculty(http, newFacultyData, token);

      if (response?.success) {
        setIsAddModalOpen(false);
        // Refresh the current page
        fetchFaculties(currentPage, searchTerm, selectedDepartment, selectedCampus);
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

  // Handle updating faculty
  const handleUpdateFaculty = async (updatedFacultyData) => {
    setIsSubmitting(true);
    try {
      const response = await adminFacultyAPI.updateFaculty(
        http,
        selectedFaculty._id,
        updatedFacultyData,
        token
      );

      if (response?.success) {
        setIsEditModalOpen(false);
        setSelectedFaculty(null);
        // Refresh the current page
        fetchFaculties(currentPage, searchTerm, selectedDepartment, selectedCampus);
        console.log("Faculty updated successfully!");
      } else {
        console.error("Failed to update faculty:", response?.message);
        alert(response?.message || "Failed to update faculty. Please try again.");
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

  // Handle deleting faculty
  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await adminFacultyAPI.deleteFaculty(
        http,
        selectedFaculty._id,
        token
      );

      if (response?.success) {
        setIsDeleteModalOpen(false);
        setSelectedFaculty(null);
        // Refresh the current page
        fetchFaculties(currentPage, searchTerm, selectedDepartment, selectedCampus);
        console.log("Faculty deleted successfully!");
      } else {
        console.error("Failed to delete faculty:", response?.message);
        alert(response?.message || "Failed to delete faculty. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting faculty:", error);
      alert("An error occurred while deleting faculty. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const getDepartmentLabel = (value) => {
    const dept = departments.find(d => d.value === value);
    return dept ? dept.label : value;
  };

  const hasActiveFilters = searchTerm || selectedDepartment || selectedCampus;

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6">
      <div className="mx-auto">
        <div className="bg-white rounded-lg shadow-md">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 border-b border-gray-200 gap-4">
            <div className="w-full sm:w-auto">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Faculty Management
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Manage your faculty members {"  "}<b>• {totalCount} total </b>
              </p>
            </div>
            <div className="w-full sm:w-auto">
              <Button
                onClick={() => setIsAddModalOpen(true)}
                text="Add Faculty"
                icon={<UserPlus size={18} />}
                textSize="text-md sm:text-md"
                color="#631891"
                padding="w-full sm:w-auto px-5 py-3"
              />
            </div>
          </div>

          {/* Search and Filters Section */}
          <FacultySearchFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            selectedCampus={selectedCampus}
            setSelectedCampus={setSelectedCampus}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={handleClearFilters}
            totalCount={totalCount}
          />

          {/* Content Section */}
          <div className="p-4 sm:p-6">
            {isLoading ? (
              // Loading State
              <div className="text-center py-12 md:py-16 flex flex-col items-center justify-center px-4">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full mb-4 animate-pulse">
                  <UserPlus size={24} className="text-purple-400 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                  Loading faculties...
                </h3>
              </div>
            ) : faculties?.length === 0 ? (
              // Empty State
              <div className="text-center py-12 md:py-16 flex flex-col items-center justify-center px-4">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full mb-4">
                  <UserPlus size={24} className="text-gray-400 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                  {hasActiveFilters ? "No faculties found" : "No faculty members yet"}
                </h3>
                <p className="text-sm sm:text-base text-gray-500 mb-4 max-w-md">
                  {hasActiveFilters 
                    ? "Try adjusting your search or filters"
                    : "Get started by adding your first faculty member"}
                </p>
                {hasActiveFilters ? (
                  <button
                    onClick={handleClearFilters}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium"
                  >
                    Clear Filters
                  </button>
                ) : (
                  <Button
                    onClick={() => setIsAddModalOpen(true)}
                    text="Add Your First Faculty"
                    icon={<UserPlus size={18} />}
                    textSize="text-sm sm:text-md"
                    color="#631891"
                    padding="px-4 py-2"
                  />
                )}
              </div>
            ) : (
              <>
                {/* Mobile Card View */}
                <div className="block lg:hidden space-y-4">
                  {faculties.map((faculty) => (
                    <div
                      key={faculty._id}
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
                          <span className="text-gray-500 font-medium w-24">Email:</span>
                          <span className="text-gray-900 truncate">{faculty.email}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="text-gray-500 font-medium w-24">Department:</span>
                          <span className="text-gray-900 truncate">
                            {getDepartmentLabel(faculty.department)}
                          </span>
                        </div>
                        {faculty.campus && (
                          <div className="flex items-center text-sm">
                            <span className="text-gray-500 font-medium w-24">Campus:</span>
                            <span className="text-gray-900 truncate">{faculty.campus}</span>
                          </div>
                        )}
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Campus
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {faculties?.map((faculty) => (
                        <tr key={faculty._id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center flex-1">
                          <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 font-semibold text-lg">
                              {faculty.name?.charAt(0).toUpperCase() || "F"}
                            </span>
                          </div>
                            <div className="text-sm font-medium text-gray-900 ml-4">
                              {faculty.name}
                            </div>
                          </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{faculty.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-700">{faculty.designation}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-700">
                              {getDepartmentLabel(faculty.department)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-700">{faculty.campus || '-'}</div>
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

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600 order-2 sm:order-1">
                      Showing {(currentPage - 1) * limit + 1} to {Math.min(currentPage * limit, totalCount)} of {totalCount} faculties
                    </div>
                    <div className="flex items-center gap-2 order-1 sm:order-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        title="Previous page"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      
                      <div className="hidden sm:flex items-center gap-1">
                        {[...Array(totalPages)].map((_, index) => {
                          const pageNum = index + 1;
                          if (
                            pageNum === 1 ||
                            pageNum === totalPages ||
                            (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                          ) {
                            return (
                              <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                                  currentPage === pageNum
                                    ? 'bg-purple-600 text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          } else if (
                            pageNum === currentPage - 2 ||
                            pageNum === currentPage + 2
                          ) {
                            return <span key={pageNum} className="px-2 text-gray-400">...</span>;
                          }
                          return null;
                        })}
                      </div>

                      <div className="sm:hidden text-sm font-medium text-gray-700">
                        Page {currentPage} of {totalPages}
                      </div>

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        title="Next page"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                )}
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
          selectedFaculty?.name || "this faculty"
        }? This action cannot be undone.`}
        confirmText={isDeleting ? "Deleting..." : "Delete Faculty"}
        confirmIcon={!isDeleting && <Trash2 size={18} />}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default AddFaculty;