"use client"

import { useState, useEffect, useRef } from "react"
import {
  Grid,
  Droplets,
  Leaf,
  Sparkles,
  Palette,
  Layers,
  X,
  Fish,
} from "lucide-react"

import { GameButton } from "@/components/game/game-button"
import { GameMenu } from "@/components/game/game-menu"
import { GameStatusBar } from "@/components/game-status-bar"
import { WaterEffects } from "@/components/game/water-effects"
import { FishDisplay } from "@/components/game/fish-display"
import { AquariumTab } from "@/components/game/aquarium-tab"
import { MOCK_FISH, MOCK_AQUARIUMS, INITIAL_GAME_STATE } from "@/data/game-data"

export default function GamePage() {
  const [selectedAquarium, setSelectedAquarium] = useState(MOCK_AQUARIUMS[0])
  const [happiness, setHappiness] = useState(INITIAL_GAME_STATE.happiness)
  const [food, setFood] = useState(INITIAL_GAME_STATE.food)
  const [energy, setEnergy] = useState(INITIAL_GAME_STATE.energy)
  const [showMenu, setShowMenu] = useState(false)
  const [showTips, setShowTips] = useState(false)
  const tipsRef = useRef<HTMLDivElement>(null)

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
      } else {
        setEnergy((prev) => Math.min(Math.max(0, prev + change), 100))
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const sidebarButtons = [
    { icon: "🌿", color: "from-green-400 to-green-600", tooltip: "Plants" },
    { icon: "🪨", color: "from-blue-400 to-blue-600", tooltip: "Rocks" },
    { icon: "🏰", color: "from-purple-400 to-purple-600", tooltip: "Decorations" },
    { icon: <Droplets className="h-5 w-5" />, color: "from-cyan-400 to-cyan-600", tooltip: "Water" },
    { icon: <Leaf className="h-5 w-5" />, color: "from-emerald-400 to-emerald-600", tooltip: "Algae" },
    { icon: <Sparkles className="h-5 w-5" />, color: "from-amber-400 to-amber-600", tooltip: "Effects" },
    { icon: <Palette className="h-5 w-5" />, color: "from-pink-400 to-pink-600", tooltip: "Colors" },
    { icon: <Layers className="h-5 w-5" />, color: "from-indigo-400 to-indigo-600", tooltip: "Layers" },
  ]

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#005C99]">
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bg-hbI9X1J6jlWP2xj88XACJcaMqDLbHW.png"
        alt="Underwater Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 light-rays"></div>

      <WaterEffects />

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

          <GameStatusBar icon="🌟" value={happiness} color="from-yellow-400 to-yellow-600" label="Happiness" />
          <GameStatusBar icon="🍖" value={food} color="from-orange-400 to-orange-600" label="Hunger" />
          <GameStatusBar icon="⚡" value={energy} color="from-blue-400 to-blue-600" label="Energy" />
        </div>

        <div className="flex items-center gap-2">
          <GameButton
            icon="☰"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center"
            onClick={() => setShowMenu(!showMenu)}
          />
        </div>
      </div>

      <GameMenu show={showMenu} />

      <FishDisplay fish={MOCK_FISH} />

      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
        {sidebarButtons.map((button, index) => (
          <GameButton
            key={index}
            icon={button.icon}
            color={button.color}
            tooltip={button.tooltip}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/90 to-transparent p-4">
        <div className="flex justify-between items-end">
          <div className="flex gap-2">
            {MOCK_AQUARIUMS.map((aquarium) => (
              <AquariumTab
                key={aquarium}
                name={aquarium}
                active={selectedAquarium === aquarium}
                onClick={() => setSelectedAquarium(aquarium)}
              />
            ))}
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

