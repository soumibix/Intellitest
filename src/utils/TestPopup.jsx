import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle, ArrowRight, X } from 'lucide-react';

export default function TestPopup({ isOpen, onClose, onStart, testData = {} }) {
  const { title = "Machine Learning Mid-Sem Test", questions = 30, marks = 60, duration = "1 hour" } = testData;
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (!isOpen) return;
    setCountdown(10);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || countdown === 0) {
      if (countdown === 0) onStart();
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, isOpen, onStart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-6 text-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 hover:bg-white hover:bg-opacity-20 rounded-full p-1">
            <X className="w-5 h-5" />
          </button>
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
          <div className="text-center mb-6">
            <p className="text-gray-700">
              Your test will start automatically in{' '}
              <span className="inline-flex items-center justify-center text-purple-900 font-bold text-lg mx-1">
                {countdown}
              </span>{' '}
              seconds.
            </p>
          </div>

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

          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 px-6 py-3 border-2 border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-50">
              Cancel
            </button>
            <button onClick={onStart} className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 flex items-center justify-center gap-2 shadow-lg">
              Start Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}