import React, { useState, useEffect, useRef, memo } from "react";
import {
  Search,
  X,
  ArrowRight,
  Loader2,
  MousePointer
} from "lucide-react";
import TestCard from "../Components/TestCard";
import handLoading from "../Lottie/handLoading.json"
import noData from "../Lottie/nodata.json"
import Lottie from "lottie-react";
import Button from "./common/Button";

const AllTest = memo(function AllTest({
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
  isLoading = false,
  onSearchChange = null,
  displayedTestsCount = 0,
  onEdit = null,
  onDelete = null,
  isShowSemPopUp = false,
  setIsSemPopupOpen,
  placeholderProps = 'Search by Test Name, Code, Department...',
  showCompletedTestsFilter = true,
}) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [inputValue, setInputValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef(null);

  // Update activeFilter when it changes from parent
  useEffect(() => {
    if (activeFilterProp !== null) {
      setActiveFilter(activeFilterProp);
    }
  }, [activeFilterProp]);

  // Reset searching state when loading completes
  useEffect(() => {
    if (!isLoading) {
      setIsSearching(false);
    }
  }, [isLoading]);

  // Handle input change (updates UI immediately)
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setIsSearching(true);

    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout for parent callback
    searchTimeoutRef.current = setTimeout(() => {
      if (onSearchChange) {
        console.log('🔤 Sending search to parent:', value);
        onSearchChange(value);
      }
    }, 500);
  };

  // Clear search
  const handleClearSearch = () => {
    setInputValue('');
    setIsSearching(true);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    if (onSearchChange) {
      onSearchChange('');
    }
  };

  // Handle filter change
  const handleFilterClick = (filterType) => {
    setActiveFilter(filterType);
    if (onFilterChange) {
      onFilterChange(filterType);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Calculate remaining tests to load
  const remainingTests = totalTests - displayedTestsCount;
  const nextBatchSize = Math.min(10, remainingTests);

  // Show loader only during search/filter operations
  const showLoader = isLoading || isSearching;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex gap-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#6B21A8] border-l-4 border-[#6B21A8] pl-2">
              {heading}
            </h1>

            {isShowSemPopUp && (
              <Button
                iconPosition={'left'}
                onClick={() => setIsSemPopupOpen(true)}
                variant="filled"
                textSize="text-md"
                text={`Choose Semester: ${localStorage.getItem('userSemester') ? `${localStorage.getItem('userSemester')}` : "Choose your semester"}`}
                icon={<MousePointer />}
              />
            )}
          </div>

          {/* Search Bar */}
          <div className="flex flex-col w-full sm:w-80 lg:w-96 gap-2">
            <div className="flex items-center gap-3 bg-white border border-[#6B21A8] rounded-3xl px-4 py-2.5 sm:py-3">
              <Search className="text-[#6B21A8] w-5 h-5 flex-shrink-0" />
              <input
                type="text"
                placeholder={placeholderProps}
                value={inputValue}
                onChange={handleInputChange}
                className="flex-1 focus:outline-none text-sm sm:text-base min-w-0"
              />
              {inputValue && (
                <X
                  className="text-[#6B21A8] w-5 h-5 cursor-pointer hover:text-[#4A0E78] transition-colors"
                  onClick={handleClearSearch}
                />
              )}
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        {filter && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-hide">
              {["ongoing", "completed", "upcoming", "all"].map((filterType) => {
                const label =
                  filterType === "all"
                    ? "View All"
                    : filterType === "completed"
                      ? showCompletedTestsFilter
                        ? "Completed"
                        : "" // hide if false
                      : filterType.charAt(0).toUpperCase() + filterType.slice(1);

                if (label === "") return null;

                return (
                  <button
                    key={filterType}
                    onClick={() => handleFilterClick(filterType)}
                    className={`px-4 cursor-pointer sm:px-5 py-2 rounded-full font-medium text-xs sm:text-sm transition-all whitespace-nowrap flex-shrink-0 ${activeFilter === filterType
                      ? "bg-[#1A0B2E] text-white"
                      : "bg-[#E9D5FF] text-[#6B21A8] hover:bg-[#d4b3f3]"
                      }`}
                  >
                    {label}

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
                );
              })}
            </div>

          </div>
        )}

        {/* Tests Grid */}
        {showLoader ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Lottie
              animationData={handLoading}
              loop={true}
              style={{ width: '100%', maxWidth: 500, height: 'auto' }}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {allTests.length > 0 ? (
              <>
                {allTests.map((test) => (
                  <TestCard
                    key={test._id}
                    data={test}
                    test={test}
                    generateScore={test.genarateScore}
                    userType={userType}
                    status={test.status}
                    testData={test}
                    onStartTest={() => console.log("Starting test:", test._id)}
                    onViewReport={() => console.log("Viewing report:", test._id)}
                    onEdit={() => onEdit && onEdit(test._id)}
                    onDelete={(testId) => onDelete && onDelete(testId)}
                  />
                ))}

                {/* View More Card */}
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
                          <h3 className="text-xl sm:text-2xl font-bold">Loading...</h3>
                        </>
                      ) : (
                        <>
                          <div className="flex flex-col items-center gap-4">
                            <p className="text-[#fff] text-lg sm:text-xl px-4">
                              Click to view the next {nextBatchSize} test{nextBatchSize !== 1 ? 's' : ''}
                            </p>
                            <div className="relative z-10 bg-white/20 rounded-full p-3 group-hover:bg-white/30 transition-colors">
                              <ArrowRight className="w-6 h-6 cursor-pointer" />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </button>
                )}
              </>
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                <p className="text-base sm:text-lg">
                  {!showLoader && (
                    <div className="flex flex-col justify-center items-center gap-10 bg-white rounded-3xl py-22">
                      <Lottie
                        animationData={noData}
                        loop
                        style={{ height: 200 }}
                      />
                      <div className="text-base font-semibold">No Test Data Found !!</div>
                    </div>
                  )}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

export default AllTest;