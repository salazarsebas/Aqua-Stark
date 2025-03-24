"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, X, ArrowLeft, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { fishData } from "@/data/mock-game";
import StoreItem from "@/components/store-item";

export default function StorePage() {
  const [activeTab, setActiveTab] = useState("fish");
  const [activeCategory, setActiveCategory] = useState("specials");
  const [bubbles, setBubbles] = useState<
    Array<{
      id: number;
      size: number;
      left: number;
      animationDuration: number;
    }>
  >([]);
  const footerRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-700 relative overflow-hidden">
      <nav className="flex justify-between items-center p-4 bg-blue-600 border-b-2 border-blue-400/50 relative z-10">
        <Link to="/" className="flex items-center">
          <Button
            variant="ghost"
            className="text-white hover:bg-blue-500/50 rounded-full mr-2"
          >
            <ArrowLeft className="mr-2" />
            Back
          </Button>
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Aqua_Stark-removebg-preview-ubKSrqYo7jzOH5qXqxEw4CyRHXIjfq.png"
            alt="Aqua Stark Logo"
            width={150}
            height={60}
            className="drop-shadow-lg"
          />
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-blue-700/50 rounded-full px-4 py-2 border border-blue-400/50">
            <Coins className="text-yellow-400 mr-2" size={20} />
            <span className="text-white font-bold">12,500</span>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-4xl font-bold text-white text-center mb-8 drop-shadow-lg">
          Aqua Stark Store
        </h1>

        <div className="bg-blue-600 rounded-t-3xl overflow-hidden border-2 border-blue-400/50 max-w-5xl mx-auto">
          <div className="flex">
            <TabButton
              active={activeTab === "fish"}
              onClick={() => setActiveTab("fish")}
            >
              FISH
            </TabButton>
            <TabButton
              active={activeTab === "food"}
              onClick={() => setActiveTab("food")}
            >
              FOOD
            </TabButton>
            <TabButton
              active={activeTab === "decorations"}
              onClick={() => setActiveTab("decorations")}
            >
              DECORATIONS
            </TabButton>
            <TabButton
              active={activeTab === "others"}
              onClick={() => setActiveTab("others")}
            >
              OTHERS
            </TabButton>
            <button className="p-2 text-white bg-red-500 hover:bg-red-600 rounded-full ml-auto mr-2 mt-2">
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              <CategoryButton
                active={activeCategory === "specials"}
                onClick={() => setActiveCategory("specials")}
              >
                SPECIAL
              </CategoryButton>
              <CategoryButton
                active={activeCategory === "legendary"}
                onClick={() => setActiveCategory("legendary")}
              >
                LEGENDARY
              </CategoryButton>
              <CategoryButton
                active={activeCategory === "rare"}
                onClick={() => setActiveCategory("rare")}
              >
                RARE
              </CategoryButton>
              <CategoryButton
                active={activeCategory === "carnivory"}
                onClick={() => setActiveCategory("carnivory")}
              >
                CARNIVOROUS
              </CategoryButton>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {fishData.map((fish, index) => (
                <StoreItem
                  key={index}
                  name={fish.name}
                  image={fish.image}
                  price={fish.price}
                  rarity={fish.rarity}
                />
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <button className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg shadow-lg border-2 border-orange-400">
                <ChevronLeft size={24} />
              </button>
              <div className="flex items-center gap-2">
                <PageButton active>1</PageButton>
                <PageButton>2</PageButton>
                <PageButton>3</PageButton>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg shadow-lg border-2 border-orange-400">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer
        ref={footerRef}
        className="bg-blue-800 py-6 border-t-2 border-blue-400/50 mt-12 relative"
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/80 mb-2">
            © 2025 Aqua Stark - All rights reserved
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Link
              to="#"
              className="text-white hover:text-blue-200 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="#"
              className="text-white hover:text-blue-200 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="#"
              className="text-white hover:text-blue-200 transition-colors"
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

function TabButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "py-3 px-4 text-white font-bold transition-all duration-200",
        active
          ? "bg-blue-700 border-b-2 border-blue-300"
          : "bg-blue-600 hover:bg-blue-700/70"
      )}
    >
      {children}
    </button>
  );
}

function CategoryButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-lg whitespace-nowrap shadow-md border",
        active
          ? "bg-blue-900 text-white border-blue-600"
          : "bg-blue-800 hover:bg-blue-900 text-white border-blue-700"
      )}
    >
      {children}
    </button>
  );
}

function PageButton({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      className={cn(
        "w-8 h-8 rounded-full font-bold",
        active
          ? "bg-blue-400 text-white"
          : "bg-blue-700 text-white hover:bg-blue-600"
      )}
    >
      {children}
    </button>
  );
}
