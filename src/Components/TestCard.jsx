import React from "react";
import { SquarePen, LockKeyhole } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/iem.jpg';

function TestCard({
  userType = "admin", // 'user' or 'admin'
  status = "upcoming", // 'ongoing', 'upcoming', or 'completed'
  testData = {},
  onEdit,
  data,
}) {
  const {
    id = null,
    dateTime = "Nov 10 • 10:00 AM",
    title = "Machine Learning Mid-Sem Test",
    questions = 30,
    marks = 60,
    duration = "1 hour",
    department = "CST",
    semester = "05",
    createdBy = "Saurabh Kumbhar",
    createdDate = "Sept 5 04:25",
    avatarSeed = "Saurabh",
    timeRemaining = "58:07 mins remaining",
    marksObtained = null,
    totalMarks = 60,
    timeTaken = null,
    accuracy = null,
    statusResult = "Passed", // can be "Passed" or "Failed"
  } = testData;

  const getStatusStyle = () => {
    switch (status) {
      case "ongoing":
        return "bg-green-50 text-green-600";
      case "upcoming":
        return "bg-blue-50 text-blue-600";
      case "completed":
        return "bg-red-50 text-red-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  const getStatusText = () => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleStartTest = () => {
    const testId = data?.id || id || "default-test-id";
    console.log(`Navigate to /user/test/${testId}`);
  };

  const handleViewReport = () => {
    const testId = data?.id || id || "default-test-id";
    console.log(`Navigate to /admin/viewreport?testId=${testId}`);
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-sm border border-gray-200 p-4 sm:p-6 flex flex-col">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <div className="bg-pink-50 text-pink-600 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium">
            {status === "ongoing" ? timeRemaining : dateTime}
          </div>
          <div
            className={`${getStatusStyle()} px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium`}
          >
            {getStatusText()}
          </div>
        </div>

        {/* Conditional Edit Button */}
        {userType === "admin" &&
          (status === "ongoing" || status === "upcoming") && (
            <button
              onClick={onEdit}
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
            >
              <SquarePen className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            </button>
          )}
      </div>

      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 text-left mb-3 sm:mb-4">
        {title}
      </h2>

      {/* Test Details */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-gray-600 mb-2 text-sm sm:text-base">
        <span>{questions} Questions</span>
        <span className="text-gray-400">•</span>
        <span>{marks} Marks</span>
        <span className="text-gray-400">•</span>
        <span>Duration: {duration}</span>
      </div>

      <div className="text-gray-600 text-left mb-2 text-sm sm:text-base">
        <span>Department: {department}</span>
      </div>
      <div className="text-gray-600 text-left mb-4 sm:mb-6 text-sm sm:text-base">
        <span>Semester: {semester}</span>
      </div>

      {/* Completed Card */}
      {status === "completed"&& userType !== "admin" && (
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Marks Obtained */}
            <div>
              <div className="text-purple-700 font-medium mb-1 text-sm sm:text-base">
                Marks Obtained:
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-purple-800">
                {marksObtained}
                <span className="text-lg sm:text-xl text-gray-500"> / {totalMarks}</span>
              </div>
            </div>

            {/* Time, Accuracy, Status */}
            <div className="text-xs sm:text-sm text-gray-800 space-y-1">
              <div>
                <span className="font-medium text-gray-700">Time Taken:</span>{" "}
                {timeTaken}
              </div>
              <div>
                <span className="font-medium text-gray-700">Accuracy:</span>{" "}
                {accuracy}
              </div>
              <div>
                <span className="font-medium text-gray-700">Status:</span>{" "}
                <span className="text-green-600 font-medium">
                  {statusResult}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer to push footer to bottom */}
      <div className="flex-grow"></div>

      {/* College Section for Users */}
      {userType === "user" && (
        <>
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-bold text-sm sm:text-base">IEM</span>
                </div> */}
                <div className="w-10 h-10 rounded-full">

                <img src={logo} alt="" className="w-full h-full"/>

                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm sm:text-base font-semibold text-gray-900">
                    Institute of Engineering & Management
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500">Salt Lake</span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {status === "ongoing" && (
                  <button
                    onClick={handleStartTest}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-2 rounded-xl font-medium transition-colors cursor-pointer select-none w-full sm:w-auto text-sm sm:text-base whitespace-nowrap"
                  >
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
        </>
      )}

      {/* Footer for Admin */}
      {userType === "admin" && (
        <>
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`}
                  alt={createdBy}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
                />
                <div className="flex flex-col">
                  <span className="text-sm sm:text-base font-medium text-gray-900">
                    {createdBy}
                  </span>
                  <span className="text-gray-500 text-xs sm:text-sm font-bold">
                    {createdDate}
                  </span>
                </div>
              </div>

              {status === "completed" && (
                <button
                  onClick={handleViewReport}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-2 rounded-xl font-medium transition-colors cursor-pointer select-none w-full sm:w-auto text-sm sm:text-base whitespace-nowrap"
                >
                  View Report
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TestCard;
