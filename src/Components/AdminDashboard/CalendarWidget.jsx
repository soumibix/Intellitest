import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, Activity } from "lucide-react";

// Calendar Component with API Integration
export const CalendarWidget = ({ 
  examData, 
  onMonthChange, 
  onDateClick,
  selectedYear,
  currentDate 
}) => {
  const today = new Date();
  const [currentDisplayDate, setCurrentDisplayDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(null);
  const [examsByDate, setExamsByDate] = useState({});
  const [selectedDateExams, setSelectedDateExams] = useState([]);

  // Transform API data to date-keyed object
  useEffect(() => {
    if (examData && Array.isArray(examData)) {
      const examsMap = {};
      
      examData.forEach(exam => {
        // Assuming API returns exams with date field
        // Adjust based on your actual API response structure
        const dateKey = exam.date || exam.examDate || exam.scheduledDate || exam.testDate;
        
        if (dateKey) {
          const formattedDate = formatDateKey(dateKey);
          
          if (!examsMap[formattedDate]) {
            examsMap[formattedDate] = [];
          }
          
          examsMap[formattedDate].push({
            id: exam.id || exam._id,
            name: exam.name || exam.testName || exam.title || exam.testTitle,
            time: exam.time || exam.startTime || exam.scheduledTime || "TBA",
            category: exam.testCategory || exam.category,
            department: exam.department,
            semester: exam.semester
          });
        }
      });
      
      setExamsByDate(examsMap);
    } else {
      setExamsByDate({});
    }
  }, [examData]);

  // Format date to YYYY-MM-DD
  const formatDateKey = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const daysInMonth = new Date(
    currentDisplayDate.getFullYear(),
    currentDisplayDate.getMonth() + 1,
    0
  ).getDate();
  
  const firstDayOfMonth = new Date(
    currentDisplayDate.getFullYear(),
    currentDisplayDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  // Adjust for Monday start
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const days = [];
  for (let i = 0; i < adjustedFirstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const goToPrevMonth = () => {
    const newDate = new Date(
      currentDisplayDate.getFullYear(), 
      currentDisplayDate.getMonth() - 1, 
      1
    );
    setCurrentDisplayDate(newDate);
    setSelectedDate(null);
    
    if (onMonthChange) {
      // Pass year and month to parent
      onMonthChange(newDate.getFullYear(), newDate.getMonth() + 1);
    }
  };

  const goToNextMonth = () => {
    const newDate = new Date(
      currentDisplayDate.getFullYear(), 
      currentDisplayDate.getMonth() + 1, 
      1
    );
    setCurrentDisplayDate(newDate);
    setSelectedDate(null);
    
    if (onMonthChange) {
      // Pass year and month to parent
      onMonthChange(newDate.getFullYear(), newDate.getMonth() + 1);
    }
  };

  const handleDateClick = async (day) => {
    if (day) {
      const dateKey = `${currentDisplayDate.getFullYear()}-${String(currentDisplayDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      setSelectedDate(dateKey);
      
      // If onDateClick callback is provided, fetch specific date data
      if (onDateClick) {
        const year = currentDisplayDate.getFullYear();
        const month = currentDisplayDate.getMonth() + 1;
        const exams = await onDateClick(year, month, day);
        
        if (exams && Array.isArray(exams)) {
          // Transform the exams data
          const transformedExams = exams.map(exam => ({
            id: exam.id || exam._id,
            name: exam.name || exam.testName || exam.title || exam.testTitle,
            time: exam.time || exam.startTime || exam.scheduledTime || "TBA",
            category: exam.testCategory || exam.category,
            department: exam.department,
            semester: exam.semester
          }));
          setSelectedDateExams(transformedExams);
        } else {
          setSelectedDateExams(examsByDate[dateKey] || []);
        }
      } else {
        setSelectedDateExams(examsByDate[dateKey] || []);
      }
    }
  };

  const getExamsForDate = (dateKey) => {
    return examsByDate[dateKey] || [];
  };

  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const todaysExams = getExamsForDate(todayKey);

  const hasExams = (day) => {
    if (!day) return false;
    const dateKey = `${currentDisplayDate.getFullYear()}-${String(currentDisplayDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return examsByDate[dateKey] && examsByDate[dateKey].length > 0;
  };

  const isToday = (day) => {
    if (!day) return false;
    const dateKey = `${currentDisplayDate.getFullYear()}-${String(currentDisplayDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return dateKey === todayKey;
  };

  // Get exams to display (either from selection or from local state)
  const displayExams = selectedDate && selectedDateExams.length > 0 
    ? selectedDateExams 
    : selectedDate 
    ? examsByDate[selectedDate] || [] 
    : [];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPrevMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h3 className="text-lg font-semibold text-gray-900">
          {monthNames[currentDisplayDate.getMonth()]} {currentDisplayDate.getFullYear()}
        </h3>
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {days.map((day, index) => {
          const dateKey = day 
            ? `${currentDisplayDate.getFullYear()}-${String(currentDisplayDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` 
            : null;
          const isSelected = dateKey === selectedDate;
          const isTodayDate = isToday(day);
          const hasExamsOnDay = hasExams(day);

          return (
            <div
              key={index}
              onClick={() => handleDateClick(day)}
              className={`
                aspect-square flex items-center justify-center text-sm rounded-lg relative
                ${day === null ? "" : "hover:bg-gray-100 cursor-pointer transition-colors"}
                ${isSelected ? "bg-[#6B21A8] text-white font-semibold" : ""}
                ${isTodayDate && !isSelected ? "bg-purple-100 text-[#6B21A8] font-semibold hover:bg-purple-200" : ""}
                ${!isSelected && !isTodayDate ? "text-gray-700" : ""}
              `}
            >
              {day}
              {hasExamsOnDay && !isSelected && (
                <div className="absolute bottom-1 w-1 h-1 rounded-full bg-[#6B21A8]"></div>
              )}
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        {selectedDate && displayExams.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-600" />
              Exams on {new Date(selectedDate).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {displayExams.map((exam, idx) => (
                <div 
                  key={exam.id || idx} 
                  className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700 font-medium truncate">
                      {exam.name}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <p className="text-xs text-gray-500">{exam.time}</p>
                      {exam.category && (
                        <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                          {exam.category}
                        </span>
                      )}
                      {exam.department && (
                        <span className="text-xs text-gray-600 bg-gray-50 px-2 py-0.5 rounded">
                          {exam.department}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-600" />
            Today's Exams
          </h4>
          {todaysExams.length > 0 ? (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {todaysExams.map((exam, idx) => (
                <div 
                  key={exam.id || idx} 
                  className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700 font-medium truncate">
                      {exam.name}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <p className="text-xs text-gray-500">{exam.time}</p>
                      {exam.category && (
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">
                          {exam.category}
                        </span>
                      )}
                      {exam.department && (
                        <span className="text-xs text-gray-600 bg-gray-50 px-2 py-0.5 rounded">
                          {exam.department}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">No exams scheduled for today</p>
          )}
        </div>
      </div>
    </div>
  );
};