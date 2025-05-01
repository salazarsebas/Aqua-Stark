"use client";

import { useState } from "react";
// Removed unused imports: useEffect, Link
import { Clock, Coins, Filter, Search, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { fishData } from "@/data/mock-game";
import { miscItems, bundles } from "@/data/mock-store";
import { StoreTabs } from "@/components/store/store-tabs";
import { StoreCategories } from "@/components/store/store-categories";
import { StoreGrid } from "@/components/store/store-grid";
import { BundleGrid } from "@/components/store/bundle-grid";
import { PaginationControls } from "@/components/store/pagination-controls";
import { CartSidebar } from "@/components/store/cart-sidebar";
import { CheckoutModal } from "@/components/store/checkout-modal";
import { useCartStore } from "@/store/use-cart-store";
import { StoreCarousel } from "@/components/store/store-carousel";
import { BubblesBackground } from "@/components/bubble-background";
import { useBubbles } from "@/hooks/use-bubbles";
import { FilterPanel } from "@/components/store/filter-panel";
import { SortDropdown } from "@/components/store/sort-dropdown";
import { useDebounce } from "@/hooks/use-debounce";
import { PageHeader } from "@/components/layout/page-header";
import { Footer } from "@/components/layout/footer";

// Define types for our data model
interface StoreItem {
  name: string;
  image: string;
  price: number;
  rarity: string;
  description: string;
  rating: number;
  // Add missing properties that were causing errors
  category?: string;
  discounted?: boolean;
  popularity?: number;
  createdAt?: Date;
  id: string; // Required for recentlyViewed
}

interface Bundle {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  items: string[];
  discount: number;
}

// Define the PriceRange type that's expected by FilterPanel
type PriceRange = [number, number];

// Define types for sort state
interface SortState {
  field: 'price' | 'popularity' | 'newest';
  direction: 'asc' | 'desc';
}

// Define types for filter state
interface FilterState {
  priceRange: PriceRange;
  categories: string[];
  onSale: boolean;
}

// Custom hook for store filters
function useStoreFilters() {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 5000],
    categories: [],
    onSale: false,
  });

  const [sort, setSort] = useState<SortState>({
    field: "price",
    direction: "asc",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);

  const updatePriceRange = (range: PriceRange) => {
    setFilters(prev => ({ ...prev, priceRange: range }));
  };

  const updateCategories = (categories: string[]) => {
    setFilters(prev => ({ ...prev, categories }));
  };

  const toggleOnSale = () => {
    setFilters(prev => ({ ...prev, onSale: !prev.onSale }));
  };

  const updateSort = (field: SortState['field'], direction: SortState['direction']) => {
    setSort({ field, direction });
  };

  return {
    filters,
    sort,
    searchQuery,
    debouncedSearch,
    setSearchQuery,
    updatePriceRange,
    updateCategories,
    toggleOnSale,
    updateSort,
  };
}

