import React from "react";
import Input from "./Input";

const InputFieldsComp = ({ fields, formData, onChange, errors }) => {
  const handleChange = (fieldName, value) => {
    onChange({
      ...formData,
      [fieldName]: value,
    });
  };

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <Input
          key={index}
          type={field.type}
          label={field.label}
          placeholder={field.placeholder}
          value={formData[field.name] || ''}
          onChange={(e) => handleChange(field.name, e.target.value)}
          error={errors[field.name]}
          options={field.options}
          showRememberMe={field.showRememberMe}
          rememberMeChecked={formData[field.rememberMeName]}
          onRememberMeChange={(checked) =>
            handleChange(field.rememberMeName, checked)
          }
          rememberMeLabel={field.rememberMeLabel}
        />
      ))}
    </div>
  );
};
export default InputFieldsComp;