
import React, { useState } from 'react';

const FacultyStudentPerformanceTable = ({ students = [] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Pagination logic
    const totalPages = Math.ceil(students.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = students.slice(startIndex, startIndex + rowsPerPage);

    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 4) {
                pages.push(1, 2, 3, 4, 5, '...', totalPages);
            } else if (currentPage >= totalPages - 3) {
                pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
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

    return (
        <div className="bg-white rounded-lg shadow-md">
            {/* Header Row */}
            <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-[#F9F9F9] border-b border-[#E4E4E4] rounded-t-lg">
                <div className="text-base font-medium text-gray-600">Student Name</div>
                <div className="text-base font-medium text-gray-600">Roll No</div>
                <div className="text-base font-medium text-gray-600">Marks Obtained</div>
                <div className="text-base font-medium text-gray-600">Time Taken</div>
                <div className="text-base font-medium text-gray-600">Actions</div>
            </div>

            {/* Data Rows */}
            <div className="space-y-2 px-6 py-4">
                {paginatedData.length > 0 ? (
                    paginatedData.map((student) => (
                        <div
                            key={student.id}
                            className="grid grid-cols-5 gap-4 px-4 py-3 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                        >
                            <div className="text-base text-gray-900 font-medium">{student.name}</div>
                            <div className="text-base text-gray-600">{student.rollNo}</div>
                            <div className="text-base text-gray-600">
                                <span className={`font-semibold ${
                                    (student.marksObtained / student.totalMarks) >= 0.9 ? 'text-green-600' :
                                    (student.marksObtained / student.totalMarks) >= 0.75 ? 'text-blue-600' :
                                    (student.marksObtained / student.totalMarks) >= 0.5 ? 'text-orange-600' :
                                    'text-red-600'
                                }`}>
                                    {student.marksObtained}
                                </span>
                                {' / '}{student.totalMarks}
                            </div>
                            <div className="text-base text-gray-600">{student.timeTaken}</div>
                            <div>
                                <button 
                                    onClick={() => handleViewReport(student.id, student.answerPdfUrl)}
                                    className="text-base text-purple-600 hover:text-purple-800 font-medium underline hover:no-underline transition-all"
                                >
                                    View Answer
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        <p className="text-base">No student data available</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {students.length > 0 && (
                <div className="px-6 py-6 flex items-center justify-between border-t border-gray-200">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed text-xl transition-colors"
                        >
                            ‹
                        </button>
                        {getPageNumbers().map((page, i) => (
                            <button
                                key={i}
                                onClick={() => typeof page === 'number' && setCurrentPage(page)}
                                disabled={page === '...'}
                                className={`min-w-10 h-10 flex items-center justify-center text-base rounded transition-all ${
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
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed text-xl transition-colors"
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