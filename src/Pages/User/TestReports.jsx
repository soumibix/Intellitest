import React, { useState, useEffect, useRef } from 'react';
import AllTest from '../../Components/AllTest';
import { UserTestAPI } from '../../apis/Tests/userTestData';
import { useHttp } from '../../Hooks/useHttps';

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
    const isInitialMount = useRef(true);
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
        isInitialMount.current = false;
        
        // Cleanup
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []); // Empty dependency array - runs only once on mount

    // Handle search with debounce
    useEffect(() => {
        // Skip the initial mount since we already fetch in the first useEffect
        if (isInitialMount.current) {
            return;
        }

        console.log('🔍 Search query changed to:', `"${searchQuery}"`);
        
        const delayDebounce = setTimeout(() => {
            console.log('⏱️ Debounce completed, executing search for:', `"${searchQuery}"`);
            fetchCompletedTests(1, searchQuery);
        }, 500);

        return () => {
            console.log('🧹 Cleaning up debounce timeout');
            clearTimeout(delayDebounce);
        };
    }, [searchQuery]); // Only depends on searchQuery

    // Handle pagination
    const handlePageChange = (newPage) => {
        console.log('📄 Page changed to:', newPage);
        fetchCompletedTests(newPage, searchQuery);
    };

    // Handle search query change from AllTest component
    const handleSearchChange = (query) => {
        console.log('🔤 Search input changed:', `"${query}"`);
        setSearchQuery(query);
    };

    if (loading && allTests.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading completed tests...</p>
                </div>
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
                allTests={allTests} 
                filter={false} 
                userType='user'
                onSearch={handleSearchChange}
                searchQuery={searchQuery}
                pagination={pagination}
                onPageChange={handlePageChange}
                loading={loading}
            />

            {allTests.length === 0 && !loading && !error && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                        {searchQuery ? 
                            `No completed tests found matching "${searchQuery}"` : 
                            'No completed tests available yet'}
                    </p>
                </div>
            )}
        </div>
    );
}

export default TestReports;