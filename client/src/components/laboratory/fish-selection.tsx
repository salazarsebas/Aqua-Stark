"use client"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, List, Grid } from "lucide-react"
import type { Fish } from "@/types/fish"
import { Button } from "@/components/ui/button"

interface FishSelectionProps {
  filteredFish: Fish[]
  onSelectFish: (fish: Fish) => void
}

export function FishSelection({ filteredFish, onSelectFish }: FishSelectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [cardWidth, setCardWidth] = useState(220) // Default card width (200px + 20px margin)
  const [viewMode, setViewMode] = useState<'scroll' | 'grid'>(typeof window !== 'undefined' && window.innerWidth >= 1024 ? 'grid' : 'scroll')
  
  // Calculate exact card width for precise scrolling
  useEffect(() => {
    if (scrollContainerRef.current && filteredFish.length > 0) {
      const container = scrollContainerRef.current
      const cards = container.querySelectorAll('.fish-card')
      
      if (cards.length > 0) {
        // Get the first card's full width including margins
        const firstCard = cards[0] as HTMLElement
        const cardRect = firstCard.getBoundingClientRect()
        const computedStyle = window.getComputedStyle(firstCard)
        const marginRight = parseInt(computedStyle.marginRight) || 0
        
        // Set card width including margin for precise scrolling
        setCardWidth(cardRect.width + marginRight)
      }
    }
  }, [filteredFish])
  
  // Track scroll position to show/hide navigation arrows
  const handleScroll = () => {
    if (!scrollContainerRef.current) return
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    
    // Show left arrow when scrolled at all
    setShowLeftArrow(scrollLeft > 0)
    
    // Show right arrow if there's more content to scroll
    setShowRightArrow(Math.ceil(scrollLeft) < scrollWidth - clientWidth)
  }
  
  // Handle arrow button scrolling - exactly one card at a time
  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    
    const currentScroll = scrollContainerRef.current.scrollLeft
    const targetScroll = direction === 'left' 
      ? currentScroll - cardWidth 
      : currentScroll + cardWidth
    
    scrollContainerRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    })
  }
  
  // Force a check of the scroll position
  const forceScrollCheck = () => {
    setTimeout(() => {
      if (scrollContainerRef.current) {
        handleScroll();
      }
    }, 100);
  };
  
  // Initialize scroll position check on mount and when filteredFish changes
  useEffect(() => {
    // Initial check
    handleScroll();
    
    // Force multiple checks after render to ensure arrows show correctly
    const timers = [
      setTimeout(handleScroll, 50),
      setTimeout(handleScroll, 200),
      setTimeout(handleScroll, 500)
    ];
    
    // Also check on window resize
    window.addEventListener('resize', handleScroll);
    
    // Add scroll event listener
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      
      // Return cleanup function
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
        timers.forEach(clearTimeout);
      };
    }
  }, [filteredFish]);

  // Update view mode based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setViewMode('grid')
      } else {
        setViewMode('scroll')
      }
      // Check arrows when view mode changes
      forceScrollCheck();
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="bg-blue-800/50 backdrop-blur-sm rounded-xl border border-blue-700/50 overflow-hidden flex flex-col lg:h-full">
      <div className="p-4 border-b border-blue-700/50 flex justify-between items-center">
        <div className="flex justify-between items-center grow">
          <h3 className="font-bold text-white">Select Fish for Breeding</h3>
          <span className="text-sm text-blue-300">{filteredFish.length} fish available</span>
        </div>
        
        <div className="flex items-center ml-4">
          <div className="hidden lg:flex border border-blue-700/50 rounded-md overflow-hidden">
            <Button 
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 rounded-none border-r border-blue-700/50",
                viewMode === 'scroll' ? "bg-blue-700/50 text-white" : "text-blue-300 hover:text-white"
              )}
              onClick={() => setViewMode('scroll')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 rounded-none",
                viewMode === 'grid' ? "bg-blue-700/50 text-white" : "text-blue-300 hover:text-white"
              )}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="relative p-4 flex-1 overflow-hidden flex flex-col">
        {/* Scroll View for Mobile/Tablet */}
        {viewMode === 'scroll' && (
          <>
            {/* Scroll shadows */}
            <div className={cn(
              "absolute inset-y-0 left-0 w-16 pointer-events-none z-10 bg-gradient-to-r from-blue-800/90 to-transparent transition-opacity duration-300",
              showLeftArrow ? "opacity-100" : "opacity-0"
            )} />
            
            <div className={cn(
              "absolute inset-y-0 right-0 w-16 pointer-events-none z-10 bg-gradient-to-l from-blue-800/90 to-transparent transition-opacity duration-300",
              showRightArrow ? "opacity-100" : "opacity-0"
            )} />
            
            {/* Navigation buttons - always rendered but conditionally visible */}
            {filteredFish.length > 1 && (
              <>
                <button 
                  className={cn(
                    "absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-blue-700/80 hover:bg-blue-600/80 rounded-full p-2 text-white shadow-lg border border-blue-500/50 transition-all duration-200",
                    showLeftArrow ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 -translate-x-4 pointer-events-none"
                  )}
                  onClick={() => scroll('left')}
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <button 
                  className={cn(
                    "absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-blue-700/80 hover:bg-blue-600/80 rounded-full p-2 text-white shadow-lg border border-blue-500/50 transition-all duration-200",
                    showRightArrow ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 translate-x-4 pointer-events-none"
                  )}
                  onClick={() => scroll('right')}
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
            
            {/* Horizontal scrolling container */}
            {filteredFish.length > 0 ? (
              <div className="flex-1 flex min-h-0">
                <div 
                  ref={scrollContainerRef}
                  className="flex overflow-x-auto py-4 px-2 scrollbar-hide snap-x snap-mandatory scroll-smooth w-full"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  onScroll={handleScroll}
                >
                  <div className={cn(
                    "inline-flex",
                    filteredFish.length <= 3 ? "justify-center" : ""
                  )}>
                    {filteredFish.map((fish) => (
                      <FishCard 
                        key={fish.id} 
                        fish={fish} 
                        onSelectFish={onSelectFish}
                        className="mr-5 min-w-[180px] sm:min-w-[200px] flex-shrink-0 snap-center"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 flex-1 flex items-center justify-center">
                <div>
                  <p className="text-blue-300">No fish match your filter criteria</p>
                  <p className="text-blue-400 text-sm mt-2">Try adjusting your filters to see more fish</p>
                </div>
              </div>
            )}
          </>
        )}

        {/* Grid View for Desktop */}
        {viewMode === 'grid' && (
          <div className="flex-1 overflow-y-auto py-2 px-1 h-full">
            {filteredFish.length > 0 ? (
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 content-start">
                {filteredFish.map((fish) => (
                  <FishCard 
                    key={fish.id} 
                    fish={fish} 
                    onSelectFish={onSelectFish}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 flex-1 flex items-center justify-center">
                <div>
                  <p className="text-blue-300">No fish match your filter criteria</p>
                  <p className="text-blue-400 text-sm mt-2">Try adjusting your filters to see more fish</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

interface FishCardProps {
  fish: Fish
  onSelectFish: (fish: Fish) => void
  className?: string
}

function FishCard({ fish, onSelectFish, className }: FishCardProps) {
  return (
    <motion.div
      className={cn(
        "fish-card bg-blue-700/30 rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-blue-700/50 transition-colors",
        className
      )}
      whileHover={{ scale: 1.03 }}
      onClick={() => onSelectFish(fish)}
    >
      <div className="relative w-16 sm:w-20 h-16 sm:h-20 mb-3 flex-shrink-0">
        <img 
          src={fish.image || "/fish/unkown-fish.png"} 
          alt={fish.name} 
          className="w-full h-full object-contain"
        />
      </div>
      <div className="w-full text-center">
        <h4 className="font-bold text-white text-sm sm:text-base truncate">{fish.name}</h4>
        <div className="flex items-center justify-center mt-1.5 flex-wrap gap-1">
          <span
            className={cn(
              "text-xs px-2 py-0.5 rounded-full",
              fish.rarity === "Common"
                ? "bg-gray-500/50 text-gray-100"
                : fish.rarity === "Uncommon"
                  ? "bg-green-500/50 text-green-100"
                  : fish.rarity === "Rare"
                    ? "bg-blue-500/50 text-blue-100"
                    : fish.rarity === "Epic"
                      ? "bg-purple-500/50 text-purple-100"
                      : "bg-amber-500/50 text-amber-100",
            )}
          >
            {fish.rarity}
          </span>
          <span className="text-blue-200 text-xs">Gen {fish.generation}</span>
          <span className="text-blue-200 text-xs">Lvl {fish.level}</span>
        </div>
        
        {fish.breedingCooldown && (
          <div
            className={cn(
              "text-xs px-2 py-1 rounded-full mt-2 inline-block",
              fish.breedingCooldown === "Ready"
                ? "bg-green-500/30 text-green-100"
                : "bg-orange-500/30 text-orange-100",
            )}
          >
            {fish.breedingCooldown}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// Helper styles for hiding scrollbars while keeping functionality
const scrollbarHideStyles = `
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
`;

// Inject styles into the document if not already present
if (typeof document !== 'undefined') {
  if (!document.getElementById('scrollbar-hide-styles')) {
    const styleTag = document.createElement('style');
    styleTag.id = 'scrollbar-hide-styles';
    styleTag.textContent = scrollbarHideStyles;
    document.head.appendChild(styleTag);
  }
}

