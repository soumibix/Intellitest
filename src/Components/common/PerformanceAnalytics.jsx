import React from 'react';

export default function PerformanceAnalytics({ students = [], totalMarks = 100, analysis = [] }) {
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
        
        return {
          label: label,
          students: item.students,
          color: color
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
      const count = students.filter(student => {
        const percentage = (student.marksObtained / totalMarks) * 100;
        if (range.min && range.max) {
          return percentage >= range.min && percentage < range.max;
        } else if (range.min) {
          return percentage >= range.min;
        } else {
          return percentage < range.max;
        }
      }).length;
      
      return {
        label: range.label,
        students: count,
        color: range.color
      };
    });
  };

  const data = getAnalysisData();
  const total = data.reduce((sum, item) => sum + item.students, 0);
  
  let currentAngle = -90;
  const segments = data.map(item => {
    const percentage = total > 0 ? (item.students / total) * 100 : 0;
    const angle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    const innerRadius = 60;
    const outerRadius = 110;
    
    const x1 = 120 + outerRadius * Math.cos(startRad);
    const y1 = 120 + outerRadius * Math.sin(startRad);
    const x2 = 120 + outerRadius * Math.cos(endRad);
    const y2 = 120 + outerRadius * Math.sin(endRad);
    const x3 = 120 + innerRadius * Math.cos(endRad);
    const y3 = 120 + innerRadius * Math.sin(endRad);
    const x4 = 120 + innerRadius * Math.cos(startRad);
    const y4 = 120 + innerRadius * Math.sin(startRad);
    
    const largeArc = angle > 180 ? 1 : 0;
    
    const pathData = [
      `M ${x1} ${y1}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}`,
      'Z'
    ].join(' ');

    const midAngle = (startAngle + endAngle) / 2;
    const textRadius = 85;
    const textX = 120 + textRadius * Math.cos((midAngle * Math.PI) / 180);
    const textY = 120 + textRadius * Math.sin((midAngle * Math.PI) / 180);

    return {
      pathData,
      percentage: percentage.toFixed(2),
      textX,
      textY,
      color: item.color
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
        <div className="flex-shrink-0">
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
                  />
                  {segment.percentage > 5 && (
                    <text
                      x={segment.textX}
                      y={segment.textY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-[10px] sm:text-xs font-bold fill-white"
                    >
                      {segment.percentage}%
                    </text>
                  )}
                </g>
              ))
            ) : (
              <text
                x="120"
                y="120"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm fill-gray-400"
              >
                No Data
              </text>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}