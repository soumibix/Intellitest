import React, { useState } from "react";
import FileUploader from "../common/FileUploader";

export const FacultyUploadQuestions = () => {
  const [file, setFile] = useState(null);

  return (
    <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Upload Exam Question Paper</h2>
        <FileUploader />
        
        <h2 className="text-2xl font-semibold">Upload Exam Answer Paper (Optional)</h2>
        <FileUploader />
    </div>
  );
};