"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import {
  Menu,
  ShoppingBag,
  HelpCircle,
  Camera,
  Volume2,
  Settings,
  Grid,
  Trophy,
  Home,
  Fish,
  Palette,
  Sparkles,
  Droplets,
  Leaf,
  Layers,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { GameStatusBar } from "@/components/game-status-bar"

interface FishType {
  id: number
  name: string
  image: string
  rarity: string
  generation: number
  position: { x: number; y: number }
}

interface Bubble {
  id: number
  size: number
  left: number
  duration: number
  delay: number
}

interface WaterRipple {
  id: number
  x: number
  y: number
}

export default function GamePage() {
  const [selectedAquarium, setSelectedAquarium] = useState("My First Aquarium")
  const [happiness, setHappiness] = useState(75)
  const [food, setFood] = useState(60)
  const [energy, setEnergy] = useState(90)
  const [showMenu, setShowMenu] = useState(false)
  const [showTips, setShowTips] = useState(false)
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [ripples, setRipples] = useState<WaterRipple[]>([])
  const tipsRef = useRef<HTMLDivElement>(null)
  const [fish, setFish] = useState<FishType[]>([
    {
      id: 1,
      name: "Fish 1",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fish1-ioYn5CvkJkCHPwgx1jBGoqibnAu5to.png",
      rarity: "Common",
      generation: 1,
      position: { x: 20, y: 30 },
    },
    {
      id: 2,
      name: "Fish 2",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fish2-D0YdqsjY0OgI0AZg98FS0Sq7zMm2Fe.png",
      rarity: "Rare",
      generation: 2,
      position: { x: 60, y: 50 },
    },
  ])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tipsRef.current && !tipsRef.current.contains(event.target as Node)) {
        setShowTips(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [tipsRef])

  useEffect(() => {
    if (showTips) {
      const timer = setTimeout(() => {
        setShowTips(false)
      }, 8000)
      return () => clearTimeout(timer)
    }
  }, [showTips])

  useEffect(() => {
    const interval = setInterval(() => {

      const random = Math.floor(Math.random() * 3)
      const change = Math.floor(Math.random() * 11) - 5 // -5 a +5

      if (random === 0) {
        setHappiness((prev) => Math.min(Math.max(0, prev + change), 100))
      } else if (random === 1) {
        setFood((prev) => Math.min(Math.max(0, prev + change), 100))
      } else if (random === 1) {
        setFood((prev) => Math.min(Math.max(0, prev + change), 100))
      } else {
        setEnergy((prev) => Math.min(Math.max(0, prev + change), 100))
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const createBubble = () => {
      const newBubble = {
        id: Date.now(),
        size: Math.random() * 20 + 10,
        left: Math.random() * 100,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 2,
      }
      setBubbles((prev) => [...prev, newBubble])
      setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => b.id !== newBubble.id))
      }, newBubble.duration * 1000)
    }

    const intervalId = setInterval(createBubble, 300)
    return () => clearInterval(intervalId)
  }, [])

  const createRipple = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const ripple = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
    setRipples((prev) => [...prev, ripple])
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== ripple.id))
    }, 4000)
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#005C99]" onClick={createRipple}>
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bg-hbI9X1J6jlWP2xj88XACJcaMqDLbHW.png"
        alt="Underwater Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 light-rays"></div>

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

      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="water-ripple absolute pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: "10px",
            height: "10px",
          }}
        />
      ))}

      <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 z-20">
        <div className="flex items-center gap-4">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Aqua_Stark-removebg-preview-ubKSrqYo7jzOH5qXqxEw4CyRHXIjfq.png"
            alt="Aqua Stark Logo"
            width={120}
            height={50}
            className="drop-shadow-lg"
          />
        </div>

        <div className="flex items-center gap-4 bg-blue-900/40 backdrop-blur-sm p-3 rounded-xl">
          <div className="flex items-center gap-2 mr-4 bg-blue-800/50 px-3 py-1 rounded-lg">
            <Fish className="text-blue-200 h-5 w-5" />
            <span className="text-white font-bold">2/10</span>
          </div>

          <GameStatusBar icon="🌟" value={happiness} color="from-yellow-400 to-yellow-600" label="Felicidad" />
          <GameStatusBar icon="🍖" value={food} color="from-orange-400 to-orange-600" label="Hambre" />
          <GameStatusBar icon="⚡" value={energy} color="from-blue-400 to-blue-600" label="Energía" />
        </div>

        <div className="flex items-center gap-2">
          <Button
            className="game-button bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center"
            onClick={() => setShowMenu(!showMenu)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {showMenu && (
        <div className="absolute top-32 right-4 z-30 flex flex-col gap-3">
          <Button
            variant="ghost"
            className="w-12 h-12 rounded-xl bg-blue-500/20 hover:bg-blue-500/40 backdrop-blur-sm text-white border border-blue-400/30 shadow-lg hover:shadow-blue-400/20 transition-all duration-300 hover:-translate-y-0.5"
            onClick={() => {}}
          >
            <Volume2 className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            className="w-12 h-12 rounded-xl bg-blue-500/20 hover:bg-blue-500/40 backdrop-blur-sm text-white border border-blue-400/30 shadow-lg hover:shadow-blue-400/20 transition-all duration-300 hover:-translate-y-0.5"
            onClick={() => {}}
          >
            <Trophy className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            className="w-12 h-12 rounded-xl bg-blue-500/20 hover:bg-blue-500/40 backdrop-blur-sm text-white border border-blue-400/30 shadow-lg hover:shadow-blue-400/20 transition-all duration-300 hover:-translate-y-0.5"
            onClick={() => {}}
          >
            <ShoppingBag className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            className="w-12 h-12 rounded-xl bg-blue-500/20 hover:bg-blue-500/40 backdrop-blur-sm text-white border border-blue-400/30 shadow-lg hover:shadow-blue-400/20 transition-all duration-300 hover:-translate-y-0.5"
            onClick={() => {}}
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            className="w-12 h-12 rounded-xl bg-blue-500/20 hover:bg-blue-500/40 backdrop-blur-sm text-white border border-blue-400/30 shadow-lg hover:shadow-blue-400/20 transition-all duration-300 hover:-translate-y-0.5"
            onClick={() => {}}
          >
            <Camera className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            className="w-12 h-12 rounded-xl bg-blue-500/20 hover:bg-blue-500/40 backdrop-blur-sm text-white border border-blue-400/30 shadow-lg hover:shadow-blue-400/20 transition-all duration-300 hover:-translate-y-0.5"
            onClick={() => {}}
          >
            <Home className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            className="w-12 h-12 rounded-xl bg-blue-500/20 hover:bg-blue-500/40 backdrop-blur-sm text-white border border-blue-400/30 shadow-lg hover:shadow-blue-400/20 transition-all duration-300 hover:-translate-y-0.5"
            onClick={() => {}}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Peces */}
      {fish.map((fish) => (
        <div
          key={fish.id}
          className="absolute transition-all duration-1000 ease-in-out cursor-pointer group"
          style={{ left: `${fish.position.x}%`, top: `${fish.position.y}%` }}
        >
          <div className="relative">
            <img
              src={fish.image || "/placeholder.svg"}
              alt={fish.name}
              width={80}
              height={80}
              className="transform hover:scale-110 transition-transform duration-200"
            />
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 game-container p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              <div className="font-bold text-white">{fish.name}</div>
              <div className="text-xs text-white/80">
                Rarity: {fish.rarity} • Gen {fish.generation}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
        <GameButton icon="🌿" color="from-green-400 to-green-600" tooltip="Plants" />
        <GameButton icon="🪨" color="from-blue-400 to-blue-600" tooltip="Rocks" />
        <GameButton icon="🏰" color="from-purple-400 to-purple-600" tooltip="Decorations" />
        <GameButton icon={<Droplets className="h-5 w-5" />} color="from-cyan-400 to-cyan-600" tooltip="Water" />
        <GameButton icon={<Leaf className="h-5 w-5" />} color="from-emerald-400 to-emerald-600" tooltip="algae" />
        <GameButton icon={<Sparkles className="h-5 w-5" />} color="from-amber-400 to-amber-600" tooltip="Effects" />
        <GameButton icon={<Palette className="h-5 w-5" />} color="from-pink-400 to-pink-600" tooltip="Colors" />
        <GameButton icon={<Layers className="h-5 w-5" />} color="from-indigo-400 to-indigo-600" tooltip="Layers" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/90 to-transparent p-4">
        <div className="flex justify-between items-end">
          <div className="flex gap-2">
            <AquariumTab
              name="My First Aquarium"
              active={selectedAquarium === "My First Aquarium"}
              onClick={() => setSelectedAquarium("My First Aquarium")}
            />
            <AquariumTab
              name="Second Aquarium"
              active={selectedAquarium === "Second Aquarium"}
              onClick={() => setSelectedAquarium("Second Aquarium")}
            />
            <AquariumTab
              name="Tropical Paradise"
              active={selectedAquarium === "Tropical Paradise"}
              onClick={() => setSelectedAquarium("Tropical Paradise")}
            />
            <AquariumTab
              name="View All"
              active={false}
              icon={<Grid className="h-4 w-4 mr-1" />}
              onClick={() => alert("View All Aquariums")}
            />
          </div>
          <div className="flex gap-2 relative">
            <div ref={tipsRef}>
              <GameButton
                icon="💡"
                text="Tips"
                color="from-yellow-400 to-yellow-600"
                onClick={() => setShowTips(!showTips)}
              />

              {showTips && (
                <div className="absolute bottom-16 right-0 w-64 bg-blue-600/90 backdrop-blur-md rounded-2xl p-4 border-2 border-blue-400/50 shadow-xl animate-in fade-in slide-in-from-bottom-5 duration-300 z-50">
                  <div className="absolute -bottom-3 right-8 w-6 h-6 bg-blue-600/90 transform rotate-45 border-r-2 border-b-2 border-blue-400/50"></div>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">💡</span>
                      <h3 className="text-white font-bold">Tip of the day</h3>
                    </div>
                    <button onClick={() => setShowTips(false)} className="text-white/80 hover:text-white">
                      <X size={16} />
                    </button>
                  </div>
                  <p className="text-white/90 text-sm">
                  Feed your fish regularly to keep them healthy and happy. Well-fed fish grow faster and have more vibrant colors.  
                  </p>
                  <div className="mt-3 flex justify-end">
                    <span className="text-xs text-white/70">Tap to close</span>
                  </div>

                  <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-white/20 animate-pulse"></div>
                  <div
                    className="absolute top-6 right-6 w-2 h-2 rounded-full bg-white/20 animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className="absolute top-10 right-4 w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function GameButton({
  icon,
  text,
  color = "from-blue-400 to-blue-600",
  tooltip,
  onClick,
}: {
  icon: React.ReactNode | string
  text?: string
  color?: string
  tooltip?: string
  onClick?: () => void
}) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "game-button bg-gradient-to-b text-white rounded-xl relative group",
        text ? "px-4 py-2" : "w-12 h-12",
        color,
      )}
    >
      <div className="flex items-center gap-2">
        {typeof icon === "string" ? <span className="text-xl">{icon}</span> : icon}
        {text && <span className="font-bold">{text}</span>}
      </div>
      {tooltip && (
        <div className="absolute -right-24 top-1/2 transform -translate-y-1/2 game-container p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          <span className="text-white text-xs">{tooltip}</span>
        </div>
      )}
    </Button>
  )
}

function AquariumTab({
  name,
  active,
  icon,
  onClick,
}: {
  name: string
  active: boolean
  icon?: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "game-button px-6 py-3 rounded-t-xl font-bold transition-all duration-200 flex items-center",
        active
          ? "bg-gradient-to-b from-blue-400 to-blue-600 text-white translate-y-0"
          : "bg-blue-800/50 text-white/70 hover:bg-blue-700/50 translate-y-2",
      )}
    >
      {icon && icon}
      {name}
    </button>
  )
}

