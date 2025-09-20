function NoticeBox({ noticeText = "공지", content, org }) {
  return (
    <div
      className="
        flex items-center justify-between 
        w-full h-[41px] 
        px-2 py-2
        rounded-[15px] 
        border-b border-[#A1A1AA]/50 bg-[#F4F4F5]
      "
    >
      {/* 왼쪽: 태그 + 텍스트 */}
      <div className="flex items-center gap-[10px] min-w-0"> {/* ✅ truncate용 min-w-0 */}
        <span
          className="
            inline-flex items-center justify-center 
            w-[40px] h-[25px] 
            px-[1px] py-[4px]
            rounded-[20px] 
            text-[0.65rem]
            bg-[#FFA6A6] 
            text-white text-sm font-medium flex-shrink-0
          "
        >
          {noticeText}
        </span>
        <p className="text-sm text-black truncate max-w-[200px]">
          {content}
        </p>
      </div>

      {/* 오른쪽: 기관명 */}
      <span className="text-sm text-gray-500 flex-shrink-0">- {org}</span>
    </div>
  );
}

export default NoticeBox;
