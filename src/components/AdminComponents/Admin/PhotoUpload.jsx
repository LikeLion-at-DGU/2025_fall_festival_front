import React, { useState } from "react";

function PhotoUpload({ onChange }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange(file); // 상위 컴포넌트로 전달
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* 미리보기 영역 */}
      {preview && (
        <div className="w-full h-48 flex items-center justify-center border rounded-lg overflow-hidden">
          <img
            src={preview}
            alt="preview"
            className="object-cover w-full h-full"
          />
        </div>
      )}

      {/* 버튼 */}
      <label className="w-full">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <div
          className="h-14 w-full px-6 py-4
                     rounded-lg
                     bg-[#EF7063] text-[#F4F4F5]
                     font-semibold
                     flex items-center justify-center
                     cursor-pointer"
        >
          사진 업로드하기
        </div>
      </label>
    </div>
  );
}

export default PhotoUpload;
