import React from 'react';
import { SquarePen, LockKeyhole } from 'lucide-react';

function TestCard({
  userType = 'admin', // 'user' or 'admin'
  status = 'upcoming', // 'ongoing', 'upcoming', or 'completed'
  testData = {},
  onViewReport,
  onEdit,
  onStartTest
}) {
  const {
    dateTime = 'Nov 10 • 10:00 AM',
    title = 'Machine Learning Mid-Sem Test',
    questions = 30,
    marks = 60,
    duration = '1 hour',
    department = 'CST',
    semester = '05',
    createdBy = 'Saurabh Kumbhar',
    createdDate = 'Sept 5 04:25',
    avatarSeed = 'Saurabh',
    timeRemaining = '58:07 mins remaining',
    marksObtained = null,
    totalMarks = 60,
    timeTaken = null,
    accuracy = null
  } = testData;

  // Determine status colors
  const getStatusStyle = () => {
    switch(status) {
      case 'ongoing':
        return 'bg-green-50 text-green-600';
      case 'upcoming':
        return 'bg-blue-50 text-blue-600';
      case 'completed':
        return 'bg-red-50 text-red-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  const getStatusText = () => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-sm border border-gray-200 p-6 flex flex-col">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="bg-pink-50 text-pink-600 px-4 py-2 rounded-xl text-sm font-medium">
            {status === 'ongoing' ? timeRemaining : dateTime}
          </div>
          <div className={`${getStatusStyle()} px-4 py-2 rounded-xl text-sm font-medium`}>
            {getStatusText()}
          </div>
        </div>
        
        {/* Conditional Edit Button - Only for admin on ongoing/upcoming */}
        {userType === 'admin' && (status === 'ongoing' || status === 'upcoming') && (
          <button 
            onClick={onEdit}
            className="p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
          >
            <SquarePen className="w-6 h-6 text-purple-600" />
          </button>
        )}
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-900 text-left mb-4">
        {title}
      </h2>

      {/* Test Details */}
      <div className="flex items-center gap-3 text-gray-600 mb-2">
        <span className="text-base">{questions} Questions</span>
        <span className="text-gray-400">•</span>
        <span className="text-base">{marks} Marks</span>
        <span className="text-gray-400">•</span>
        <span className="text-base">Duration: {duration}</span>
      </div>

      {/* Department and Semester */}
      <div className="text-gray-600 text-left mb-2">
        <span className="text-base">Department: {department}</span>
      </div>
      <div className="text-gray-600 text-left mb-6">
        <span className="text-base">Semester: {semester}</span>
      </div>

      {/* User Marks Section - Only for user on completed tests */}
      {userType === 'user' && status === 'completed' && marksObtained !== null && (
        <div className="bg-purple-50 rounded-2xl p-4 mb-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-gray-600 text-sm mb-1">Marks Obtained:</div>
              <div className="text-3xl font-bold text-purple-600">
                {marksObtained}<span className="text-lg text-gray-500">/{totalMarks}</span>
              </div>
            </div>
            {timeTaken && (
              <div>
                <div className="text-gray-600 text-sm mb-1">Time Taken:</div>
                <div className="text-lg font-semibold text-gray-900">{timeTaken}</div>
              </div>
            )}
            {accuracy && (
              <div>
                <div className="text-gray-600 text-sm mb-1">Accuracy:</div>
                <div className="text-lg font-semibold text-gray-900">{accuracy}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-gray-200 mb-4 mt-auto"></div>

      {/* Footer - Creator Info and Action Buttons */}
      <div className="w-full flex justify-between items-center gap-4">
        {/* Check if any button will be shown */}
        {((userType === 'user' && (status === 'ongoing' || status === 'upcoming')) || status === 'completed') ? (
          <>
            {/* When buttons are present - show name and date in flex-col */}
            <div className="flex items-center gap-3">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`}
                alt={createdBy}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-base font-medium text-gray-900">
                  {createdBy}
                </span>
                <span className="text-gray-500 text-sm font-bold">{createdDate}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Start Test Button - For user on ongoing tests (enabled) */}
              {userType === 'user' && status === 'ongoing' && (
                <button
                  onClick={onStartTest}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl font-medium transition-colors"
                >
                  Start Test
                </button>
              )}

              {/* Start Test Button - For user on upcoming tests (locked/disabled) */}
              {userType === 'user' && status === 'upcoming' && (
                <button
                  disabled
                  className="bg-gray-300 text-gray-500 px-6 py-2 rounded-xl font-medium cursor-not-allowed flex items-center gap-2"
                >
                  <LockKeyhole className="w-4 h-4" />
                  Start Test
                </button>
              )}
              
              {/* View Report Button - For user on completed tests OR admin on completed tests */}
              {status === 'completed' && (
                <button
                  onClick={onViewReport}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl font-medium transition-colors"
                >
                  View Report
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            {/* When no buttons - show image+name on left, date on right */}
            <div className="flex items-center gap-3">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`}
                alt={createdBy}
                className="w-10 h-10 rounded-full"
              />
              <span className="text-base font-medium text-gray-900">
                {createdBy}
              </span>
            </div>
            
            <span className="text-gray-500 text-sm font-bold">{createdDate}</span>
          </>
        )}
      </div>
    </div>
  );
}


export default TestCard;