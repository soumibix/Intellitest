// Updated GeneratedQA.jsx
import React, { useState } from 'react';
import { SquarePen, Calendar, X, Check, AlertTriangle } from 'lucide-react';
import { TestAPI } from '../../../apis/Tests/TestCRUD';
import { useNotification  } from '../../../Context/NotificationContext';

const GeneratedQA = ({ testData, testId, httpHook, token, setTestData }) => {
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editedAnswer, setEditedAnswer] = useState('');
  const [editedScore, setEditedScore] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const { showSuccess, showError} = useNotification ();

  if (!testData || !testData?.questions) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <p className="text-gray-500">No questions data available</p>
      </div>
    );
  }

  // Check if all questions have marks assigned (score > 0)
  const allMarksAssigned = testData.questions.every(q => q.score && q.score > 0);
  const questionsWithoutMarks = testData.questions.filter(q => !q.score || q.score <= 0).length;

  const handleEditClick = (question) => {
    setEditingQuestion(question._id);
    setEditedAnswer(question.answer);
    setEditedScore(question.score || '');
  };

  const handleCancelEdit = () => {
    setEditingQuestion(null);
    setEditedAnswer('');
    setEditedScore('');
  };

  const handleSaveEdit = async (questionId) => {
    setIsUpdating(true);
    
    const payload = {
      answer: editedAnswer,
      score: parseInt(editedScore)
    };

    const response = await TestAPI.updateQuestion(
      httpHook,
      testId,
      questionId,
      payload,
      token
    );

    if (response.success) {
      const updatedQuestions = testData.questions.map(q =>
        q._id === questionId
          ? { ...q, answer: editedAnswer, score: parseInt(editedScore) }
          : q
      );
      
      setTestData({ ...testData, questions: updatedQuestions });
      setEditingQuestion(null);
      showSuccess('Question updated successfully!');
      // alert('Question updated successfully!');
    } else {
      // alert('Failed to update question: ' + response.message);
      showError('Failed to update question: ' + response.message);
    }
    
    setIsUpdating(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
        <div className="text-2xl sm:text-3xl font-semibold">
          Questions and Answers
        </div>
        
        {/* Animated Alert Banner */}
        <div className={`
          relative overflow-hidden
          flex items-center gap-3 
          px-4 py-3 rounded-xl
          ${allMarksAssigned 
            ? 'bg-green-50 border-2 border-green-300' 
            : 'bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-400'
          }
          shadow-lg
          ${!allMarksAssigned ? 'animate-pulse' : ''}
        `}>
          {/* Animated background glow for unassigned marks */}
          {!allMarksAssigned && (
            <div className="absolute inset-0 bg-gradient-to-r from-amber-200/30 via-orange-200/50 to-amber-200/30 animate-[shimmer_2s_infinite]" 
                 style={{
                   backgroundSize: '200% 100%',
                   animation: 'shimmer 2s infinite linear'
                 }}
            />
          )}
          
          <div className={`
            relative z-10 flex items-center justify-center 
            w-10 h-10 rounded-full
            ${allMarksAssigned ? 'bg-green-500' : 'bg-amber-500'}
            ${!allMarksAssigned ? 'animate-bounce' : ''}
          `}>
            {allMarksAssigned ? (
              <Check className="w-5 h-5 text-white" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-white" />
            )}
          </div>
          
          <div className="relative z-10 flex flex-col">
            <span className={`
              font-bold text-sm
              ${allMarksAssigned ? 'text-green-700' : 'text-amber-800'}
            `}>
              {allMarksAssigned ? '✓ All Marks Assigned!' : '⚠️ Action Required!'}
            </span>
            <span className={`
              text-xs
              ${allMarksAssigned ? 'text-green-600' : 'text-amber-700'}
            `}>
              {allMarksAssigned 
                ? 'You can now publish the test' 
                : `Assign marks to ${questionsWithoutMarks} question${questionsWithoutMarks > 1 ? 's' : ''} to publish`
              }
            </span>
          </div>

          {!allMarksAssigned && (
            <div className="relative z-10 ml-2">
              <span className="flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Add custom keyframes for shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      <div className="space-y-6">
        {testData.questions.map((q, index) => (
          <div
            key={q._id || index}
            className={`
              bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 sm:p-6 
              border-2 transition-all duration-300
              ${(!q.score || q.score <= 0) 
                ? 'border-amber-400 ring-2 ring-amber-200 shadow-amber-100' 
                : 'border-purple-100 hover:shadow-md'
              }
            `}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
              <div className="flex items-start gap-4 w-full sm:w-auto">
                <div className={`
                  flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 
                  rounded-full font-semibold text-lg
                  ${(!q.score || q.score <= 0) 
                    ? 'bg-amber-200 text-amber-700' 
                    : 'bg-purple-200 text-purple-700'
                  }
                `}>
                  {index + 1}
                </div>

                <h3 className="text-gray-800 font-medium text-base sm:text-lg leading-snug">
                  {q.question}
                </h3>
              </div>

              <div className="flex items-center gap-3 self-start sm:self-auto">
                {editingQuestion === q._id ? (
                  <input
                    type="number"
                    value={editedScore}
                    onChange={(e) => setEditedScore(e.target.value)}
                    className="w-20 px-3 py-1.5 border-2 border-purple-300 rounded-full text-center font-semibold"
                    placeholder="Score"
                    min="1"
                  />
                ) : (
                  <span className={`
                    px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm font-semibold whitespace-nowrap
                    ${(!q.score || q.score <= 0) 
                      ? 'bg-amber-200 text-amber-700 animate-pulse' 
                      : 'bg-purple-200 text-purple-700'
                    }
                  `}>
                    {(!q.score || q.score <= 0) ? '⚠️ No marks' : `${q.score} marks`}
                  </span>
                )}

                {editingQuestion === q._id ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSaveEdit(q._id)}
                      disabled={isUpdating}
                      className="w-9 h-9 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-md"
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      disabled={isUpdating}
                      className="w-9 h-9 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-md"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEditClick(q)}
                    className={`
                      w-9 h-9 sm:w-10 sm:h-10 text-white rounded-full 
                      flex items-center justify-center transition-colors duration-200 shadow-md
                      ${(!q.score || q.score <= 0) 
                        ? 'bg-amber-500 hover:bg-amber-600 animate-bounce' 
                        : 'bg-purple-600 hover:bg-purple-700'
                      }
                    `}
                  >
                    <SquarePen size={18} />
                  </button>
                )}
              </div>
            </div>

            <div className="mt-2 sm:mt-4 sm:pl-16">
              {editingQuestion === q._id ? (
                <textarea
                  value={editedAnswer}
                  onChange={(e) => setEditedAnswer(e.target.value)}
                  className="w-full p-3 border-2 border-purple-300 rounded-lg text-gray-700 text-sm sm:text-base"
                  rows="6"
                  placeholder="Enter answer..."
                />
              ) : (
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {q.answer}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export the helper function to check if all marks are assigned
export const checkAllMarksAssigned = (testData) => {
  if (!testData || !testData.questions) return false;
  return testData.questions.every(q => q.score && q.score > 0);
};

export default GeneratedQA;