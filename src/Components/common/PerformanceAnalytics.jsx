import React, { useEffect, useState } from 'react';

export default function PerformanceAnalytics({ students = [], totalMarks = 100, analysis = [] }) {
  const [hoveredSegment, setHoveredSegment] = useState(null);

  // Use analysis data from props if available, otherwise calculate from students
  const getAnalysisData = () => {
    if (analysis && analysis.length > 0) {
      return analysis.map(item => {
        let color = '#3b82f6';
        let label = item.label;
        
        if (label.includes('> 90')) color = '#3b82f6';
        else if (label.includes('75')) color = '#fbbf24';
        else if (label.includes('50')) color = '#fb923c';
        else if (label.includes('< 50')) color = '#ef4444';
        
        // Get students in this range
        const studentsInRange = students.filter(student => {
          const percentage = (student.marksObtained / totalMarks) * 100;
          if (label.includes('> 90')) return percentage >= 90;
          else if (label.includes('75')) return percentage >= 75 && percentage < 90;
          else if (label.includes('50')) return percentage >= 50 && percentage < 75;
          else if (label.includes('< 50')) return percentage < 50;
          return false;
        });
        
        return {
          label: label,
          students: item.students,
          color: color,
          studentList: studentsInRange
        };
      });
    }

    // Fallback calculation if no analysis provided
    const ranges = [
      { label: '> 90%', min: 90, color: '#3b82f6' },
      { label: '75–90%', min: 75, max: 90, color: '#fbbf24' },
      { label: '50–75%', min: 50, max: 75, color: '#fb923c' },
      { label: '< 50%', max: 50, color: '#ef4444' }
    ];
    
    return ranges.map(range => {
      const studentsInRange = students.filter(student => {
        const percentage = (student.marksObtained / totalMarks) * 100;
        if (range.min && range.max) {
          return percentage >= range.min && percentage < range.max;
        } else if (range.min) {
          return percentage >= range.min;
        } else {
          return percentage < range.max;
        }
      });
      
      return {
        label: range.label,
        students: studentsInRange.length,
        color: range.color,
        studentList: studentsInRange
      };
    });
  };

  const data = getAnalysisData();
  const total = data.reduce((sum, item) => sum + item.students, 0);

  useEffect(() => {
    console.log('dghhvbhv', students, total)
  }, [students])
  
  let currentAngle = -90;
  const segments = data.map(item => {
    const percentage = total > 0 ? (item.students / total) * 100 : 0;
    const angle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    const innerRadius = 60;
    const outerRadius = 110;
    
    // Handle full circle case (100% or very close to it)
    let pathData;
    if (angle >= 359.99) {
      // Draw two semicircles to create a full donut
      pathData = [
        `M 120 ${120 - outerRadius}`,
        `A ${outerRadius} ${outerRadius} 0 0 1 120 ${120 + outerRadius}`,
        `A ${outerRadius} ${outerRadius} 0 0 1 120 ${120 - outerRadius}`,
        `M 120 ${120 - innerRadius}`,
        `A ${innerRadius} ${innerRadius} 0 0 0 120 ${120 + innerRadius}`,
        `A ${innerRadius} ${innerRadius} 0 0 0 120 ${120 - innerRadius}`,
        'Z'
      ].join(' ');
    } else {
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      
      const x1 = 120 + outerRadius * Math.cos(startRad);
      const y1 = 120 + outerRadius * Math.sin(startRad);
      const x2 = 120 + outerRadius * Math.cos(endRad);
      const y2 = 120 + outerRadius * Math.sin(endRad);
      const x3 = 120 + innerRadius * Math.cos(endRad);
      const y3 = 120 + innerRadius * Math.sin(endRad);
      const x4 = 120 + innerRadius * Math.cos(startRad);
      const y4 = 120 + innerRadius * Math.sin(startRad);
      
      const largeArc = angle > 180 ? 1 : 0;
      
      pathData = [
        `M ${x1} ${y1}`,
        `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2}`,
        `L ${x3} ${y3}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}`,
        'Z'
      ].join(' ');
    }

    const midAngle = (startAngle + endAngle) / 2;
    const textRadius = 85;
    const textX = 120 + textRadius * Math.cos((midAngle * Math.PI) / 180);
    const textY = 120 + textRadius * Math.sin((midAngle * Math.PI) / 180);

    return {
      pathData,
      percentage: percentage.toFixed(2),
      textX,
      textY,
      color: item.color,
      studentList: item.studentList || [],
      label: item.label,
      studentCount: item.students
    };
  });

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-10 shadow">
      <h2 className="text-xl sm:text-2xl font-bold text-[#3D3D3D] mb-4 sm:mb-6">
        Performance Analytics
      </h2>
      
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12">
        {/* Legend */}
        <div className="w-full lg:w-auto">
          <div className="flex items-center justify-between sm:justify-around gap-4 sm:gap-24 text-xs sm:text-sm font-medium text-[#475569] mb-3 px-2 sm:px-4">
            <span>Score</span>
            <span>No. of Students</span>
          </div>
          
          <div className="space-y-3 sm:space-y-5">
            {data.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between gap-4 sm:gap-8">
                <div className="flex items-center gap-2 min-w-[70px] sm:min-w-[80px]">
                  <div 
                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm sm:text-base text-gray-700 font-medium">
                    {item.label}
                  </span>
                </div>
                <span className="text-sm sm:text-base text-gray-700 font-semibold text-right min-w-[40px]">
                  {item.students}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="flex-shrink-0 relative">
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 240 240"
            className="w-48 h-48 sm:w-56 sm:h-56 lg:w-60 lg:h-60"
          >
            {total > 0 ? (
              segments.map((segment, idx) => (
                <g key={idx}>
                  <path
                    d={segment.pathData}
                    fill={segment.color}
                    className="transition-opacity cursor-pointer"
                    style={{ opacity: hoveredSegment === idx ? 0.8 : 1 }}
                    onMouseEnter={() => setHoveredSegment(idx)}
                    onMouseLeave={() => setHoveredSegment(null)}
                  />
                  {segment.percentage > 5 && (
                    <text
                      x={segment.textX}
                      y={segment.textY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-[10px] sm:text-xs font-bold fill-white pointer-events-none"
                    >
                      {segment.percentage}%
                    </text>
                  )}
                </g>
              ))
            ) : (
              <>
                {/* Empty state - gray donut ring */}
                <path
                  d={[
                    `M 120 ${120 - 110}`,
                    `A 110 110 0 0 1 120 ${120 + 110}`,
                    `A 110 110 0 0 1 120 ${120 - 110}`,
                    `M 120 ${120 - 60}`,
                    `A 60 60 0 0 0 120 ${120 + 60}`,
                    `A 60 60 0 0 0 120 ${120 - 60}`,
                    'Z'
                  ].join(' ')}
                  fill="#E5E7EB"
                />
                <text
                  x="120"
                  y="120"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-sm font-medium fill-gray-400"
                >
                  No Data
                </text>
              </>
            )}
          </svg>
          
          {/* Tooltip */}
          {hoveredSegment !== null && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg border border-gray-200 p-3 pointer-events-none z-10 max-w-xs w-64">
              <div className="text-sm font-semibold text-gray-800">
                {segments[hoveredSegment].label} - {segments[hoveredSegment].studentCount} Student{segments[hoveredSegment].studentCount !== 1 ? 's' : ''}
              </div>
              <div className="max-h-32 overflow-y-auto space-y-1">
                {/* {segments[hoveredSegment].studentList.length > 0 ? (
                  segments[hoveredSegment].studentList.map((student, idx) => (
                    <div key={idx} className="text-xs text-gray-600 flex justify-between gap-2">
                      <span className="truncate">{student.name}</span>
                      <span className="font-medium whitespace-nowrap">{student.marksObtained}/{totalMarks}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-gray-400 italic">No students in this range</div>
                )} */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}