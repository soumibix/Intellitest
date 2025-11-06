import React, { useState } from 'react'
import BorderLabelInput from '../common/BorderLabelInput';

const FacultyScheduleTest = () => {
  const [schedule, setSchedule] = useState({
    startDate: '',
    startTime: '',
    duration: '',
    endDate: '',
  });

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
        onChange={(e) => setSchedule({ ...schedule, startTime: e.target.value })}
      />
      
      <BorderLabelInput
        label="Duration (minutes)"
        name="duration"
        type="number"
        required
        value={schedule.duration}
        onChange={(e) => setSchedule({ ...schedule, duration: e.target.value })}
        placeholder="e.g., 60"
      />
      
      <BorderLabelInput
        label="End Date"
        name="endDate"
        type="date"
        required
        value={schedule.endDate}
        onChange={(e) => setSchedule({ ...schedule, endDate: e.target.value })}
      />
    </div>
  );
};

export default FacultyScheduleTest