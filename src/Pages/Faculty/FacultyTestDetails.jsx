import React, { useState, useEffect } from "react";
import { FacultyUploadQuestions } from "../../Components/Faculty/FacultyUploadQuestions";
import FacultyScheduleTest from "../../Components/Faculty/FacultyScheduleTest";
import FacultyReviewPublish from "../../Components/Faculty/FacultyReviewPublish";
import { FacultyProgressiveStepper } from "../../Components/Faculty/FacultyProgressiveStepper";
import { FacultyAddTestData } from "../../Components/Faculty/FacultyAddTestData";
import AllTest from "../../Components/AllTest";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useHttp } from "../../Hooks/useHttps";
import { useAuth } from "../../AppRouter";
import ConfirmationModal from "../../utils/ConfirmationModal";
import { TestAPI } from "../../apis/Tests/TestCRUD";

const STORAGE_KEY = "facultyTestProgress";

const getInitialState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (error) {
    console.error("Error loading saved state:", error);
  }
  return {
    activeStep: 0,
    testId: null,
    testFormData: { department: "", semester: "", subjectName: "", subjectCode: "", testCategory: "", numberOfQuestions: "" },
    scheduleFormData: { testDate: "", startTime: "", endTime: "", duration: "" },
    questionFileUrl: "",
    answerFileUrl: "",
  };
};

