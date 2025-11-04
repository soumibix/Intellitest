import React, { useState } from "react";
import Input from "../../Components/common/Input";
import Button from "../../Components/common/Button";
import { ArrowRight, Plus } from "lucide-react";

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    text: "",
    email: "",
    password: "",
    number: "",
    tel: "",
    date: "",
    dropdown: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [rememberEmail, setRememberEmail] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const dropdownOptions = [
    { label: "Select an option", value: "" },
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Dynamic Input Component
        </h1>
        <p className="text-gray-600 mb-8">
          A flexible input component with multiple types and sizes
        </p>

        <div className="space-y-6">
          <Input
            type="text"
            label="Text Input (Medium)"
            className="bg-black"
            placeholder="Enter text here"
            value={formData.text}
            onChange={handleChange("text")}
            size="md"
          />

          <Input
            type="email"
            label="Email Input with Remember Me"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange("email")}
            size="md"
            showRememberMe={true}
            rememberMeChecked={rememberEmail}
            onRememberMeChange={setRememberEmail}
            rememberMeLabel="Remember my email"
          />

          <Input
            type="password"
            label="Password Input with Eye Icon"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange("password")}
            size="md"
          />

          <Input
            type="number"
            label="Number Input (Small)"
            placeholder="Enter a number"
            value={formData.number}
            onChange={handleChange("number")}
            size="sm"
          />

          <Input
            type="tel"
            label="Phone Number"
            placeholder="+1 (555) 000-0000"
            value={formData.tel}
            onChange={handleChange("tel")}
            size="md"
          />

          <Input
            type="date"
            label="Date Input"
            value={formData.date}
            onChange={handleChange("date")}
            size="md"
          />

          <Input
            type="dropdown"
            label="Dropdown Select"
            placeholder="Choose an option"
            value={formData.dropdown}
            onChange={handleChange("dropdown")}
            options={dropdownOptions}
            size="md"
          />

          <Input
            type="text"
            label="Disabled Input"
            placeholder="This is disabled"
            value="Cannot edit"
            disabled={true}
            size="md"
          />

          <Input
            type="text"
            label="Input with Error"
            placeholder="This field has an error"
            value={formData.text}
            onChange={handleChange("text")}
            error="This field is required"
            size="md"
          />
          <Button text="Submit" color="blue" onClick={() => alert("Clicked")} />
          <Button
            text="Edit"
            color="green"
            variant="outline"
            padding="px-8 py-3"
            width="w-40"
          />
          <Button
            text="Add User"
            color="#000"
            padding="px-6 py-3"
            width="w-48"
            icon={<Plus size={18} />}
            iconPosition="left"
          />
          <Button
            text="Next"
            color="[#631891]"
            icon={<ArrowRight size={18} />}
            iconPosition="right"
          />
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Form Values:</h3>
          <pre className="text-sm text-gray-600 overflow-auto">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
