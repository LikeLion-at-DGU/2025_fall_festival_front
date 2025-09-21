import React from "react";
import { useTranslation } from "react-i18next";
import { useTranslations } from "../../../context/TranslationContext";

export default function MenuSection({ menus, boothId }) {
  const { t } = useTranslation();
  const { getTranslation, requestSingleTranslation } = useTranslations();

  if (!menus?.length) return null;

  // 메뉴 번역 요청
  React.useEffect(() => {
    if (!menus || !boothId) return;

    menus.forEach((menu, index) => {
      if (menu.name) {
        requestSingleTranslation({
          entity_type: "booth",
          entity_id: boothId.toString(),
          field: `MenuName_${index}`,
          source_lang: "ko",
          source_text: menu.name,
        });
      }
    });
  }, [menus, boothId, requestSingleTranslation]);

  return (
    <div className="w-full mx-4 mt-4">
      <h2 className="font-semibold mb-[12px] text-[#EF7063] text-xl">
        {t("booth.menu")}
      </h2>

      {/* 가로 스크롤: 위로 튀는 뱃지 안 잘리게 pt 추가 + 스크롤바 숨김 */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hidden pt-1">
        {menus.map((m, i) => (
          // 카드 래퍼
          <div key={i} className="relative flex-shrink-0 w-32">
            {/* 카드 본체 */}
            <div className="bg-white shadow-md rounded-2xl p-3 flex flex-col items-start mb-2">
              {/* 이미지 박스 */}
              <div className="relative [107px] h-[107px] flex items-center justify-center bg-gray-200 rounded-[16px]">
                {m.image_url && (
                  <img
                    src={m.image_url}
                    alt={m.name}
                    className={`w-full h-full object-cover rounded-xl ${
                      m.is_soldout ? "opacity-60" : "opacity-100"
                    }`}
                  />
                )}
                {/* 품절 배지 */}
                {m.is_soldout && (
                  <span className="whitespace-nowrap absolute top-1 left-8 text-[10px] bg-[#2A2A2ECC] text-[#E65B4D] font-normal px-[6px] py-[3px] rounded-[16px] z-10">
                    {t("booth.lowStock")}
                  </span>
                )}
              </div>

              {/* 텍스트 */}
              <p className="mt-2 text-sm font-semibold text-left">
                {getTranslation(
                  "booth",
                  boothId.toString(),
                  `MenuName_${i}`,
                  m.name
                )}
              </p>
              <p className="text-xs text-gray-500 text-left">{m.price}원</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
