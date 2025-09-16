import React from 'react';
function PhotoUpload({ text }) {
  return (
    <span
      className={`text-[#2A2A2E] 
         font-semibold 
         w-full
         whitespace-nowrap
        text-[20px] leading-[26px]`}
    >{text}</span>
  );
};

export default PhotoUpload;
