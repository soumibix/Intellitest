import React from 'react';
import { CheckCircle, FileText, Upload, Calendar, Send, Plus } from 'lucide-react';
import Button from '../common/Button';

export const FacultyProgressiveStepper = ({ activeStep, onSaveAndContinue }) => {
  const steps = [
    {
      id: 1,
      icon: FileText,
      title: 'Test Details',
      description: 'Basic information about the test.',
    },
    {
      id: 2,
      icon: Calendar,
      title: 'Schedule Test',
      description: 'Set test date, time, and duration.',
    },
    {
      id: 3,
      icon: Upload,
      title: 'Upload Questions & Publish',
      description: 'Import questions from your files & generate answers.',
    },
    {
      id: 4,
      icon: Send,
      title: 'Review & Update',
      description: 'Review answers, and assign marks.',
    },
  ];

  const getStepStatus = (stepId) => {
    if (stepId < activeStep) return 'completed';
    if (stepId === activeStep) return 'active';
    return 'inactive';
  };

  return (
    <div className="w-full mx-auto p-8 bg-white rounded-lg shadow-md">
      {/* Centered Container with 70% width */}
      <div className="w-full md:w-[70%] mx-auto">
        {/* Steps Container */}
        <div className="relative flex md:flex-row flex-col md:items-start md:gap-0 gap-9">
          {steps.map((step, index) => {
            const status = getStepStatus(step.id);
            const Icon = step.icon;
            
            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center flex-1 relative z-10">
                  {/* Step Icon with background to cover the line */}
                  <div className="relative bg-white">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
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
                  </div>

                  {/* Step Info */}
                  <div className="mt-4 text-center px-2">
                    <h3
                      className={`text-base font-semibold mb-1 transition-colors duration-300 whitespace-nowrap ${
                        status === 'active' || status === 'completed'
                          ? 'text-gray-900'
                          : 'text-[#2B2B2B]'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        status === 'active' || status === 'completed'
                          ? 'text-gray-600'
                          : 'text-[#6D6D6D]'
                      }`}
                      style={{ 
                        maxWidth: '140px',
                        margin: '0 auto',
                        lineHeight: '1.4'
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connecting Line between steps - only for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex items-start" style={{ width: '100%', paddingTop: '2rem' }}>
                    <div className="relative w-full h-0.5">
                      {/* Background Line */}
                      <div className="absolute inset-0 bg-gray-200" />
                      
                      {/* Progress Line */}
                      <div 
                        className="absolute left-0 top-0 h-full bg-[#631891] transition-all duration-700 ease-in-out"
                        style={{ 
                          width: status === 'completed' ? '100%' : '0%'
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Mobile connecting line */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center w-full">
                    <div className="relative w-0.5 h-20">
                      <div className="absolute inset-0 bg-gray-200" />
                      <div 
                        className="absolute top-0 left-0 w-full bg-[#631891] transition-all duration-500"
                        style={{
                          height: status === 'completed' ? '100%' : '0%',
                        }}
                      />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Create New Test Button */}
      {activeStep === 0 && (
        <div className="flex justify-center mt-8 animate-fadeIn">
          <Button
            onClick={() => onSaveAndContinue(1)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
            text="Create New Test"
            padding="px-5 py-3"
            icon={<Plus />}
            color="#631891"
            textSize="text-md"
            iconPosition="right"
          />
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

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};