export default function StorePage() {
  const [activeTab, setActiveTab] = useState("fish");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const {
    filters,
    sort,
    searchQuery,
    debouncedSearch,
    setSearchQuery,
    updatePriceRange,
    updateCategories,
    toggleOnSale,
    updateSort,
  } = useStoreFilters();

  const bubbles = useBubbles();
  const { recentlyViewed } = useCartStore();

  // Get the correct items based on the active tab
  const getTabItems = (): StoreItem[] => {
    switch (activeTab) {
      case "fish":
        return fishData as unknown as StoreItem[];
      case "food":
        // In a real implementation, these would come from their own data files
        return [] as StoreItem[];
      case "decorations":
        // In a real implementation, these would come from their own data files
        return [] as StoreItem[];
      case "others":
        return miscItems as unknown as StoreItem[];
      default:
        return fishData as unknown as StoreItem[];
    }
  };

  // Filter items based on all filters
  const filteredItems = getTabItems().filter((item) => {
    // Apply category filter from sidebar
    const categoryMatch =
      activeCategory === "all" ||
      (item.rarity && item.rarity.toLowerCase() === activeCategory.toLowerCase()) ||
      (activeCategory === "on-sale" && bundles.some(bundle =>
        bundle.items.includes(item.name) ||
        bundle.items.some(bundleItem => typeof bundleItem === 'string' && bundleItem.includes(item.name))
      ));

    // Apply search filter
    const searchMatch = !debouncedSearch ||
      item.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(debouncedSearch.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(debouncedSearch.toLowerCase()));

    // Apply price range filter
    const priceMatch =
      item.price >= filters.priceRange[0] &&
      item.price <= filters.priceRange[1];

    // Apply category filter from filter panel
    const filterCategoryMatch =
      filters.categories.length === 0 ||
      (item.rarity && filters.categories.includes(item.rarity.toLowerCase()));

    // Apply on sale filter
    const saleMatch = !filters.onSale ||
      (item.discounted ||
        bundles.some(bundle =>
          bundle.items.includes(item.name) ||
          bundle.items.some(bundleItem => typeof bundleItem === 'string' && bundleItem.includes(item.name))
        ));

    return categoryMatch && searchMatch && priceMatch && filterCategoryMatch && saleMatch;
  });

  // Sort filtered items
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sort.field === "price") {
      return sort.direction === "asc" ? a.price - b.price : b.price - a.price;
    } else if (sort.field === "popularity") {
      // Use optional chaining to avoid errors when property might not exist
      const aPopularity = a.popularity ?? 0;
      const bPopularity = b.popularity ?? 0;
      return sort.direction === "asc" ? aPopularity - bPopularity : bPopularity - aPopularity;
    } else if (sort.field === "newest") {
      // Use optional chaining and nullish coalescing for safe comparison
      const aDate = a.createdAt ? a.createdAt.getTime() : 0;
      const bDate = b.createdAt ? b.createdAt.getTime() : 0;
      return sort.direction === "asc" ? aDate - bDate : bDate - aDate;
    }
    return 0;
  });

  // Check if we should show bundles (only in Others tab)
  const shouldShowBundles = activeTab === "others";

  // Get the title for the current tab
  const getTabTitle = () => {
    switch (activeTab) {
      case "fish":
        return "Fish Collection";
      case "food":
        return "Fish Food";
      case "decorations":
        return "Aquarium Decorations";
      case "others":
        return "Aquarium Accessories";
      default:
        return "Products";
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-500 to-blue-900 animated-background">
      <BubblesBackground bubbles={bubbles} />

      <PageHeader title="Aqua Stark Store" backTo="/" />
      <CartSidebar />
      <CheckoutModal />

      <main className="relative z-10">
        <div className="max-w-7xl px-4 py-8 mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-8 drop-shadow-lg">
            Aqua Stark Store
          </h1>

          <div>
            <StoreCarousel />
          </div>

          <div className="bg-blue-600 rounded-t-3xl overflow-hidden border-2 border-blue-400/50 max-w-5xl mx-auto">
            {/* Tabs */}
            <div className="flex">
              <StoreTabs activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            {/* Content */}
            <div className="p-6">
              <AnimatePresence>
                {recentlyViewed.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2 flex items-center space-x-2">
                      <Clock />
                      <span> Recently Viewed</span>
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {recentlyViewed.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ scale: 1.05 }}
                          className="bg-blue-400/25 rounded-lg p-2 flex flex-col border border-white/20 shadow-lg"
                        >
                          <div className="">
                            <div className="bg-blue-500/50 rounded-lg overflow-hidden w-20 h-20 p-1 mx-auto flex items-center justify-center">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 mx-auto h-auto"
                              />
                            </div>
                            <div>
                              <h4 className="font-semibold text-white mt-2 text-center">
                                {item.name}
                              </h4>
                              <p className="text-xs py-2 text-gray-200 text-center flex items-center justify-center">
                                <Coins
                                  className="text-yellow-400 mr-1"
                                  size={20}
                                />
                                <span>{item.price}</span>
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tab Title */}
              <h2 className="text-2xl font-bold text-white mb-4">{getTabTitle()}</h2>

              {/* Search and Filter Row */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <div className="relative flex-grow w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-blue-700/50 border border-blue-400/30 rounded-lg py-2 pl-10 pr-4 text-white placeholder-blue-300"
                  />
                </div>
                <div className="flex gap-2 w-full sm:w-auto relative">
                  <button
                    className="bg-blue-700 text-white rounded-lg px-4 py-2 flex items-center"
                    onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                  >
                    <Filter className="mr-2" size={18} />
                    Filters
                  </button>
                  <div className="relative">
                    <button
                      className="bg-blue-700 text-white rounded-lg px-4 py-2 flex items-center"
                      onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                    >
                      <SlidersHorizontal className="mr-2" size={18} />
                      Sort
                    </button>
                    {isSortDropdownOpen && (
                      <SortDropdown
                        sort={sort}
                        updateSort={updateSort}
                        onClose={() => setIsSortDropdownOpen(false)}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Filter Panel */}
              <AnimatePresence>
                {isFilterPanelOpen && (
                  <FilterPanel
                    priceRange={filters.priceRange}
                    categories={filters.categories}
                    onSale={filters.onSale}
                    updatePriceRange={updatePriceRange}
                    updateCategories={updateCategories}
                    toggleOnSale={toggleOnSale}
                    onClose={() => setIsFilterPanelOpen(false)}
                  />
                )}
              </AnimatePresence>

              <StoreCategories
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />

              {/* Bundles section (only shown in Others tab) */}
              {shouldShowBundles && <BundleGrid bundles={bundles as unknown as Bundle[]} />}

              {/* Regular items grid */}
              <StoreGrid items={sortedItems} />

              <PaginationControls />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}