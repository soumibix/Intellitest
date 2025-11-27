// src/pages/Admin/IndividualStudentPerformance.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PerformanceAnalytics from '../../Components/common/PerformanceAnalytics';
import StudentPerformanceTable from '../../Components/Admin/StudentPerformanceTable';
import TestCard from '../../Components/TestCard';
import { useHttp } from "../../Hooks/useHttps";
import { useAuth } from "../../AppRouter";
import { TestAPI } from "../../apis/Tests/TestCRUD";
import Lottie from "lottie-react";
import handLoading from "../../Lottie/handLoading.json";

function IndividualStudentPerformance() {
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

            if (response.success && response.data) {
                const { data } = response;

                // Save full test data (for TestCard + analytics)
                setTestData(data);

                // Compute total marks (fallback if needed)
                const totalMarks = data.totalMarks || (data.numberQuestions * 2);

                // Format student table data
                if (data.students && Array.isArray(data.students)) {
                    const formattedStudents = data.students.map((s) => ({
                        id: s.studentId,
                        name: s.name,
                        rollNo: s.rollNo,
                        marksObtained: s.markObtained,
                        totalMarks,
                        timeTaken: s.timeTaken,
                        status: "Done",
                        answerPdfUrl: s.answerPdfUrl,
                    }));
                    setStudents(formattedStudents);
                } else {
                    setStudents([]);
                }

                // Pagination meta
                const total = response.totalStudents || 0;
                setCurrentPage(response.page || page || 1);
                setTotalStudents(total);
                setTotalPages(Math.ceil(total / limit) || 1);
            } else {
                setError(response.message || "Failed to fetch test report");
            }
        } catch (err) {
            console.error("Admin Test Report Error:", err);
            setError("Unable to load test report");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTestReport(currentPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [testId, token, currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Loading State
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

    // Error State
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

                {/* LEFT: Test Card (Admin View) */}
                <div>
                    <TestCard 
                        userType="admin"
                        status={testData.status}
                        data={testData}
                        testData={testData}
                    />
                </div>

                {/* RIGHT: Test Analytics */}
                <div className="lg:col-span-2">
                    <PerformanceAnalytics 
                        students={students}
                        totalMarks={testData.totalMarks || (testData.numberQuestions * 2)}
                    />
                </div>
            </div>

            {/* STUDENTS TABLE */}
            <div className="bg-white rounded-lg shadow p-6">
                <StudentPerformanceTable 
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

export default IndividualStudentPerformance;
