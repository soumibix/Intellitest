import React, { useState } from 'react'
import AllTest from '../../Components/AllTest';

const FacultyStudentPerformance = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const allTests =
    [
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
        id: 6,
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
      {
        id: 7,
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

  const currentTests = allTests.filter(test => test.status === 'completed');

  return (
    // <AllTest allTests={allTests} filter={true} userType='admin'  />
    <AllTest heading='Student Performance Details'  filter={false} userType='admin' allTests={currentTests}  />
  );
}

export default FacultyStudentPerformance