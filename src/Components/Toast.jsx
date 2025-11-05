import React, { useState } from 'react'
import { CircleX , IdCard } from 'lucide-react'

function Toast() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="w-full p-4">
      <div className="bg-[#F7E9FF] rounded-lg px-4 py-2 flex items-center justify-between border border-purple-100">
        <div className="flex items-center gap-3">
          <div className=" rounded-lg p-2">
            <IdCard className="w-6 h-6 text-purple-600" />
          </div>
          
          <div className="text-gray-700">
            <span className="font-normal text-purple-500">Just one step left! </span>
            <span className="font-semibold text-purple-700">Complete your faculty profile</span>
            <span className="font-normal text-purple-500"> to create your first test.</span>
          </div>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600 transition-colors ml-4"
          aria-label="Close notification"
        >
          <CircleX  className="w-5 h-5 text-purple-600 cursor-pointer" />
        </button>
      </div>
    </div>
  )
}

export default Toast