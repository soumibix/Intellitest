import React from 'react';
import { CheckCircle, Flag } from 'lucide-react';

const QuestionCard = ({ question, onStatusChange }) => {
    const handleMarkAsDone = () => {
        onStatusChange(question.id, 'markedAsDone', !question.markedAsDone);
        if (!question.markedAsDone && question.markedForReview) {
            onStatusChange(question.id, 'markedForReview', false);
        }
    };

    const handleMarkForReview = () => {
        onStatusChange(question.id, 'markedForReview', !question.markedForReview);
        if (!question.markedForReview && question.markedAsDone) {
            onStatusChange(question.id, 'markedAsDone', false);
        }
    };

    return (
        <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200 hover:border-purple-300 transition-colors">
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-semibold">
                            Q{question.number}
                        </span>
                        <span className="text-xs text-gray-500">
                            {question.score} {question.score === 1 ? 'Mark' : 'Marks'}
                        </span>
                    </div>
                    <p className="text-gray-800 text-sm leading-relaxed">
                        {question.question}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                <button
                    onClick={handleMarkAsDone}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                        question.markedAsDone
                            ? 'bg-green-100 text-green-700 border border-green-300'
                            : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-green-50'
                    }`}
                >
                    <CheckCircle size={14} />
                    {question.markedAsDone ? 'Done' : 'Mark as Done'}
                </button>

                <button
                    onClick={handleMarkForReview}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                        question.markedForReview
                            ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                            : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-yellow-50'
                    }`}
                >
                    <Flag size={14} />
                    {question.markedForReview ? 'Marked for Review' : 'Mark for Review'}
                </button>
            </div>
        </div>
    );
};

export default QuestionCard;