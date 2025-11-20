import React, { useState } from "react";
import BorderLabelInput from "../common/BorderLabelInput";
import { departmentOptions, semesterOptions, subjectOptions, subjectOptionsWithCodes, testCategoryOptions } from "../../Config/dummyData";

export const AddTestData = () => {
  const [formData, setFormData] = useState({
    department: "",
    semester: "",
    subjectName: "",
    subjectCode: "",
    testCategory: "",
    numberOfQuestions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <BorderLabelInput
        label="Department"
        name="department"
        type="select"
        required
        value={formData.department}
        onChange={handleChange}
        // options={[
        //   { label: "Computer Science and Technology", value: "cst" },
        //   { label: "Information Technology", value: "it" },
        //   { label: "Electronics and Communication", value: "ece" },
        // ]}
        options={departmentOptions}
      />

      <BorderLabelInput
        label="Test Category"
        name="testCategory"
        type="select"
        required
        value={formData.testCategory}
        onChange={handleChange}
        options={testCategoryOptions}
      />

      <BorderLabelInput
        label="Semester"
        name="semester"
        type="select"
        required
        value={formData.semester}
        onChange={handleChange}
        options={semesterOptions}
      />
      <BorderLabelInput
        label="Total Marks"
        name="totalMarks"
        type="number"
        required
        value={formData.totalMarks || ""}
        onChange={handleChange}
        placeholder="Enter total marks"
      />

      <BorderLabelInput
        label="Subject Name"
        name="subjectName"
        type="select"
        required
        value={formData.subjectName}
        onChange={handleChange}
        options={subjectOptions}
      />

      <BorderLabelInput
        label="Subject Code"
        name="subjectCode"
        type="select"
        required
        value={formData.subjectCode}
        onChange={handleChange}
        options={subjectOptionsWithCodes}
      />
      
      <BorderLabelInput
        label="Number of Questions"
        name="numberOfQuestions"
        type="number"
        required
        value={formData.numberOfQuestions}
        onChange={handleChange}
        placeholder="Enter number of questions"
      />

    </div>
  );
};