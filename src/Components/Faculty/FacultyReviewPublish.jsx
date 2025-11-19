import React from 'react'
import { ReviewPublishCard } from '../common/ReviewPublishCard';
import FinalPreviewPublish from '../common/TestPublish/FinalPreviewPublish';
import GeneratedQA from '../common/TestPublish/GeneratedQA';

const FacultyReviewPublish = () => {
  return (
    <div className="space-y-6">
      {/* <ReviewPublishCard /> */}
      <FinalPreviewPublish />
      <GeneratedQA />
    </div>
  );
};

export default FacultyReviewPublish