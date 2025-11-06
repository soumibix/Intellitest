import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, X, ArrowRight } from "lucide-react";
import TestCard from "../Components/TestCard";

function AllTest({ userType = "user", allTests = 
  [
  {
    id: 1,
    status: "ongoing",
    testData: {
      timeRemaining: "58:07 mins remaining",
      title: "Machine Learning Mid-Sem Test",
      questions: 30,
      marks: 60,
      duration: "1 hour",
      department: "CST",
      semester: "05",
      createdBy: "Saurabh Kumbhar",
      createdDate: "Sept 5 04:25",
      avatarSeed: "Saurabh",
    },
    month: "September",
  },
  {
    id: 2,
    status: "upcoming",
    testData: {
      dateTime: "Nov 15 • 2:00 PM",
      title: "Data Structures Final Exam",
      questions: 50,
      marks: 100,
      duration: "2 hours",
      department: "CST",
      semester: "03",
      createdBy: "Priya Sharma",
      createdDate: "Oct 20 10:15",
      avatarSeed: "Priya",
    },
    month: "November",
  },
  {
    id: 3,
    status: "completed",
    testData: {
      dateTime: "Oct 10 • 10:00 AM",
      title: "Database Management Systems Quiz",
      questions: 20,
      marks: 40,
      duration: "45 mins",
      department: "CST",
      semester: "04",
      createdBy: "Rahul Verma",
      createdDate: "Sept 30 14:20",
      avatarSeed: "Rahul",
      marksObtained: 52,
      totalMarks: 60,
      timeTaken: "54 minutes",
      accuracy: "87%",
    },
    month: "October",
  },
  {
    id: 4,
    status: "upcoming",
    testData: {
      dateTime: "Nov 20 • 11:00 AM",
      title: "Computer Networks Test",
      questions: 40,
      marks: 80,
      duration: "1.5 hours",
      department: "CST",
      semester: "05",
      createdBy: "Anjali Singh",
      createdDate: "Nov 1 09:00",
      avatarSeed: "Anjali",
    },
    month: "November",
  },
  {
    id: 5,
    status: "upcoming",
    testData: {
      dateTime: "Nov 20 • 11:00 AM",
      title: "Computer Networks Test",
      questions: 40,
      marks: 80,
      duration: "1.5 hours",
      department: "CST",
      semester: "05",
      createdBy: "Anjali Singh",
      createdDate: "Nov 1 09:00",
      avatarSeed: "Anjali",
    },
    month: "November",
  },
  {
    id: 6,
    status: "completed",
    testData: {
      dateTime: "Oct 25 • 3:00 PM",
      title: "Operating Systems Mid-Term",
      questions: 35,
      marks: 70,
      duration: "1.5 hours",
      department: "CST",
      semester: "05",
      createdBy: "Saurabh Kumbhar",
      createdDate: "Oct 15 11:30",
      avatarSeed: "Saurabh",
      marksObtained: 45,
      totalMarks: 70,
      timeTaken: "1 hour 20 mins",
      accuracy: "64%",
    },
    month: "October",
  },
  {
    id: 7,
    status: "completed",
    testData: {
      dateTime: "Oct 25 • 3:00 PM",
      title: "Operating Systems Mid-Term",
      questions: 35,
      marks: 70,
      duration: "1.5 hours",
      department: "CST",
      semester: "05",
      createdBy: "Saurabh Kumbhar",
      createdDate: "Oct 15 11:30",
      avatarSeed: "Saurabh",
      marksObtained: 45,
      totalMarks: 70,
      timeTaken: "1 hour 20 mins",
      accuracy: "64%",
    },
    month: "October",
  },
], filter = true, showWrap = false }) {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("All");



  const months = [
    "All",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Filter tests based on active filter
  const filteredTests = allTests.filter((test) => {
    const matchesStatus =
      activeFilter === "all" || test.status === activeFilter;
    const matchesSearch = test.testData.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesMonth =
      selectedMonth === "All" || test.month === selectedMonth;
    return matchesStatus && matchesSearch && matchesMonth;
  });

  // Limit to 5 tests when "View All" is active
  const displayTests = showWrap ? filteredTests.slice(0, 5) : filteredTests;
  const hasMoreTests = activeFilter === "all" && filteredTests.length > 5;

  // Get suggestions for search
  const suggestions =
    searchQuery.length > 0
      ? allTests
        .filter((test) =>
          test.testData.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
        .map((test) => test.testData.title)
        .slice(0, 5)
      : [];

  // Handler functions
  const handleStartTest = (testId) => {
    console.log("Starting test:", testId);
    // Add your start test logic here
  };

  const handleViewReport = (testId) => {
    console.log("Viewing report for test:", testId);
    // Add your view report logic here
  };

  const handleEditTest = (testId) => {
    console.log("Editing test:", testId);
    // Add your edit test logic here
  };

  const handleViewMore = () => {
    // Navigate to StudentPerformance page
    navigate('/admin/student-performance');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#6B21A8]">
            All Tests
          </h1>

          {/* Search Bar */}
          <div className="relative w-full sm:w-80 lg:w-96">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by Test Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
            />
            {/* Search Suggestions */}
            {suggestions.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => setSearchQuery(suggestion)}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-700 text-sm"
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Filter Buttons and Filters */}
        {filter && <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            <button
              onClick={() => setActiveFilter("ongoing")}
              className={`px-4 sm:px-5 py-2 rounded-full font-medium text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap ${activeFilter === "ongoing"
                  ? "bg-[#1A0B2E] text-white"
                  : "bg-[#E9D5FF] text-[#6B21A8]"
                }`}
            >
              Ongoing
              {activeFilter === "ongoing" && (
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
              )}
            </button>

            <button
              onClick={() => setActiveFilter("completed")}
              className={`px-4 sm:px-5 py-2 rounded-full font-medium text-xs sm:text-sm transition-all whitespace-nowrap ${activeFilter === "completed"
                  ? "bg-[#1A0B2E] text-white"
                  : "bg-[#E9D5FF] text-[#6B21A8]"
                }`}
            >
              Completed
            </button>

            <button
              onClick={() => setActiveFilter("upcoming")}
              className={`px-4 sm:px-5 py-2 rounded-full font-medium text-xs sm:text-sm transition-all whitespace-nowrap ${activeFilter === "upcoming"
                  ? "bg-[#1A0B2E] text-white"
                  : "bg-[#E9D5FF] text-[#6B21A8]"
                }`}
            >
              Upcoming
            </button>

            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 sm:px-5 py-2 rounded-full font-medium text-xs sm:text-sm transition-all whitespace-nowrap ${activeFilter === "all"
                  ? "bg-[#1A0B2E] text-white"
                  : "bg-[#E9D5FF] text-[#6B21A8]"
                }`}
            >
              View All
            </button>
          </div>

          {/* Filters Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowMonthDropdown(true)}
            onMouseLeave={() => setShowMonthDropdown(false)}
          >
            <button className="bg-[#1A0B2E] text-white px-4 sm:px-6 py-2 rounded-full font-medium text-xs sm:text-sm flex items-center gap-2">
              <SlidersHorizontal className="w-3 h-3 sm:w-4 sm:h-4" />
              Filters
            </button>

            {showMonthDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10 max-h-64 overflow-y-auto">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                  Filter by Month
                </div>
                {months.map((month) => (
                  <div
                    key={month}
                    onClick={() => setSelectedMonth(month)}
                    className={`px-4 py-2 cursor-pointer text-sm ${selectedMonth === month
                        ? "bg-purple-50 text-purple-700 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    {month}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>}

        {/* Tests Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {displayTests.length > 0 ? (
            <>
              {displayTests.map((test) => (
                <TestCard
                  key={test.id}
                  data={test}
                  userType={userType}
                  status={test.status}
                  testData={test.testData}
                  onStartTest={() => handleStartTest(test.id)}
                  onViewReport={() => handleViewReport(test.id)}
                  onEdit={() => handleEditTest(test.id)}
                />
              ))}
              
              {/* View More Card */}
              {hasMoreTests && showWrap && (
                <button
                  onClick={handleViewMore}
                  className="bg-[#000000d8]  text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center gap-4 min-h-[280px] group relative overflow-hidden"
                >
                  {/* Matte sunlight effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-40"></div>
                  
                  <div className="relative z-10 text-center backdrop-blur-2xl">
                    <h3 className="text-3xl font-bold mb-2">View More Tests</h3>
                    <p className="text-[#fff] text-xl ">
                      {filteredTests.length - 5} more tests available
                    </p>
                  </div>
                  
                  <div className="relative z-10 bg-white/20 rounded-full p-3 group-hover:bg-white/30 transition-colors">
                    <ArrowRight className="w-6 h-6 cursor-pointer" />
                  </div>
                </button>
              )}
            </>
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No tests found matching your filters
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllTest;