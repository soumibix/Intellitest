import React, { useEffect, useState } from "react";
import BorderLabelInput from "../common/BorderLabelInput";

const FacultyScheduleTest = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      
      // Auto-calculate duration
      if (updated.startTime && updated.endTime) {
        const start = convertToMinutes(updated.startTime);
        const end = convertToMinutes(updated.endTime);
        if (end > start) {
          const diff = end - start;
          updated.duration = formatDuration(diff);
        }
      }
      
      return updated;
    });
  };

  const convertToMinutes = (time) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  const formatDuration = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hrs > 0 && mins > 0) return `${hrs} hr ${mins} min`;
    if (hrs > 0) return `${hrs} hr`;
    return `${mins} min`;
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <BorderLabelInput
        label="Test Date"
        name="testDate"
        type="date"
        required
        value={formData.testDate}
        onChange={handleChange}
      />
      <BorderLabelInput
        label="Start Time"
        name="startTime"
        type="time"
        required
        value={formData.startTime}
        onChange={handleChange}
      />
      <BorderLabelInput
        label="End Time"
        name="endTime"
        type="time"
        required
        value={formData.endTime}
        onChange={handleChange}
      />
      <BorderLabelInput
        label="Duration"
        name="duration"
        type="text"
        required
        value={formData.duration}
        placeholder="Auto calculated"
        disabled
      />
    </div>
  );
};

export default FacultyScheduleTest;
