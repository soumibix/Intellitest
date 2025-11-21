import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  X,
  ArrowRight,
  Loader2,
} from "lucide-react";
import TestCard from "../Components/TestCard";
import handLoading from "../Lottie/handLoading.json"
import Lottie from "lottie-react";

function AllTest({
  heading = "All Tests",
  userType = "user",
  allTests = [],
  filter = true,
  showWrap = false,
  onFilterChange = null,
  onViewMore = null,
  hasMoreTests = false,
  isLoadingMore = false,
  totalTests = 0,
  activeFilterProp = null,
  isLoading = false, // Add loading prop
  onSearchChange = null, // Add search callback prop
  displayedTestsCount = 0, // Add displayed count prop
}) {
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [tests, setTests] = useState(allTests);
  const [searchDebounceTimer, setSearchDebounceTimer] = useState(null);

  const dropdownRef = useRef(null);

  // Update tests when allTests prop changes
  useEffect(() => {
    setTests(allTests);
  }, [allTests]);

  // Update activeFilter when it changes from parent
  useEffect(() => {
    if (activeFilterProp !== null) {
      setActiveFilter(activeFilterProp);
    }
  }, [activeFilterProp]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowMonthDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (searchDebounceTimer) {
        clearTimeout(searchDebounceTimer);
      }
    };
  }, [searchDebounceTimer]);

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

  // Handle search with debouncing
  const handleSearchChange = (value) => {
    setSearchQuery(value);

    // Clear existing timer
    if (searchDebounceTimer) {
      clearTimeout(searchDebounceTimer);
    }

    // Set new timer for API call
    const timer = setTimeout(() => {
      if (onSearchChange) {
        onSearchChange(value);
      }
    }, 500); // 500ms debounce

    setSearchDebounceTimer(timer);
  };

  // Handle filter change
  const handleFilterClick = (filterType) => {
    setActiveFilter(filterType);
    if (onFilterChange) {
      onFilterChange(filterType);
    }
  };

  // Filter tests by search and month
  // When using API search (onSearchChange exists), skip local filtering
  const filteredTests = onSearchChange
    ? tests // Use tests directly from API when using API search
    : tests.filter((test) => {
        const matchesSearch =
          searchQuery.length === 0 ||
          test.subjectName?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesMonth =
          selectedMonth === "All" || test.month === selectedMonth;
        return matchesSearch && matchesMonth;
      });

  // Display limited tests if showWrap is true (but show all loaded tests)
  const displayTests = filteredTests;

  // Search suggestions - only show when not using API search
  const suggestions =
    !onSearchChange && searchQuery.length > 0
      ? tests
          .filter((test) =>
            test.subjectName?.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((test) => test.subjectName)
          .filter(
            (value, index, self) => value && self.indexOf(value) === index
          ) // Remove duplicates
          .slice(0, 5)
      : [];

  // Calculate remaining tests to load
  const remainingTests = totalTests - displayedTestsCount;
  const nextBatchSize = Math.min(10, remainingTests); // Changed from 5 to 10

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#6B21A8] border-l-4 border-[#6B21A8] pl-2">
            {heading}
          </h1>

          {/* Search Bar */}
          <div className="flex flex-col w-full sm:w-80 lg:w-96 gap-2">
  {/* Search Input */}
  <div className="flex items-center gap-3 bg-white border border-[#6B21A8] rounded-3xl px-4 py-2.5 sm:py-3">
    <Search className="text-[#6B21A8] w-5 h-5" />

    <input
      type="text"
      placeholder="Search by Test Name, Code, Department"
      value={searchQuery}
      onChange={(e) => handleSearchChange(e.target.value)}
      className="flex-1 focus:outline-none text-sm sm:text-base"
    />
  </div>

  {/* Suggestions */}
  {suggestions.length > 0 && (
    <div className="flex flex-col bg-white border border-gray-200 rounded-xl shadow-lg py-2">
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          onClick={() => handleSearchChange(suggestion)}
          className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-700 text-sm"
        >
          {suggestion}
        </div>
      ))}
    </div>
  )}
</div>

        </div>

        {/* Filter Buttons */}
        {filter && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
              {["ongoing", "completed", "upcoming", "all"].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => handleFilterClick(filterType)}
                  className={`px-4 cursor-pointer sm:px-5 py-2 rounded-full font-medium text-xs sm:text-sm transition-all whitespace-nowrap ${
                    activeFilter === filterType
                      ? "bg-[#1A0B2E] text-white"
                      : "bg-[#E9D5FF] text-[#6B21A8]"
                  }`}
                >
                  {filterType === "all"
                    ? "View All"
                    : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                  {activeFilter === filterType && filterType !== "all" && (
                    <X
                      className="inline-block w-3 h-3 sm:w-4 sm:h-4 ml-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFilterClick("all");
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            
          </div>
        )}

        {/* Tests Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
          <Lottie 
            animationData={handLoading} 
            loop={true}
            style={{ width: 500, height: 500 }}
          />
        </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {displayTests.length > 0 ? (
              <>
                {displayTests.map((test) => (
                  <TestCard
                    key={test._id}
                    data={test}
                    userType={userType}
                    status={test.status}
                    testData={test}
                    onStartTest={() => console.log("Starting test:", test._id)}
                    onViewReport={() =>
                      console.log("Viewing report:", test._id)
                    }
                    onEdit={() => console.log("Editing test:", test._id)}
                  />
                ))}

                {/* View More Card - Only show if there are more tests to load */}
                {showWrap && hasMoreTests && onViewMore && (
                  <button
                    onClick={onViewMore}
                    disabled={isLoadingMore}
                    className="bg-[#000000d8] text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center gap-4 min-h-[280px] group relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-black"></div>
                    <div className="relative z-10 text-center backdrop-blur-2xl">
                      {isLoadingMore ? (
                        <>
                          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
                          <h3 className="text-2xl font-bold">Loading...</h3>
                        </>
                      ) : (
                        <>
                          {/* <h3 className="text-3xl font-bold mb-2">View More Tests</h3>
                          <p className="text-[#fff] text-xl">
                            Load next {nextBatchSize} test{nextBatchSize !== 1 ? 's' : ''} ({remainingTests} remaining)
                          </p> */}

                          {/* <h3 className="text-3xl font-bold mb-2">View More Tests</h3> */}
                          <div className="flex flex-col items-center gap-4">
                            <p className="text-[#fff] text-xl">
                              Click to view the next {nextBatchSize} tests
                            </p>

                            <div className="relative z-10 bg-white/20 rounded-full p-3 group-hover:bg-white/30 transition-colors">
                              <ArrowRight className="w-6 h-6 cursor-pointer" />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    {/* {!isLoadingMore && (
                      <div className="relative z-10 bg-white/20 rounded-full p-3 group-hover:bg-white/30 transition-colors">
                        <ArrowRight className="w-6 h-6 cursor-pointer" />
                      </div>
                    )} */}
                  </button>
                )}
              </>
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                No tests found matching your filters
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllTest;
