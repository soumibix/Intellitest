import React from 'react';

// Create Test Banner Component
export const CreateTestBanner = ({ onCreateClick }) => (
  <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Create New Test — Begin with Basic Details
        </h2>
        <p className="text-gray-600 text-sm">
          Fill in the necessary information to start building your test.
        </p>
      </div>
      <button
        onClick={onCreateClick}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors cursor-pointer"
      >
        Create New Test
        <span className="text-xl">+</span>
      </button>
    </div>
  </div>
);