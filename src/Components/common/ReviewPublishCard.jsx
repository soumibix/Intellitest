
import React from 'react';
import { FileText, CheckCircle } from 'lucide-react';

export const ReviewPublishCard = ({
  date = "Nov 10",
  time = "10:00 AM",
  title = "Machine Learning Mid-Sem Test",
  questions = 30,
  marks = 60,
  duration = "1 hour",
  department = "CST",
  semester = "05",
  fileName = "Machine_learning_midsem5.pdf",
  fileSize = "5.3MB",
  uploaderName = "Saurabh Kumbhar",
  uploadDate = "Sept 5 04:25",
  uploaderImage = "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
}) => {
  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Card Content */}
      <div className="p-6">
        {/* Date Badge */}
        <div className="inline-block mb-4">
          <span className="bg-pink-50 text-pink-600 px-4 py-2 rounded-lg text-sm font-medium">
            {date} • {time}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {title}
        </h2>

        {/* Test Details */}
        <div className="flex flex-wrap items-center gap-2 text-gray-600 text-sm mb-2">
          <span>{questions} Questions</span>
          <span>•</span>
          <span>{marks} Marks</span>
          <span>•</span>
          <span>Duration: {duration}</span>
        </div>

        {/* Department & Semester */}
        <div className="text-gray-600 text-sm space-y-1 mb-6">
          <p>Department: {department}</p>
          <p>Semester: {semester}</p>
        </div>

        {/* File Attachment */}
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* PDF Icon */}
            <div className="bg-red-500 rounded-lg p-3 flex-shrink-0">
              <FileText className="w-6 h-6 text-white" />
            </div>
            
            {/* File Info */}
            <div>
              <p className="font-medium text-gray-900 text-sm">
                {fileName}
              </p>
              <p className="text-xs text-gray-500">
                {fileSize} - uploaded
              </p>
            </div>
          </div>

          {/* Check Icon */}
          <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
        </div>
      </div>

      {/* Footer - Uploader Info */}
      <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={uploaderImage}
              alt={uploaderName}
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <span className="font-medium text-gray-900 text-sm">
              {uploaderName}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            {uploadDate}
          </span>
        </div>
      </div>
    </div>
  );
};