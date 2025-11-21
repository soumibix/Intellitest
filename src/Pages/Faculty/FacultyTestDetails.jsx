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
    testFormData: {
      department: "",
      semester: "",
      subjectName: "",
      subjectCode: "",
      testCategory: "",
      numberOfQuestions: "",
    },
    scheduleFormData: {
      testDate: "",
      startTime: "",
      endTime: "",
      duration: "",
    },
    questionFileUrl: "",
    answerFileUrl: "",
    questionFileName: "",
    answerFileName: "",
  };
};

const FacultyTestDetails = () => {
  const initialState = getInitialState();
  const [state, setState] = useState(initialState);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [files, setFiles] = useState({ question: null, answer: null });
  const [testData, setTestData] = useState(null);

  // New state for filtering and pagination
  const [allTests, setAllTests] = useState([]);
  const [testsLoading, setTestsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTests, setTotalTests] = useState(0);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [hasMoreTests, setHasMoreTests] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { token } = useAuth();
  const httpHook = useHttp();
  const { loading } = httpHook;

  const TESTS_PER_PAGE = 5;

  // Fetch tests based on filter and page
  const fetchAllTests = async (status = "all", page = 1, append = false, search = "") => {
    setTestsLoading(true);
    try {
      const queryParams = {
        page: page,
        limit: TESTS_PER_PAGE,
      };

      // Only add status if it's not "all"
      if (status !== "all") {
        queryParams.status = status;
      }

      // Add search query if provided
      if (search && search.trim() !== "") {
        queryParams.search = search.trim();
      }

      const response = await TestAPI.fetchTests(httpHook, token, queryParams);

      if (response.success && response.data) {
        const newTests = response.data;

        // Get total from pagination object
        const total = response.pagination?.total || response.total || 0;
        setTotalTests(total);

        // Append or replace tests based on append flag
        if (append) {
          const updatedTests = [...allTests, ...newTests];
          setAllTests(updatedTests);
          // Check if there are more tests to load after appending
          setHasMoreTests(updatedTests.length < total);
        } else {
          setAllTests(newTests);
          // Check if there are more tests to load
          setHasMoreTests(newTests.length < total);
        }
      }
    } catch (error) {
      console.error("Error fetching tests:", error);
      setAllTests(append ? allTests : []);
      setHasMoreTests(false);
    } finally {
      setTestsLoading(false);
    }
  };

  // Initial fetch when component mounts or activeStep changes to 0
  useEffect(() => {
    if (state.activeStep === 0) {
      setCurrentPage(1);
      setCurrentFilter("all");
      setSearchQuery("");
      fetchAllTests("all", 1, false, "");
    }
  }, [state.activeStep]);

  // Handle filter change from AllTest component
  const handleFilterChange = (newFilter) => {
    setCurrentFilter(newFilter);
    setCurrentPage(1);
    setAllTests([]); // Clear existing tests
    fetchAllTests(newFilter, 1, false, searchQuery);
  };

  // Handle search change from AllTest component
  const handleSearchChange = (search) => {
    setSearchQuery(search);
    setCurrentPage(1);
    setCurrentFilter("all"); // Reset filter when searching
    setAllTests([]); // Clear existing tests
    fetchAllTests("all", 1, false, search);
  };

  // Handle "View More" click
  const handleViewMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchAllTests(currentFilter, nextPage, true, searchQuery); // Append to existing tests
  };

  useEffect(() => {
    try {
      // Only save to localStorage if we're past step 0
      if (state.activeStep > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    } catch (error) {
      console.error("Error saving state:", error);
    }
  }, [state]);

  const handleUploadToServer = async (file, type) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const response = await TestAPI.uploadFile(httpHook, formData, token);

    if (response.success) {
      setState((prev) => ({
        ...prev,
        [type === "question" ? "questionFileUrl" : "answerFileUrl"]:
          response.fileUrl,
        [type === "question" ? "questionFileName" : "answerFileName"]:
          file.name,
      }));
    } else {
      alert(`Failed to upload ${type} file. Please try again.`);
    }
  };

  useEffect(() => {
    if (files.question) handleUploadToServer(files.question, "question");
  }, [files.question]);

  useEffect(() => {
    if (files.answer) handleUploadToServer(files.answer, "answer");
  }, [files.answer]);

  const validateStep = (step) => {
    if (step === 1) {
      const {
        department,
        semester,
        subjectName,
        subjectCode,
        testCategory,
        numberOfQuestions,
      } = state.testFormData;

      return (
        department?.trim() !== "" &&
        semester?.trim() !== "" &&
        subjectName?.trim() !== "" &&
        subjectCode?.trim() !== "" &&
        testCategory?.trim() !== "" &&
        numberOfQuestions?.toString().trim() !== "" &&
        parseInt(numberOfQuestions) > 0
      );
    }

    if (step === 2) {
      const { testDate, startTime, endTime, duration } = state.scheduleFormData;

      return (
        testDate?.trim() !== "" &&
        startTime?.trim() !== "" &&
        endTime?.trim() !== "" &&
        duration?.toString().trim() !== "" &&
        parseInt(duration) > 0
      );
    }

    if (step === 3) {
      return state.questionFileUrl;
    }

    return true;
  };

  const handleSaveAndContinue = async (nextStep) => {
    if (!validateStep(state.activeStep)) {
      let errorMsg = "Please fill all required fields";

      if (state.activeStep === 1) {
        const missingFields = [];
        const {
          department,
          semester,
          subjectName,
          subjectCode,
          testCategory,
          numberOfQuestions,
        } = state.testFormData;

        if (!department?.trim()) missingFields.push("Department");
        if (!semester?.trim()) missingFields.push("Semester");
        if (!subjectName?.trim()) missingFields.push("Subject Name");
        if (!subjectCode?.trim()) missingFields.push("Subject Code");
        if (!testCategory?.trim()) missingFields.push("Test Category");
        if (!numberOfQuestions || parseInt(numberOfQuestions) <= 0)
          missingFields.push("Number of Questions");

        if (missingFields.length > 0) {
          errorMsg = `Please fill the following fields:\n${missingFields.join(
            ", "
          )}`;
        }
      }

      alert(errorMsg);
      return;
    }

    let response;
    const {
      activeStep,
      testId,
      testFormData,
      scheduleFormData,
      questionFileUrl,
      answerFileUrl,
    } = state;

    if (activeStep === 1) {
      const payload = {
        ...testFormData,
        numberOfQuestions: parseInt(testFormData.numberOfQuestions),
      };

      if (!testId) {
        response = await TestAPI.addTest(httpHook, payload, token);
        if (response.success && response.data) {
          setState((prev) => ({
            ...prev,
            testId: response.data._id || response.data.testId,
            activeStep: nextStep,
          }));
          alert("Test created successfully!");
        } else {
          alert("Failed to create test: " + response.message);
        }
      } else {
        response = await TestAPI.updateTest(httpHook, testId, payload, token);
        if (response.success) {
          setState((prev) => ({ ...prev, activeStep: nextStep }));
          alert("Test details updated successfully!");
        } else {
          alert("Failed to update test: " + response.message);
        }
      }
    } else if (activeStep === 2) {
      if (!testId) {
        alert("Test ID is missing. Please complete step 1 first.");
        return;
      }

      const payload = {
        ...scheduleFormData,
        duration: parseInt(scheduleFormData.duration),
      };
      response = await TestAPI.scheduleTest(httpHook, testId, payload, token);

      if (response.success) {
        setState((prev) => ({ ...prev, activeStep: nextStep }));
        alert("Schedule updated successfully!");
      } else {
        alert("Failed to update schedule: " + response.message);
      }
    } else if (activeStep === 3) {
      if (!testId) {
        alert("Test ID is missing. Please complete previous steps first.");
        return;
      }

      if (questionFileUrl && answerFileUrl) {
        response = await TestAPI.saveQA(
          httpHook,
          testId,
          { questionPdfUrl: questionFileUrl, answerPdfUrl: answerFileUrl },
          token
        );
        if (response.success) {
          setState((prev) => ({ ...prev, activeStep: nextStep }));
          setTestData(response.updated);
          alert("Question and Answer files saved successfully!");
        } else {
          alert("Failed to save files: " + response.message);
        }
      } else if (questionFileUrl) {
        response = await TestAPI.generateAnswer(
          httpHook,
          testId,
          { pdfUrl: questionFileUrl },
          token
        );
        if (response.success) {
          setTestData(response.updated);
          setState((prev) => ({ ...prev, activeStep: nextStep }));
        } else {
          console.error("Failed to generate answers:", response.message);
        }
      }
    } else {
      setState((prev) => ({ ...prev, activeStep: nextStep }));
    }
  };

  const handleBack = () => {
    if (state.activeStep > 0) {
      setState((prev) => ({ ...prev, activeStep: prev.activeStep - 1 }));
    }
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(getInitialState());
    setFiles({ question: null, answer: null });
    setTestData(null);
    setCurrentPage(1);
    setCurrentFilter("all");
    setSearchQuery("");
    fetchAllTests("all", 1, false, "");
  };

  const handleConfirmCancel = async () => {
    if (state.testId) {
      const response = await TestAPI.deleteTest(httpHook, state.testId, token);
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

  const handlePublish = async () => {
    if (!state.testId) {
      alert("Test ID is missing. Please complete all previous steps.");
      return;
    }
    alert("Test published successfully! 🎉");
    localStorage.removeItem(STORAGE_KEY);
    handleReset();
  };

  const handleDeleteFile = (type) => {
    if (type === "question") {
      setState((prev) => ({
        ...prev,
        questionFileUrl: "",
        questionFileName: "",
      }));
      setFiles((prev) => ({ ...prev, question: null }));
    } else {
      setState((prev) => ({
        ...prev,
        answerFileUrl: "",
        answerFileName: "",
      }));
      setFiles((prev) => ({ ...prev, answer: null }));
    }
  };

  const renderStepContent = () => {
    switch (state.activeStep) {
      case 1:
        return (
          <FacultyAddTestData
            formData={state.testFormData}
            setFormData={(updatedData) => {
              setState((prev) => ({
                ...prev,
                testFormData: updatedData,
              }));
            }}
          />
        );
      case 2:
        return (
          <FacultyScheduleTest
            formData={state.scheduleFormData}
            setFormData={(updatedData) => {
              setState((prev) => ({
                ...prev,
                scheduleFormData: updatedData,
              }));
            }}
          />
        );
      case 3:
        return (
          <FacultyUploadQuestions
            questionFile={files.question}
            setQuestionFile={(file) =>
              setFiles((prev) => ({ ...prev, question: file }))
            }
            answerFile={files.answer}
            setAnswerFile={(file) =>
              setFiles((prev) => ({ ...prev, answer: file }))
            }
            questionFileUrl={state.questionFileUrl}
            answerFileUrl={state.answerFileUrl}
            questionFileName={state.questionFileName}
            answerFileName={state.answerFileName}
            setQuestionFileUrl={(url) =>
              setState((prev) => ({ ...prev, questionFileUrl: url }))
            }
            setAnswerFileUrl={(url) =>
              setState((prev) => ({ ...prev, answerFileUrl: url }))
            }
            onDeleteFile={handleDeleteFile}
            testId={state.testId}
          />
        );
      case 4:
        return (
          <FacultyReviewPublish
            testData={testData}
            testId={state.testId}
            httpHook={httpHook}
            token={token}
            setTestData={setTestData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-10 px-10">
      <FacultyProgressiveStepper
        activeStep={state.activeStep}
        onSaveAndContinue={handleSaveAndContinue}
      />

      {state.activeStep > 0 && (
        <div className="mx-auto bg-white rounded-lg shadow-md p-8 mt-0">
          <div className="mb-8">{renderStepContent()}</div>
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            {state.activeStep > 1 && (
              <button
                onClick={handleBack}
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded transition-all duration-300 flex items-center gap-2"
                disabled={loading}
              >
                <ArrowLeft size={18} /> Back
              </button>
            )}
            <div className="ml-auto flex gap-3">
              <button
                onClick={() => setShowCancelModal(true)}
                className="border border-gray-300 text-gray-700 hover:bg-red-600 hover:text-white cursor-pointer font-medium px-8 py-2 rounded transition-all duration-300"
                disabled={loading}
              >
                Cancel
              </button>
              {state.activeStep < 4 ? (
                <button
                  onClick={() => handleSaveAndContinue(state.activeStep + 1)}
                  className="bg-[#6B21A8] hover:bg-[#410d6b] cursor-pointer text-white font-medium px-6 py-3 rounded transition-all duration-300 flex items-center gap-2"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save & Continue"}{" "}
                  {!loading && <ArrowRight size={18} />}
                </button>
              ) : (
                <button
                  onClick={handlePublish}
                  className="bg-[#6B21A8] hover:bg-[#410d6b] cursor-pointer text-white font-medium px-6 py-3 rounded transition-all duration-300"
                  disabled={loading}
                >
                  Publish Test
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {state.activeStep === 0 && (
        <div className="w-full mt-10 bg-white rounded-lg shadow-md p-8">
          <AllTest
            heading="Explore All Tests"
            userType="faculty"
            allTests={allTests}
            showWrap={true}
            onFilterChange={handleFilterChange}
            onSearchChange={handleSearchChange}
            onViewMore={handleViewMore}
            hasMoreTests={hasMoreTests}
            isLoadingMore={testsLoading && currentPage > 1}
            isLoading={testsLoading && currentPage === 1}
            totalTests={totalTests}
            displayedTestsCount={allTests.length}
            activeFilterProp={currentFilter}
          />
        </div>
      )}

      <ConfirmationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleConfirmCancel}
        title="Cancel Test Creation"
        message={
          state.testId
            ? "Are you sure you want to cancel? This will delete the test you've created."
            : "Are you sure you want to cancel? All progress will be lost."
        }
        confirmText="Delete Test"
        cancelText="Keep Editing"
        isLoading={loading}
      />
    </div>
  );
};

export default FacultyTestDetails;