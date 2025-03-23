import React from "react"
import { cn } from "@/lib/utils"

interface AquariumTabProps {
  name: string
  active: boolean
  icon?: React.ReactNode
  onClick: () => void
}

export function AquariumTab({
  name,
  active,
  icon,
  onClick,
}: AquariumTabProps) {
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