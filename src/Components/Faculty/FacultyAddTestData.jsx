import React from "react";
import BorderLabelInput from "../common/BorderLabelInput";
import { departmentOptions, semesterOptions, subjectOptions, testCategoryOptions } from "../../Config/dummyData";

export const FacultyAddTestData = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Create new object with updated field
    const updatedFormData = { 
      ...formData, 
      [name]: value 
    };
    // Pass the complete updated object
    setFormData(updatedFormData);
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <BorderLabelInput
        label="Department"
        name="department"
        type="select"
        required
        value={formData.department || ""}
        onChange={handleChange}
        options={departmentOptions}
      />
      <BorderLabelInput
        label="Test Category"
        name="testCategory"
        type="select"
        required
        value={formData.testCategory || ""}
        onChange={handleChange}
        options={testCategoryOptions}
      />
      <BorderLabelInput
        label="Semester"
        name="semester"
        type="select"
        required
        value={formData.semester || ""}
        onChange={handleChange}
        options={semesterOptions}
      />
        {/* <BorderLabelInput
          label="Total Marks"
          name="totalMarks"
          type="number"
          required
          value={formData.totalMarks || ""}
          onChange={handleChange}
          placeholder="Enter total marks"
        /> */}
      <BorderLabelInput
        label="Subject Name"
        name="subjectName"
        type="text"
        required
        value={formData.subjectName || ""}
        onChange={handleChange}
        placeholder="Enter Full Subject Name"
        // options={subjectOptions}
      />
      <BorderLabelInput
        label="Subject Code"
        name="subjectCode"
        type="text"
        required
        value={formData.subjectCode || ""}
        onChange={handleChange}
        placeholder="Enter Subject Code"
      />
      {/* <BorderLabelInput
        label="Number of Questions"
        name="numberOfQuestions"
        type="number"
        required
        value={formData.numberOfQuestions || ""}
        onChange={handleChange}
        placeholder="Enter number of questions"
      /> */}
    </div>
  );
};