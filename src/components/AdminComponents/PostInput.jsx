import React from 'react';

function PostInput({ placeholder, value, onChange, className }) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`
        w-full px-6 py-4
        rounded-lg
        bg-[#E4E4E7] text-[#000]
        font-semibold
        placeholder-[#A1A1AA]
        focus:outline-none
        whitespace-nowrap
        resize-none  /* 사용자가 크기 조절 못 하도록 */
        ${className}
      `}
      rows={1} // 기본 표시되는 줄 수
    />
  );
}

export default PostInput;
