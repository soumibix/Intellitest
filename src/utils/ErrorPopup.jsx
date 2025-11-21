// src/utils/ErrorPopup.jsx
import React, { useEffect } from "react";

export const ErrorPopup = ({ takeData, setPopupShow, variant = "error" }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setPopupShow(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [setPopupShow]);

  // Fix: Check success first, then error
  const bgColor = variant === "success" 
    ? "bg-green-500" 
    : variant === "error" 
    ? "bg-red-500" 
    : "bg-blue-500";

  const icon = variant === "success" 
    ? "✅" 
    : variant === "error" 
    ? "❌" 
    : "ℹ️";

  const borderColor = variant === "success"
    ? "border-green-600"
    : variant === "error"
    ? "border-red-600"
    : "border-blue-600";

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`${bgColor} ${borderColor} border-l-4 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-[500px] transition-all duration-300 hover:shadow-xl`}>
        {/* <span className="text-2xl">{icon}</span> */}
        <div className="flex-1">
          <p className="font-medium">{takeData}</p>
        </div>
        <button
          onClick={() => setPopupShow(false)}
          className="text-white hover:text-gray-200 text-xl font-bold transition-colors"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
};