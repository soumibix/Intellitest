import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle, ArrowRight, X, CheckCircle } from 'lucide-react';
import { useHttp } from '../Hooks/useHttps';

export default function TestPopup({ isOpen, _id, onClose, onStart, testData = {} }) {
  const { title = "Machine Learning Mid-Sem Test", questions = 30, marks = 60, duration = "1 hour" } = testData;
  const [countdown, setCountdown] = useState(10);
  const [testStatus, setTestStatus] = useState({ checked: false, alreadyStarted: false, timeRemaining: 0 });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const { postReq } = useHttp();

  useEffect(() => {
    console.log(token)
  }, [onStart])

  useEffect(() => {
    if (!isOpen) return;
    setCountdown(10);
    checkTestStatus();
  }, [isOpen]);

  const checkTestStatus = async () => {
    setLoading(true);
    try {
      const startTestResponse = await postReq(`student/test/checktest/${_id}`, token);
      console.log('Start Test Response:', startTestResponse);

      if (startTestResponse?.data || startTestResponse?.success || startTestResponse?.timing) {
        let remainingSeconds = 0;
        if (startTestResponse.data) {
          const { starttime, endtime, uploadedAnswerSheet } = startTestResponse.data;

          // Calculate remaining time
          const currentTime = new Date();
          const endTime = new Date(endtime);
          remainingSeconds = Math.max(0, Math.floor((endTime - currentTime) / 1000));

          console.log('Time Remaining (seconds):', remainingSeconds);
        }
        else if(startTestResponse.timing){
          remainingSeconds = startTestResponse.timing;
        }


        // Check if test was already started AND has time remaining
        // Only block if time > 0
        if (remainingSeconds <= 0) {
          setTestStatus({
            checked: true,
            alreadyStarted: true,
            timeRemaining: remainingSeconds
          });
        } else {
          // Time is 0 or test not started - allow user to proceed
          setTestStatus({
            checked: true,
            alreadyStarted: false,
            timeRemaining: 0
          });
        }
      }
    } catch (error) {
      console.log('Error checking test status:', error);
      setTestStatus({
        checked: true,
        alreadyStarted: false,
        timeRemaining: 0
      });
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (!isOpen || countdown === 0) {
  //     if (countdown === 0) onStart();
  //     return;
  //   }
  //   const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
  //   return () => clearTimeout(timer);
  // }, [countdown, isOpen, onStart]);

  if (!isOpen) return null;

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className="fixed inset-0 bg-[#000000b4] bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-6 text-center relative">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <div className="flex items-center justify-center gap-4 text-sm opacity-90">
            <span><span className="font-semibold">{questions}</span> Questions</span>
            <span>•</span>
            <span><span className="font-semibold">{marks}</span> Marks</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span className="font-semibold">{duration}</span>
            </span>
          </div>
        </div>

        <div className="p-8">
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-purple-600 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Checking test status...</p>
            </div>
          ) : (
            <>
              {/* <div className="text-center mb-6">
                <p className="text-gray-700">
                  Your test will start automatically in{' '}
                  <span className="inline-flex items-center justify-center text-purple-900 font-bold text-lg mx-1">
                    {countdown}
                  </span>{' '}
                  seconds.
                </p>
              </div> */}

              {testStatus.alreadyStarted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h3 className="text-lg font-semibold text-green-900">Test Already Submitted</h3>
                  </div>
                  <p className="text-green-800 mb-2">
                    You have already submitted this test. The test is currently active for others who have not submitted yet.
                  </p>
                  <p className="text-sm text-green-700 mt-3">
                    Please continue your test from where you left off, or contact your instructor if you're experiencing issues.
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-8 text-sm text-gray-600">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2"></div>
                      <p>Please ensure a stable internet connection before proceeding.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2"></div>
                      <p>Once started, the timer cannot be paused.</p>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <p className="text-sm text-amber-800">
                      Make sure you're ready before starting. The test cannot be paused once begun.
                    </p>
                  </div>
                </>
              )}

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 cursor-pointer py-3 border-2 border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                >
                  {testStatus.alreadyStarted ? 'Close' : 'Cancel'}
                </button>
                <button
                  onClick={onStart}
                  disabled={testStatus.alreadyStarted}
                  className={`flex-1 px-6 cursor-pointer py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${testStatus.alreadyStarted
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800'
                    }`}
                >
                  {testStatus.alreadyStarted ? 'Already Submitted' : 'Start Now'}
                  {!testStatus.alreadyStarted && <ArrowRight className="w-5 h-5" />}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}