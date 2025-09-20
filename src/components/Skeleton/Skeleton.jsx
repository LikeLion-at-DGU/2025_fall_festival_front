import React from "react";

const Skeleton = ({
  width = "100%",
  height = "100%",
  className = "",
  rounded = "rounded",
  animate = true,
}) => {
  const baseClasses = `bg-neutral-200 ${rounded} ${
    animate ? "animate-pulse" : ""
  }`;

  return (
    <div
      className={`${baseClasses} ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    />
  );
};

export default Skeleton;
