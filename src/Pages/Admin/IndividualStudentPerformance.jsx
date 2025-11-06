import React from 'react'
import PerformanceAnalytics from '../../Components/common/PerformanceAnalytics'
import StudentPerformanceTable from '../../Components/Admin/StudentPerformanceTable'

function IndividualStudentPerformance() {
    const testData = {
        title: 'Machine Learning Mid-Sem Test',
        date: 'Nov 05 • 10:00 AM',
        status: 'Completed',
        questions: 30,
        marks: 60,
        duration: '1 hour',
        department: 'CSE',
        semester: '05'
    }

    const students = Array(4).fill({
        name: 'Aditi Sharma',
        rollNo: '21CS105',
        marks: '55 / 60',
        time: '48min',
        status: 'Done'
    })

    const allTests = [
        {
            id: 1,
            status: "ongoing",
            testData: {
                timeRemaining: "58:07 mins remaining",
                title: "Machine Learning Mid-Sem Test",
                questions: 30,
                marks: 60,
                duration: "1 hour",
                department: "CST",
                semester: "05",
                createdBy: "Saurabh Kumbhar",
                createdDate: "Sept 5 04:25",
                avatarSeed: "Saurabh",
            },
            month: "September",
        },
        {
            id: 2,
            status: "upcoming",
            testData: {
                dateTime: "Nov 15 • 2:00 PM",
                title: "Data Structures Final Exam",
                questions: 50,
                marks: 100,
                duration: "2 hours",
                department: "CST",
                semester: "03",
                createdBy: "Priya Sharma",
                createdDate: "Oct 20 10:15",
                avatarSeed: "Priya",
            },
            month: "November",
        },
        {
            id: 3,
            status: "completed",
            testData: {
                dateTime: "Oct 10 • 10:00 AM",
                title: "Database Management Systems Quiz",
                questions: 20,
                marks: 40,
                duration: "45 mins",
                department: "CST",
                semester: "04",
                createdBy: "Rahul Verma",
                createdDate: "Sept 30 14:20",
                avatarSeed: "Rahul",
                marksObtained: 52,
                totalMarks: 60,
                timeTaken: "54 minutes",
                accuracy: "87%",
            },
            month: "October",
        },
        {
            id: 4,
            status: "upcoming",
            testData: {
                dateTime: "Nov 20 • 11:00 AM",
                title: "Computer Networks Test",
                questions: 40,
                marks: 80,
                duration: "1.5 hours",
                department: "CST",
                semester: "05",
                createdBy: "Anjali Singh",
                createdDate: "Nov 1 09:00",
                avatarSeed: "Anjali",
            },
            month: "November",
        },
        {
            id: 5,
            status: "completed",
            testData: {
                dateTime: "Oct 25 • 3:00 PM",
                title: "Operating Systems Mid-Term",
                questions: 35,
                marks: 70,
                duration: "1.5 hours",
                department: "CST",
                semester: "05",
                createdBy: "Saurabh Kumbhar",
                createdDate: "Oct 15 11:30",
                avatarSeed: "Saurabh",
                marksObtained: 45,
                totalMarks: 70,
                timeTaken: "1 hour 20 mins",
                accuracy: "64%",
            },
            month: "October",
        },
    ]

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Left Card */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-semibold text-purple-700 mb-3">{testData.title}</h2>
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-pink-600 font-medium">{testData.date}</span>
                        <span className="px-3 py-1 bg-red-100 text-red-600 rounded text-sm font-medium">
                            {testData.status}
                        </span>
                    </div>
                    <div className="space-y-2 text-gray-600">
                        <div className="text-base">
                            <span className="font-medium">{testData.questions} Questions</span>
                            <span className="mx-2">•</span>
                            <span className="font-medium">{testData.marks} Marks</span>
                            <span className="mx-2">•</span>
                            <span>Duration: {testData.duration}</span>
                        </div>
                        <div className="text-base">Department: <span className="font-medium">{testData.department}</span></div>
                        <div className="text-base">Semester: <span className="font-medium">{testData.semester}</span></div>
                    </div>
                </div>

                {/* Right Card - Performance Analytics */}
                <div className='lg:col-span-2'>
                    <PerformanceAnalytics />
                </div>
            </div>

            {/* Table */}
            <div className=" bg-white rounded-lg shadow p-6">
                <StudentPerformanceTable allTests={allTests} />
            </div>
        </div>
    )
}

export default IndividualStudentPerformance