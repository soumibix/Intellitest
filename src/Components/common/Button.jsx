import React from "react";
import { Loader2 } from "lucide-react";

const Button = ({
  text = "Click Me",
  color = "blue", // can be Tailwind color (e.g. "blue") or HEX (e.g. "#631891")
  variant = "filled", // "filled" | "outline" | "ghost"
  padding = "px-5 py-2.5",
  width = "w-auto",
  textSize = "text-sm",
  icon = null,
  iconPosition = "left",
  disabled = false,
  loading = false,
  onClick = () => {},
}) => {
  const isCustomColor = color.startsWith("#") || color.startsWith("[");

  // Custom (inline style) fallback for hex or custom colors
  const customStyles = isCustomColor
    ? {
        backgroundColor: variant === "filled" ? color.replace(/\[|\]/g, "") : "transparent",
        color: variant === "filled" ? "#fff" : color.replace(/\[|\]/g, ""),
        border: variant === "outline" ? `1px solid ${color.replace(/\[|\]/g, "")}` : "none",
      }
    : {};

  // Static Tailwind color classes for known colors
  const colorMap = {
    filled: {
      blue: "bg-blue-600 hover:bg-blue-700 text-white",
      green: "bg-green-600 hover:bg-green-700 text-white",
      red: "bg-red-600 hover:bg-red-700 text-white",
      gray: "bg-gray-600 hover:bg-gray-700 text-white",
      purple: "bg-purple-600 hover:bg-purple-700 text-white",
    },
    outline: {
      blue: "border border-blue-600 text-blue-600 hover:bg-blue-50",
      green: "border border-green-600 text-green-600 hover:bg-green-50",
      red: "border border-red-600 text-red-600 hover:bg-red-50",
      gray: "border border-gray-600 text-gray-600 hover:bg-gray-50",
      purple: "border border-purple-600 text-purple-600 hover:bg-purple-50",
    },
    ghost: {
      blue: "text-blue-600 hover:bg-blue-100",
      green: "text-green-600 hover:bg-green-100",
      red: "text-red-600 hover:bg-red-100",
      gray: "text-gray-600 hover:bg-gray-100",
      purple: "text-purple-600 hover:bg-purple-100",
    },
  };

  const colorClasses = isCustomColor
    ? ""
    : colorMap[variant][color] || colorMap[variant]["blue"];

  const disabledStyles = disabled
    ? "opacity-60 cursor-not-allowed"
    : "cursor-pointer";

  const buttonClass = `
    inline-flex items-center justify-center gap-2
    rounded-lg font-medium transition-all duration-200
    ${padding} ${width} ${textSize}
    ${colorClasses} ${disabledStyles}
  `;

  return (
    <button
      onClick={!disabled && !loading ? onClick : undefined}
      className={buttonClass}
      disabled={disabled || loading}
      style={customStyles}
    >
      {/* Left Icon */}
      {icon && iconPosition === "left" && !loading && icon}

      {/* Loading Spinner */}
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}

      {/* Button Text */}
      <span>{text}</span>

      {/* Right Icon */}
      {icon && iconPosition === "right" && !loading && icon}
    </button>
  );
};

export default Button;