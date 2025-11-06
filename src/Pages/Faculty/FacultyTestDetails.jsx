import React, { useState } from "react";
import { FacultyUploadQuestions } from "../../Components/Faculty/FacultyUploadQuestions";
import FacultyScheduleTest from "../../Components/Faculty/FacultyScheduleTest";
import FacultyReviewPublish from "../../Components/Faculty/FacultyReviewPublish";
import { FacultyProgressiveStepper } from "../../Components/Faculty/FacultyProgressiveStepper";
import { FacultyAddTestData } from "../../Components/Faculty/FacultyAddTestData";
import AllTest from "../../Components/AllTest";
import Button from "../../Components/common/Button";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const FacultyTestDetails = () => {

  const [activeStep, setActiveStep] = useState(0);
  const allTests =
    [
      {
        id: 1,
        status: "ongoing",
        testData: {
          timeRemaining: "58:07 mins remaining",
          title: "Machine Learning Mid-Sem Test",
          questions: 30,
          marks: 60,
          duration: "1 hour",
          department: "CST",
          semester: "05",
          createdBy: "Saurabh Kumbhar",
          createdDate: "Sept 5 04:25",
          avatarSeed: "Saurabh",
        },
        month: "September",
      },
      {
        id: 2,
        status: "upcoming",
        testData: {
          dateTime: "Nov 15 • 2:00 PM",
          title: "Data Structures Final Exam",
          questions: 50,
          marks: 100,
          duration: "2 hours",
          department: "CST",
          semester: "03",
          createdBy: "Priya Sharma",
          createdDate: "Oct 20 10:15",
          avatarSeed: "Priya",
        },
        month: "November",
      },
      {
        id: 3,
        status: "completed",
        testData: {
          dateTime: "Oct 10 • 10:00 AM",
          title: "Database Management Systems Quiz",
          questions: 20,
          marks: 40,
          duration: "45 mins",
          department: "CST",
          semester: "04",
          createdBy: "Rahul Verma",
          createdDate: "Sept 30 14:20",
          avatarSeed: "Rahul",
          marksObtained: 52,
          totalMarks: 60,
          timeTaken: "54 minutes",
          accuracy: "87%",
        },
        month: "October",
      },
      {
        id: 4,
        status: "upcoming",
        testData: {
          dateTime: "Nov 20 • 11:00 AM",
          title: "Computer Networks Test",
          questions: 40,
          marks: 80,
          duration: "1.5 hours",
          department: "CST",
          semester: "05",
          createdBy: "Anjali Singh",
          createdDate: "Nov 1 09:00",
          avatarSeed: "Anjali",
        },
        month: "November",
      },
      {
        id: 5,
        status: "upcoming",
        testData: {
          dateTime: "Nov 20 • 11:00 AM",
          title: "Computer Networks Test",
          questions: 40,
          marks: 80,
          duration: "1.5 hours",
          department: "CST",
          semester: "05",
          createdBy: "Anjali Singh",
          createdDate: "Nov 1 09:00",
          avatarSeed: "Anjali",
        },
        month: "November",
      },
      {
        id: 6,
        status: "completed",
        testData: {
          dateTime: "Oct 25 • 3:00 PM",
          title: "Operating Systems Mid-Term",
          questions: 35,
          marks: 70,
          duration: "1.5 hours",
          department: "CST",
          semester: "05",
          createdBy: "Saurabh Kumbhar",
          createdDate: "Oct 15 11:30",
          avatarSeed: "Saurabh",
          marksObtained: 45,
          totalMarks: 70,
          timeTaken: "1 hour 20 mins",
          accuracy: "64%",
        },
        month: "October",
      },
      {
        id: 7,
        status: "completed",
        testData: {
          dateTime: "Oct 25 • 3:00 PM",
          title: "Operating Systems Mid-Term",
          questions: 35,
          marks: 70,
          duration: "1.5 hours",
          department: "CST",
          semester: "05",
          createdBy: "Saurabh Kumbhar",
          createdDate: "Oct 15 11:30",
          avatarSeed: "Saurabh",
          marksObtained: 45,
          totalMarks: 70,
          timeTaken: "1 hour 20 mins",
          accuracy: "64%",
        },
        month: "October",
      },
    ]

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
        return <FacultyAddTestData />;
      case 2:
        return <FacultyUploadQuestions />;
      case 3:
        return <FacultyScheduleTest />;
      case 4:
        return <FacultyReviewPublish />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-10">
      <FacultyProgressiveStepper
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
          <AllTest userType="admin" allTests={allTests} showWrap={true} />
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

export default FacultyTestDetails;
