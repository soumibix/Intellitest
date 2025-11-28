import React, { useState, useEffect } from "react";
import { 
  BookCheck, 
  Calendar1, 
  ClipboardList, 
  Radio 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StatsCard } from "../../Components/AdminDashboard/StatsCard";
import { PerformanceChart } from "../../Components/AdminDashboard/PerformanceChart";
import { CalendarWidget } from "../../Components/AdminDashboard/CalendarWidget";
import { adminDashboardAPI } from "../../apis/Admin/adminDashboard";
import { useHttp } from "../../Hooks/useHttps";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const httpHook = useHttp();
  
  // Get current date values
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();
  
  // State management
  const [statsData, setStatsData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState({
    stats: true,
    chart: true,
    exams: true
  });
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [selectedMonth, setSelectedMonth] = useState(currentMonth.toString());
  const [selectedDate, setSelectedDate] = useState(currentDay.toString());
  
  // Get token from localStorage or context
  const token = localStorage.getItem("adminToken") || "";

  // Fetch test counts for stats cards
  useEffect(() => {
    fetchTestCounts();
  }, []);

  // Fetch chart data when year changes
  useEffect(() => {
    fetchChartData(selectedYear);
  }, [selectedYear]);

  // Fetch exam data when year, month, or date changes
  useEffect(() => {
    fetchExamData(selectedYear, selectedMonth, selectedDate);
  }, [selectedYear, selectedMonth, selectedDate]);

  const fetchTestCounts = async () => {
    try {
      setLoading(prev => ({ ...prev, stats: true }));
      const response = await adminDashboardAPI.getTestCounts(httpHook, token);
      
      if (response.success) {
        setStatsData(response.data);
      } else {
        console.error("Failed to fetch test counts:", response.message);
      }
    } catch (error) {
      console.error("Error fetching test counts:", error);
    } finally {
      setLoading(prev => ({ ...prev, stats: false }));
    }
  };

  const fetchChartData = async (year) => {
    try {
      setLoading(prev => ({ ...prev, chart: true }));
      const response = await adminDashboardAPI.getStudentScoreChartData(
        httpHook, 
        token, 
        year
      );
      
      if (response.success) {
        setChartData(response);
      } else {
        console.error("Failed to fetch chart data:", response.message);
        setChartData(null);
      }
    } catch (error) {
      console.error("Error fetching chart data:", error);
      setChartData(null);
    } finally {
      setLoading(prev => ({ ...prev, chart: false }));
    }
  };

  const fetchExamData = async (year, month, date) => {
    try {
      setLoading(prev => ({ ...prev, exams: true }));
      
      // Always pass year, month, and date - all are required
      const response = await adminDashboardAPI.getExamsByDate(
        httpHook, 
        token, 
        year, 
        month, 
        date
      );
      
      if (response.success) {
        setExamData(response.data);
      } else {
        console.error("Failed to fetch exam data:", response.message);
        setExamData([]);
      }
    } catch (error) {
      console.error("Error fetching exam data:", error);
      setExamData([]);
    } finally {
      setLoading(prev => ({ ...prev, exams: false }));
    }
  };

  // Fetch exams for a specific date when clicked
  const handleDateClick = async (year, month, date) => {
    try {
      const response = await adminDashboardAPI.getExamsByDate(
        httpHook,
        token,
        year,
        month,
        date
      );
      
      if (response.success) {
        return response.data;
      }
      return [];
    } catch (error) {
      console.error("Error fetching exams for date:", error);
      return [];
    }
  };

  // Handle year change from chart
  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  // Handle month change from calendar
  const handleMonthChange = (year, month) => {
    setSelectedYear(year.toString());
    setSelectedMonth(month.toString());
    // Keep the current date when changing months
    // If you want to reset to a specific date, change this
    setSelectedDate(currentDay.toString());
  };

  // Map API response to stats configuration
  const getStatsConfig = () => {
    const data = statsData || {};
    
    return [
      {
        id: 1,
        title: "Tests Created",
        value: data.totalTests || "0",
        description: "number of completed, upcoming and ongoing tests.",
        icon: ClipboardList,
        iconBg: "bg-[#6B21A8]"
      },
      {
        id: 2,
        title: "Upcoming Tests",
        value: data.upcoming || "0",
        description: "Tests that are scheduled to publish soon",
        icon: Calendar1,
        iconBg: "bg-[#6B21A8]"
      },
      {
        id: 3,
        title: "Ongoing Tests",
        value: data.ongoing || "0",
        description: "Live tests currently active for students",
        icon: Radio,
        iconBg: "bg-[#6B21A8]"
      },
      {
        id: 4,
        title: "Completed Tests",
        value: data.completed || "0",
        description: "Count of tests successfully submitted",
        icon: BookCheck,
        iconBg: "bg-[#6B21A8]"
      }
    ];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[100rem] mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading.stats ? (
            // Loading skeleton for stats cards
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-xl px-6 py-6 shadow-sm border border-gray-100 animate-pulse">
                <div className="h-20"></div>
              </div>
            ))
          ) : (
            getStatsConfig().map((stat) => (
              <StatsCard
                key={stat.id}
                title={stat.title}
                value={stat.value}
                description={stat.description}
                icon={stat.icon}
                iconBg={stat.iconBg}
              />
            ))
          )}
        </div>

        {/* Main Content */}
        <div className="w-full flex flex-col lg:flex-row gap-6">
          {/* Left Section */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            {/* Create New Test Banner */}
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    Create New Test — Begin with Basic Details
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Fill in the necessary information to start building your test.
                  </p>
                </div>
                <button 
                  className="bg-[#6B21A8] hover:bg-[#3e056d] text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors cursor-pointer" 
                  onClick={() => navigate('/admin/test-details')}
                >
                  Create New Test
                  <span className="text-xl">+</span>
                </button>
              </div>
            </div>

            {/* Performance Chart */}
            {loading.chart ? (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-[450px] animate-pulse">
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-400">Loading chart data...</p>
                </div>
              </div>
            ) : (
              <PerformanceChart 
                data={chartData}
                onYearChange={handleYearChange}
                selectedYear={selectedYear}
              />
            )}
          </div>

          {/* Right Section - Calendar */}
          <div className="w-full lg:w-1/3">
            {loading.exams ? (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-[600px] animate-pulse">
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-400">Loading calendar...</p>
                </div>
              </div>
            ) : (
              <CalendarWidget 
                examData={examData}
                onMonthChange={handleMonthChange}
                onDateClick={handleDateClick}
                selectedYear={selectedYear}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;