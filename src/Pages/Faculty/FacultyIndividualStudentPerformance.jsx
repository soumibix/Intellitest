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

    // Fetch test report data
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
                    { page: 1, limit: 10 } // Fetch all students initially
                );

                if (response.success && response.data) {
                    const { data } = response;
                    
                    // Format test data to match TestCard props structure
                    // const formattedTestData = {
                    //     _id: data.testId,
                    //     subjectName: data.subjectName,
                    //     subjectCode: data.subjectCode,
                    //     department: data.department,
                    //     semester: data.semester,
                    //     numberOfQuestions: data.numberQuestions,
                    //     duration: data.duration,
                    //     testDate: data.testDate,
                    //     startTime: data.startTime,
                    //     endTime: data.endTime,
                    //     status: data.status,
                    //     // Calculate total marks (assuming 2 marks per question if not provided)
                    //     totalMarks: data.totalMarks || (data.numberQuestions * 2),
                    // };
                    
                    setTestData(response.data);

                    // Set students data
                    if (data.students && Array.isArray(data.students)) {
                        const formattedStudents = data.students.map((student) => ({
                            id: student.studentId,
                            name: student.name,
                            rollNo: student.rollNo,
                            marksObtained: student.markObtained,
                            totalMarks: data.totalMarks || (data.numberQuestions * 2),
                            timeTaken: student.timeTaken,
                            status: 'Done',
                            answerPdfUrl: student.answerPdfUrl,
                        }));
                        setStudents(formattedStudents);
                    }
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

        fetchTestReport();
    }, [testId, token]);

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
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow p-6">
                <FacultyStudentPerformanceTable students={students} />
            </div>
        </div>
    );
}

export default FacultyIndividualStudentPerformance;