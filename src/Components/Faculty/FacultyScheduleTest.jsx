


import React, { useEffect, useState } from "react";
import BorderLabelInput from "../common/BorderLabelInput";

const FacultyScheduleTest = () => {
  const [schedule, setSchedule] = useState({
    startDate: "",
    startTime: "",
    endTime: "",
    duration: "",
  });

  useEffect(() => {
    if (schedule.startTime && schedule.endTime) {
      const start = convertToMinutes(schedule.startTime);
      const end = convertToMinutes(schedule.endTime);

      if (end > start) {
        const diff = end - start;
        const formatted = formatDuration(diff);
        setSchedule((prev) => ({ ...prev, duration: formatted }));
      } else {
        setSchedule((prev) => ({ ...prev, duration: "" }));
      }
    }
  }, [schedule.startTime, schedule.endTime]);

  // Helper: Convert "HH:MM" → minutes
  const convertToMinutes = (time) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  // Helper: Convert minutes → "H hr M min"
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
        value={schedule.testDate}
        onChange={(e) => setSchedule({ ...schedule, testDate: e.target.value })}
      />

      <BorderLabelInput
        label="Start Time"
        name="startTime"
        type="time"
        required
        value={schedule.startTime}
        onChange={(e) =>
          setSchedule({ ...schedule, startTime: e.target.value })
        }
      />
      {/*       
      <BorderLabelInput
        label="End Date"
        name="endDate"
        type="date"
        required
        value={schedule.endDate}
        onChange={(e) => setSchedule({ ...schedule, endDate: e.target.value })}
      /> */}

      <BorderLabelInput
        label="End Time"
        name="endTime"
        type="time"
        required
        value={schedule.endTime}
        onChange={(e) => setSchedule({ ...schedule, endTime: e.target.value })}
      />
      {/* <BorderLabelInput
        label="Duration (minutes)"
        name="duration"
        type="number"
        required
        value={schedule.duration}
        onChange={(e) => setSchedule({ ...schedule, duration: e.target.value })}
        placeholder="e.g. 60"
      /> */}

      <BorderLabelInput
        label="Duration"
        name="duration"
        type="text"
        required
        value={schedule.duration}
        placeholder="Auto calculated"
        disabled
      />
    </div>
  );
};

export default FacultyScheduleTest;
