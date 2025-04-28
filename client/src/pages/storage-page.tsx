"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Clock, Coins, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { fishData, ItemType, Rarity, storeBundles } from "@/data/mock-game";
import { StoreHeader } from "@/components/store/store-header";
import { StoreTabs } from "@/components/store/store-tabs";
import { StoreCategories } from "@/components/store/store-categories";
import { StoreGrid } from "@/components/store/store-grid";
import { PaginationControls } from "@/components/store/pagination-controls";
import { CartSidebar } from "@/components/store/cart-sidebar";
import { CheckoutModal } from "@/components/store/checkout-modal";
import { useCartStore } from "@/store/use-cart-store";
import { StoreCarousel } from "@/components/store/store-carousel";
import { SortOption, useStoreFilters } from "@/hooks/use-store-filters";
import { StoreSearchFilters } from "@/components/store/store-search-filters";
import { SpecialBundles } from "@/components/store/special-bundles";

export default function StorePage() {
  const [activeTab, setActiveTab] = useState<ItemType>("fish");
  const [bubbles, setBubbles] = useState<
    Array<{
      id: number;
      size: number;
      left: number;
      animationDuration: number;
    }>
  >([]);
  const footerRef = useRef<HTMLDivElement>(null);
  const { recentlyViewed } = useCartStore();

  const {
    filteredItems,
    searchQuery,
    setSearchQuery,
    selectedRarity,
    setSelectedRarity,
    sortOption,
    setSortOption,
  } = useStoreFilters({
    items: fishData,
    initialType: activeTab,
  });

  const rarityOptions: { value: Rarity | "all"; label: string }[] = [
    { value: "all", label: "ALL" },
    { value: "Special", label: "SPECIAL" },
    { value: "Legendary", label: "LEGENDARY" },
    { value: "Rare", label: "RARE" },
  ];

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
  ];

  useEffect(() => {
    const createBubbles = () => {
      const newBubbles = Array.from({ length: 30 }, (_, i) => ({
        id: Date.now() + i,
        size: Math.random() * 30 + 10,
        left: Math.random() * 100,
        animationDuration: Math.random() * 15 + 5,
      }));
      setBubbles(newBubbles);
    };

    createBubbles();

    const intervalId = setInterval(() => {
      const newBubble = {
        id: Date.now(),
        size: Math.random() * 30 + 10,
        left: Math.random() * 100,
        animationDuration: Math.random() * 15 + 5,
      };

      setBubbles((prev) => {
        const filtered = prev.length > 50 ? prev.slice(-50) : prev;
        return [...filtered, newBubble];
      });
    }, 300);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-500 to-blue-700">
      <StoreHeader />
      <CartSidebar />
      <CheckoutModal />

      <main className="container relative z-10 px-4 py-8 mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-center text-white drop-shadow-lg">
          Aqua Stark Store
        </h1>

        <div>
          <StoreCarousel />
        </div>

        <div className="max-w-5xl mx-auto overflow-hidden bg-blue-600 border-2 rounded-t-3xl border-blue-400/50">
          {/* Tabs */}
          <div className="flex">
            <StoreTabs activeTab={activeTab} onTabChange={setActiveTab} />
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button className="p-2 mt-2 ml-auto mr-2 text-white bg-red-500 rounded-full hover:bg-red-600">
              <X size={20} />
            </button>
          </div>

          {/* Search and Filters */}
          <StoreSearchFilters
            rarityOptions={rarityOptions}
            sortOptions={sortOptions}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedRarity={selectedRarity}
            setSelectedRarity={setSelectedRarity}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />

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
                  <h3 className="flex items-center mb-2 space-x-2 text-lg font-semibold text-white">
                    <Clock />
                    <span> Recently Viewed</span>
                  </h3>
                  <div className="grid grid-cols-4 gap-2">
                    {recentlyViewed.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        className="flex flex-col p-2 border rounded-lg shadow-lg bg-blue-400/25 border-white/20"
                      >
                        <div className="">
                          <div className="flex items-center justify-center w-20 h-20 p-1 mx-auto overflow-hidden rounded-lg bg-blue-500/50">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-auto mx-auto"
                            />
                          </div>
                          <div>
                            <h4 className="mt-2 font-semibold text-center text-white">
                              {item.name}
                            </h4>
                            <p className="flex items-center justify-center py-2 text-xs text-center text-gray-200">
                              <Coins
                                className="mr-1 text-yellow-400"
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

            <StoreCategories
              activeCategory={selectedRarity.toLowerCase()}
              onCategoryChange={(v) => setSelectedRarity(v as Rarity)}
            />

            {/* Special Bundles (only for decorations tab) */}
            {activeTab === "decorations" && storeBundles.length > 0 && (
              <SpecialBundles bundles={storeBundles} />
            )}

            <StoreGrid items={filteredItems} />

            <PaginationControls />
          </div>
        </div>
      </main>

      <footer
        ref={footerRef}
        className="relative py-6 mt-12 bg-blue-800 border-t-2 border-blue-400/50"
      >
        <div className="container px-4 mx-auto text-center">
          <p className="mb-2 text-white/80">
            © 2025 Aqua Stark - All rights reserved
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Link
              to="#"
              className="text-white transition-colors hover:text-blue-200"
            >
              Privacy Policy
            </Link>
            <Link
              to="#"
              className="text-white transition-colors hover:text-blue-200"
            >
              Terms of Service
            </Link>
            <Link
              to="#"
              className="text-white transition-colors hover:text-blue-200"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Bubbles container */}
        <div
          className="absolute inset-x-0 bottom-0 overflow-hidden"
          style={{ height: "100vh" }}
        >
          {bubbles.map((bubble) => (
            <div
              key={bubble.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                left: `${bubble.left}%`,
                bottom: "0",
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2))",
                animation: `footer-float-up ${bubble.animationDuration}s ease-in infinite`,
              }}
            />
          ))}
        </div>
      </footer>

      <style>{`
        @keyframes footer-float-up {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          50% { transform: translateY(-50vh) scale(1.1); opacity: 0.5; }
          100% { transform: translateY(-100vh) scale(1.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
