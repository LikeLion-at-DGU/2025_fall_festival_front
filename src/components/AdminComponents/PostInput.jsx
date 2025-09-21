import React from 'react';

function PostInput({ placeholder, value, onChange, className, disabled = false }) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`
        w-full px-6 py-4
        rounded-[13px]
        bg-[#E4E4E7] text-[#000]
        text-sm
        placeholder-[#A1A1AA]
        focus:outline-none
        resize-none  /* 사용자가 크기 조절 못 하도록 */
        ${className}
        ${disabled 
          ? "bg-gray-100 text-gray-400 placeholder-gray-400 cursor-not-allowed" 
          : "bg-gray-100 text-black placeholder-gray-300"}
      `}
      rows={1} // 기본 표시되는 줄 수
    />
  );
}

export default PostInput;
