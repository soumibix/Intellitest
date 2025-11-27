import React, { useState } from "react";
import { SquarePen, LockKeyhole, Trash2, Sparkles, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import logo from '../assets/iem.jpg';
import TestPopup from "../utils/TestPopup";
import userIcon from "../assets/purpleUser.png";
import ConfirmationModal from "../utils/ConfirmationModal";
import { useHttp } from "../Hooks/useHttps";
import { useAuth } from "../AppRouter";

function TestCard({ userType, status = "upcoming", testData = {}, onEdit, data, onDelete, onScoreGenerated }) {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isGeneratingScore, setIsGeneratingScore] = useState(false);
  const [scoreGenerated, setScoreGenerated] = useState(false); // Track if score was generated in this session
  const [localScoreData, setLocalScoreData] = useState({});
  const { token } = useAuth();

  const userData = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}');
  const httpHook = useHttp();

  const paramTestId = useParams().testId;

  console.log({testData})

  // console.log({paramTestId})
  const mergedData = { ...testData, ...data };
  const {
    _id,
    subjectName = mergedData.subjectname || "Unknown Subject",
    subjectCode = mergedData.subjectcode || "N/A",
    testCategory = mergedData.testcategory || "Test",
    department = "N/A",
    semester = "N/A",
    numberOfQuestions = mergedData.numberQuestions || 0,
    duration = "N/A",
    testDate,
    startTime,
    endTime,
    createdBy = "Faculty",
    createdAt,
    totalMarks,
    questions = [],
    obtainedScore = mergedData.obtainedScore,
    maxScore = mergedData.maxScore,
    timeTaken = mergedData.timeTaken,
    genarateScore = mergedData.genarateScore,
    studentstatus = mergedData.studentstatus
  } = mergedData;

  const actualStatus = studentstatus || status;
  
  // Check if score should be displayed (either from backend or locally generated)
  const hasScore = genarateScore || scoreGenerated;
  
  // Use local score data if available, otherwise use merged data
  const currentScoreData = scoreGenerated ? localScoreData : mergedData;
  
  // Display values with fallback to '--'
  const displayObtainedScore = currentScoreData.obtainedScore ?? obtainedScore;
  const displayMaxScore = currentScoreData.maxScore ?? maxScore;
  const displayTimeTaken = currentScoreData.timeTaken ?? timeTaken;
  
  const percentage = (displayMaxScore > 0 && displayObtainedScore !== undefined && displayObtainedScore !== null) 
    ? Math.round((displayObtainedScore / displayMaxScore) * 100) 
    : null;
  // const totalMarks = displayMaxScore || (numberOfQuestions || questions.length || 0) * 2;

  const formatDateTime = () => {
    if (!testDate || !startTime) return "Not scheduled";
    const date = new Date(testDate);
    return `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • ${startTime}`;
  };

  const handleGenerateScore = async () => {
    setIsGeneratingScore(true);
    try {
      const response = await httpHook.postReq(`student/test/submitTest/${_id}`, token, {});

      if (response.success) {
        // Use obtainedScore from response, fallback to totalScore if not available
        const obtainedScoreValue = response.obtainedScore ?? response.totalScore ?? 0;
        const totalQuestions = response.answers?.length || numberOfQuestions || questions.length || 0;
        const correctAnswers = response.answers?.filter(ans => ans.score > 0).length || 0;
        const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

        const newScoreData = {
          obtainedScore: obtainedScoreValue,
          maxScore: maxScore || totalQuestions * 10,
          timeTaken: response.timeTaken || null,
          genarateScore: true
        };

        // Update local state to show score immediately
        setLocalScoreData(newScoreData);
        setScoreGenerated(true); // Mark that score was generated locally
        
        // Notify parent component if callback exists
        onScoreGenerated?.(_id, { ...newScoreData, accuracy });
      } else {
        alert(response.message || 'Failed to generate score');
      }
    } catch (error) {
      console.error('Error generating score:', error);
      alert('An error occurred while generating score. Please try again.');
    } finally {
      setIsGeneratingScore(false);
    }
  };

  const calculateTimeRemaining = () => actualStatus === "ongoing" && endTime ? `Exam ends at ${endTime}` : null;

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

