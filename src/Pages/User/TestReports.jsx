import React, { useState, useEffect, useRef } from 'react';
import AllTest from '../../Components/AllTest';
import { useHttp } from '../../Hooks/useHttps';
import Lottie from 'lottie-react';
import handLoading from "../../Lottie/handLoading.json";
import { API_ENDPOINTS } from "../../Config/config";

function TestReports() {
    const [allTests, setAllTests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [initialLoadComplete, setInitialLoadComplete] = useState(false);

    const httpHook = useHttp();
    const abortControllerRef = useRef(null);
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    // Fetch student progress
    const fetchStudentProgress = async (search = "") => {
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

            console.log('🔍 Fetching student progress with params:', { search });

            // Build query parameters
            const params = new URLSearchParams();
            params.append('page', 1);
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
            if (!initialLoadComplete) {
                setInitialLoadComplete(true);
            }
        }
    };

    // Initial fetch on component mount ONLY
    useEffect(() => {
        console.log('🚀 Component mounted, fetching initial progress');
        fetchStudentProgress("");
        
        // Cleanup
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Handle search query change
    const handleSearchChange = (search) => {
        console.log('🔤 Search query changed:', `"${search}"`);
        setSearchQuery(search);
        fetchStudentProgress(search);
    };

    // Show full-page loader only on initial load
    if (!initialLoadComplete && loading) {
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
                        onClick={() => fetchStudentProgress(searchQuery)}
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
                isLoading={loading}
            />
        </div>
    );
}

export default TestReports;