import React from 'react';
import { CheckCircle, FileText, Upload, Calendar, Send, Plus } from 'lucide-react';
import Button from '../common/Button';
export const ProgressiveStepper = ({ activeStep, onSaveAndContinue }) => {
  const steps = [
    {
      id: 1,
      icon: FileText,
      title: 'Test Details',
      description: 'Basic information about the test.',
    },
    {
      id: 2,
      icon: Upload,
      title: 'Upload Questions',
      description: 'Import questions from your files.',
    },
    {
      id: 3,
      icon: Calendar,
      title: 'Schedule Test',
      description: 'Set test date, time, and duration.',
    },
    {
      id: 4,
      icon: Send,
      title: 'Review & Publish',
      description: 'Final validation before publishing.',
    },
  ];

  const getStepStatus = (stepId) => {
    if (stepId < activeStep) return 'completed';
    if (stepId === activeStep) return 'active';
    return 'inactive';
  };

  return (
    <div className="w-full mx-auto p-8 bg-white rounded-lg shadow-md">
      <div className="relative flex md:flex-row flex-col md:items-start md:gap-0 gap-9 justify-between">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          const Icon = step.icon;
          
          return (
            <div key={step.id} className="flex flex-col items-center flex-1 relative">
              {/* Connecting Line Background */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-8 w-full h-0.5 bg-gray-200 -z-10" />
              )}
              
              {/* Connecting Line Progress */}
              {index < steps.length - 1 && (
                <div 
                  className="absolute left-1/2 top-8 h-0.5 bg-[#631891] -z-10 transition-all duration-500"
                  style={{
                    width: status === 'completed' ? '100%' : '0%',
                  }}
                />
              )}
              
              {/* Step Icon */}
              <div
                className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                  status === 'active'
                    ? 'bg-[#631891] scale-110 shadow-lg'
                    : status === 'completed'
                    ? 'bg-[#160024]'
                    : 'bg-[#6318910F]'
                }`}
              >
                {status === 'completed' ? (
                  <CheckCircle className="w-8 h-8 text-white" />
                ) : (
                  <Icon
                    className={`w-8 h-8 transition-colors duration-300 ${
                      status === 'active' ? 'text-white' : 'text-[#631891AD]'
                    }`}
                  />
                )}
              </div>

              {/* Step Info */}
              <div className="mt-4 text-center max-w-[180px]">
                <h3
                  className={`text-lg font-semibold mb-1 transition-colors duration-300 ${
                    status === 'active' || status === 'completed'
                      ? 'text-gray-900'
                      : 'text-[#2B2B2B]'
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-md transition-colors duration-300 ${
                    status === 'active' || status === 'completed'
                      ? 'text-gray-600'
                      : 'text-[#6D6D6D]'
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create New Test Button */}
      {activeStep === 0 && (
        <div className="flex justify-center mt-8 animate-fadeIn">
            <Button
              onClick={() => onSaveAndContinue(1)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
              text="Create New Test"
              padding = "px-5 py-3"
              icon={<Plus/>}
              color='#631891'
              textSize='text-md'
              iconPosition='right'
            />
        </div>
      )}
    </div>
  );
};