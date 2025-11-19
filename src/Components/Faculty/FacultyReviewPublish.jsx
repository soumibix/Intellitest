// Updated FacultyReviewPublish.jsx
import React from 'react';
import FinalPreviewPublish from '../common/TestPublish/FinalPreviewPublish';
import GeneratedQA from '../common/TestPublish/GeneratedQA';

const FacultyReviewPublish = ({ testData, testId, httpHook, token, setTestData }) => {
  console.log(testData)
  return (
    <div className="space-y-6">
      <FinalPreviewPublish testData={testData} />
      <GeneratedQA 
        testData={testData}
        testId={testId}
        httpHook={httpHook}
        token={token}
        setTestData={setTestData}
      />
    </div>
  );
};

export default FacultyReviewPublish;