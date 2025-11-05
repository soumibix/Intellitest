import React, { useState } from 'react';
import { CheckCircle, FileText, Upload, Calendar, Send } from 'lucide-react';

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
    <div className="w-full max-w-5xl mx-auto p-8">
      {/* Stepper Header */}
      <div className="relative flex items-start justify-between mb-12">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          const Icon = step.icon;
          
          return (
            <div key={step.id} className="flex flex-col items-center flex-1 relative">
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-8 w-full h-0.5 -z-10">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      status === 'completed' ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                    style={{
                      width: status === 'completed' ? '100%' : '0%',
                    }}
                  />
                  <div className="absolute inset-0 bg-gray-200" />
                </div>
              )}
              
              {/* Step Icon */}
              <div
                className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 transform ${
                  status === 'active'
                    ? 'bg-purple-600 scale-110 shadow-lg'
                    : status === 'completed'
                    ? 'bg-purple-600'
                    : 'bg-gray-100'
                }`}
              >
                {status === 'completed' ? (
                  <CheckCircle className="w-8 h-8 text-white" />
                ) : (
                  <Icon
                    className={`w-8 h-8 transition-colors duration-300 ${
                      status === 'active' ? 'text-white' : 'text-gray-400'
                    }`}
                  />
                )}
              </div>

              {/* Step Info */}
              <div className="mt-4 text-center max-w-[140px]">
                <h3
                  className={`text-sm font-semibold mb-1 transition-colors duration-300 ${
                    status === 'active' || status === 'completed'
                      ? 'text-gray-900'
                      : 'text-gray-400'
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-xs transition-colors duration-300 ${
                    status === 'active' || status === 'completed'
                      ? 'text-gray-600'
                      : 'text-gray-400'
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create New Test Button - Only shows when no step is active */}
      {activeStep === 0 && (
        <div className="flex justify-center animate-fadeIn">
          <button
            onClick={() => onSaveAndContinue(1)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Create New Test
            <span className="text-xl">+</span>
          </button>
        </div>
      )}
    </div>
  );
};