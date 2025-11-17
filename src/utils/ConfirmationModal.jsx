// src/utils/ConfirmationModal.jsx
import { AlertTriangle, X } from "lucide-react";
import React from "react";
import Button from "../Components/common/Button";

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed? This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmIcon = null,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur shadow-top bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="text-red-600" size={20} />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              {title}
            </h2>
          </div>

          <button
            onClick={onClose}
            disabled={isLoading}
            className={`text-gray-400 hover:text-red-600 transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6">
          <p className="text-sm sm:text-base text-gray-600 text-center">
            {message}
          </p>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-center w-full gap-5 p-4 sm:p-6">
          <Button
            onClick={onClose}
            text={cancelText}
            textSize="text-md sm:text-md"
            color="#6B7280"
            padding="w-full sm:w-auto px-10 py-2"
            disabled={isLoading}
          />
          <Button
            onClick={onConfirm}
            text={confirmText}
            icon={confirmIcon}
            textSize="text-md sm:text-md"
            color="#DC2626"
            padding="w-full sm:w-auto px-10 py-2"
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;