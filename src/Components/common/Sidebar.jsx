import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export function Sidebar({
  navItems = [],
  isOpen,
  isCollapsed,
  onToggle,
  onClose,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleItemClick = (item) => {
    if (item.route) {
      navigate(item.route);
    }
    // Close sidebar on mobile after clicking
    if (window.innerWidth < 1024) {
      onClose?.();
    }
  };

  // Check if route is active
  const isActive = (route) => location.pathname === route;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && !isCollapsed && (
        <div
          className="fixed inset-0 backdrop-blur bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-screen bg-[#1A0B2E] text-white transition-all duration-300 ease-in-out z-50 ${
          isCollapsed ? "w-20" : "w-64"
        } ${isOpen || window.innerWidth >= 1024 ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="p-6 border-b border-purple-800/50 flex items-center justify-between">
          <h1
            className={`text-2xl font-bold transition-opacity duration-300 ${
              isCollapsed ? "opacity-0 w-0" : "opacity-100"
            }`}
          >
            IntelliTest
          </h1>
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-purple-800/30 transition-colors"
            aria-label="Toggle Sidebar"
          >
            {isCollapsed ? (
              <Menu className="w-5 h-5" />
            ) : (
              <X className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.route);
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleItemClick(item)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      active
                        ? "bg-[#631891] text-white shadow-lg shadow-purple-500/20"
                        : "text-gray-300 hover:text-white hover:bg-purple-900/30"
                    } ${isCollapsed ? "justify-center" : ""}`}
                    title={isCollapsed ? item.label : ""}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span
                      className={`font-medium whitespace-nowrap transition-all duration-300 ${
                        isCollapsed
                          ? "opacity-0 w-0 overflow-hidden"
                          : "opacity-100 w-auto"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
