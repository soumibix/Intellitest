import React, { useState } from "react";
import FileUploader from "../common/FileUploader";

export function FacultyUploadQuestions ({ questionFile, setQuestionFile, answerFile, setAnswerFile, questionFileUrl, answerFileUrl }) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold mb-4">Upload Exam Question Paper</h2>
                <FileUploader 
                    onFileSelect={setQuestionFile}
                    uploadedFileUrl={questionFileUrl}
                />
            </div>
            
            <div>
                <h2 className="text-2xl font-semibold mb-4">Upload Exam Answer Paper (Optional)</h2>
                <FileUploader 
                    onFileSelect={setAnswerFile}
                    uploadedFileUrl={answerFileUrl}
                />
            </div>
        </div>
    );
};