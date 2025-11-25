import React, { useState } from "react";
import { SquarePen, LockKeyhole, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/iem.jpg';
import TestPopup from "../utils/TestPopup";
import userIcon from "../assets/purpleUser.png";
import ConfirmationModal from "../utils/ConfirmationModal";

function TestCard({ 
  userType, 
  status = "upcoming", 
  testData = {}, 
  onEdit, 
  data,
  onDelete // Add onDelete callback prop
}) {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const userData = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));

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

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      if (onDelete) {
        await onDelete(_id);
      }
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting test:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const timeRemaining = calculateTimeRemaining();
  const dateTime = formatDateTime();
  const createdDate = formatCreatedDate();

  return (
    <>
      <div className="w-full bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-200 p-4 sm:p-5 md:p-6 flex flex-col hover:shadow-md transition-shadow duration-200">
        {/* Header Section */}
        <div className="flex flex-col gap-3 mb-4 sm:mb-5 md:mb-6">
          {/* Status and Actions Row */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2 flex-1">
              <div className="bg-pink-50 text-pink-600 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap">
                {status === "ongoing" && timeRemaining ? timeRemaining : dateTime}
              </div>
              <div className={`${statusStyles[status]} px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </div>
            </div>

            {/* Action Buttons - Only for admin/faculty on upcoming tests */}
            {(userType === "admin" || userType === "faculty") && status === "upcoming" && (
              <div className="flex items-center gap-2 flex-shrink-0">
                <button 
                  onClick={onEdit} 
                  className="p-2 hover:bg-purple-50 rounded-lg cursor-pointer transition-colors"
                  title="Edit Test"
                >
                  <SquarePen className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                </button>
                <button 
                  onClick={() => setShowDeleteModal(true)} 
                  className="p-2 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                  title="Delete Test"
                >
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 line-clamp-2">
          {subjectName}
        </h2>

        {/* Test Details Grid */}
        <div className="space-y-2 mb-4 sm:mb-6 text-sm sm:text-base">
          {/* Questions, Marks, Duration */}
          <div className="flex flex-wrap items-center gap-2 text-gray-600">
            <span className="font-medium">{numberOfQuestions || questions.length || 0} Questions</span>
            <span className="text-gray-400">•</span>
            <span className="font-medium">{(numberOfQuestions || questions.length || 0) * 2} Marks</span>
            <span className="text-gray-400">•</span>
            <span>{duration} mins</span>
          </div>

          {/* Subject Code */}
          <div className="text-gray-600">
            <span className="font-medium text-gray-700">Code:</span> {subjectCode}
          </div>

          {/* Department and Semester in one line on mobile */}
          <div className="flex flex-wrap items-center gap-2 text-gray-600">
            <span><span className="font-medium text-gray-700">Dept:</span> {department}</span>
            <span className="text-gray-400 hidden sm:inline">•</span>
            <span><span className="font-medium text-gray-700">Sem:</span> {semester}</span>
          </div>

          {/* Category */}
          <div className="text-gray-600">
            <span className="font-medium text-gray-700">Category:</span> {testCategory}
          </div>
        </div>

        {/* Completed Test Score Card (User Only) */}
        {status === "completed" && userType === "user" && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <div className="text-purple-700 font-medium mb-1 text-xs sm:text-sm">Marks Obtained</div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-800">
                  45<span className="text-base sm:text-lg md:text-xl text-gray-500"> / {(numberOfQuestions || questions.length) * 2}</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-gray-800 space-y-1">
                <div><span className="font-medium text-gray-700">Time:</span> 45 mins</div>
                <div><span className="font-medium text-gray-700">Accuracy:</span> 75%</div>
                <div><span className="font-medium text-gray-700">Status:</span> <span className="text-green-600 font-semibold">Passed</span></div>
              </div>
            </div>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Footer Section */}
        <div className="border-t border-gray-200 pt-3 sm:pt-4 mt-auto">
          {/* User Footer */}
          {userType === "user" && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              {/* Institute Info */}
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <img src={logo} alt="Institute" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 truncate">
                    Institute of Engineering & Management
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500">{userData.institutionName}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="w-full sm:w-auto flex-shrink-0">
                {status === "ongoing" && (
                  <button 
                    onClick={() => setShowPopup(true)} 
                    className="bg-purple-600 hover:bg-purple-700 cursor-pointer text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-medium w-full sm:w-auto text-sm sm:text-base transition-colors"
                  >
                    Start Test
                  </button>
                )}

                {status === "upcoming" && (
                  <div className="bg-gray-300 text-gray-500 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-medium cursor-not-allowed flex items-center justify-center gap-2 w-full sm:w-auto text-sm sm:text-base">
                    <LockKeyhole className="w-3 h-3 sm:w-4 sm:h-4" />
                    Start Test
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Admin/Faculty Footer */}
          {(userType === "admin" || userType === "faculty") && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              {/* Creator Info */}
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <img 
                  src={userIcon} 
                  alt="Creator" 
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-300 flex-shrink-0"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-xs sm:text-sm md:text-base font-medium text-gray-900 truncate">
                    {createdBy.name || 'Faculty'}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 font-semibold truncate">
                    {createdBy.designation || 'Educator'}
                  </span>
                </div>
              </div>

              {/* View Report Button */}
              {status === "completed" && (
                <button 
                  onClick={handleViewReport} 
                  className="bg-[#6B21A8] hover:bg-[#410d6b] cursor-pointer text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-medium w-full sm:w-auto text-sm sm:text-base transition-colors"
                >
                  View Report
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Test Start Popup */}
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
        _id={_id}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Test"
        message={`Are you sure you want to delete "${subjectName}"? This action cannot be undone and will permanently remove all test data.`}
        confirmText="Delete Test"
        cancelText="Cancel"
        isLoading={isDeleting}
      />
    </>
  );
}

export default TestCard;