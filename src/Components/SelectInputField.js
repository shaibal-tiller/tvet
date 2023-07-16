import React, { useState } from 'react';

const SelectInputField = ({ title, value: initialValue,full, onChange, options, backgroundColor }) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (e) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e.target.name,e.target.value);
    }
  };

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{title}</label>
   
      <select
        value={value ||'N/A'}
        onChange={handleChange}
        className={`${full?'w-[50%]':'w-[80%]'}  border border-gray-300 p-2 rounded outline-none ${backgroundColor ? `bg-${backgroundColor}` : ''
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
