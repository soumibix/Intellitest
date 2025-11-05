import React from 'react';

export default function PerformanceAnalytics() {
  const data = [
    { label: '> 90', students: 12, color: '#3b82f6' },
    { label: '75-90', students: 70, color: '#fbbf24' },
    { label: '50-75', students: 20, color: '#fb923c' },
    { label: '< 50', students: 18, color: '#ef4444' }
  ];

  const total = data.reduce((sum, item) => sum + item.students, 0);
  
  let currentAngle = -90;
  const segments = data.map(item => {
    const percentage = (item.students / total) * 100;
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
    <div className="">
      <div className="bg-white rounded-md p-10 w-full ">
        <h2 className="text-2xl font-bold text-[#3D3D3D] ">Performance Analytics</h2>
        
        <div className="flex items-center justify-between gap-12">
          <div className="space-y-5">
            <div className="flex items-center justify-around gap-24 text-sm font-medium text-[#475569] mb-3 px-4">
              <span>Score</span>
              <span>No. of Students</span>
            </div>
            
            {data.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between gap-8">
                <div className="flex items-center gap-2 min-w-[80px]">
                  <div 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-700 font-medium text-center">{item.label}</span>
                </div>
                <span className="text-gray-700 font-semibold text-center w-full">{item.students}</span>
              </div>
            ))}
          </div>

          <div className="">
            <svg width="240" height="240" viewBox="0 0 240 240">
              {segments.map((segment, idx) => (
                <g key={idx}>
                  <path
                    d={segment.pathData}
                    fill={segment.color}
                  />
                  <text
                    x={segment.textX}
                    y={segment.textY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs font-bold fill-white"
                  >
                    {segment.percentage}%
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}