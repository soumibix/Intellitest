import React, { useState, useCallback, useEffect } from 'react';
import { CheckCircle, Flag, Clock, FileText, AlertCircle, Timer } from 'lucide-react';
import QuestionCard from '../../Components/User/QuestionCard';
import FileUploader from '../../Components/common/FileUploader';
import { useNavigate } from 'react-router-dom';
import ExitConfirmationModal from '../../utils/ExitConfirmationModal';
import SubmitPdf from '../../Components/SubmitPdf';

const UserIndividualTest = () => {
    const [questions, setQuestions] = useState(
        Array(5).fill(null).map((_, i) => ({
            id: i + 1,
            questionText: 'Explain the working principle of the k-Nearest Neighbors (k-NN) algorithm with an example.',
            marks: 10,
            markedAsDone: false,
            markedForReview: false
        }))
    );
    const navigate = useNavigate();
    const [submitModal, setSubmitModal] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(3600);
    const [showExitModal, setShowExitModal] = useState(false);



    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 0) {
                    clearInterval(timer);
                    alert('Time is up! Your test will be submitted automatically.');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            return e.returnValue = '';
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, []);

    const handleStatusChange = useCallback((questionId, field, value) => {
        setQuestions(prev => prev.map(q => q.id === questionId ? { ...q, [field]: value } : q));
    }, []);

    const formatTime = (s) => {
        const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    };

    const stats = {
        done: questions.filter(q => q.markedAsDone).length,
        review: questions.filter(q => q.markedForReview).length,
        pending: questions.filter(q => !q.markedAsDone && !q.markedForReview).length,
        total: questions.length
    };

    const getTimerColor = () => timeRemaining < 300 ? 'text-red-[#f00]' : timeRemaining < 600 ? 'text-[#f00]' : 'text-white';

    return (
        <div className="min-h-screen bg-gray-50 flex-col justify-between items-center">
            <ExitConfirmationModal isOpen={showExitModal} onConfirm={() => navigate('/user/test-reports')} onCancel={() => setShowExitModal(false)} />

            <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
                <div className="mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-900 rounded flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-xs">IEMK</span>
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-900 text-sm">Institute of Engineering & Management, Salt Lake</h2>
                            <p className="text-xs text-gray-500">Salt Lake Electronics Complex, Kolkata</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button onClick={() => setShowExitModal(true)} className="flex-1 md:flex-none px-6 cursor-pointer text-red-600 text-sm font-medium hover:bg-red-50 rounded border border-red-600 py-2">Exit Test</button>
                        <button onClick={()=> setSubmitModal(true)} className="flex-1 md:flex-none px-4 cursor-pointer py-1.5 bg-purple-600 text-white text-sm font-medium rounded hover:bg-purple-700 flex items-center justify-center gap-2">Submit<span className="text-lg">→</span></button>
                    </div>
                </div>
            </div>

            <div className='px-4 md:px-8 lg:px-12'>
                <div className="text-white px-4 md:px-6 py-6 md:py-8 my-4 mt-8 rounded-2xl" style={{ background: "linear-gradient(to right, #6A1B7E, #6A1B7EE5)" }}>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold mb-2">Machine Learning Test</h1>
                            <div className="flex items-center gap-4 text-sm">
                                <span className="flex items-center gap-1.5"><FileText size={16} />50 Questions</span>
                                <span className="flex items-center gap-1.5"><CheckCircle size={16} />50 Marks</span>
                            </div>
                        </div>
                        <div className="text-left md:text-right bg-[#ffffff48] py-2 px-4 rounded-lg w-full md:w-auto">
                            <div className="text-sm font-normal mb-1 opacity-90 flex items-center md:justify-end gap-1.5"><Timer size={20} />Time Remaining</div>
                            <div className={`text-3xl md:text-4xl font-bold ${getTimerColor()}`}>{formatTime(timeRemaining)}</div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#F7EAFB] rounded-xl border border-[#6A1B7E33]">
                    <div className="mx-auto px-4 md:px-6 py-4">
                        <p className="text-sm text-[#000]"><span className="font-semibold text-[#6A1B7E]">Instructions:</span> Write your answers on paper, number them clearly as per the questions below, and upload a single PDF containing all your answers. Ensure your handwriting is legible and all pages are included in the correct order.</p>
                    </div>
                </div>

                <div className="mx-auto py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <div className="rounded-lg p-5 mb-6 bg-white border-2 border-[#6318910A] lg:sticky lg:top-6 lg:z-10">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-semibold text-gray-900">Questions Progress</h3>
                                    <span className="text-sm text-gray-600">{stats.done} / {stats.total} answered</span>
                                </div>
                                <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
                                    <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 via-yellow-400 to-orange-400 transition-all duration-500" style={{ width: `${((stats.done / stats.total) * 100).toFixed(0)}%` }} />
                                </div>
                                <div className="flex flex-wrap gap-4 text-sm">
                                    <div className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /><span className="text-gray-700">Done {stats.done}</span></div>
                                    <div className="flex items-center gap-2"><Flag size={16} className="text-yellow-500" /><span className="text-gray-700">Review {stats.review}</span></div>
                                    <div className="flex items-center gap-2"><Clock size={16} className="text-orange-500" /><span className="text-gray-700">Pending {stats.pending}</span></div>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4 md:p-5">
                                <h3 className="font-semibold text-gray-900 mb-4">Questions</h3>
                                {questions.map(q => <QuestionCard key={q.id} question={q} onStatusChange={handleStatusChange} />)}
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg p-4 md:p-5 mb-4 lg:sticky lg:top-6">
                                <h3 className="font-semibold text-gray-900 mb-4">Upload Your Answer Sheet</h3>
                                <div className='mb-8 md:mb-12'><FileUploader /></div>
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-900 text-sm mb-3">Upload Checklist</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-2"><CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={16} /><span className="text-sm text-gray-700">Upload Status</span></div>
                                        <div className="flex items-start gap-2"><AlertCircle className="text-orange-500 flex-shrink-0 mt-0.5" size={16} /><div><p className="text-sm text-gray-700 font-medium">Deadline Reminder</p><p className="text-xs text-gray-500">Upload by: Dec 10, 2025, 11:59 PM</p></div></div>
                                        <div className="flex items-start gap-2"><FileText className="text-gray-400 flex-shrink-0 mt-0.5" size={16} /><div><p className="text-sm text-gray-700 font-medium">File Size Limit</p><p className="text-xs text-gray-500">Maximum 10 MB</p></div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                submitModal && <SubmitPdf isOpen={submitModal} setIsOpen={setSubmitModal}/>
            }
        </div>
    );
};

export default UserIndividualTest;