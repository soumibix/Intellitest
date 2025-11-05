import React, { useState, useCallback, memo } from 'react';
import { CheckCircle, Flag, Clock, Upload, FileText, Calendar, AlertCircle } from 'lucide-react';

// Memoized Question Card Component
const QuestionCard = memo(({ question, onStatusChange }) => {
  const { id, questionText, marks, markedAsDone, markedForReview } = question;

  const handleMarkAsDone = useCallback(() => {
    onStatusChange(id, 'markedAsDone', !markedAsDone);
  }, [id, markedAsDone, onStatusChange]);

  const handleMarkForReview = useCallback(() => {
    onStatusChange(id, 'markedForReview', !markedForReview);
  }, [id, markedForReview, onStatusChange]);

  return (
    <div className="bg-white rounded-lg p-4 mb-3 flex items-start gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-gray-600 font-medium text-sm">
        {id}
      </div>
      
      <div className="flex-1">
        <p className="text-gray-800 text-sm mb-3">{questionText}</p>
        
        <div className="flex gap-2">
          <button
            onClick={handleMarkAsDone}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
              markedAsDone
                ? 'bg-green-500 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <CheckCircle size={14} />
            Mark as Done
          </button>

          <button
            onClick={handleMarkForReview}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
              markedForReview
                ? 'bg-yellow-400 text-gray-800'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Flag size={14} />
            Mark for Review
          </button>
        </div>
      </div>

      <span className="flex-shrink-0 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
        {marks} marks
      </span>
    </div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.question.id === nextProps.question.id &&
    prevProps.question.markedAsDone === nextProps.question.markedAsDone &&
    prevProps.question.markedForReview === nextProps.question.markedForReview
  );
});

export default QuestionCard