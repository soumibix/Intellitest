import React, { useState } from "react";
import BorderLabelInput from "../common/BorderLabelInput";

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
        options={[
          { label: "Computer Science and Technology", value: "cst" },
          { label: "Information Technology", value: "it" },
          { label: "Electronics and Communication", value: "ece" },
        ]}
      />

      <BorderLabelInput
        label="Test Category"
        name="testCategory"
        type="select"
        required
        value={formData.testCategory}
        onChange={handleChange}
        options={[
          { label: "Midterm Examination", value: "midterm" },
          { label: "Final Examination", value: "final" },
          { label: "Class Test", value: "classtest" },
        ]}
      />

      <BorderLabelInput
        label="Semester"
        name="semester"
        type="select"
        required
        value={formData.semester}
        onChange={handleChange}
        options={[
          { label: "1st Semester", value: "1" },
          { label: "2nd Semester", value: "2" },
          { label: "3rd Semester", value: "3" },
          { label: "4th Semester", value: "4" },
          { label: "5th Semester", value: "5" },
          { label: "6th Semester", value: "6" },
          { label: "7th Semester", value: "7" },
          { label: "8th Semester", value: "8" },
        ]}
      />

      <BorderLabelInput
        label="Subject Name"
        name="subjectName"
        type="select"
        required
        value={formData.subjectName}
        onChange={handleChange}
        options={[
          { label: "Machine Learning", value: "machine_learning" },
          { label: "Artificial Intelligence", value: "ai" },
          { label: "Database Management System", value: "dbms" },
          { label: "Operating System", value: "os" },
        ]}
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

      <BorderLabelInput
        label="Subject Code"
        name="subjectCode"
        type="select"
        required
        value={formData.subjectCode}
        onChange={handleChange}
        options={[
          { label: "PCCS572", value: "PCCS572" },
          { label: "PCCS501", value: "PCCS501" },
          { label: "PCCS601", value: "PCCS601" },
        ]}
      />
    </div>
  );
};