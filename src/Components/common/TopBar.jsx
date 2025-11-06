import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Menu } from 'lucide-react';

export const TopBar = ({
  userName = "User",
  showSearch = true,
  onLogout = () => console.log("Logout clicked"),
  onMenuClick,
  profileImage = "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="w-full bg-white border-b border-gray-200 px-4 lg:px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Menu button (mobile) + Greeting */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle Menu"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          {/* Greeting */}
          <div className="flex items-center gap-2">
            <span className="text-2xl hidden sm:block">👋</span>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
              Hello {userName}!
            </h1>
          </div>
        </div>

        {/* Right side - Search, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search Bar - Hidden on small screens */}
          {showSearch && (
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for something"
                className="pl-10 pr-4 py-2 w-60 lg:w-80 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          {/* Notification Bell */}
          <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 hover:bg-gray-50 rounded-full p-1 pr-2 sm:pr-3 transition-colors"
            >
              <img
                src={profileImage}
                alt="Profile"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-gray-200"
              />
              <ChevronDown
                className={`w-4 h-4 text-gray-600 transition-transform hidden sm:block ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setDropdownOpen(false)}
                ></div>

                {/* Dropdown Content */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};