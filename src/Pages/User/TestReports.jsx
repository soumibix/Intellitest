import React, { useState, useEffect, useRef } from 'react';
import AllTest from '../../Components/AllTest';
import { useHttp } from '../../Hooks/useHttps';
import Lottie from 'lottie-react';
import handLoading from "../../Lottie/handLoading.json";
import { API_ENDPOINTS } from "../../Config/config";
import { useAuth } from '../../AppRouter';

function TestReports() {
    const [searchQuery, setSearchQuery] = useState('');
    const [allTests, setAllTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    });

    const httpHook = useHttp();
    const abortControllerRef = useRef(null);
    const { token } = useAuth();

    // Fetch student progress (completed tests with reports)
    const fetchStudentProgress = async (page = 1, search = '') => {
        // Cancel previous request if exists
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();

        setLoading(true);
        setError(null);

        try {
            if (!token) {
                setError('Authentication token not found. Please log in again.');
                setLoading(false);
                return;
            }

            console.log('🔍 Fetching student progress with params:', { 
                search,
                page 
            });

            // Build query parameters
            const params = new URLSearchParams();
            params.append('page', page);
            params.append('limit', 100);
            
            // Add search parameter only if it's not empty
            if (search && search.trim() !== '') {
                params.append('search', search.trim());
                console.log('✅ Search query added:', search.trim());
            }

            const queryString = params.toString();
            const endpoint = `${API_ENDPOINTS.STUDENT_GET_PROGRESS || 'student/test/getprogress'}?${queryString}`;

            console.log('📤 API Endpoint:', endpoint);

            const response = await httpHook.getReq(endpoint, token);

            console.log('📥 API Response:', response);

            if (response && response.data) {
                // Transform the response data to match the expected format
                const transformedTests = response.data.map(test => ({
                    _id: test.testId,
                    subjectName: test.subjectname || test.subjectName,
                    subjectCode: test.subjectcode || test.subjectCode,
                    department: test.department,
                    semester: test.semester,
                    testCategory: test.testcategory || test.testCategory,
                    testDate: test.testDate,
                    startTime: test.startTime,
                    endTime: test.endTime,
                    duration: test.duration,
                    numberOfQuestions: test.numberofQuestions || test.numberOfQuestions,
                    maxScore: test.maxScore,
                    obtainedScore: test.obtainedScore,
                    status: test.studentstatus || test.status,
                    timeTaken: test.timeTaken,
                    starttime: test.starttime,
                    endtime: test.endtime,
                    genarateScore: test.genarateScore,
                    createdAt: test.createdAt
                }));

                setAllTests(transformedTests);
                setPagination({
                    page: response.page || 1,
                    limit: response.limit || 10,
                    total: response.total || 0,
                    totalPages: response.totalPages || 1
                });
                console.log('✅ Progress loaded successfully:', transformedTests.length, 'tests');
            } else {
                setError(response.message || 'Failed to fetch student progress');
                setAllTests([]);
                console.error('❌ API Error:', response.message);
            }
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('🚫 Request aborted');
                return;
            }
            console.error('❌ Error fetching student progress:', err);
            setError('An error occurred while fetching student progress');
            setAllTests([]);
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch on component mount ONLY
    useEffect(() => {
        console.log('🚀 Component mounted, fetching initial progress');
        fetchStudentProgress(1, '');
        
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
        fetchStudentProgress(newPage, searchQuery);
    };

    // Handle search query change from AllTest component
    const handleSearchChange = (query) => {
        console.log('🔤 Search received from AllTest:', `"${query}"`);
        setSearchQuery(query);
        // Fetch with the new search query
        fetchStudentProgress(1, query);
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
                        onClick={() => fetchStudentProgress(1, searchQuery)}
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
                onSearchChange={handleSearchChange}
                pagination={pagination}
                onPageChange={handlePageChange}
                isLoading={loading}
            />

            {allTests.length === 0 && !loading && !error && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                        {searchQuery 
                            ? `No completed tests found matching "${searchQuery}"` 
                            : 'No test reports available yet'}
                    </p>
                </div>
            )}
        </div>
    );
}

export default TestReports;