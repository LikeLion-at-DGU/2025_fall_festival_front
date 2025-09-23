import React from "react";

export default function Tooltip({ text, children }) {
  return (
    <div className="relative flex items-center group">
      {children}
      <div
        className="absolute bottom-full mb-2 hidden group-hover:flex group-focus-within:flex
                   items-center justify-center px-3 py-1.5
                   rounded-lg text-sm font-medium
                   bg-black/80 text-white
                   shadow-md backdrop-blur-sm
                   whitespace-nowrap z-20"
      >
        {text}
      </div>
    </div>
  );
}
