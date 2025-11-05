import React from 'react';

function BorderLabelInput({ 
  label, 
  placeholder = "", 
  type = "text", 
  required = false, 
  value = "", 
  onChange, 
  name,
  id,
  className = "",
  disabled = false,
  variant = "default",
  options = null
}) {
  const [isFocused, setIsFocused] = React.useState(false);
  
  // Simple, safe value handling
  const inputValue = String(value || '');
  const hasValue = inputValue.length > 0;
  const isActive = isFocused || hasValue;

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  
  const handleChange = (e) => {
    //console.log(`BorderLabelInput change: ${name} = ${e.target.value}`);
    if (onChange) {
      onChange(e);
    }
  };

  const variants = {
    default: {
      border: 'border-gray-300',
      focusBorder: 'border-[#B52B6E]',
      label: 'text-gray-600',
      labelBg: 'bg-white'
    }
  };

  const currentVariant = variants[variant] || variants.default;

  if (type === 'select' && options) {
    return (
      <div className={`relative ${className}`}>
        <select
          id={id || name}
          name={name}
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          disabled={disabled}
          className={`
            w-full px-4 py-3 text-gray-900 bg-white border-2 rounded-lg appearance-none
            ${isFocused ? currentVariant.focusBorder : currentVariant.border}
            focus:outline-none transition-colors duration-200
          `}
        >
          <option value="">{placeholder}</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <label
          className={`
            absolute left-3 px-1 transition-all duration-200 pointer-events-none select-none z-10
            ${currentVariant.labelBg} ${currentVariant.label}
            ${isActive ? '-top-2 text-xs font-medium' : 'top-3 text-base'}
          `}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <input
        type={type}
        id={id || name}
        name={name}
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={required}
        disabled={disabled}
        className={`
          w-full px-4 py-3 text-gray-900 bg-white border-2 rounded-lg
          ${isFocused ? currentVariant.focusBorder : currentVariant.border}
          focus:outline-none transition-colors duration-200
        `}
      />
      
      <label
        className={`
          absolute left-3 px-1 transition-all duration-200 pointer-events-none select-none z-10
          ${currentVariant.labelBg} ${currentVariant.label}
          ${isActive ? '-top-2 text-xs font-medium' : 'top-3 text-base'}
        `}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {isFocused && !hasValue && placeholder && (
        <div className="absolute left-4 top-3 text-gray-400 pointer-events-none">
          {placeholder}
        </div>
      )}
    </div>
  );
}

export default BorderLabelInput;