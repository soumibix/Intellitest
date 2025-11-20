import React from "react";
import BorderLabelInput from "../common/BorderLabelInput";

const FacultyScheduleTest = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    const updated = {
      ...formData,
      [name]: value,
    };

    // Auto-calculate duration in minutes
    if (updated.startTime && updated.endTime) {
      const start = convertToMinutes(updated.startTime);
      const end = convertToMinutes(updated.endTime);

      if (end > start) {
        updated.duration = end - start; // ← store plain minutes
      } else {
        updated.duration = ""; // invalid time range
      }
    }

    setFormData(updated);
  };

  const convertToMinutes = (time) => {
    if (!time) return 0;
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <BorderLabelInput
        label="Test Date"
        name="testDate"
        type="date"
        required
        value={formData.testDate || ""}
        onChange={handleChange}
      />

      <BorderLabelInput
        label="Start Time"
        name="startTime"
        type="time"
        required
        value={formData.startTime || ""}
        onChange={handleChange}
      />

      <BorderLabelInput
        label="End Time"
        name="endTime"
        type="time"
        required
        value={formData.endTime || ""}
        onChange={handleChange}
      />

      <BorderLabelInput
        label="Duration (minutes)"
        name="duration"
        type="number"
        required
        value={formData.duration || ""}
        placeholder="Auto calculated"
        disabled
      />
    </div>
  );
};

export default FacultyScheduleTest;
