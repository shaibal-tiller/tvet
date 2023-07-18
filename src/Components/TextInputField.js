import React, { useState } from 'react';

const TextInputField = ({ title, type = 'text',icon, readOnly, full, value: initialValue,
  onChange, backgroundColor = 'gray-100', name }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e.target.name, e.target.value);
    }
  };

  return (
    <div className={`mb-4 ${full ? 'col-span-2 ' : ''}`}>
      <label className=" block font-medium mb-1">{title}</label>
      {!full ? (<div className='relative'>
        {icon ? icon :<></>}

        <input
          name={name || title}
          type={type}
          value={value}
          placeholder='N/A'
          onChange={handleChange}
          readOnly={readOnly}
          className={`${icon? 'pl-10':''} w-[80%] border border-gray-300 p-2 rounded outline-none ${readOnly ? ' bg-[#6865657e] cursor-not-allowed' : ''}`}
          style={{ backgroundColor: `${backgroundColor}` }}
        />
      </div>) : (<textarea
        name={name || title}
        type={type}
        value={value}
        placeholder='N/A'
        onChange={handleChange}
        readOnly={readOnly}
        className={` w-[90%] border border-gray-300 p-2 rounded outline-none ${readOnly ? ' bg-[#6865657e] cursor-not-allowed' : ''}`}
        style={{ backgroundColor: `${backgroundColor}` }}
      />
      )}

    </div>
  );
};

export default TextInputField;
