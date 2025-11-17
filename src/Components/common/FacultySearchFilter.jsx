import { Search, Filter, X } from "lucide-react";
import React from "react";

const FacultySearchFilter = ({
  searchTerm,
  setSearchTerm,
  selectedDepartment,
  setSelectedDepartment,
  selectedCampus,
  setSelectedCampus,
  showFilters,
  setShowFilters,
  hasActiveFilters,
  onClearFilters,
  totalCount,
}) => {
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

  const campuses = [
    { value: "", label: "Select Campuses" },
    { value: "IEM Saltlake", label: "IEM, Salt Lake" },
    { value: "IEM Newtown", label: "IEM, Newtown" },
    { value: "UEM Jaipur", label: "UEM, Jaipur" },
  ];

  return (
    <div className="p-4 sm:p-6 border-b border-gray-200 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm sm:text-base"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Filter Toggle Button (Mobile) */}
      <div className="flex items-center justify-between lg:hidden">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
        >
          <Filter size={18} />
          Filters
          {hasActiveFilters && (
            <span className="bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {[searchTerm, selectedDepartment, selectedCampus].filter(Boolean).length}
            </span>
          )}
        </button>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-purple-600 hover:text-purple-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Filters (Desktop Always Visible, Mobile Toggleable) */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 ${showFilters ? 'block' : 'hidden lg:grid'}`}>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm bg-white"
        >
          {departments.map(dept => (
            <option key={dept.value} value={dept.value}>{dept.label}</option>
          ))}
        </select>

        <select
          value={selectedCampus}
          onChange={(e) => setSelectedCampus(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm bg-white"
        >
          {campuses.map(campus => (
            <option key={campus.value} value={campus.value}>{campus.label}</option>
          ))}
        </select>

        <button
          onClick={onClearFilters}
          className="hidden lg:block px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!hasActiveFilters}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FacultySearchFilter;