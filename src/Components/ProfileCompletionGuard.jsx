// src/components/ProfileCompletionGuard.jsx
import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';

const ProfileCompletionGuard = ({ children }) => {
  const [isProfileIncomplete, setIsProfileIncomplete] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Check sessionStorage for user data
    const checkProfileCompletion = () => {
      try {
        const userDataString = sessionStorage.getItem('user');
        
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setUserInfo(userData);
          
          // Check if allFieldsComplete is false
          if (userData.allFieldsComplete === false) {
            setIsProfileIncomplete(true);
          } else {
            setIsProfileIncomplete(false);
          }
        }
      } catch (error) {
        console.error('Error parsing user data from sessionStorage:', error);
      }
    };

    // Initial check
    checkProfileCompletion();

    // Set up interval to periodically check for changes
    const intervalId = setInterval(checkProfileCompletion, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Lock Overlay - Covers Everything */}
      {isProfileIncomplete && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/95 backdrop-blur-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center border-2 border-purple-100">
            {/* Lock Icon */}
            <div className="mb-6 flex justify-center">
              <div className="bg-purple-100 rounded-full p-6 animate-pulse">
                <Lock className="w-16 h-16 text-purple-600" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Complete Your Profile
            </h2>

            {/* Message */}
            <p className="text-gray-600 mb-6">
              Please complete all required fields in your profile to access the dashboard and other features.
            </p>

            {/* User Info */}
            {userInfo && (
              <div className="bg-purple-50 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-semibold">Name:</span> {userInfo.name}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Email:</span> {userInfo.email}
                </p>
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={() => {
                // Navigate to profile completion page
                window.location.href = '/user/dashboard';
              }}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Complete Profile Now
            </button>

            {/* Additional Info */}
            <p className="text-xs text-gray-500 mt-4">
              🔒 Dashboard access is locked until profile completion
            </p>
          </div>
        </div>
      )}

      {/* Main Content - Hidden when profile incomplete */}
      <div className={isProfileIncomplete ? 'hidden' : ''}>
        {children}
      </div>
    </div>
  );
};

export default ProfileCompletionGuard;