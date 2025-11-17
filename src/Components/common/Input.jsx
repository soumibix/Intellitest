import React, { useState, useRef } from "react";
import { Eye, EyeOff, ChevronDown } from "lucide-react";

const Input = ({
  type = "text",
  placeholder = "",
  value = "",
  onChange,
  options = [],
  size = "md",
  label = "",
  error = "",
  disabled = false,
  className = "",
  showRememberMe = false,
  rememberMeChecked = false,
  onRememberMeChange,
  rememberMeLabel = "Remember me",
  otpLength = 6,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputsRef = useRef([]); // for OTP handling

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  const baseInputClasses = `w-full rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#631891] focus:border-transparent transition-all ${
    sizeClasses[size]
  } ${disabled ? "bg-gray-100 cursor-not-allowed text-black" : "bg-white"} ${
    error ? "border-red-500 focus:ring-red-500" : ""
  } ${className}`;

  // Handle dropdown selection
  const handleDropdownSelect = (option) => {
    onChange({ target: { value: option.value } });
    setIsDropdownOpen(false);
  };

  // 🔢 Handle OTP change logic
  const handleOtpChange = (e, index) => {
    const newValue = e.target.value.replace(/[^0-9]/g, ""); // digits only
    const otpArray = value.split("");
    otpArray[index] = newValue;
    const otpValue = otpArray.join("");
    onChange({ target: { value: otpValue } });

    // move to next box
    if (newValue && index < otpLength - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // 🎨 Render inputs based on type
  const renderInput = () => {
    // 🟣 OTP TYPE
    if (type === "otp") {
      return (
        <div className="flex justify-center gap-3">
          {Array.from({ length: otpLength }).map((_, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              ref={(el) => (inputsRef.current[index] = el)}
              value={value[index] || ""}
              onChange={(e) => handleOtpChange(e, index)}
              onKeyDown={(e) => handleOtpKeyDown(e, index)}
              disabled={disabled}
              className={`w-12 h-12 text-center text-xl border-2 rounded-lg focus:border-[#631891] focus:outline-none transition-colors ${
                error ? "border-red-500" : "border-gray-300"
              } ${disabled ? "bg-gray-100 cursor-not-allowed text-gray-400" : "bg-white"}`}
            />
          ))}
        </div>
      );
    }

    // 🟣 DROPDOWN TYPE
    if (type === "dropdown") {
      const selectedOption = options.find((opt) => opt.value === value);
      return (
        <div className="relative">
          <button
            type="button"
            onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
            className={`${baseInputClasses} flex items-center justify-between ${
              !value ? "text-gray-400" : "text-gray-900"
            }`}
            disabled={disabled}
          >
            <span>{selectedOption ? selectedOption.label : placeholder}</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && !disabled && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                {options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleDropdownSelect(option)}
                    className={`px-4 py-2 cursor-pointer hover:bg-purple-50 transition-colors ${
                      option.value === value
                        ? "bg-purple-100 text-purple-700"
                        : "text-gray-900"
                    }`}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      );
    }

    // 🟣 PASSWORD TYPE
    if (type === "password") {
      return (
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`${baseInputClasses} pr-12`}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            disabled={disabled}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      );
    }

    // 🟣 DEFAULT TYPE
    return (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={baseInputClasses}
        {...props}
      />
    );
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-md font-medium text-[#2B2B2B] mb-2 text-left">
          {label}
        </label>
      )}
      {renderInput()}
      {error && <p className="mt-1 text-sm text-red-600 text-left">{error}</p>}

      {showRememberMe && (
        <div className="mt-3 flex items-center">
          <input
            type="checkbox"
            id={`remember-${label || "checkbox"}`}
            checked={rememberMeChecked}
            onChange={(e) =>
              onRememberMeChange && onRememberMeChange(e.target.checked)
            }
            className="w-4 h-4 text-[#631891] bg-white border-gray-300 rounded cursor-pointer"
          />
          <label
            htmlFor={`remember-${label || "checkbox"}`}
            className="ml-2 text-sm font-medium text-[#2B2B2B] cursor-pointer"
          >
            {rememberMeLabel}
          </label>
        </div>
      )}
    </div>
  );
};

export default Input;
