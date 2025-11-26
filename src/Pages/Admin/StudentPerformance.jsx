import React, { useState, useEffect } from 'react';
import AllTest from '../../Components/AllTest';
import { useHttp } from "../../Hooks/useHttps";
import { useAuth } from "../../AppRouter";
import { TestAPI } from "../../apis/Tests/TestCRUD";

const StudentPerformance = () => {
  const [allTests, setAllTests] = useState([]);
  const [testsLoading, setTestsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTests, setTotalTests] = useState(0);
  const [hasMoreTests, setHasMoreTests] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { token } = useAuth();
  const httpHook = useHttp();

  const TESTS_PER_PAGE = 10;

  // Fetch only completed tests
  const fetchCompletedTests = async (page = 1, append = false, search = "") => {
    setTestsLoading(true);

    try {
      const queryParams = {
        page: page,
        limit: TESTS_PER_PAGE,
        status: "completed",
      };

      if (search.trim() !== "") {
        queryParams.search = search.trim();
      }

      const response = await TestAPI.fetchTests(httpHook, token, queryParams);

      if (response.success && response.data) {
        const newTests = response.data;
        const total = response.pagination?.total || 0;
        setTotalTests(total);

        if (append) {
          const updated = [...allTests, ...newTests];
          setAllTests(updated);
          setHasMoreTests(updated.length < total);
        } else {
          setAllTests(newTests);
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

  // Initial fetch
  useEffect(() => {
    setCurrentPage(1);
    setSearchQuery("");
    fetchCompletedTests(1, false, "");
  }, []);

  // When search text changes
  const handleSearchChange = (search) => {
    setSearchQuery(search);
    setCurrentPage(1);
    setAllTests([]);
    fetchCompletedTests(1, false, search);
  };

  // Load more
  const handleViewMore = () => {
    const next = currentPage + 1;
    setCurrentPage(next);
    fetchCompletedTests(next, true, searchQuery);
  };

  return (
    <div className="min-h-screen">
      <div className="w-full">
        <AllTest
          heading="Student Performance Details"
          filter={false}
          userType="admin"
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
};

export default StudentPerformance;
