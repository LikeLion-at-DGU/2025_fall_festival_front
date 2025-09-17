import React from 'react';

function CodeInput({ placeholder, value, onChange }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value} // 부모에서 내려준 value 연결
      onChange={onChange} // 부모에서 내려준 onChange 이벤트 연결
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
