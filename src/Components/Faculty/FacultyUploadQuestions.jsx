import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import FileUploader from "../common/FileUploader";

export function FacultyUploadQuestions({
  questionFile,
  setQuestionFile,
  answerFile,
  setAnswerFile,
  questionFileUrl,
  answerFileUrl,
  questionFileName,
  answerFileName,
  setQuestionFileUrl,
  setAnswerFileUrl,
  onDeleteFile,
  testId
}) {
  return (
    <div className="space-y-8">
      {/* Question Paper Upload */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Upload Exam Question Paper
        </h2>
        <FileUploader
          onFileSelect={setQuestionFile}
          uploadedFileUrl={questionFileUrl}
          setFileUrl={setQuestionFileUrl}
          fileName={questionFileName}
          onDelete={() => onDeleteFile("question")}
        />
      </div>

      {/* Answer Paper Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Upload Exam Answer Paper
          <span className="text-gray-500 font-normal text-base ml-2">(Optional)</span>
        </h2>

        {/* AI Generation Highlight Box */}
        <div className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-700 font-medium">
                <span className="text-purple-700 font-semibold">Pro Tip:</span> Skip manual upload and let AI generate answers automatically!
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Simply click <span className="font-semibold text-purple-600">"Save & Continue"</span> without uploading an answer sheet, and our AI will generate comprehensive answers based on your question paper.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full gap-6">
          <FileUploader
            onFileSelect={setAnswerFile}
            uploadedFileUrl={answerFileUrl}
            setFileUrl={setAnswerFileUrl}
            fileName={answerFileName}
            onDelete={() => onDeleteFile("answer")}
          />
        </div>
      </div>
    </div>
  );
}