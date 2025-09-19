import { useState, useEffect } from "react";
function useFilteredBooths(booths, selectedFilter) {
  const [filteredBooths, setFilteredBooths] = useState([]);

  useEffect(() => {
    const filtered = booths.filter((item) => {
      if (selectedFilter === "Booth") return item.category === "Booth";
      if (selectedFilter === "Toilet") return item.category === "Toilet";
      if (selectedFilter === "Drink") return item.category === "Drink";
      if (selectedFilter === "Store") return item.category === "Store";
      if (selectedFilter === "FoodTruck") return item.category === "FoodTruck";
      return true;
    });
    setFilteredBooths(filtered);
  }, [booths, selectedFilter]);

  return filteredBooths;
}
export default useFilteredBooths;
