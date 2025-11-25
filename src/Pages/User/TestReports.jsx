import React, { useState, useEffect, useRef } from 'react';
import AllTest from '../../Components/AllTest';
import { UserTestAPI } from '../../apis/Tests/userTestData';
import { useHttp } from '../../Hooks/useHttps';
import Lottie from 'lottie-react';
import handLoading from "../../Lottie/handLoading.json";

function TestReports() {
    const [searchQuery, setSearchQuery] = useState('');
    const [allTests, setAllTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0
    });

    const httpHook = useHttp();
    const abortControllerRef = useRef(null);
    
    // Get user data from localStorage
    const getUserData = () => {
        try {
            const user = JSON.parse(sessionStorage.getItem('user')) || JSON.parse(localStorage.getItem('user'));
            return {
                department: user?.department || '',
                semester: user?.semester || ''
            };
        } catch (error) {
            console.error('Error parsing user data:', error);
            return { department: '', semester: '' };
        }
    };

    const getToken = () => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            if (!token) {
                console.error('❌ No token found in storage');
            } else {
                console.log('✅ Token found:', token.substring(0, 20) + '...');
            }
            return token;
        } catch (error) {
            console.error('Error getting token:', error);
            return '';
        }
    };

    // Fetch completed tests with search
    const fetchCompletedTests = async (page = 1, search = '') => {
        // Cancel previous request if exists
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();

        setLoading(true);
        setError(null);

        try {
            const { department, semester } = getUserData();
            const token = getToken();

            if (!token) {
                setError('Authentication token not found. Please log in again.');
                setLoading(false);
                return;
            }

            console.log('🔍 Fetching completed tests with params:', { 
                department, 
                semester, 
                status: 'completed',
                search,
                page 
            });

            // Build query parameters
            const queryParams = {
                page: page,
                limit: 10,
                department: department,
                semester: semester,
                status: 'completed',
            };

            // Add search parameter only if it's not empty
            if (search && search.trim() !== '') {
                queryParams.search = search.trim();
                console.log('✅ Search query added:', search.trim());
            } else {
                console.log('ℹ️ No search query');
            }

            console.log('📤 Final Query Params:', queryParams);

            const response = await UserTestAPI.fetchUserTests(
                httpHook,
                token,
                queryParams
            );

            console.log('📥 API Response:', response);

            if (response.success) {
                setAllTests(response.data || []);
                setPagination({
                    page: response.page || 1,
                    limit: response.limit || 10,
                    total: response.total || 0
                });
                console.log('✅ Tests loaded successfully:', response.data?.length || 0, 'tests');
            } else {
                setError(response.message || 'Failed to fetch completed tests');
                setAllTests([]);
                console.error('❌ API Error:', response.message);
            }
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('🚫 Request aborted');
                return;
            }
            console.error('❌ Error fetching completed tests:', err);
            setError('An error occurred while fetching completed tests');
            setAllTests([]);
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch on component mount ONLY
    useEffect(() => {
        console.log('🚀 Component mounted, fetching initial tests');
        fetchCompletedTests(1, '');
        
        // Cleanup
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []); // Empty dependency array - runs only once on mount

    // Handle pagination
    const handlePageChange = (newPage) => {
        console.log('📄 Page changed to:', newPage);
        fetchCompletedTests(newPage, searchQuery);
    };

    // Handle search query change from AllTest component
    // This will be called by AllTest's internal debounced search
    const handleSearchChange = (query) => {
        console.log('🔤 Search received from AllTest:', `"${query}"`);
        setSearchQuery(query);
        // Fetch with the new search query
        fetchCompletedTests(1, query);
    };

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

    if (error && allTests.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button 
                        onClick={() => fetchCompletedTests(1, searchQuery)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4">
            <AllTest 
                heading="Generate & View Reports"
                allTests={allTests} 
                filter={false} 
                userType='user'
                onSearchChange={handleSearchChange} // AllTest will handle debouncing internally
                pagination={pagination}
                onPageChange={handlePageChange}
                isLoading={loading} // Changed from 'loading' to 'isLoading' to match AllTest props
            />

            {allTests.length === 0 && !loading && !error && (
    <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
            {searchQuery 
                ? `No completed tests found matching "${searchQuery}"` 
                : ''}
        </p>
    </div>
)}
        </div>
    );
}

export default TestReports;