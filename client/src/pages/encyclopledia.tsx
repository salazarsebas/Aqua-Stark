
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Search,
  Filter,
  Book,
  Info,
  Droplet,
  Fish,
  Heart,
  AlertTriangle,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Star,
  Sparkles,
  Lock,
  Bookmark,
  BookmarkCheck,
  BarChart3,
  Layers,
  CheckCircle,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { fishSpecies } from "@/data/encyclopedia-data";
import { FishSpecies } from "@/data/encyclopedia-data";
import Header from "@/components/encyclopedia/encyclopedia-header";
import { Footer } from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { FishTank } from "@/components/fish-tank"

interface Bubble {
  id: number
  size: number
  left: number
  duration: number
  delay: number
}

interface EncyclopediaFilters {
  search: string
  rarity: string[]
  habitat: string[]
  diet: string[]
  temperament: string[]
  careLevel: string[]
  discovered: "all" | "discovered" | "undiscovered"
  sort: "name" | "rarity" | "recent"
}

export default function EncyclopediaPage() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [activeTab, setActiveTab] = useState("catalog")
  const [selectedFish, setSelectedFish] = useState<FishSpecies | null>(null)
  const [showFishDetails, setShowFishDetails] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<EncyclopediaFilters>({
    search: "",
    rarity: [],
    habitat: [],
    diet: [],
    temperament: [],
    careLevel: [],
    discovered: "all",
    sort: "name",
  })

  // Generate bubbles for background
  useEffect(() => {
    const newBubbles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 30 + 10,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 5,
      delay: Math.random() * 5,
    }))
    setBubbles(newBubbles)
  }, [])


  // Filter fish based on current filters
  const filteredFish = fishSpecies.filter((fish) => {
    // Search filter
    if (
      filters.search &&
      !fish.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !fish.scientificName.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false
    }

    // Rarity filter
    if (filters.rarity.length > 0 && !filters.rarity.includes(fish.rarity)) {
      return false
    }

    // Habitat filter
    if (filters.habitat.length > 0 && !filters.habitat.includes(fish.habitat)) {
      return false
    }

    // Diet filter
    if (filters.diet.length > 0 && !filters.diet.includes(fish.diet)) {
      return false
    }

    // Temperament filter
    if (filters.temperament.length > 0 && !filters.temperament.includes(fish.temperament)) {
      return false
    }

    // Care level filter
    if (filters.careLevel.length > 0 && !filters.careLevel.includes(fish.careLevel)) {
      return false
    }

    // Discovery status filter
    if (filters.discovered === "discovered" && !fish.discovered) {
      return false
    }
    if (filters.discovered === "undiscovered" && fish.discovered) {
      return false
    }

    return true
  })

  // Sort filtered fish
  const sortedFish = [...filteredFish].sort((a, b) => {
    switch (filters.sort) {
      case "name":
        return a.name.localeCompare(b.name)
      case "rarity":
        const rarityOrder = { Common: 1, Uncommon: 2, Rare: 3, Epic: 4, Legendary: 5 }
        return rarityOrder[b.rarity] - rarityOrder[a.rarity]
      case "recent":
        if (!a.discovered) return 1
        if (!b.discovered) return -1
        if (!a.discoveryDate) return 1
        if (!b.discoveryDate) return -1
        return new Date(b.discoveryDate).getTime() - new Date(a.discoveryDate).getTime()
      default:
        return 0
    }
  })

  // Calculate collection statistics
  const totalSpecies = fishSpecies.length
  const discoveredSpecies = fishSpecies.filter((fish) => fish.discovered).length

  // Handle fish click
  const handleFishClick = (fish: FishSpecies) => {
    setSelectedFish(fish)
    setShowFishDetails(true)
  }

  // Toggle bookmark for a fish
  const toggleBookmark = (fishId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    // In a real app, this would update the state or send a request to the server
    alert(
      console.log("alerta")
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-600 to-blue-900">
      {/* Background bubbles */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={
            {
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.left}%`,
              "--duration": `${bubble.duration}s`,
              animationDelay: `${bubble.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}

  {/* Header */}
   <Header discoveredSpecies={discoveredSpecies} totalSpecies={totalSpecies} />

      {/* Main content */}
      <main className="relative z-10 container mx-auto p-4 md:p-6">
        {/* Tabs for different sections */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6 bg-blue-800/50 border border-blue-700/50">
            <TabsTrigger
              value="catalog"
              className="data-[state=active]:bg-blue-700 data-[state=active]:text-white text-blue-200"
            >
              <Book className="h-4 w-4 mr-2 md:mr-1" />
              <span className="hidden md:inline">Fish Catalog</span>
            </TabsTrigger>
            <TabsTrigger
              value="habitats"
              className="data-[state=active]:bg-blue-700 data-[state=active]:text-white text-blue-200"
            >
              <Droplet className="h-4 w-4 mr-2 md:mr-1" />
              <span className="hidden md:inline">Habitats</span>
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="data-[state=active]:bg-blue-700 data-[state=active]:text-white text-blue-200"
            >
              <BarChart3 className="h-4 w-4 mr-2 md:mr-1" />
              <span className="hidden md:inline">Collection Stats</span>
            </TabsTrigger>
          </TabsList>

          {/* Fish Catalog Tab */}
          <TabsContent value="catalog" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1 w-full md:w-auto">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search by name or scientific name..."
                    className="bg-blue-700/50 border-blue-600/50 text-white placeholder:text-blue-300/70 pr-8 w-full"
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  />
                  <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-300/70" />
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Button
                  variant="outline"
                  className="bg-blue-800/50 border-blue-700/50 text-white hover:bg-blue-700/70 flex-1 md:flex-none"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {showFilters ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                </Button>
                <select
                  className="bg-blue-800/50 border border-blue-700/50 text-white rounded-md px-3 py-2 flex-1 md:flex-none"
                  value={filters.sort}
                  onChange={(e) => setFilters({ ...filters, sort: e.target.value as any })}
                >
                  <option value="name">Sort by Name</option>
                  <option value="rarity">Sort by Rarity</option>
                  <option value="recent">Sort by Recent</option>
                </select>
              </div>
            </div>

            {/* Filters panel */}
            {showFilters && (
              <div className="bg-blue-800/50 backdrop-blur-sm rounded-xl border border-blue-700/50 p-4 animate-in fade-in-50 duration-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Rarity filter */}
                  <div>
                    <h3 className="font-bold text-white mb-2">Rarity</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {["Common", "Uncommon", "Rare", "Epic", "Legendary"].map((rarity) => (
                        <Button
                          key={rarity}
                          variant="outline"
                          size="sm"
                          className={cn(
                            "border-blue-600/50 text-blue-100",
                            filters.rarity.includes(rarity)
                              ? "bg-blue-700/70 border-blue-500/70"
                              : "bg-blue-800/30 hover:bg-blue-700/50",
                          )}
                          onClick={() => {
                            if (filters.rarity.includes(rarity)) {
                              setFilters({
                                ...filters,
                                rarity: filters.rarity.filter((r) => r !== rarity),
                              })
                            } else {
                              setFilters({
                                ...filters,
                                rarity: [...filters.rarity, rarity],
                              })
                            }
                          }}
                        >
                          {rarity}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Habitat filter */}
                  <div>
                    <h3 className="font-bold text-white mb-2">Habitat</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {["Freshwater", "Saltwater", "Brackish", "Deep Sea", "Tropical"].map((habitat) => (
                        <Button
                          key={habitat}
                          variant="outline"
                          size="sm"
                          className={cn(
                            "border-blue-600/50 text-blue-100",
                            filters.habitat.includes(habitat)
                              ? "bg-blue-700/70 border-blue-500/70"
                              : "bg-blue-800/30 hover:bg-blue-700/50",
                          )}
                          onClick={() => {
                            if (filters.habitat.includes(habitat)) {
                              setFilters({
                                ...filters,
                                habitat: filters.habitat.filter((h) => h !== habitat),
                              })
                            } else {
                              setFilters({
                                ...filters,
                                habitat: [...filters.habitat, habitat],
                              })
                            }
                          }}
                        >
                          {habitat}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Diet filter */}
                  <div>
                    <h3 className="font-bold text-white mb-2">Diet</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {["Carnivore", "Herbivore", "Omnivore"].map((diet) => (
                        <Button
                          key={diet}
                          variant="outline"
                          size="sm"
                          className={cn(
                            "border-blue-600/50 text-blue-100",
                            filters.diet.includes(diet)
                              ? "bg-blue-700/70 border-blue-500/70"
                              : "bg-blue-800/30 hover:bg-blue-700/50",
                          )}
                          onClick={() => {
                            if (filters.diet.includes(diet)) {
                              setFilters({
                                ...filters,
                                diet: filters.diet.filter((d) => d !== diet),
                              })
                            } else {
                              setFilters({
                                ...filters,
                                diet: [...filters.diet, diet],
                              })
                            }
                          }}
                        >
                          {diet}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Temperament filter */}
                  <div>
                    <h3 className="font-bold text-white mb-2">Temperament</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {["Peaceful", "Semi-aggressive", "Aggressive"].map((temperament) => (
                        <Button
                          key={temperament}
                          variant="outline"
                          size="sm"
                          className={cn(
                            "border-blue-600/50 text-blue-100",
                            filters.temperament.includes(temperament)
                              ? "bg-blue-700/70 border-blue-500/70"
                              : "bg-blue-800/30 hover:bg-blue-700/50",
                          )}
                          onClick={() => {
                            if (filters.temperament.includes(temperament)) {
                              setFilters({
                                ...filters,
                                temperament: filters.temperament.filter((t) => t !== temperament),
                              })
                            } else {
                              setFilters({
                                ...filters,
                                temperament: [...filters.temperament, temperament],
                              })
                            }
                          }}
                        >
                          {temperament}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Care Level filter */}
                  <div>
                    <h3 className="font-bold text-white mb-2">Care Level</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {["Easy", "Moderate", "Difficult", "Expert"].map((careLevel) => (
                        <Button
                          key={careLevel}
                          variant="outline"
                          size="sm"
                          className={cn(
                            "border-blue-600/50 text-blue-100",
                            filters.careLevel.includes(careLevel)
                              ? "bg-blue-700/70 border-blue-500/70"
                              : "bg-blue-800/30 hover:bg-blue-700/50",
                          )}
                          onClick={() => {
                            if (filters.careLevel.includes(careLevel)) {
                              setFilters({
                                ...filters,
                                careLevel: filters.careLevel.filter((c) => c !== careLevel),
                              })
                            } else {
                              setFilters({
                                ...filters,
                                careLevel: [...filters.careLevel, careLevel],
                              })
                            }
                          }}
                        >
                          {careLevel}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Discovery Status filter */}
                  <div>
                    <h3 className="font-bold text-white mb-2">Discovery Status</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: "all", label: "All" },
                        { value: "discovered", label: "Discovered" },
                        { value: "undiscovered", label: "Undiscovered" },
                      ].map((option) => (
                        <Button
                          key={option.value}
                          variant="outline"
                          size="sm"
                          className={cn(
                            "border-blue-600/50 text-blue-100",
                            filters.discovered === option.value
                              ? "bg-blue-700/70 border-blue-500/70"
                              : "bg-blue-800/30 hover:bg-blue-700/50",
                          )}
                          onClick={() => {
                            setFilters({
                              ...filters,
                              discovered: option.value as any,
                            })
                          }}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Reset filters */}
                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      className="border-blue-600/50 text-blue-100 hover:bg-blue-700/50"
                      onClick={() => {
                        setFilters({
                          search: "",
                          rarity: [],
                          habitat: [],
                          diet: [],
                          temperament: [],
                          careLevel: [],
                          discovered: "all",
                          sort: "name",
                        })
                      }}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reset Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Fish catalog grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedFish.length > 0 ? (
                sortedFish.map((fish) => (
                  <motion.div
                    key={fish.id}
                    className={cn(
                      "bg-blue-800/50 backdrop-blur-sm rounded-xl border overflow-hidden cursor-pointer",
                      fish.discovered ? "border-blue-700/50" : "border-gray-700/50",
                    )}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    onClick={() => handleFishClick(fish)}
                  >
                    <div className="relative h-40 bg-blue-900/50">
                      {fish.discovered ? (
                        <FishTank className="h-40">
                            <img 
                            src={fish.image || "/placeholder.svg"} 
                            alt={fish.name} 
                            width={100} 
                            height={100} 
                            className="object-contain"
                            />
                        </FishTank>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Lock className="h-16 w-16 text-gray-500/50" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "absolute top-2 right-2 px-2 py-1 rounded-full text-xs text-white",
                          fish.rarity === "Common"
                            ? "bg-gray-500/80"
                            : fish.rarity === "Uncommon"
                              ? "bg-green-500/80"
                              : fish.rarity === "Rare"
                                ? "bg-blue-500/80"
                                : fish.rarity === "Epic"
                                  ? "bg-purple-500/80"
                                  : "bg-amber-500/80",
                        )}
                      >
                        {fish.rarity}
                      </div>
                      {fish.discovered && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute bottom-2 right-2 h-8 w-8 p-0 bg-blue-900/50 hover:bg-blue-800/70 text-blue-300 hover:text-blue-100 rounded-full"
                          onClick={(e) => toggleBookmark(fish.id, e)}
                        >
                        </Button>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-white">{fish.discovered ? fish.name : "Unknown Species"}</h3>
                      {fish.discovered ? (
                        <>
                          <p className="text-blue-300 text-sm italic mb-2">{fish.scientificName}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="text-xs px-2 py-1 bg-blue-700/50 rounded-full text-blue-100">
                              {fish.habitat}
                            </span>
                            <span className="text-xs px-2 py-1 bg-blue-700/50 rounded-full text-blue-100">
                              {fish.diet}
                            </span>
                            <span className="text-xs px-2 py-1 bg-blue-700/50 rounded-full text-blue-100">
                              {fish.temperament}
                            </span>
                          </div>
                        </>
                      ) : (
                        <p className="text-blue-300 text-sm italic">This species has not been discovered yet.</p>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full bg-blue-800/50 backdrop-blur-sm rounded-xl border border-blue-700/50 p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-700/50 flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-blue-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No fish found</h3>
                  <p className="text-blue-200 mb-4">Try adjusting your filters or search criteria</p>
                  <Button
                    variant="outline"
                    className="border-blue-600/50 text-blue-100 hover:bg-blue-700/50"
                    onClick={() => {
                      setFilters({
                        search: "",
                        rarity: [],
                        habitat: [],
                        diet: [],
                        temperament: [],
                        careLevel: [],
                        discovered: "all",
                        sort: "name",
                      })
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>

          </TabsContent>

          <TabsContent value="habitats" className="space-y-6"> habitats </TabsContent>
          <TabsContent value="stats" className="space-y-6"> collection </TabsContent>

        </Tabs>
      </main>

      {/* Footer */}
      <Footer/>

      {/* Fish details modal */}
      {showFishDetails && selectedFish && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-blue-800/90 backdrop-blur-md rounded-xl border border-blue-600/50 w-full max-w-3xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <div className="p-4 border-b border-blue-700/50 flex justify-between items-center">
              <h3 className="font-bold text-white text-lg">Fish Details</h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-200 hover:text-white hover:bg-blue-700/50 rounded-full h-8 w-8 p-0"
                onClick={() => setShowFishDetails(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 p-6 flex flex-col items-center">
                <FishTank className="h-48 w-48">
                  <img 
                    src={selectedFish.image} 
                    alt={"Fish"} 
                    width={100} 
                    height={100} 
                    className="object-contain"
                    />

                </FishTank>
                <h2 className="text-xl font-bold text-white mt-4 text-center">{selectedFish.name}</h2>
                <p className="text-blue-300 text-sm italic text-center">{selectedFish.scientificName}</p>
                <div className="mt-3">
                  <span
                    className={cn(
                      "text-xs px-3 py-1 rounded-full",
                      selectedFish.rarity === "Common"
                        ? "bg-gray-500/80 text-gray-100"
                        : selectedFish.rarity === "Uncommon"
                          ? "bg-green-500/80 text-green-100"
                          : selectedFish.rarity === "Rare"
                            ? "bg-blue-500/80 text-blue-100"
                            : selectedFish.rarity === "Epic"
                              ? "bg-purple-500/80 text-purple-100"
                              : "bg-amber-500/80 text-amber-100",
                    )}
                  >
                    {selectedFish.rarity}
                  </span>
                </div>
                {selectedFish.discoveryDate && (
                  <p className="text-blue-300 text-xs mt-3">
                    Discovered on {new Date(selectedFish.discoveryDate).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div className="md:w-2/3 p-6 border-t md:border-t-0 md:border-l border-blue-700/50">
                <h3 className="font-bold text-white mb-3">Description</h3>
                <p className="text-blue-200 mb-6">{selectedFish.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-bold text-white mb-3">Characteristics</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Droplet className="h-4 w-4 text-blue-300 mr-2" />
                        <span className="text-blue-300 w-24">Habitat:</span>
                        <span className="text-white">{selectedFish.habitat}</span>
                      </div>
                      <div className="flex items-center">
                        <Fish className="h-4 w-4 text-blue-300 mr-2" />
                        <span className="text-blue-300 w-24">Diet:</span>
                        <span className="text-white">{selectedFish.diet}</span>
                      </div>
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 text-blue-300 mr-2" />
                        <span className="text-blue-300 w-24">Temperament:</span>
                        <span className="text-white">{selectedFish.temperament}</span>
                      </div>
                      <div className="flex items-center">
                        <Layers className="h-4 w-4 text-blue-300 mr-2" />
                        <span className="text-blue-300 w-24">Size:</span>
                        <span className="text-white">{selectedFish.size}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-blue-300 mr-2" />
                        <span className="text-blue-300 w-24">Lifespan:</span>
                        <span className="text-white">{selectedFish.lifespan}</span>
                      </div>
                      <div className="flex items-center">
                        <Info className="h-4 w-4 text-blue-300 mr-2" />
                        <span className="text-blue-300 w-24">Care Level:</span>
                        <span className="text-white">{selectedFish.careLevel}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-white mb-3">Water Parameters</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm text-blue-300 mb-1">
                          <span>Temperature</span>
                          <span>
                            {selectedFish.minTemperature}°C - {selectedFish.maxTemperature}°C
                          </span>
                        </div>
                        <div className="h-2 bg-blue-950/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-400 to-red-500"
                            style={{
                              marginLeft: `${(selectedFish.minTemperature / 30) * 100}%`,
                              width: `${((selectedFish.maxTemperature - selectedFish.minTemperature) / 30) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm text-blue-300 mb-1">
                          <span>pH Level</span>
                          <span>
                            {selectedFish.minPH} - {selectedFish.maxPH}
                          </span>
                        </div>
                        <div className="h-2 bg-blue-950/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-yellow-400 to-blue-500"
                            style={{
                              marginLeft: `${(selectedFish.minPH / 14) * 100}%`,
                              width: `${((selectedFish.maxPH - selectedFish.minPH) / 14) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {selectedFish.specialTraits && selectedFish.specialTraits.length > 0 && (
                      <div className="mt-4">
                        <h3 className="font-bold text-white mb-3">Special Traits</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedFish.specialTraits.map((trait, index) => (
                            <span key={index} className="text-xs px-2 py-1 bg-blue-600/50 rounded-full text-blue-100">
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-white mb-3">Compatibility</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-700/30 rounded-lg p-3">
                      <h4 className="font-bold text-white mb-2 flex items-center">
                        <Check className="h-4 w-4 text-green-400 mr-2" />
                        Compatible With
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedFish.compatibleWith.length > 0 ? (
                          selectedFish.compatibleWith.map((id) => {
                            const compatibleFish = fishSpecies.find((f) => f.id === id)
                            if (!compatibleFish || !compatibleFish.discovered) return null

                            return (
                              <span
                                key={id}
                                className="text-xs px-2 py-1 bg-green-600/30 rounded-full text-green-100 cursor-pointer hover:bg-green-600/50"
                                onClick={() => handleFishClick(compatibleFish)}
                              >
                                {compatibleFish.name}
                              </span>
                            )
                          })
                        ) : (
                          <span className="text-blue-200 text-sm">No compatible species found</span>
                        )}
                      </div>
                    </div>

                    <div className="bg-blue-700/30 rounded-lg p-3">
                      <h4 className="font-bold text-white mb-2 flex items-center">
                        <X className="h-4 w-4 text-red-400 mr-2" />
                        Incompatible With
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedFish.incompatibleWith.length > 0 ? (
                          selectedFish.incompatibleWith.map((id) => {
                            const incompatibleFish = fishSpecies.find((f) => f.id === id)
                            if (!incompatibleFish || !incompatibleFish.discovered) return null

                            return (
                              <span
                                key={id}
                                className="text-xs px-2 py-1 bg-red-600/30 rounded-full text-red-100 cursor-pointer hover:bg-red-600/50"
                                onClick={() => handleFishClick(incompatibleFish)}
                              >
                                {incompatibleFish.name}
                              </span>
                            )
                          })
                        ) : (
                          <span className="text-blue-200 text-sm">No incompatible species found</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-blue-700/50 flex justify-end">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowFishDetails(false)}>
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