const formatDuration = (mins) => {
  if (!mins || isNaN(mins)) return "N/A";

  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;

  if (hours > 0 && minutes > 0) {
    return `${hours} hr ${minutes} min`;
  }
  if (hours > 0) {
    return `${hours} hr`;
  }
  return `${minutes} min`;
};


  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete?.(_id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting test:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const timeRemaining = calculateTimeRemaining();
  const dateTime = formatDateTime();

  return (
    <>
      <div className="w-full bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-200 p-4 sm:p-5 md:p-6 flex flex-col hover:shadow-md transition-shadow duration-200">
        {/* Header Section */}
        <div className="flex flex-col gap-3 mb-4 sm:mb-5 md:mb-6">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2 flex-1">
              <div className="bg-pink-50 text-pink-600 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap">
                {timeRemaining || dateTime}
              </div>
              <div className={`${statusStyles[actualStatus]} px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap`}>
                {actualStatus.charAt(0).toUpperCase() + actualStatus.slice(1)}
              </div>
            </div>

            {(userType === "admin" || userType === "faculty") && actualStatus === "upcoming" && (
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={onEdit} className="p-2 hover:bg-purple-50 rounded-lg transition-colors" title="Edit Test">
                  <SquarePen className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                </button>
                <button onClick={() => setShowDeleteModal(true)} className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete Test">
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                </button>
              </div>
            )}
          </div>
        </div>

        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 line-clamp-2">{subjectName}</h2>

        {/* Test Details */}
        <div className="space-y-2 mb-4 sm:mb-6 text-sm sm:text-base">
          <div className="flex flex-wrap items-center gap-2 text-gray-600">
            <span className="font-medium">{numberOfQuestions || questions.length || 0} Questions</span>
            <span className="text-gray-400">•</span>
            {/* <span className="font-medium">{(numberOfQuestions || questions.length || 0) * 2} Marks</span> */}
            <span className="font-medium">{totalMarks || maxScore} Marks</span>
            <span className="text-gray-400">•</span>
            <span>{formatDuration(duration)}</span>
          </div>
          <div className="text-gray-600"><span className="font-medium text-gray-700">Code:</span> {subjectCode}</div>
          <div className="flex flex-wrap items-center gap-2 text-gray-600">
            <span><span className="font-medium text-gray-700">Dept:</span> {department}</span>
            <span className="text-gray-400 hidden sm:inline">•</span>
            <span><span className="font-medium text-gray-700">Sem:</span> {semester}</span>
          </div>

          {/* Category */}
          <div className="text-gray-600">
            <span className="font-medium text-gray-700">Category:</span> {testCategory}
          </div>
          {/* time */}
          <div className="text-gray-600">
            <span className="font-medium text-gray-700">Time:</span> {startTime && endTime ? ` ${startTime} - ${endTime}` : 'Not given yet'}
          </div>
        </div>

        {/* Score Section for Completed Tests (User Only) */}
        {actualStatus === "completed" && userType === "user" && (
          hasScore ? (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <div className="text-purple-700 font-medium mb-1 text-xs sm:text-sm">Marks Obtained</div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-800">
                    {displayObtainedScore !== undefined && displayObtainedScore !== null ? displayObtainedScore : '--'}
                    <span className="text-base sm:text-lg md:text-xl text-gray-500"> / {totalMarks || maxScore}</span>
                  </div>
                  {/* {percentage !== null && (
                    <div className={`text-sm sm:text-base font-semibold mt-1 ${percentage >= 60 ? 'text-green-600' : percentage >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {percentage}%
                    </div>
                  )} */}
                </div>
                <div className="text-xs sm:text-sm text-gray-800 space-y-1">
                  <div>
                    <span className="font-medium text-gray-700">Time:</span> {displayTimeTaken || '--'}
                  </div>
                  {percentage !== null && (
                    <div><span className="font-medium text-gray-700">Percentage:</span> {percentage}%</div>
                  )}
                  {displayObtainedScore !== undefined && displayObtainedScore !== null && (
                    <div>
                      <span className="font-medium text-gray-700">Status:</span>
                      <span className={`font-semibold ml-1 ${percentage >= 40 ? 'text-green-600' : 'text-red-600'}`}>
                        {percentage >= 40 ? 'Passed' : 'Failed'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-4 sm:mb-6 text-center">
              <div className="mb-3">
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600 mx-auto mb-2" />
                <p className="text-sm sm:text-base text-gray-700 font-medium">Your test has been submitted successfully!</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Click below to generate your score</p>
              </div>
              <button
                onClick={handleGenerateScore}
                disabled={isGeneratingScore}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 mx-auto disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isGeneratingScore ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating Score...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Score
                  </>
                )}
              </button>
            </div>
          )
        )}

        <div className="flex-grow"></div>

        {/* Footer Section */}
        <div className="border-t border-gray-200 pt-3 sm:pt-4 mt-auto">
          {userType === "user" && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <img src={logo} alt="Institute" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 truncate">Institute of Engineering & Management</span>
                  <span className="text-xs sm:text-sm text-gray-500">{userData?.institutionName || 'Institution'}</span>
                </div>
              </div>
              <div className="w-full sm:w-auto flex-shrink-0">
                {actualStatus === "ongoing" && (
                  <button onClick={() => setShowPopup(true)} className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-medium w-full sm:w-auto text-sm sm:text-base transition-colors">
                    Start Test
                  </button>
                )}
                {actualStatus === "upcoming" && (
                  <div className="bg-gray-300 text-gray-500 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-medium cursor-not-allowed flex items-center justify-center gap-2 w-full sm:w-auto text-sm sm:text-base">
                    <LockKeyhole className="w-3 h-3 sm:w-4 sm:h-4" />
                    Start Test
                  </div>
                )}
                {actualStatus === "completed" && userType!=='user' && (
                  <button onClick={handleViewReport} className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-medium w-full sm:w-auto text-sm sm:text-base transition-colors">
                    View Report
                  </button>
                )}
              </div>
            </div>
          )}

          {(userType === "admin" || userType === "faculty") && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <img src={userIcon} alt="Creator" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-300 flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-xs sm:text-sm md:text-base font-medium text-gray-900 truncate">{createdBy?.name || 'Faculty'}</span>
                  <span className="text-xs sm:text-sm text-gray-500 font-semibold truncate">{createdBy?.designation || 'Educator'}</span>
                </div>
              </div>

              {/* View Report Button */}
              {status === "completed" && !paramTestId && (
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

      <TestPopup 
        isOpen={showPopup} 
        onClose={() => setShowPopup(false)} 
        onStart={handlePopupStart} 
        testData={{ title: subjectName, questions: numberOfQuestions || questions.length, marks: totalMarks, duration: `${duration} minutes` }} 
        _id={_id}
      />

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