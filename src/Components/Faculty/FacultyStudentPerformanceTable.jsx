import React from 'react';

const FacultyStudentPerformanceTable = ({ 
    students = [], 
    currentPage = 1, 
    totalPages = 1,
    totalStudents = 0,
    onPageChange 
}) => {
    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    const handleViewReport = (studentId, answerPdfUrl) => {
        if (answerPdfUrl) {
            window.open(answerPdfUrl, '_blank');
        } else {
            console.log("View detailed report for student:", studentId);
        }
    };

    const getScoreColor = (marksObtained, totalMarks) => {
        const percentage = (marksObtained / totalMarks);
        if (percentage >= 0.9) return 'text-green-600';
        if (percentage >= 0.75) return 'text-blue-600';
        if (percentage >= 0.5) return 'text-orange-600';
        return 'text-red-600';
    };

    const handlePageChange = (newPage) => {
        if (onPageChange && newPage >= 1 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden md:block">
                {/* Header Row */}
                <div className="grid grid-cols-5 gap-4 px-4 lg:px-6 py-3 lg:py-4 bg-[#F9F9F9] border-b border-[#E4E4E4]">
                    <div className="text-sm lg:text-base font-medium text-gray-600">Student Name</div>
                    <div className="text-sm lg:text-base font-medium text-gray-600">Enrollment No</div>
                    <div className="text-sm lg:text-base font-medium text-gray-600">Marks Obtained</div>
                    <div className="text-sm lg:text-base font-medium text-gray-600">Time Taken</div>
                    <div className="text-sm lg:text-base font-medium text-gray-600">Actions</div>
                </div>

                {/* Data Rows */}
                <div className="space-y-2 px-4 lg:px-6 py-4">
                    {students.length > 0 ? (
                        students.map((student) => (
                            <div
                                key={student.id}
                                className="grid grid-cols-5 gap-4 px-3 lg:px-4 py-2 lg:py-3 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                            >
                                <div className="text-sm lg:text-base text-gray-900 font-medium truncate">
                                    {student.name}
                                </div>
                                <div className="text-sm lg:text-base text-gray-600">{student.rollNo}</div>
                                <div className="text-sm lg:text-base text-gray-600">
                                    <span className={`font-semibold ${getScoreColor(student.marksObtained, student.totalMarks)}`}>
                                        {student.marksObtained}
                                    </span>
                                    {' / '}{student.totalMarks}
                                </div>
                                <div className="text-sm lg:text-base text-gray-600">{student.timeTaken}</div>
                                <div>
                                    <button 
                                        onClick={() => handleViewReport(student.id, student.answerPdfUrl)}
                                        className="text-sm lg:text-base text-purple-600 hover:text-purple-800 font-medium underline hover:no-underline transition-all"
                                    >
                                        View Answer
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center py-12 text-gray-500">
                            <svg className="w-24 h-24 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <p className="text-base font-semibold">No submissions yet!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden">
                <div className="px-4 py-3 bg-[#F9F9F9] border-b border-[#E4E4E4]">
                    <h3 className="text-base font-semibold text-gray-700">Student Performance</h3>
                </div>
                
                <div className="p-4 space-y-4">
                    {students.length > 0 ? (
                        students.map((student) => (
                            <div
                                key={student.id}
                                className="border border-gray-200 rounded-lg p-4 bg-white hover:bg-gray-50 transition-colors space-y-3"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{student.name}</p>
                                        <p className="text-xs text-gray-500 mt-1">{student.rollNo}</p>
                                    </div>
                                    <button 
                                        onClick={() => handleViewReport(student.id, student.answerPdfUrl)}
                                        className="text-xs text-purple-600 hover:text-purple-800 font-medium underline"
                                    >
                                        View Answer
                                    </button>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Marks Obtained</p>
                                        <p className="text-sm font-medium">
                                            <span className={`font-semibold ${getScoreColor(student.marksObtained, student.totalMarks)}`}>
                                                {student.marksObtained}
                                            </span>
                                            {' / '}{student.totalMarks}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Time Taken</p>
                                        <p className="text-sm font-medium text-gray-700">{student.timeTaken}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center py-12 text-gray-500">
                            <svg className="w-20 h-20 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <p className="text-sm font-semibold">No submissions yet!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Pagination */}
            {totalStudents > 0 && totalPages > 1 && (
                <div className="px-4 lg:px-6 py-4 lg:py-6 flex items-center justify-between border-t border-gray-200 flex-wrap gap-4">
                    <div className="text-xs sm:text-sm text-gray-600">
                        Showing {students.length} of {totalStudents} students
                    </div>
                    
                    <div className="flex items-center gap-1 sm:gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed text-lg sm:text-xl transition-colors"
                        >
                            ‹
                        </button>
                        {getPageNumbers().map((page, i) => (
                            <button
                                key={i}
                                onClick={() => typeof page === 'number' && handlePageChange(page)}
                                disabled={page === '...'}
                                className={`min-w-8 h-8 sm:min-w-10 sm:h-10 flex items-center justify-center text-xs sm:text-sm rounded transition-all px-2 ${
                                    page === currentPage
                                        ? 'bg-purple-700 text-white font-medium'
                                        : page === '...'
                                        ? 'text-gray-600 cursor-default'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed text-lg sm:text-xl transition-colors"
                        >
                            ›
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FacultyStudentPerformanceTable;