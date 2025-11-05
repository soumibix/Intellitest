import React, { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import TestCard from '../Components/TestCard';

function AllTest() {
  const [activeFilter, setActiveFilter] = useState('ongoing');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('All');

  // Mock test data
  const allTests = [
    {
      id: 1,
      date: '58:07 mins',
      time: '',
      status: 'ongoing',
      title: 'Machine Learning Mid-Sem Test',
      questionCount: 30,
      marks: 60,
      duration: '1 hour',
      department: 'CST',
      semester: '05',
      creatorName: 'Saurabh Kumbhar',
      creatorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Saurabh',
      createdDate: 'Sept 5 04:25',
      month: 'September'
    },
    {
      id: 2,
      date: 'Nov 15',
      time: '2:00 PM',
      status: 'upcoming',
      title: 'Data Structures Final Exam',
      questionCount: 50,
      marks: 100,
      duration: '2 hours',
      department: 'CST',
      semester: '03',
      creatorName: 'Priya Sharma',
      creatorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
      createdDate: 'Oct 20 10:15',
      month: 'November'
    },
    {
      id: 3,
      date: 'Oct 10',
      time: '10:00 AM',
      status: 'completed',
      title: 'Database Management Systems Quiz',
      questionCount: 20,
      marks: 40,
      duration: '45 mins',
      department: 'CST',
      semester: '04',
      creatorName: 'Rahul Verma',
      creatorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
      createdDate: 'Sept 30 14:20',
      month: 'October'
    },
    {
      id: 4,
      date: 'Nov 20',
      time: '11:00 AM',
      status: 'upcoming',
      title: 'Computer Networks Test',
      questionCount: 40,
      marks: 80,
      duration: '1.5 hours',
      department: 'CST',
      semester: '05',
      creatorName: 'Anjali Singh',
      creatorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali',
      createdDate: 'Nov 1 09:00',
      month: 'November'
    }
  ];

  const months = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Filter tests based on active filter
  const filteredTests = allTests.filter(test => {
    const matchesStatus = activeFilter === 'all' || test.status === activeFilter;
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMonth = selectedMonth === 'All' || test.month === selectedMonth;
    return matchesStatus && matchesSearch && matchesMonth;
  });

  // Get suggestions for search
  const suggestions = searchQuery.length > 0 
    ? allTests
        .filter(test => test.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(test => test.title)
        .slice(0, 5)
    : [];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#6B21A8]">All Tests</h1>
          
          {/* Search Bar */}
          <div className="relative w-full sm:w-80 lg:w-96">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by Test Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
            />
            {/* Search Suggestions */}
            {suggestions.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => setSearchQuery(suggestion)}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-700 text-sm"
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Filter Buttons and Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            <button
              onClick={() => setActiveFilter('ongoing')}
              className={`px-4 sm:px-5 py-2 rounded-full font-medium text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
                activeFilter === 'ongoing'
                  ? 'bg-[#1A0B2E] text-white'
                  : 'bg-[#E9D5FF] text-[#6B21A8]'
              }`}
            >
              Ongoing
              {activeFilter === 'ongoing' && <X className="w-3 h-3 sm:w-4 sm:h-4" />}
            </button>
            
            <button
              onClick={() => setActiveFilter('completed')}
              className={`px-4 sm:px-5 py-2 rounded-full font-medium text-xs sm:text-sm transition-all whitespace-nowrap ${
                activeFilter === 'completed'
                  ? 'bg-[#1A0B2E] text-white'
                  : 'bg-[#E9D5FF] text-[#6B21A8]'
              }`}
            >
              Completed
            </button>
            
            <button
              onClick={() => setActiveFilter('upcoming')}
              className={`px-4 sm:px-5 py-2 rounded-full font-medium text-xs sm:text-sm transition-all whitespace-nowrap ${
                activeFilter === 'upcoming'
                  ? 'bg-[#1A0B2E] text-white'
                  : 'bg-[#E9D5FF] text-[#6B21A8]'
              }`}
            >
              Upcoming
            </button>
            
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 sm:px-5 py-2 rounded-full font-medium text-xs sm:text-sm transition-all whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-[#1A0B2E] text-white'
                  : 'bg-[#E9D5FF] text-[#6B21A8]'
              }`}
            >
              View All
            </button>
          </div>

          {/* Filters Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setShowMonthDropdown(true)}
            onMouseLeave={() => setShowMonthDropdown(false)}
          >
            <button className="bg-[#1A0B2E] text-white px-4 sm:px-6 py-2 rounded-full font-medium text-xs sm:text-sm flex items-center gap-2">
              <SlidersHorizontal className="w-3 h-3 sm:w-4 sm:h-4" />
              Filters
            </button>
            
            {showMonthDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10 max-h-64 overflow-y-auto">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                  Filter by Month
                </div>
                {months.map((month) => (
                  <div
                    key={month}
                    onClick={() => setSelectedMonth(month)}
                    className={`px-4 py-2 cursor-pointer text-sm ${
                      selectedMonth === month
                        ? 'bg-purple-50 text-purple-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {month}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {filteredTests.length > 0 ? (
            filteredTests.map((test) => (
              <TestCard key={test.id} {...test} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No tests found matching your filters
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllTest;