import React from 'react';
import { SquarePen } from 'lucide-react';

function TestCard() {
  return (
    <div className="w-full max-w-lg bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="bg-pink-50 text-pink-600 px-4 py-2 rounded-xl text-sm font-medium">
            Nov 10 • 10:00 AM
          </div>
          <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-sm font-medium">
            Upcoming
          </div>
        </div>
        <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
          <SquarePen className="w-6 h-6 text-purple-600" />
        </button>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-900  text-left mb-4">
        Machine Learning Mid-Sem Test
      </h2>

      {/* Test Details */}
      <div className="flex items-center gap-3 text-gray-600 mb-2 text-xl">
        <span className="text-base">30 Questions</span>
        <span className="text-gray-400">•</span>
        <span className="text-base">60 Marks</span>
        <span className="text-gray-400">•</span>
        <span className="text-base">Duration: 1 hour</span>
      </div>

      {/* Department and Semester */}
      <div className="text-gray-600 text-left mb-2 ">
        <span className="text-base">Department: CST</span>
      </div>
      <div className="text-gray-600 text-left mb-6">
        <span className="text-base">Semester: 05</span>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mb-4"></div>

      {/* Footer - Creator Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Saurabh"
            alt="Saurabh Kumbhar"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-base font-medium text-gray-900">
            Saurabh Kumbhar
          </span>
        </div>
        <span className="text-gray-500 text-xl">Sept 5 04:25</span>
      </div>
    </div>
  );
}

export default TestCard;