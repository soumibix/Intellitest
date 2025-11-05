import React, { useState } from 'react'
import { ProgressiveStepper } from '../../Components/Admin/ProgressiveStepper '

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

return (
    <div className="min-h-screen bg-gray-50 py-12">
      <ProgressiveStepper 
        activeStep={activeStep} 
        onSaveAndContinue={handleSaveAndContinue}
      />

      {/* Content Area - Shows when a step is active */}
      {activeStep > 0 && (
        <div className="max-w-3xl mx-auto mt-8 bg-white rounded-lg shadow-md p-8 animate-slideIn">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Step {activeStep} Content
          </h2>
          <p className="text-gray-600 mb-6">
            This is where your form content for step {activeStep} would appear.
          </p>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            {activeStep > 1 && (
              <button
                onClick={handleBack}
                className="text-purple-600 hover:text-purple-700 font-medium px-4 py-2 rounded transition-colors duration-300"
              >
                ← Back
              </button>
            )}
            
            <div className="ml-auto flex gap-3">
              <button
                onClick={handleReset}
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-6 py-2 rounded transition-all duration-300"
              >
                Cancel
              </button>
              
              {activeStep < 4 ? (
                <button
                  onClick={() => handleSaveAndContinue(activeStep + 1)}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded transition-all duration-300 flex items-center gap-2"
                >
                  Save & Continue
                  <span>→</span>
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded transition-all duration-300"
                >
                  Publish Test
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Demo Reset Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleReset}
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Reset Demo
        </button>
      </div>

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

export default TestDetails