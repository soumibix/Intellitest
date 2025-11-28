import React, { useState, useEffect, useCallback, act } from 'react';
import { useNavigate } from 'react-router-dom';
import AllTest from '../../Components/AllTest';
import { UserTestAPI } from '../../apis/Tests/userTestData';
import { useHttp } from '../../Hooks/useHttps'; 
import ChooseSemPopup from '../../utils/ChooseSemPopup';
import Lottie from 'lottie-react';
import handLoading from "../../Lottie/handLoading.json";
import { useAuth } from '../../AppRouter';

function UserTests() {
  const navigate = useNavigate();
  const httpHook = useHttp();
  const {token } = useAuth();
  
  const [allTests, setAllTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSemPopupOpen, setIsSemPopupOpen] = useState(false);
  const [currentSemester, setCurrentSemester] = useState(
    localStorage.getItem('userSemester')
  );
  
  // New states for search and filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [debounceTimer, setDebounceTimer] = useState(null);

  // Check if semester is selected
  useEffect(() => {
    if (!localStorage.getItem('userSemester')) {
      setIsSemPopupOpen(true);
    }
  }, []);

  // Fetch tests when semester or filter changes
  useEffect(() => {
    fetchUserTests();
  }, [currentSemester, activeFilter]);

  // Debounced search effect
  useEffect(() => {
    // Clear existing timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Set new timer for search
    const timer = setTimeout(() => {
      if (searchQuery !== '') {
        fetchUserTests();
      } else if (searchQuery === '') {
        // If search is cleared, fetch all tests
        fetchUserTests();
      }
    }, 500); // 500ms debounce delay

    setDebounceTimer(timer);

    // Cleanup
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [searchQuery]);

  const fetchUserTests = async () => {
    setLoading(true);
    setError(null);

    console.log(JSON.parse(sessionStorage.getItem('user')), 'hbdh')
    
    try {
      // Build query params
      const queryParams = {
        page: 1,
        limit: 100,
        department: JSON.parse(sessionStorage.getItem('user'))?.department,
        semester: currentSemester || undefined,
        // excludeStatus: 'completed',
      };

      // Add search query if exists
      if (searchQuery && searchQuery.trim() !== '') {
        queryParams.search = searchQuery.trim();
      }

      // Add status filter if not 'all'
      if (activeFilter && activeFilter !== 'all') {
        queryParams.status = activeFilter;
      }
      if(activeFilter === 'all'){
        queryParams.excludeStatus = 'completed';
      }

      console.log('Fetching tests with params:', queryParams);

      // Fetch tests with filters
      const response = await UserTestAPI.fetchUserTests(httpHook, token, queryParams);

      console.log('API Response:', response);

      if (response.success) {
        setAllTests(response.data);
      } else {
        setError(response.message || 'Failed to fetch tests');
        setAllTests([]);
      }
    } catch (err) {
      console.error('Error fetching user tests:', err);
      setError('An error occurred while fetching tests');
      setAllTests([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change
  const handleSearchChange = useCallback((query) => {
    console.log('Search query changed:', query);
    setSearchQuery(query);
  }, []);

  // Handle filter change
  const handleFilterChange = useCallback((filter) => {
    console.log('Filter changed:', filter);
    setActiveFilter(filter);
  }, []);

  if (loading && allTests.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Lottie 
          animationData={handLoading} 
          loop={true}
          style={{ width: 500, height: 500 }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">{error}</div>
          <button
            onClick={fetchUserTests}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <AllTest 
        allTests={allTests} 
        filter={true}
        heading="Your Test Collection"
        userType="user"
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
        activeFilterProp={activeFilter}
        isLoading={loading}
        setIsSemPopupOpen={setIsSemPopupOpen}
        isShowSemPopUp={true}
        showCompletedTestsFilter={false}
        placeholderProps={"Search by Test Name, Code..."}
      />
      
      {isSemPopupOpen && 
        <ChooseSemPopup 
          isOpen={isSemPopupOpen}
          onClose={() => setIsSemPopupOpen(false)}
          onSubmit={(selectedSemester) => {
            console.log('Selected Semester:', selectedSemester);
            setCurrentSemester(selectedSemester);
            localStorage.setItem('userSemester', selectedSemester);
            setIsSemPopupOpen(false);
          }}
        />
      }
    </>
  );
}

export default UserTests;