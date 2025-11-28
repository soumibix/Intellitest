import React from 'react';

export const StatsCard = ({ title, value, description, icon: Icon, iconBg }) => (
  <div className="bg-white rounded-xl px-6 py-6 shadow-sm border border-gray-100">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-500 text-sm mb-2">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
        <p className="text-gray-400 text-xs mt-2">{description}</p>
      </div>
      <div className={`${iconBg} text-[#631891] p-3 rounded-lg`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);