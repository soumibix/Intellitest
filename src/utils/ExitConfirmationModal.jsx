import React, { useState, useCallback, memo, useEffect } from 'react';
import { CheckCircle, Flag, Clock, Upload, FileText, Calendar, AlertCircle, Timer, X, AlertTriangle } from 'lucide-react';



// Exit Confirmation Modal
const ExitConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#0000009c] bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="text-red-600" size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Exit Test?</h2>
                </div>

                <p className="text-gray-600 mb-6">
                    Are you sure you want to exit the test? Your progress will be lost and you won't be able to continue this test session.
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
                    >
                        Exit Test
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExitConfirmationModal;