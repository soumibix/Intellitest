import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Default colors for bars
const barColors = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#3b82f6",
  "#06b6d4",
  "#10b981",
];

// Performance Chart Component
export const PerformanceChart = ({ 
  data, 
  onYearChange, 
  selectedYear = "2025" 
}) => {
  const [chartData, setChartData] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    // Transform API data to chart format
    if (data && data.data) {
      const apiData = data.data;
      const total = data.totalStudents || 0;
      
      setTotalStudents(total);
      
      // Transform backend data structure to chart format
      const transformedData = [
        { 
          range: "Below 50", 
          students: apiData.below50 || 0,
          percentage: total > 0 ? `${((apiData.below50 / total) * 100).toFixed(1)}%` : "0%"
        },
        { 
          range: "50-60", 
          students: apiData.fiftyToSixty || 0,
          percentage: total > 0 ? `${((apiData.fiftyToSixty / total) * 100).toFixed(1)}%` : "0%"
        },
        { 
          range: "60-70", 
          students: apiData.sixtyToSeventy || 0,
          percentage: total > 0 ? `${((apiData.sixtyToSeventy / total) * 100).toFixed(1)}%` : "0%"
        },
        { 
          range: "70-80", 
          students: apiData.seventyToEighty || 0,
          percentage: total > 0 ? `${((apiData.seventyToEighty / total) * 100).toFixed(1)}%` : "0%"
        },
        { 
          range: "80-90", 
          students: apiData.eightyToNinety || 0,
          percentage: total > 0 ? `${((apiData.eightyToNinety / total) * 100).toFixed(1)}%` : "0%"
        },
        { 
          range: "Above 90", 
          students: apiData.above90 || 0,
          percentage: total > 0 ? `${((apiData.above90 / total) * 100).toFixed(1)}%` : "0%"
        },
      ];
      
      setChartData(transformedData);
    } else {
      // Set empty data if no data available
      setChartData([
        { range: "Below 50", students: 0, percentage: "0%" },
        { range: "50-60", students: 0, percentage: "0%" },
        { range: "60-70", students: 0, percentage: "0%" },
        { range: "70-80", students: 0, percentage: "0%" },
        { range: "80-90", students: 0, percentage: "0%" },
        { range: "Above 90", students: 0, percentage: "0%" },
      ]);
      setTotalStudents(0);
    }
  }, [data]);

  const handleYearChange = (e) => {
    const year = e.target.value;
    if (onYearChange) {
      onYearChange(year);
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold">{payload[0].payload.range}</p>
          <p className="text-sm text-gray-600">
            {payload[0].value} Students
          </p>
          <p className="text-xs text-gray-500">
            Percentage: {payload[0].payload.percentage}
          </p>
        </div>
      );
    }
    return null;
  };

  // Calculate highest bar for info display
  const highestBar = chartData.reduce(
    (max, item) => (item.students > max.students ? item : max),
    chartData[0] || { students: 0, range: "", percentage: "0%" }
  );

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Student Performance Distribution
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Total Students: {totalStudents}
          </p>
        </div>
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6B21A8]"
        >
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>
      </div>

      <div className="relative">
        {/* Display info for highest bar */}
        {/* {highestBar && highestBar.students > 0 && (
          <div className="absolute top-0 left-12 bg-purple-50 px-3 py-1 rounded-md z-10">
            <p className="text-xs text-purple-600 font-medium">
              {highestBar.range}
            </p>
            <p className="text-lg font-bold text-purple-700">
              {highestBar.students}
            </p>
            <p className="text-xs text-purple-500">{highestBar.percentage}</p>
          </div>
        )} */}

        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="range"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={{ stroke: "#e5e7eb" }}
            />
            <YAxis
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={{ stroke: "#e5e7eb" }}
              label={{
                value: "Students",
                angle: -90,
                position: "insideLeft",
                fill: "#6b7280",
              }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(147, 51, 234, 0.1)" }}
            />
            <Bar dataKey="students" radius={[8, 8, 0, 0]} maxBarSize={80}>
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={barColors[index % barColors.length]} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Show message if no data */}
        {totalStudents === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
            <p className="text-gray-400 text-sm">No student data available for {selectedYear}</p>
          </div>
        )}
      </div>
    </div>
  );
};