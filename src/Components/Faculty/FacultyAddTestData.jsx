import React from "react";
import BorderLabelInput from "../common/BorderLabelInput";

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
        options={[
          { label: "Computer Science and Technology", value: "CSE" },
          { label: "Information Technology", value: "IT" },
          { label: "Electronics and Communication", value: "ECE" },
        ]}
      />
      <BorderLabelInput
        label="Test Category"
        name="testCategory"
        type="select"
        required
        value={formData.testCategory || ""}
        onChange={handleChange}
        options={[
          { label: "Midterm Examination", value: "Midterm Examination" },
          { label: "Semester Final", value: "Semester Final" },
          { label: "Class Test", value: "Class Test" },
        ]}
      />
      <BorderLabelInput
        label="Semester"
        name="semester"
        type="select"
        required
        value={formData.semester || ""}
        onChange={handleChange}
        options={[
          { label: "1st Semester", value: "1st Semester" },
          { label: "2nd Semester", value: "2nd Semester" },
          { label: "3rd Semester", value: "3rd Semester" },
          { label: "4th Semester", value: "4th Semester" },
          { label: "5th Semester", value: "5th Semester" },
          { label: "6th Semester", value: "6th Semester" },
          { label: "7th Semester", value: "7th Semester" },
          { label: "8th Semester", value: "8th Semester" },
        ]}
      />
      <BorderLabelInput
        label="Subject Name"
        name="subjectName"
        type="select"
        required
        value={formData.subjectName || ""}
        onChange={handleChange}
        options={[
          { label: "Machine Learning", value: "Machine Learning" },
          { label: "Artificial Intelligence", value: "Artificial Intelligence" },
          { label: "Database Management System", value: "Database Management System" },
          { label: "Operating System", value: "Operating System" },
          { label: "Computer Network", value: "Computer Network" },
        ]}
      />
      <BorderLabelInput
        label="Number of Questions"
        name="numberOfQuestions"
        type="number"
        required
        value={formData.numberOfQuestions || ""}
        onChange={handleChange}
        placeholder="Enter number of questions"
      />
      <BorderLabelInput
        label="Subject Code"
        name="subjectCode"
        type="select"
        required
        value={formData.subjectCode || ""}
        onChange={handleChange}
        options={[
          { label: "PCCS572", value: "PCCS572" },
          { label: "PCCS501", value: "PCCS501" },
          { label: "PCCS601", value: "PCCS601" },
          { label: "CCSS123DE", value: "CCSS123DE" },
        ]}
      />
    </div>
  );
};