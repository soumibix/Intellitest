import React, { useState } from "react";
import { UploadQuestions } from "../../Components/Admin/UploadQuestions";
import ScheduleTest from "../../Components/Admin/ScheduleTest";
import ReviewPublish from "../../Components/Admin/ReviewPublish";
import { ProgressiveStepper } from "../../Components/Admin/ProgressiveStepper ";
import { AddTestData } from "../../Components/Admin/AddTestData";
import AllTest from "../../Components/AllTest";
import Button from "../../Components/common/Button";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const TestDetails = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleSaveAndContinue = (nextStep) => {
    setActiveStep(nextStep);
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // Render the appropriate component based on active step
  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return <AddTestData />;
      case 2:
        return <UploadQuestions />;
      case 3:
        return <ScheduleTest />;
      case 4:
        return <ReviewPublish />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-10">
      <ProgressiveStepper
        activeStep={activeStep}
        onSaveAndContinue={handleSaveAndContinue}
      />

      {activeStep > 0 && (
        <div className="mx-auto bg-white rounded-lg shadow-md p-8 mt-0 animate-slideIn">
          {/* Dynamic Content Based on Active Step */}
          <div className="mb-8">{renderStepContent()}</div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            {activeStep > 1 && (
              <Button
                onClick={handleBack}
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded transition-all duration-300 flex items-center gap-2"
                text="Back"
                padding="px-5 py-3"
                icon={<ArrowLeft />}
                color="#631891"
                textSize="text-sm"
                iconPosition="left"
              />
            )}

            <div className="ml-auto flex gap-3">
              <button
                onClick={handleReset}
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-6 py-2 rounded transition-all duration-300"
              >
                Cancel
              </button>

              {activeStep < 4 ? (
                <Button
                  onClick={() => handleSaveAndContinue(activeStep + 1)}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded transition-all duration-300 flex items-center gap-2"
                  text="Save & Continue"
                  padding="px-5 py-3"
                  icon={<ArrowRight />}
                  color="#631891"
                  textSize="text-md"
                  iconPosition="right"
                />
              ) : (
                <Button
                  onClick={handleReset}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded transition-all duration-300 flex items-center gap-2"
                  text="Publish Test"
                  padding="px-5 py-3"
                  color="#631891"
                  textSize="text-md"
                />
                // <button
                //   onClick={handleReset}
                //   className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded transition-all duration-300"
                // >
                //   Publish Test
                // </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* All Tests Section */}
      {activeStep === 0 && (
        <div className="w-full mt-10 bg-white rounded-lg shadow-md p-8">
          <AllTest userType="admin"/>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TestDetails;
