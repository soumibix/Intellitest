// src/utils/ErrorPopup.jsx
import React, { useEffect } from "react";

export const ErrorPopup = ({ takeData, setPopupShow, variant = "error" }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setPopupShow(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [setPopupShow]);

  const bgColor = variant === "error" 
    ? "bg-red-500" 
    : variant === "success" 
    ? "bg-green-500" 
    : "bg-blue-500";

  const icon = variant === "error" 
    ? "❌" 
    : variant === "success" 
    ? "✅" 
    : "ℹ️";

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-[500px]`}>
        <span className="text-2xl">{icon}</span>
        <div className="flex-1">
          <p className="font-medium">{takeData}</p>
        </div>
        <button
          onClick={() => setPopupShow(false)}
          className="text-white hover:text-gray-200 text-xl font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
};