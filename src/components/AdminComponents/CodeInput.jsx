import React from 'react';
function CodeInput({ placeholder }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="
        flex flex-col justify-between items-center
        h-14 w-full px-6 py-4
        rounded-lg
        bg-white text-[#000]
        placeholder-[#A1A1AA]
        focus:outline-none
      "
    />
  );
};

export default CodeInput;
