import React from 'react';

const SelectInputField = ({ title, value, onChange, options, backgroundColor }) => {
  const handleChange = (e) => {
   
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{title}</label>
      <select
        value={value}
        onChange={handleChange}
        className={`border border-gray-300 p-2 rounded ${
          backgroundColor ? `bg-${backgroundColor}` : ''
        }`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInputField;
