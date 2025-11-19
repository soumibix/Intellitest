// Updated GeneratedQA.jsx
import React, { useState } from 'react';
import { SquarePen, Calendar, X, Check } from 'lucide-react';
import { TestAPI } from '../../../apis/Tests/TestCRUD';

const GeneratedQA = ({ testData, testId, httpHook, token, setTestData }) => {
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editedAnswer, setEditedAnswer] = useState('');
  const [editedScore, setEditedScore] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  if (!testData || !testData.questions) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <p className="text-gray-500">No questions data available</p>
      </div>
    );
  }

  const handleEditClick = (question) => {
    setEditingQuestion(question._id);
    setEditedAnswer(question.answer);
    setEditedScore(question.score);
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
      // Update local state
      const updatedQuestions = testData.questions.map(q =>
        q._id === questionId
          ? { ...q, answer: editedAnswer, score: parseInt(editedScore) }
          : q
      );
      
      setTestData({ ...testData, questions: updatedQuestions });
      setEditingQuestion(null);
      alert('Question updated successfully!');
    } else {
      alert('Failed to update question: ' + response.message);
    }
    
    setIsUpdating(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
      <div className="text-2xl sm:text-3xl font-semibold pb-5">
        Questions and Answers
      </div>

      <div className="space-y-6">
        {testData.questions.map((q, index) => (
          <div
            key={q._id || index}
            className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 sm:p-6 border border-purple-100 hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
              <div className="flex items-start gap-4 w-full sm:w-auto">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-purple-200 rounded-full text-purple-700 font-semibold text-lg">
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
                  />
                ) : (
                  <span className="bg-purple-200 text-purple-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm sm:text-sm font-semibold whitespace-nowrap">
                    {q.score} marks
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
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-md"
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

export default GeneratedQA;