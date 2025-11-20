import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AllTest from '../../Components/AllTest';
import { UserTestAPI } from '../../apis/Tests/userTestData';
import { useHttp } from '../../Hooks/useHttps'; 
import ChooseSemPopup from '../../utils/ChooseSemPopup';

function UserTests() {
  const navigate = useNavigate();
  const httpHook = useHttp();
  const token  = sessionStorage.getItem('token');
  
  const [allTests, setAllTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSemPopupOpen, setIsSemPopupOpen] = useState(false);
  const {getReq}= useHttp()
  const [currentSemester, setCurrentSemester] = useState(
    localStorage.getItem('userSemester') || 'Semester 1'
  );
  const [generateFunction, setGenerateFunction] = useState(false);

  // Fetch tests on component mount
  useEffect(() => {
    if(generateFunction===false){
      fetchUserTests();
      setGenerateFunction(true);
    }
  //   setIsSemPopupOpen(true);
  }, []);

  // useEffect(()=>{
    // fetchUserTests(currentSemester);
  // },[currentSemester])



  const fetchUserTests = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch tests with filters for current tests (ongoing + upcoming)
      // const response = await UserTestAPI.fetchUserTests(httpHook, token, {
      //   page: 1,
      //   limit: 100, // Fetch all current tests
      //   // You can uncomment these to filter by department/semester
      //   // department: 'IT',
      //   // semester: '2nd Semester',
      // });

      const response= await getReq('student/test/allTest?page=1&limit=5&department=CSE', token)

      if (response.success) {
        setAllTests(response.data);
      } else {
        setError(response.message || 'Failed to fetch tests');
        setAllTests([]);
      }
    } catch (err) {
      console.error('Error fetching user tests:', err);
      setError('An error occurred while fetching tests');
      setAllTests([]);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get month from date
  const getMonthFromDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[date.getMonth()];
  };

  // Helper function to calculate time remaining
  const calculateTimeRemaining = (endTime, testDate) => {
    if (!endTime || !testDate) return 'N/A';
    
    try {
      const [hours, minutes] = endTime.split(':').map(Number);
      const testEndDate = new Date(testDate);
      testEndDate.setHours(hours, minutes, 0, 0);
      
      const now = new Date();
      const diffMs = testEndDate - now;
      
      if (diffMs <= 0) return 'Time expired';
      
      const diffMins = Math.floor(diffMs / 60000);
      const hoursLeft = Math.floor(diffMins / 60);
      const minsLeft = diffMins % 60;
      
      if (hoursLeft > 0) {
        return `${hoursLeft}:${minsLeft.toString().padStart(2, '0')} hours remaining`;
      }
      return `${minsLeft} mins remaining`;
    } catch (error) {
      console.error('Error calculating time remaining:', error);
      return 'N/A';
    }
  };

  // Helper function to format date and time
  const formatDateTime = (dateString, timeString) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      const month = months[date.getMonth()];
      const day = date.getDate();
      
      // Format time if available
      if (timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        return `${month} ${day} • ${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
      }
      
      return `${month} ${day}`;
    } catch (error) {
      console.error('Error formatting date time:', error);
      return 'N/A';
    }
  };

  // Helper function to calculate total marks (assuming 2 marks per question)
  const calculateTotalMarks = (questionCount) => {
    return questionCount ? questionCount * 2 : 0;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-purple-600 text-xl">Loading tests...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">{error}</div>
          <button
            onClick={fetchUserTests}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
    <AllTest 
      allTests={allTests} 
      filter={false}
      heading="My Tests"
      userType="user"
    />
    {
      isSemPopupOpen && 
      <ChooseSemPopup 
        isOpen={isSemPopupOpen}
        onClose={() => setIsSemPopupOpen(false)}
        onSubmit={(selectedSemester) => {
          console.log('Selected Semester:', selectedSemester);
          setCurrentSemester(selectedSemester);
          localStorage.setItem('userSemester', selectedSemester);
          setIsSemPopupOpen(false);
        }}
      />
    }
    </>
  );
}

export default UserTests;