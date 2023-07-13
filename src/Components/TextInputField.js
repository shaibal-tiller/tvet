import React, { useState } from 'react';

const TextInputField = ({ title, readOnly, value: initialValue, onChange, backgroundColor }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{title}</label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        readOnly={readOnly}
        className='border border-gray-300 p-2 rounded outline-none' style={{backgroundColor :`${backgroundColor}`}}
      />
    </div>
  );
};

export default TextInputField;
