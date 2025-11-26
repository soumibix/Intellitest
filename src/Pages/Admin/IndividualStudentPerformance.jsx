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

    // console.log("🚀 IndividualStudentPerformance testId:", testId);

    useEffect(() => {
        const fetchTestReport = async () => {
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
                    { page: 1, limit: 20 }
                );

                if (response.success && response.data) {
                    const { data } = response;

                    // Format test data for TestCard
                    const formatted = {
                        _id: data.testId,
                        subjectName: data.subjectName,
                        subjectCode: data.subjectCode,
                        department: data.department,
                        semester: data.semester,
                        numberOfQuestions: data.numberQuestions,
                        duration: data.duration,
                        testDate: data.testDate,
                        startTime: data.startTime,
                        endTime: data.endTime,
                        status: data.status,
                        totalMarks: data.totalMarks || (data.numberQuestions * 2),
                    };
                    setTestData(response.data);

                    // Format student table data
                    if (data.students && Array.isArray(data.students)) {
                        const formattedStudents = data.students.map((s) => ({
                            id: s.studentId,
                            name: s.name,
                            rollNo: s.rollNo,
                            marksObtained: s.markObtained,
                            totalMarks: formatted.totalMarks,
                            timeTaken: s.timeTaken,
                            status: "Done",
                            answerPdfUrl: s.answerPdfUrl,
                        }));
                        setStudents(formattedStudents);
                    }
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

        fetchTestReport();
    }, [testId, token]);

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
                        totalMarks={testData.totalMarks}
                    />
                </div>
            </div>

            {/* STUDENTS TABLE */}
            <div className="bg-white rounded-lg shadow p-6">
                <StudentPerformanceTable students={students} />
            </div>
        </div>
    );
}

export default IndividualStudentPerformance;
