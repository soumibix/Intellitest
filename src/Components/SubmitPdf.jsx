import React, { useState } from 'react';
import { Check, CircleX  } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function SubmitPdf({isOpen, setIsOpen}) {
  // const [isOpen, setIsOpen] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      navigate('/user/test-reports');
    }, 2000);
  };



  return (
    <div className="bg-[#0007] bg-opacity-50 flex items-center justify-center p-4 fixed inset-0 z-[100]">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 relative">
        {!isSubmitted ? (
          <>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12h6M9 16h6M13 2H8.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C5 3.52 5 4.08 5 5.2v13.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C6.52 22 7.08 22 8.2 22h7.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C19 20.48 19 19.92 19 18.8V9m-6-7 6 6m-6-6v4.4c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C13.76 8 14.04 8 14.6 8H19" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
                Are you sure you want to submit your answer PDF?
              </h2>

              <p className="text-red-500 text-sm mb-8 text-center">
                You won't be able to make changes after submission
              </p>

              <div className="flex justify-center gap-3 w-[65%]">
                <button 
                  onClick={handleCancel}
                  className="flex-1 max-w-[50%] px-3 py-3 border-2 bg-[#FFEAEA] text-red-500 rounded-xl transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <CircleX  size={20} />
                  Cancel
                </button>

                <button 
                  onClick={handleSubmit}
                  className="flex-1 max-w-[50%] px-6 py-3 bg-[#631891] text-white rounded-xl hover:bg-purple-700 transition-colors font-medium w-[100px]"
                >
                  Submit Now
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center py-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 ">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                <Check size={48} className="text-white animate-pulse" strokeWidth={3} />
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
              Submitted Successfully!
            </h2>

            <p className="text-gray-600 text-center">
              Your PDF has been submitted
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SubmitPdf;