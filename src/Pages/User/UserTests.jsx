import React, { useState } from 'react';
import { Search } from 'lucide-react';
import TestCard from '../../Components/TestCard';
import Button from '../../Components/common/Button';

function UserTests() {
    const [searchQuery, setSearchQuery] = useState('');

    const tests = [
        {
            id: 1,
            timeRemaining: '58:07 mins remaining',
            status: 'ongoing',
            title: 'Machine Learning Mid-Sem Test',
            questions: 30,
            marks: 60,
            duration: '1 hour',
            department: 'CST',
            semester: '05',
            instituteName: 'Institute of Engineering & Management',
            location: 'Salt Lake',
            instituteLogo: 'https://via.placeholder.com/32',
            dateTime: 'Nov 10 • 10:00 AM'
        },
        {
            id: 2,
            timeRemaining: 'Nov 10 • 10:00 AM',
            status: 'upcoming',
            title: 'Machine Learning Mid-Sem Test',
            questions: 30,
            marks: 60,
            duration: '1 hour',
            department: 'CST',
            semester: '05',
            instituteName: 'Institute of Engineering & Management',
            location: 'Salt Lake',
            instituteLogo: 'https://via.placeholder.com/32',
            dateTime: 'Nov 10 • 10:00 AM'
        }
        ,
        {
            id: 2,
            timeRemaining: 'Nov 10 • 10:00 AM',
            status: 'upcoming',
            title: 'Machine Learning Mid-Sem Test',
            questions: 30,
            marks: 60,
            duration: '1 hour',
            department: 'CST',
            semester: '05',
            instituteName: 'Institute of Engineering & Management',
            location: 'Salt Lake',
            instituteLogo: 'https://via.placeholder.com/32',
            dateTime: 'Nov 10 • 10:00 AM'
        }
        ,
        {
            id: 2,
            timeRemaining: 'Nov 10 • 10:00 AM',
            status: 'upcoming',
            title: 'Machine Learning Mid-Sem Test',
            questions: 30,
            marks: 60,
            duration: '1 hour',
            department: 'CST',
            semester: '05',
            instituteName: 'Institute of Engineering & Management',
            location: 'Salt Lake',
            instituteLogo: 'https://via.placeholder.com/32',
            dateTime: 'Nov 10 • 10:00 AM'
        }
    ];

    const filteredTests = tests.filter(test =>
        test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6">
            <div className=" mx-auto">
                {/* Search Bar */}
                <div className="mb-6 flex gap-4">
                    <div className="relative w-[100%]">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search from completed, ongoing..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                    <Button text="Submit" color="blue" onClick={() => alert("Clicked")} />
                </div>

                {/* Test Cards Grid */}
                <div className="flex flex-wrap gap-6">
                    {filteredTests.map(test => (
                        <TestCard key={test.id} test={test} />
                    ))}

                </div>

                {filteredTests.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No tests found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserTests;