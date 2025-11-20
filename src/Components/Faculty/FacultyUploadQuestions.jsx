import React, { useState } from "react";
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
          Upload Exam Answer Paper (Optional) OR, Click Save & Continue to Generate AI answers
        </h2>

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