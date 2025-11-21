import React, { useState } from "react";
import { SquarePen, LockKeyhole } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/iem.jpg';
import TestPopup from "../utils/TestPopup";
import userIcon from "../assets/purpleUser.png";

function TestCard({ userType, status = "upcoming", testData = {}, onEdit, data }) {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  // Merge data and testData, prioritizing data if it exists
  const mergedData = { ...testData, ...data };

  const {
    _id,
    subjectName = "Unknown Subject",
    subjectCode = "N/A",
    testCategory = "Test",
    department = "N/A",
    semester = "N/A",
    numberOfQuestions = 0,
    duration = "N/A",
    testDate,
    startTime,
    endTime,
    createdBy = "Faculty",
    createdAt,
    questions = []
  } = mergedData;

  // Format date and time
  const formatDateTime = () => {
    if (!testDate || !startTime) return "Not scheduled";
    const date = new Date(testDate);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${dateStr} • ${startTime}`;
  };

  // Format created date
  const formatCreatedDate = () => {
    if (!createdAt) return "Recently";
    const date = new Date(createdAt);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Calculate time remaining for ongoing tests
  const calculateTimeRemaining = () => {
    if (status !== "ongoing" || !endTime) return null;
    // This is a placeholder - implement actual time calculation based on your needs
    return `Exam ends at ${endTime}`;
  };

  const statusStyles = {
    ongoing: "bg-green-50 text-green-600",
    upcoming: "bg-blue-50 text-blue-600",
    completed: "bg-red-50 text-red-600"
  };

  const handlePopupStart = () => {
    setShowPopup(false);
    navigate(`/user/test/${_id || "default-test-id"}`);
  };

  const handleViewReport = () => {
    const testId = _id;
    if (userType === "admin" && testId) {
      navigate(`/admin/student-performance/viewreport/${testId}`);
    } else if (userType === "faculty" && testId) {
      navigate(`/faculty/student-performance/viewreport/${testId}`);
    } else {
      console.error('No test ID available for navigation');
    }
  };

  const timeRemaining = calculateTimeRemaining();
  const dateTime = formatDateTime();
  const createdDate = formatCreatedDate();

  return (
    <div className="w-full bg-white rounded-3xl shadow-sm border border-gray-200 p-4 sm:p-6 flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <div className="bg-pink-50 text-pink-600 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium">
            {status === "ongoing" && timeRemaining ? timeRemaining : dateTime}
          </div>
          <div className={`${statusStyles[status]} px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        </div>

        {(userType === "admin" || userType === "faculty") && ( status === "upcoming") && (
          <button onClick={onEdit} className="p-2 hover:bg-gray-50 rounded-lg">
            <SquarePen className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
          </button>
        )}
      </div>

      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
        {subjectName}
      </h2>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-gray-600 mb-2 text-sm sm:text-base">
        <span>{numberOfQuestions || questions.length || 0} Questions</span>
        <span className="text-gray-400">•</span>
        <span>{numberOfQuestions * 2 || questions.length * 2 || 0} Marks</span>
        <span className="text-gray-400">•</span>
        <span>Duration: {duration} minutes</span>
      </div>

      <div className="text-gray-600 mb-2 text-sm sm:text-base">
        Subject Code: {subjectCode}
      </div>
      <div className="text-gray-600 mb-2 text-sm sm:text-base">
        Department: {department}
      </div>
      <div className="text-gray-600 mb-2 text-sm sm:text-base">
        Semester: {semester}
      </div>
      <div className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
        Category: {testCategory}
      </div>

      {status === "completed" && userType === "user" && (
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <div className="text-purple-700 font-medium mb-1 text-sm sm:text-base">Marks Obtained:</div>
              <div className="text-3xl sm:text-4xl font-bold text-purple-800">
                45<span className="text-lg sm:text-xl text-gray-500"> / {numberOfQuestions * 2}</span>
              </div>  
            </div>
            <div className="text-xs sm:text-sm text-gray-800 space-y-1">
              <div><span className="font-medium text-gray-700">Time Taken:</span> 45 mins</div>
              <div><span className="font-medium text-gray-700">Accuracy:</span> 75%</div>
              <div><span className="font-medium text-gray-700">Status:</span> <span className="text-green-600 font-medium">Passed</span></div>
            </div>
          </div>
        </div>
      )}

      {/* <div className="flex-grow"></div> */}

      {userType === "user" && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="" className="w-10 h-10 rounded-full" />
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-semibold text-gray-900">Institute of Engineering & Management</span>
                <span className="text-xs sm:text-sm text-gray-500">Salt Lake</span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {status === "ongoing" && (
                <button onClick={() => setShowPopup(true)} className="bg-purple-600 hover:bg-purple-700 cursor-pointer text-white px-4 sm:px-6 py-2 rounded-xl font-medium w-full sm:w-auto text-sm sm:text-base whitespace-nowrap">
                  Start Test
                </button>
              )}

              {status === "upcoming" && (
                <div className="bg-gray-300 text-gray-500 px-4 sm:px-6 py-2 rounded-xl font-medium cursor-not-allowed flex items-center justify-center gap-2 w-full sm:w-auto text-sm sm:text-base whitespace-nowrap">
                  <LockKeyhole className="w-4 h-4" />
                  Start Test
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {(userType === "admin" || userType === "faculty") && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3">
              {/* <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-purple-600 font-bold text-lg sm:text-xl">{createdBy.name ? createdBy.name.charAt(0) : 'F'}</span>
              </div> */}
              {/* <div className="w-10 h-10 sm:w-10 sm:h-10 rounded-full bg-purple-100 flex items-center justify-center"> */}

              <img src={userIcon} alt="" className="w-10 h-10 sm:w-10 sm:h-10 rounded-full border-2 border-[#444444]"/>
              {/* </div> */}
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-medium text-gray-900">{createdBy.name}</span>
                <span className="text-gray-500 text-xs sm:text-sm font-bold">{createdBy.designation}</span>
              </div>
            </div>

            {status === "completed" && (
              <button 
                onClick={handleViewReport} 
                className="bg-[#6B21A8] hover:bg-[#410d6b] cursor-pointer text-white px-4 sm:px-6 py-2 rounded-xl font-medium w-full sm:w-auto text-sm sm:text-base whitespace-nowrap"
              >
                View Report
              </button>
            )}
          </div>
        </div>
      )}

      <TestPopup 
        isOpen={showPopup} 
        onClose={() => setShowPopup(false)} 
        onStart={handlePopupStart} 
        testData={{ 
          title: subjectName, 
          questions: numberOfQuestions || questions.length, 
          marks: (numberOfQuestions || questions.length) * 2, 
          duration: `${duration} minutes`, 
        }} 
      />
    </div>
  );
}

export default TestCard;