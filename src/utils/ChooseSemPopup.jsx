import React, { useEffect, useState } from 'react';
import Button from '../Components/common/Button';

function ChooseSemPopup({ isOpen, onClose, onSubmit }) {
  const [selectedSemester, setSelectedSemester] = useState(localStorage.getItem('userSemester')||'Semester 1');

  const semesters = [
    'Semester 1',
    'Semester 2',
    'Semester 3',
    'Semester 4',
    'Semester 5',
    'Semester 6',
    'Semester 7',
    'Semester 8'
  ];

  const handleSubmit = () => {
    onSubmit(selectedSemester);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fadeIn">

        {/* Header */}
        <div className="bg-[#160024] px-8 py-10 text-center">
          <h2 className="text-white text-3xl font-semibold">
            Choose your current Semester
          </h2>
        </div>

        {/* Body */}
        <div className="px-12 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
            <label className="text-gray-800 text-xl font-medium whitespace-nowrap">
              My current semester is:
            </label>

            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="bg-white border-2 border-gray-300 rounded-lg px-6 py-3 text-gray-800 text-lg font-medium focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200 cursor-pointer min-w-[200px] w-full sm:w-auto transition-all"
            >
              {semesters.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
          </div>

          {/* Proper Button */}
          <div className="flex justify-center">
            <Button
              text="View Tests"
              color="#631891"
              variant="filled"
              padding="px-16 py-4"
              textSize="text-lg"
              onClick={handleSubmit}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default ChooseSemPopup;
