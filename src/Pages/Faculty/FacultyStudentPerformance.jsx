import React, { useState, useEffect } from 'react';
import AllTest from '../../Components/AllTest';
import { useHttp } from "../../Hooks/useHttps";
import { useAuth } from "../../AppRouter";
import { TestAPI } from "../../apis/Tests/TestCRUD";

const FacultyStudentPerformance = () => {
  const [allTests, setAllTests] = useState([]);
  const [testsLoading, setTestsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTests, setTotalTests] = useState(0);
  const [hasMoreTests, setHasMoreTests] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { token } = useAuth();
  const httpHook = useHttp();

  const TESTS_PER_PAGE = 10; // Changed from 5 to 10

  // Fetch completed tests only
  const fetchCompletedTests = async (page = 1, append = false, search = "") => {
    setTestsLoading(true);
    try {
      const queryParams = {
        page: page,
        limit: TESTS_PER_PAGE,
        status: "completed", // Always fetch only completed tests
      };

      // Add search query if provided
      if (search && search.trim() !== "") {
        queryParams.search = search.trim();
      }

      const response = await TestAPI.fetchTests(httpHook, token, queryParams);

      if (response.success && response.data) {
        const newTests = response.data;

        // Get total from pagination object
        const total = response.pagination?.total || 0;
        setTotalTests(total);

        // Append or replace tests based on append flag
        if (append) {
          const updatedTests = [...allTests, ...newTests];
          setAllTests(updatedTests);
          // Check if there are more tests to load after appending
          setHasMoreTests(updatedTests.length < total);
        } else {
          setAllTests(newTests);
          // Check if there are more tests to load
          setHasMoreTests(newTests.length < total);
        }
      }
    } catch (error) {
      console.error("Error fetching completed tests:", error);
      setAllTests(append ? allTests : []);
      setHasMoreTests(false);
    } finally {
      setTestsLoading(false);
    }
  };

  // Initial fetch when component mounts
  useEffect(() => {
    setCurrentPage(1);
    setSearchQuery("");
    fetchCompletedTests(1, false, "");
  }, []);

  // Handle search change from AllTest component
  const handleSearchChange = (search) => {
    setSearchQuery(search);
    setCurrentPage(1);
    setAllTests([]); // Clear existing tests
    fetchCompletedTests(1, false, search);
  };

  // Handle "View More" click
  const handleViewMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchCompletedTests(nextPage, true, searchQuery); // Append to existing tests
  };

  return (
    <div className="min-h-screen ">
      <div className="w-full">
        <AllTest 
          heading='Student Performance Details'  
          filter={false} 
          userType='faculty' 
          allTests={allTests}
          showWrap={true}
          onSearchChange={handleSearchChange}
          onViewMore={handleViewMore}
          hasMoreTests={hasMoreTests}
          isLoadingMore={testsLoading && currentPage > 1}
          isLoading={testsLoading && currentPage === 1}
          totalTests={totalTests}
          displayedTestsCount={allTests.length}
        />
      </div>
    </div>
  );
}

export default FacultyStudentPerformance;