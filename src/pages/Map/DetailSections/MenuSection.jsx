import React from "react";

export default function MenuSection({ menus }) {
    if (!menus?.length) return null;

    // Best 먼저
    const sortedMenus = [...menus].sort((a, b) => (b.is_best ? 1 : 0) - (a.is_best ? 1 : 0));

    return (
        <div className="mx-4 mt-4">
            <h2 className="font-semibold mb-2 text-[#EF7063] text-xl">판매 메뉴</h2>

            {/* 가로 스크롤: 위로 튀는 뱃지 안 잘리게 pt 추가 + 스크롤바 숨김 */}
            <div className="flex gap-3 overflow-x-auto scrollbar-hidden pt-3">
                {sortedMenus.map((m, i) => (
                    // 카드 래퍼: 뱃지 기준점
                    <div key={i} className="relative flex-shrink-0 w-32">
                        {/* Best 뱃지*/}
                        {m.is_best && (
                            <span className="absolute left-2 top-0 -translate-y-3 text-xs bg-[#EF7063] text-white px-2 py-0.5 rounded-full shadow z-20">
                                Best
                            </span>
                        )}

                        {/* 카드 본체 */}
                        <div className="bg-white shadow-md rounded-2xl p-3 flex flex-col items-start mb-2">
                            {/* 이미지 박스 */}
                            <div className="relative w-full h-24 flex items-center justify-center bg-gray-200 rounded-xl">
                                {m.image_url && (
                                    <img
                                        src={m.image_url}
                                        alt={m.name}
                                        className={`w-full h-full object-cover rounded-xl ${m.is_soldout ? "opacity-60" : "opacity-100"
                                            }`}
                                    />
                                )}
                                {/* 품절 배지 */}
                                {m.is_soldout && (
                                    <span className="absolute top-1 right-1 text-xs bg-[#2A2A2ECC] text-[#E65B4D] px-2 py-0.5 rounded-md z-10">
                                        재고 소진
                                    </span>
                                )}
                            </div>

                            {/* 텍스트 */}
                            <p className="mt-2 text-sm font-semibold text-left">{m.name}</p>
                            <p className="text-xs text-gray-500 text-left">{m.price}원</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
