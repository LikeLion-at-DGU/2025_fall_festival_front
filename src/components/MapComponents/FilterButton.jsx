import React from "react";

const FilterButton = ({
  children,
  isActive = false,
  onClick,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`
        flex items-center justify-center gap-2.5
        px-2 py-1
        rounded-[12px]
        text-xs font-normal leading-[150%]
        font-suite
        cursor-pointer
        transition-all duration-200
        ${
          isActive
            ? "bg-primary-500 text-white shadow-tag"
            : "bg-white text-neutral-700 shadow-tag hover:bg-neutral-100"
        }
        ${className}
      `.trim()}
      onClick={onClick}
      {...props}
    >
      <span className="relative z-10">{children}</span>

      {isActive && (
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 4px)",
          }}
        />
      )}
    </button>
  );
};

export default FilterButton;
