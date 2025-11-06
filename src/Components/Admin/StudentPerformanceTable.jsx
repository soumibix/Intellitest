import React, { useState } from 'react'

const StudentPerformanceTable = ({ allTests }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    // Filter only completed tests
    const completedTests = allTests.filter(test => test.status === 'completed')

    // Generate student data from completed tests
    const studentData = allTests.flatMap(test =>
        Array(4).fill(null).map((_, i) => ({
            id: `${test.id}-${i}`,
            name: 'Aditi Sharma',
            rollNo: '21CS105',
            marksObtained: test.testData.marksObtained || 55,
            totalMarks: test.testData.totalMarks || 60,
            timeTaken: test.testData.timeTaken || '48min',
            status: 'Done'
        }))
    )

    // Pagination logic
    const totalPages = Math.ceil(studentData.length / rowsPerPage)
    const startIndex = (currentPage - 1) * rowsPerPage
    const paginatedData = studentData.slice(startIndex, startIndex + rowsPerPage)

    const getPageNumbers = () => {
        const pages = []
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i)
        } else {
            pages.push(1, 2, 3, 4, 5)
            pages.push('...')
            pages.push(totalPages)
        }
        return pages
    }

    return (
        <div className="bg-white">
            {/* Header Row */}
            <div className="grid grid-cols-6 gap-4 px-6 py-4 bg-[#F9F9F9] border-1 border-[#E4E4E4]">
                <div className="text-base font-medium text-gray-600">Student Name</div>
                <div className="text-base font-medium text-gray-600">Roll No</div>
                <div className="text-base font-medium text-gray-600">Marks Obtained</div>
                <div className="text-base font-medium text-gray-600">Time Taken</div>
                <div className="text-base font-medium text-gray-600">Status</div>
                <div className="text-base font-medium text-gray-600">Actions</div>
            </div>

            {/* Data Rows */}
            <div className="space-y-4 mt-2">
                {paginatedData.map((student) => (
                    <div
                        key={student.id}
                        className="grid grid-cols-6 gap-4 px-6 py-4 border border-gray-200 rounded-lg bg-white"
                    >
                        <div className="text-base text-gray-900">{student.name}</div>
                        <div className="text-base text-gray-600">{student.rollNo}</div>
                        <div className="text-base text-gray-600">{student.marksObtained} / {student.totalMarks}</div>
                        <div className="text-base text-gray-600">{student.timeTaken}</div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                            <span className="text-base text-green-600 font-medium">{student.status}</span>
                        </div>
                        <div>
                            <button className="text-base text-purple-600 hover:underline font-medium underline">View</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="px-6 py-6 flex items-center justify-between">
                <div className="flex items-center gap-3 text-base text-gray-700">
                    <span>Show</span>
                    <select
                        value={rowsPerPage}
                        onChange={(e) => {
                            setRowsPerPage(Number(e.target.value))
                            setCurrentPage(1)
                        }}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-base bg-white appearance-none pr-10"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23374151' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0.75rem center'
                        }}
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                    <span>Row</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed text-xl"
                    >
                        ‹
                    </button>
                    {getPageNumbers().map((page, i) => (
                        <button
                            key={i}
                            onClick={() => typeof page === 'number' && setCurrentPage(page)}
                            disabled={page === '...'}
                            className={`min-w-10 h-10 flex items-center justify-center text-base rounded ${page === currentPage
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
                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed text-xl"
                    >
                        ›
                    </button>
                </div>
            </div>
        </div>
    )
}

export default StudentPerformanceTable;