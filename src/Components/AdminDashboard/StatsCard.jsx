import React from 'react';

export const StatsCard = ({ title, value, description, icon: Icon, iconBg }) => (
  <div className="bg-white rounded-xl px-6 py-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#631891] transition-all duration-300 ease-out transform hover:scale-100 hover:-translate-y-1 group cursor-pointer">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-[#202224] text-md mb-2 group-hover:text-[#631891] transition-colors duration-300">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900 group-hover:text-[#631891] transition-colors duration-300">{value}</h3>
        <p className="text-[#7E7E7E] text-sm mt-2 group-hover:text-gray-600 transition-colors duration-300">{description}</p>
      </div>
      <div className={`${iconBg} text-[#631891] p-3 rounded-lg group-hover:shadow-lg group-hover:scale-110 transition-all duration-300 transform`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);