import React, { useState, useCallback, memo } from 'react';
import { CheckCircle, Flag, Clock, Upload, FileText, Calendar, AlertCircle } from 'lucide-react';
import QuestionCard from '../../Components/User/QuestionCard';



// Main Questions Page Component
const UserIndividualTest = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      questionText: 'Explain the working principle of the k-Nearest Neighbors (k-NN) algorithm with an example.',
      marks: 10,
      markedAsDone: false,
      markedForReview: false
    },
    {
      id: 2,
      questionText: 'Explain the working principle of the k-Nearest Neighbors (k-NN) algorithm with an example.',
      marks: 10,
      markedAsDone: false,
      markedForReview: false
    },
    {
      id: 3,
      questionText: 'Explain the working principle of the k-Nearest Neighbors (k-NN) algorithm with an example.',
      marks: 10,
      markedAsDone: false,
      markedForReview: false
    },
    {
      id: 4,
      questionText: 'Explain the working principle of the k-Nearest Neighbors (k-NN) algorithm with an example.',
      marks: 10,
      markedAsDone: false,
      markedForReview: false
    },
    {
      id: 5,
      questionText: 'Explain the working principle of the k-Nearest Neighbors (k-NN) algorithm with an example.',
      marks: 10,
      markedAsDone: false,
      markedForReview: false
    }
  ]);

  const handleStatusChange = useCallback((questionId, field, value) => {
    setQuestions(prevQuestions => 
      prevQuestions.map(q => 
        q.id === questionId 
          ? { ...q, [field]: value }
          : q
      )
    );
    console.log(`Updated Question ${questionId}: ${field} = ${value}`);
  }, []);

  const stats = {
    done: questions.filter(q => q.markedAsDone).length,
    review: questions.filter(q => q.markedForReview).length,
    pending: questions.filter(q => !q.markedAsDone && !q.markedForReview).length,
    total: questions.length
  };

  const progressPercentage = ((stats.done / stats.total) * 100).toFixed(0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">IEMK</span>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 text-sm">Institute of Engineering & Management, Salt Lake</h2>
              <p className="text-xs text-gray-500">Salt Lake Electronics Complex, Kolkata</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-purple-600 text-sm font-medium hover:bg-purple-50 rounded">
              See Progress
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded hover:bg-purple-700 flex items-center gap-2">
              Submit
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Machine Learning Test</h1>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5">
                  <FileText size={16} />
                  50 Questions
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle size={16} />
                  50 Marks
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs mb-1 opacity-90 flex items-center justify-end gap-1.5">
                <Clock size={14} />
                Time Left
              </div>
              <div className="text-4xl font-bold">01:59:57</div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions Banner */}
      <div className="">
        <div className="mx-auto">
          <p className="text-sm text-purple-900">
            <span className="font-semibold">Instructions:</span> Write your answers on paper. Number them clearly as per the question below, and upload a single PDF containing all your answers. Ensure your answer sheet is legible and all pages are included in the correct order.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className=" mx-auto px-6 py-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Questions */}
          <div className="col-span-2">
            {/* Progress Bar */}
            <div className=" rounded-lg p-5 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Questions Progress</h3>
                <span className="text-sm text-gray-600">{stats.done} / {stats.total} answered</span>
              </div>
              
              <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
                <div 
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 via-yellow-400 to-orange-400 transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="text-gray-700">Done {stats.done}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flag size={16} className="text-yellow-500" />
                  <span className="text-gray-700">Review {stats.review}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-orange-500" />
                  <span className="text-gray-700">Pending {stats.pending}</span>
                </div>
              </div>
            </div>

            {/* Questions List */}
            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Questions</h3>
              {questions.map(question => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Upload Section */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg p-5 mb-4 sticky top-6">
              <h3 className="font-semibold text-gray-900 mb-4">Upload Your Answer Sheet</h3>
              
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-green-50 mb-4">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <FileText className="text-red-500" size={32} />
                  <div className="flex gap-2">
                    <CheckCircle className="text-green-500" size={20} />
                    <CheckCircle className="text-green-500" size={20} />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">ExamAnswer_mca-3rd-4th.pdf</p>
                <p className="text-xs text-gray-500">Uploaded Successfully</p>
              </div>

              {/* Upload Checklist */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 text-sm mb-3">Upload Checklist</h4>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
                    <span className="text-sm text-gray-700">Upload Status</span>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-0.5">
                      <AlertCircle className="text-orange-500" size={16} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 font-medium">Deadline Reminder</p>
                      <p className="text-xs text-gray-500">Upload by: Dec 10, 2025, 11:59 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <FileText className="text-gray-400 flex-shrink-0 mt-0.5" size={16} />
                    <div>
                      <p className="text-sm text-gray-700 font-medium">File Size Limit</p>
                      <p className="text-xs text-gray-500">Maximum 10 MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserIndividualTest;