import React, { useState } from "react";
import FileUploader from "../common/FileUploader";
import { Sparkles, Loader2, Wand2, ChevronDown, ChevronUp } from "lucide-react";
import { TestAPI } from "../../apis/Tests/TestCRUD";
import { useHttp } from "../../Hooks/useHttps";
import { useAuth } from "../../AppRouter";

export function FacultyUploadQuestions({
  questionFile,
  setQuestionFile,
  answerFile,
  setAnswerFile,
  questionFileUrl,
  answerFileUrl,
  setQuestionFileUrl,
  setAnswerFileUrl,
  testId
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const { token } = useAuth();
  const httpHook = useHttp();

  const handleGenerateAnswers = async () => {
    if (!questionFileUrl) {
      alert("Please upload the question paper first");
      return;
    }

    if (!testId) {
      alert("Test ID is missing. Please complete previous steps.");
      return;
    }

    setIsGenerating(true);

    try {
      const payload = {
        pdfUrl: questionFileUrl
      };

      const response = await TestAPI.generateAnswer(httpHook, testId, payload, token);

      if (response.success) {
        alert("Answers generated successfully! ✨");
        console.log("Generated answers:", response.updated);
        
        // Store the generated questions
        if (response.updated && response.updated.questions) {
          setGeneratedQuestions(response.updated.questions);
        }
      } else {
        alert("Failed to generate answers: " + response.message);
      }
    } catch (error) {
      console.error("Generate answers error:", error);
      alert("Failed to generate answers. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleQuestion = (index) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="space-y-8">
      {/* Question Paper Upload */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Upload Exam Question Paper
        </h2>
        <FileUploader
          onFileSelect={setQuestionFile}
          uploadedFileUrl={questionFileUrl}
          setFileUrl={setQuestionFileUrl}
        />
      </div>

      {/* Answer Paper Section - Split Layout */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Upload Exam Answer Paper (Optional) OR, Click Save & Continue to Generate AI answers
        </h2>

        <div className="w-full gap-6">
          {/* Left Side - File Uploader */}
            <FileUploader
              onFileSelect={setAnswerFile}
              uploadedFileUrl={answerFileUrl}
              setFileUrl={setAnswerFileUrl}
            />
          {/* <div className="flex flex-col">
          </div> */}
            {/* <div>OR,</div> */}
          {/* Right Side - Generate Button */}
          {/* <div className="flex flex-col justify-center items-center p-8 bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 rounded-lg border-2 border-dashed border-purple-200 hover:border-purple-400 transition-all duration-300">
            <div className="text-center space-y-6">
              <div className="relative inline-block">
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-5 rounded-2xl shadow-lg">
                  <Wand2 className="w-10 h-10 text-white" strokeWidth={2} />
                </div>
                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full p-1 animate-pulse">
                  <Sparkles className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-800">
                  AI Answer Generation
                </h3>
                <p className="text-sm text-gray-600 max-w-xs mx-auto">
                  Let our AI automatically generate answer keys from your question paper
                </p>
              </div>

              <button
                onClick={handleGenerateAnswers}
                disabled={!questionFileUrl || isGenerating}
                className={`
                  relative px-8 py-4 rounded-xl font-semibold text-white
                  transition-all duration-300 transform hover:scale-105
                  shadow-lg hover:shadow-xl
                  ${
                    !questionFileUrl || isGenerating
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:via-indigo-700 hover:to-purple-800"
                  }
                  flex items-center gap-3
                `}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating Answers...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate Answers</span>
                  </>
                )}
              </button>

              {!questionFileUrl && (
                <p className="text-xs text-gray-500 italic">
                  Upload a question paper first to enable AI generation
                </p>
              )}
            </div>
          </div> */}
        </div>

        {/* Info Box */}
        {/* <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">💡 Tip:</span> You can either upload
            your own answer key or use our AI to generate one automatically. The
            AI-generated answers will be saved and can be reviewed later.
          </p>
        </div> */}
      </div>

      {/* Generated Questions Display */}
      {/* {generatedQuestions.length > 0 && (
        <div className="mt-8">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-t-lg">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              AI Generated Answers ({generatedQuestions.length} Questions)
            </h3>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-b-lg">
            <div className="max-h-[600px] overflow-y-auto">
              {generatedQuestions.map((q, index) => (
                <div 
                  key={q._id || index} 
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <div 
                    className="flex items-start justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleQuestion(index)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold text-sm">
                          Q{index + 1}
                        </span>
                        <p className="text-gray-800 font-medium">
                          {q.question}
                        </p>
                      </div>
                    </div>
                    
                    <button className="ml-4 text-gray-400 hover:text-gray-600">
                      {expandedQuestions[index] ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {expandedQuestions[index] && (
                    <div className="px-4 pb-4 bg-gray-50">
                      <div className="ml-11 p-4 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-start gap-2">
                          <span className="text-green-600 font-semibold text-sm">Answer:</span>
                          <p className="text-gray-700 flex-1">{q.answer}</p>
                        </div>
                        {q.score !== null && q.score !== undefined && (
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <span className="text-sm text-gray-500">
                              Score: <span className="font-semibold text-gray-700">{q.score}</span>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 border-t-0 rounded-b-lg p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                Total Questions: <span className="font-semibold text-gray-800">{generatedQuestions.length}</span>
              </span>
              <span className="text-gray-600">
                Click on any question to view the answer
              </span>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}