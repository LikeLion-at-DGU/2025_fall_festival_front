import { useState, useEffect } from "react";

function useFilteredBooths(booths, selectedFilter) {
  const [filteredBooths, setFilteredBooths] = useState([]);

  useEffect(() => {
    if (!booths || !Array.isArray(booths)) {
      setFilteredBooths([]);
      return;
    }

    // 소문자/공백 제거해서 안전하게 비교
    const filter = selectedFilter?.toLowerCase().trim();

    const filtered = booths.filter((item) => {
      const cat = item.category?.toLowerCase().trim();

      if (filter === "booth") return cat === "booth";
      if (filter === "toilet") return cat === "toilet";
      if (filter === "drink") return cat === "drink";   // ✅ Drink 처리
      if (filter === "store") return cat === "store";
      if (filter === "foodtruck") return cat === "foodtruck";
      return true;
    });

    console.log("필터 결과:", filter, filtered.map(f => f.name));
    setFilteredBooths(filtered);
  }, [booths, selectedFilter]);

  return filteredBooths;
}

export default useFilteredBooths;