const FacultyTestDetails = () => {
  const initialState = getInitialState();
  const [activeStep, setActiveStep] = useState(initialState.activeStep);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [testId, setTestId] = useState(initialState.testId);
  const { token } = useAuth();
  const httpHook = useHttp();
  const { loading } = httpHook;
  const [testFormData, setTestFormData] = useState(initialState.testFormData);
  const [scheduleFormData, setScheduleFormData] = useState(initialState.scheduleFormData);
  const [questionFile, setQuestionFile] = useState(null);
  const [answerFile, setAnswerFile] = useState(null);
  const [questionFileUrl, setQuestionFileUrl] = useState(initialState.questionFileUrl);
  const [answerFileUrl, setAnswerFileUrl] = useState(initialState.answerFileUrl);
  const [testData, setTestData] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ activeStep, testId, testFormData, scheduleFormData, questionFileUrl, answerFileUrl }));
    } catch (error) {
      console.error("Error saving state:", error);
    }
  }, [activeStep, testId, testFormData, scheduleFormData, questionFileUrl, answerFileUrl]);

  const allTests = [
    { id: 1, status: "ongoing", testData: { title: "Machine Learning Mid-Sem Test", questions: 30, marks: 60 } },
    { id: 2, status: "upcoming", testData: { title: "Data Structures Final Exam", questions: 50, marks: 100 } },
  ];

  const handleUploadToServer = async (file, type) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const response = await TestAPI.uploadFile(httpHook, formData, token);
    if (response.success) {
      const fileUrl = response.fileUrl;
      type === "question" ? setQuestionFileUrl(fileUrl) : setAnswerFileUrl(fileUrl);
      console.log(`${type} file uploaded successfully:`, fileUrl);
    } else {
      console.error(`Failed to upload ${type} file:`, response.message);
      alert(`Failed to upload ${type} file. Please try again.`);
    }
  };

  useEffect(() => { if (questionFile) handleUploadToServer(questionFile, "question"); }, [questionFile]);
  useEffect(() => { if (answerFile) handleUploadToServer(answerFile, "answer"); }, [answerFile]);

  const validateStep = (step) => {
    if (step === 1) {
      const { department, semester, subjectName, subjectCode, testCategory, numberOfQuestions } = testFormData;
      return department && semester && subjectName && subjectCode && testCategory && numberOfQuestions;
    }
    if (step === 2) {
      const { testDate, startTime, endTime, duration } = scheduleFormData;
      return testDate && startTime && endTime && duration;
    }
    if (step === 3) return questionFile && questionFileUrl;
    return true;
  };

  const handleSaveAndContinue = async (nextStep) => {
    if (!validateStep(activeStep)) {
      alert("Please fill all required fields");
      return;
    }

    let response;

    if (activeStep === 1) {
      const payload = { ...testFormData, numberOfQuestions: testFormData.numberOfQuestions };
      if (!testId) {
        response = await TestAPI.addTest(httpHook, payload, token);
        if (response.success && response.data) {
          setTestId(response.data._id || response.data.testId);
          alert("Test created successfully!");
          setActiveStep(nextStep);
        } else {
          alert("Failed to create test: " + response.message);
        }
      } else {
        response = await TestAPI.updateTest(httpHook, testId, payload, token);
        if (response.success) {
          alert("Test details updated successfully!");
          setActiveStep(nextStep);
        } else {
          alert("Failed to update test: " + response.message);
        }
      }
    } else if (activeStep === 2) {
      if (!testId) {
        alert("Test ID is missing. Please complete step 1 first.");
        return;
      }
      const payload = { ...scheduleFormData, duration: parseInt(scheduleFormData.duration) };
      response = await TestAPI.scheduleTest(httpHook, testId, payload, token);
      if (response.success) {
        alert("Schedule updated successfully!");
        setActiveStep(nextStep);
      } else {
        alert("Failed to update schedule: " + response.message);
      }
    } else if (activeStep === 3) {
      if (!testId) {
        alert("Test ID is missing. Please complete previous steps first.");
        return;
      }
      if (!validateStep(3)) {
        alert("Please upload the question paper");
        return;
      }
      if (questionFileUrl && answerFileUrl) {
        response = await TestAPI.saveQA(httpHook, testId, { questionPdfUrl: questionFileUrl, answerPdfUrl: answerFileUrl }, token);
        if (response.success) {
          setActiveStep(nextStep);
          setTestData(response.updated);
          console.log("Question and Answer PDFs saved successfully");
          alert("Question and Answer files saved successfully!");
        } else {
          console.error("Failed to save Q&A:", response.message);
          alert("Failed to save files: " + response.message);
        }
      } else if (questionFileUrl) {
        response = await TestAPI.generateAnswer(httpHook, testId, { pdfUrl: questionFileUrl }, token);
        if (response.success) {
          setTestData(response.updated);
          console.log("answer generated and saved successfully");
          setActiveStep(nextStep);
        } else {
          console.error("Failed to generated answers:", response.message);
        }
      }
      console.log("Files uploaded - Question:", questionFileUrl, "Answer:", answerFileUrl);
    } else {
      setActiveStep(nextStep);
    }
  };

  const handleBack = () => { if (activeStep > 0) setActiveStep(activeStep - 1); };

  const handleConfirmCancel = async () => {
    if (testId) {
      const response = await TestAPI.deleteTest(httpHook, testId, token);
      if (response.success) {
        alert("Test deleted successfully!");
        handleReset();
      } else {
        alert("Failed to delete test: " + response.message);
      }
    } else {
      handleReset();
    }
    setShowCancelModal(false);
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setActiveStep(0);
    setTestId(null);
    setTestFormData({ department: "", semester: "", subjectName: "", subjectCode: "", testCategory: "", numberOfQuestions: "" });
    setScheduleFormData({ testDate: "", startTime: "", endTime: "", duration: "" });
    setQuestionFile(null);
    setAnswerFile(null);
    setQuestionFileUrl("");
    setAnswerFileUrl("");
    setTestData(null);
  };

  const handlePublish = async () => {
    if (!testId) {
      alert("Test ID is missing. Please complete all previous steps.");
      return;
    }
    if (questionFileUrl) {
      const response = await TestAPI.saveQA(httpHook, testId, { questionPdfUrl: questionFileUrl, answerPdfUrl: answerFileUrl || "" }, token);
      if (response.success) {
        alert("Test published successfully! 🎉");
        handleReset();
      } else {
        alert("Failed to publish test: " + response.message);
      }
    } else {
      alert("Please complete all steps before publishing");
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1: return <FacultyAddTestData formData={testFormData} setFormData={setTestFormData} />;
      case 2: return <FacultyScheduleTest formData={scheduleFormData} setFormData={setScheduleFormData} />;
      case 3: return <FacultyUploadQuestions questionFile={questionFile} setQuestionFile={setQuestionFile} answerFile={answerFile} setAnswerFile={setAnswerFile} questionFileUrl={questionFileUrl} answerFileUrl={answerFileUrl} setQuestionFileUrl={setQuestionFileUrl} setAnswerFileUrl={setAnswerFileUrl} testId={testId} />;
      case 4: return <FacultyReviewPublish testData={testData} testId={testId} httpHook={httpHook} token={token} setTestData={setTestData} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-10">
      <FacultyProgressiveStepper activeStep={activeStep} onSaveAndContinue={handleSaveAndContinue} />
      {activeStep > 0 && (
        <div className="mx-auto bg-white rounded-lg shadow-md p-8 mt-0">
          <div className="mb-8">{renderStepContent()}</div>
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            {activeStep > 1 && (
              <button onClick={handleBack} className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded transition-all duration-300 flex items-center gap-2" disabled={loading}>
                <ArrowLeft size={18} /> Back
              </button>
            )}
            <div className="ml-auto flex gap-3">
              <button onClick={() => setShowCancelModal(true)} className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-6 py-2 rounded transition-all duration-300" disabled={loading}>
                Cancel
              </button>
              {activeStep < 4 ? (
                <button onClick={() => handleSaveAndContinue(activeStep + 1)} className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded transition-all duration-300 flex items-center gap-2" disabled={loading}>
                  {loading ? "Saving..." : "Save & Continue"} {!loading && <ArrowRight size={18} />}
                </button>
              ) : (
                <button onClick={handlePublish} className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded transition-all duration-300" disabled={loading}>
                  Publish Test
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {activeStep === 0 && (
        <div className="w-full mt-10 bg-white rounded-lg shadow-md p-8">
          <AllTest userType="faculty" allTests={allTests} showWrap={true} />
        </div>
      )}
      <ConfirmationModal isOpen={showCancelModal} onClose={() => setShowCancelModal(false)} onConfirm={handleConfirmCancel} title="Cancel Test Creation" message={testId ? "Are you sure you want to cancel? This will delete the test you've created." : "Are you sure you want to cancel? All progress will be lost."} confirmText="Delete Test" cancelText="Keep Editing" isLoading={loading} />
    </div>
  );
};

export default FacultyTestDetails;