import React from "react"
import { FishType } from "@/data/game-data"

interface FishDisplayProps {
  fish: FishType[]
}

export function FishDisplay({ fish }: FishDisplayProps) {
  return (
    <>
      {fish.map((fishItem) => (
        <div
          key={fishItem.id}
          className="absolute transition-all duration-1000 ease-in-out cursor-pointer group"
          style={{ left: `${fishItem.position.x}%`, top: `${fishItem.position.y}%` }}
        >
          <div className="relative">
            <img
              src={fishItem.image || "/placeholder.svg"}
              alt={fishItem.name}
              width={80}
              height={80}
              className="transform hover:scale-110 transition-transform duration-200"
            />
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 game-container p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              <div className="font-bold text-white">{fishItem.name}</div>
              <div className="text-xs text-white/80">
                Rarity: {fishItem.rarity} • Gen {fishItem.generation}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
} 