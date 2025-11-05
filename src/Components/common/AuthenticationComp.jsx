import { Loader2 } from "lucide-react";
import InputFieldsComp from "./InputFieldsComp";
import React, { useState } from "react";
import Button from "./Button";

const AuthenticationComp = ({
  image,
  leftTitle = "Connect to Your Smart Dashboard",
  leftDescription = "Monitor your devices, track sensor performance, and stay updated on maintenance tasks",
  heading = "Welcome",
  colorHeading = "",
  fields = [],
  initialFormData = {},
  onSubmit = () => {},
  submitButtonText = "Submit",
  isLoading = false,
  additionalElements = null,
  bottomLinks = [],
  errors = {},
  leftSideClassName = "",
  rightSideClassName = "",
  formClassName = "",
  formId = "auth-form",
  formAriaLabel = "Authentication form",
}) => {
  const [formData, setFormData] = useState({
    ...initialFormData,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;
    onSubmit(formData);
  };

  const handleFormDataChange = (newFormData) => {
    setFormData(newFormData);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image and Content */}
      {image && (
        <div
          className={`hidden lg:flex lg:w-1/2 bg-white relative p-8 lg:p-12 ${leftSideClassName}`}
        >
          {/* Image container with padding for white gap and rounded corners */}
          <div className="relative w-full h-full">
            <img
              src={image}
              alt="Authentication visual"
              className="w-full h-full object-cover rounded-2xl"
              loading="lazy"
            />

            {/* Overlay Content - Positioned over the rounded image */}
            <div className="absolute inset-0 flex flex-col justify-end rounded-2xl">
              <div className="bg-gradient-to-t from-black/60 via-black/20 to-transparent p-8 rounded-b-2xl">
                <div className="max-w-2xl space-y-4">
                  <h2 className="text-2xl lg:text-4xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-t from-[#CA406E]  to-[#fff]">
                    {leftTitle}
                  </h2>
                  <p className="text-lg lg:text-xl opacity-90 leading-relaxed text-white">
                    {leftDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Right Side - Form */}
      <div
        className={`w-full ${
          image ? "lg:w-1/2" : "lg:w-full"
        } flex items-center justify-center p-8 bg-white ${rightSideClassName}`}
      >
        <div className={`w-full max-w-md space-y-6 ${formClassName}`}>
          {/* Header */}
          <div className="text-center pb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {heading}{" "}
              {colorHeading && (
                <span className="text-transparent bg-clip-text bg-[#631891]">
                  {colorHeading}
                </span>
              )}
            </h1>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            id={formId}
            role="form"
            aria-label={formAriaLabel}
            className="space-y-5"
          >
            {/* Dynamic Input Fields */}
            {fields.length > 0 ? (
              <InputFieldsComp
                fields={fields}
                formData={formData}
                onChange={handleFormDataChange}
                errors={errors}
              />
            ) : (
              <div className="text-center text-gray-500 py-4">
                <p>No form fields provided</p>
              </div>
            )}

            {/* Additional Elements */}
            {additionalElements && (
              <div className="space-y-4">{additionalElements}</div>
            )}

            {/* Submit Button */}
            <Button
              text={submitButtonText}
              color="#631891"
              variant="filled"
              padding="px-4 py-3"
              width="w-full"
              textSize="text-base"
              loading={isLoading}
              disabled={isLoading}
              onClick={handleSubmit}
            />
          </form>

          {/* Bottom Links */}
          {bottomLinks.length > 0 && (
            <div className="space-y-2">
              {bottomLinks.map((link, index) => (
                <div key={index} className="text-center">
                  <button
                    type="button"
                    onClick={link.action}
                    className={`text-sm font-medium transition-colors ${
                      link.className || "text-gray-600 hover:text-purple-600"
                    }`}
                  >
                    {link.text}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthenticationComp;