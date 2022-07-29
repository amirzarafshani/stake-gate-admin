import React, { useCallback } from 'react';

export default function Upload({ label, onChange, error, name_ }, props) {
  const handleInputChange = useCallback((e) => {
    onChange(e);
  }, []);

  return (
    <React.Fragment>
      <label htmlFor="formFileSm" className="block text-sm">
        {label}
      </label>
      <input
        className={`
        block
        w-full
        px-2
        py-1.5
        text-sm
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid 
        transition
        ease-in-out
        m-0 focus:ring-1 focus:ring-blue-600 rounded-md focus:border-blue-400
        focus:text-gray-700 focus:bg-white focus:outline-none 
        ${error ? 'border-red-500' : 'border-gray-200'}
        `}
        id="file_input"
        type="file"
        onChange={handleInputChange}
        name={name_}
      />
      <p className="mt-1 text-sm text-gray-500" id="formFileSm">
        PNG, JPG or GIF (MAX. 800x400px).
      </p>
    </React.Fragment>
  );
}
