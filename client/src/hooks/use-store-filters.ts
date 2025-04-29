"use client";

import { useState, useMemo } from "react";
import { FishData, type Rarity, type ItemType } from "@/data/mock-game";

export type SortOption = "price-asc" | "price-desc" | "name-asc" | "name-desc";

interface UseStoreFiltersProps {
  items: FishData[];
  initialType?: ItemType;
}

export function useStoreFilters({ items, initialType }: UseStoreFiltersProps) {
  const [selectedType, setSelectedType] = useState<ItemType | null>(
    initialType || null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRarity, setSelectedRarity] = useState<Rarity | "all">("all");
  const [sortOption, setSortOption] = useState<SortOption>("price-asc");

  // Apply search filter
  const searchedItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const query = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
  }, [items, searchQuery]);

  // Apply rarity filter
  const filteredItems = useMemo(() => {
    if (selectedRarity === "all") return searchedItems;
    return searchedItems.filter(
      (item) => item.rarity.toLowerCase() === selectedRarity.toLowerCase()
    );
  }, [searchedItems, selectedRarity]);

  // Sort items
  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const priceA = a.price;
      const priceB = b.price;

      switch (sortOption) {
        case "price-asc":
          return priceA - priceB;
        case "price-desc":
          return priceB - priceA;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }, [filteredItems, sortOption]);

  return {
    filteredItems: sortedItems,
    selectedType,
    setSelectedType,
    searchQuery,
    setSearchQuery,
    selectedRarity,
    setSelectedRarity,
    sortOption,
    setSortOption,
  };
}
