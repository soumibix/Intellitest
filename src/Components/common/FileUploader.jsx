import React, { useState, useRef } from 'react';
import { Upload, X, Check, Trash2 } from 'lucide-react';

export default function FileUploader() {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) processFile(droppedFile);
    };

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) processFile(selectedFile);
    };

    const processFile = (selectedFile) => {
        const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'application/zip', 'application/pdf'];
        const maxSize = 25 * 1024 * 1024;

        if (!validTypes.includes(selectedFile.type) && !selectedFile.name.endsWith('.svg')) {
            alert('Only .jpg, .png, .svg, .zip and .pdf files are supported');
            return;
        }

        if (selectedFile.size > maxSize) {
            alert('File size must be less than 25MB');
            return;
        }

        setIsUploading(true);
        setUploadProgress(0);

        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);
                    setFile(selectedFile);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    const handleDelete = () => {
        setFile(null);
        setUploadProgress(0);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleCancel = () => {
        setIsUploading(false);
        setUploadProgress(0);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const formatFileSize = (bytes) => {
        return (bytes / (1024 * 1024)).toFixed(1) + 'MB';
    };

    return (
        <div className="">
            <div className="w-full cursor-grab">
                {!file && !isUploading && (
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`relative border-2 border-dashed rounded-lg p-16 text-center transition-colors ${isDragging
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-[#631891] bg-[#fff]'
                            }`}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            onChange={handleFileSelect}
                            className="hidden"
                            accept=".jpg,.jpeg,.png,.svg,.zip,.pdf"
                        />

                        <div className="flex flex-col items-center gap-4">
                            <div className={`relative cursor-pointer ${isDragging ? 'bg-purple-600' : 'bg-purple-600'} p-4 rounded-lg`}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Upload className="w-8 h-8 text-white" strokeWidth={2.5} />
                                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                                    <div className="bg-purple-600 rounded-full p-0.5">
                                        <Upload className="w-3 h-3 text-white" strokeWidth={3} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-gray-700 font-medium">
                                    {isDragging ? 'Drop your file here' : 'Drag your file(s) to start uploading'}
                                </p>
                                <p className="text-gray-500 text-md font-[600] ">OR</p>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="px-6 py-2 border-2 border-[#631891] text-[#631891] rounded-xl bg-purple-50 transition-colors font-medium cursor-pointer"
                                >
                                    Browse files
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {isUploading && (
                    <div className="relative border-2 border-dashed border-gray-300 bg-white rounded-lg p-16 text-center">
                        <button
                            onClick={handleCancel}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex flex-col items-center gap-6">
                            <div className="relative w-24 h-24">
                                <svg className="w-24 h-24 transform -rotate-90">
                                    <circle
                                        cx="48"
                                        cy="48"
                                        r="40"
                                        stroke="#e5e7eb"
                                        strokeWidth="8"
                                        fill="none"
                                    />
                                    <circle
                                        cx="48"
                                        cy="48"
                                        r="40"
                                        stroke="#7c3aed"
                                        strokeWidth="8"
                                        fill="none"
                                        strokeDasharray={`${2 * Math.PI * 40}`}
                                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - uploadProgress / 100)}`}
                                        strokeLinecap="round"
                                        className="transition-all duration-300"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xl font-semibold text-gray-700">{uploadProgress}%</span>
                                </div>
                            </div>

                            <p className="text-gray-700 font-medium">Uploading...</p>
                        </div>
                    </div>
                )}

                {file && !isUploading && (
                    <div className="border-2 border-dashed border-green-300 bg-green-50 rounded-lg p-8">
                        <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="bg-red-500 rounded-lg p-3 flex items-center justify-center min-w-[48px]">
                                    <span className="text-white text-xs font-bold">PDF</span>
                                </div>

                                <div className="text-left">
                                    <p className="text-gray-800 font-medium">{file.name}</p>
                                    <p className="text-sm text-gray-500">{formatFileSize(file.size)} - uploaded</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="bg-green-500 rounded-full p-1">
                                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                </div>
                                <button
                                    onClick={handleDelete}
                                    className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
            <p className="text-sm text-gray-500 pt-2">
                Only support .jpg, .png and .svg and zip files. (Upto 25mb)
            </p>
        </div>
    );
}