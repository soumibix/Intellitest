import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PerformanceAnalytics from '../../Components/common/PerformanceAnalytics';
import FacultyStudentPerformanceTable from '../../Components/Faculty/FacultyStudentPerformanceTable';
import TestCard from '../../Components/TestCard';
import { useHttp } from "../../Hooks/useHttps";
import { useAuth } from "../../AppRouter";
import { TestAPI } from "../../apis/Tests/TestCRUD";
import Lottie from "lottie-react";
import handLoading from "../../Lottie/handLoading.json";

function FacultyIndividualStudentPerformance() {
    const { testId } = useParams();
    const { token } = useAuth();
    const httpHook = useHttp();

    const [testData, setTestData] = useState(null);
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalStudents, setTotalStudents] = useState(0);
    const [limit] = useState(10);

    // Fetch test report data
    const fetchTestReport = async (page = 1) => {
        if (!testId) {
            setError("No test ID provided");
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await TestAPI.viewTestReport(
                httpHook, 
                testId, 
                token, 
                { page, limit }
            );

            console.log(response);
            
            if (response.success && response.data) {
                const { data } = response;
                
                setTestData({
                    ...data,
                    analysis: response.analysis || []
                });

                // Set students data
                if (data.students && Array.isArray(data.students)) {
                    const formattedStudents = data.students.map((student) => ({
                        id: student.studentId,
                        name: student.name,
                        rollNo: student.rollNo,
                        marksObtained: student.markObtained,
                        totalMarks: data.totalMarks,
                        timeTaken: student.timeTaken,
                        status: 'Done',
                        answerPdfUrl: student.answerPdfUrl,
                    }));
                    setStudents(formattedStudents);
                }

                // Set pagination data
                setCurrentPage(response.page || 1);
                setTotalStudents(response.totalStudents || 0);
                setTotalPages(Math.ceil((response.totalStudents || 0) / limit));
            } else {
                setError(response.message || "Failed to fetch test report");
            }
        } catch (err) {
            console.error("Error fetching test report:", err);
            setError("An error occurred while fetching test report");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTestReport(currentPage);
    }, [testId, token, currentPage]);

    // Handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        // Scroll to top of table
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <Lottie
                    animationData={handLoading}
                    loop={true}
                    style={{ width: '100%', maxWidth: 500, height: 'auto' }}
                />
            </div>
        );
    }

    // Error state
    if (error || !testData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center p-8 bg-white rounded-lg shadow">
                    <h2 className="text-2xl font-semibold text-red-600 mb-4">Error</h2>
                    <p className="text-gray-600">{error || "Failed to load test data"}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Left Card - Test Details using TestCard */}
                <div>
                    <TestCard 
                        userType="faculty"
                        status={testData.status}
                        data={testData}
                        testData={testData}
                    />
                </div>

                {/* Right Card - Performance Analytics */}
                <div className='lg:col-span-2'>
                    <PerformanceAnalytics 
                        students={students} 
                        totalMarks={testData.totalMarks}
                        analysis={testData.analysis || []}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow p-6">
                <FacultyStudentPerformanceTable 
                    students={students}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalStudents={totalStudents}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}

export default FacultyIndividualStudentPerformance;