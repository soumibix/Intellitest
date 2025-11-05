import React from 'react'

const ReviewPublish = () => {
  return (
    <div className="space-y-6">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-purple-900 mb-4">Test Summary</h3>
        <div className="space-y-2 text-sm">
          <p><span className="font-medium">Department:</span> Computer Science and Technology</p>
          <p><span className="font-medium">Semester:</span> 5th Semester</p>
          <p><span className="font-medium">Subject:</span> Machine Learning</p>
          <p><span className="font-medium">Test Type:</span> Objective</p>
          <p><span className="font-medium">Questions:</span> 50</p>
          <p><span className="font-medium">Duration:</span> 60 minutes</p>
        </div>
      </div>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          ⚠️ Please review all details carefully before publishing. Once published, some details cannot be changed.
        </p>
      </div>
    </div>
  );
};

export default ReviewPublish