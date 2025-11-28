import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FileText, Download, CheckCircle, Loader2 } from "lucide-react";
import FileUploader from "../../Components/common/FileUploader";
import { TestAPI } from "../../apis/Tests/TestCRUD";
import { useHttp } from "../../Hooks/useHttps";
import Lottie from "lottie-react";
import handLoading from "../../Lottie/handLoading.json";

export default function AdminViewTestDetails() {
  const { testId } = useParams();
  const token = sessionStorage.getItem("token");
  const httpHook = useHttp();

  const [testData, setTestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        setLoading(true);
        const response = await TestAPI.getTestById(httpHook, testId, token);

        if (response.success) {
          setTestData(response.data);
        } else {
          setError(response.message || "Failed to fetch test details");
        }
      } catch (err) {
        setError(
          err.message || "An error occurred while fetching test details"
        );
      } finally {
        setLoading(false);
      }
    };

    if (testId && token) {
      fetchTestDetails();
    }
  }, [testId, token]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    return timeString;
  };

  if (loading) {
    return (
      // <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      //   <div className="flex items-center gap-3">
      //     <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
      //     <span className="text-gray-600">Loading test details...</span>
      //   </div>
      // </div>
      <div className="flex flex-col items-center justify-center py-20">
        <Lottie
          animationData={handLoading}
          loop={true}
          style={{ width: "100%", maxWidth: 500, height: "auto" }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md">
          <div className="text-red-600 text-center">
            <p className="font-semibold mb-2">Error Loading Test</p>
            <p className="text-sm text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!testData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">No test data found</p>
      </div>
    );
  }

  return (
    <div className=" min-h-screen ">
      <div className="mx-auto  rounded-lg p-8 bg-white">
        {/* Header */}
        <div className="flex justify-between items-start m b-6 bg-[#6318910D] p-6 rounded-lg">
          <div>
            <h1 className="text-3xl font-bold text-[#6A1B7E] mb-2">
              {testData.subjectName} - {testData.testCategory}
            </h1>
            <div className="text-lg text-[#727272] text-base space-y-1">
              <p>
                {testData.numberOfQuestions} Questions • {testData.totalMarks}{" "}
                Marks • Duration:{" "}
                {testData.duration ? `${testData.duration} minutes` : "N/A"}
              </p>
              <p>Department: {testData.department}</p>
              <p>Semester: {testData.semester}</p>
              <p>Subject Code: {testData.subjectCode}</p>
              <p className="mt-2">
                <span
                  className={`inline-block py-1 rounded-lg text-sm capitalize px-5 font-medium ${
                    testData.status === "ongoing"
                      ? "bg-green-100 text-green-700"
                      : testData.status === "completed"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {testData.status}
                </span>
              </p>
            </div>
          </div>
          <div className="text-right text-sm text-gray-600">
            <p>
              Test Date: {formatDate(testData.testDate)} <br />
              Start Time: {formatTime(testData.startTime)} • End Time:{" "}
              {formatTime(testData.endTime)}
            </p>
            {testData?.createdBy && (
              <div className="flex items-center justify-end gap-2 mt-4">
                <div className="w-8 h-8 bg-[#6A1B7E] rounded-full flex items-center justify-center text-white font-medium">
                  {testData?.createdBy.name?.charAt(0) || "S"}
                </div>
                <div>
                  <p className="font-medium capitalize">{testData?.createdBy?.name || testData?.createdBy?.role}</p>
                  <p className="text-xs">{testData?.createdBy?.designation || testData?.createdBy?.campus}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Question PDF Upload */}
        {testData?.questionPdfUrl && (
          <div className="mb-6 mt-5">
            <h2 className="text-2xl font-bold mb-4 text-[#2A1B32]">
              Question Paper
            </h2>
            <FileUploader
              uploadedFileUrl={testData.questionPdfUrl}
              fileName={testData.questionPdfUrl.split("/").pop()}
              removeDelete={false}
              redirectOnClick={true}
            />
          </div>
        )}

        {/* Questions and Answers */}
        <div>
          <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4 mt-4 text-[#2A1B32]">
            Questions and Answers
          </h2>
            {testData?.questions && testData?.questions?.length > 0 ? (
              testData?.questions.map((question, index) => (
                <div
                  key={question._id}
                  className="border border-gray-200 rounded-lg p-6"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-medium">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <p className="font-medium text-lg text-gray-900">
                          {question.question}
                        </p>
                        <span className="bg-purple-100 font-semibold text-[#58076d] text-sm px-3 py-1 rounded-full whitespace-nowrap ml-4">
                          {question.score} marks
                        </span>
                      </div>

                      <div className="text-gray-600 text-sm leading-relaxed">
                        {/* <p className="font-medium text-gray-700 mb-2">Answer:</p> */}
                        <p className="text-justify whitespace-pre-wrap text-lg">
                          <span className="font-medium text-gray-700 mb-2">
                            Answer:{" "}
                          </span>
                          {question.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">
                No questions available for this test
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
