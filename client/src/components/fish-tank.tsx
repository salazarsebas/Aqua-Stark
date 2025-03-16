import type React from "react"

interface FishTankProps {
  children: React.ReactNode
  className?: string
}

export function FishTank({ children, className = "" }: FishTankProps) {
  return (
    <div className={`relative w-full h-48 flex items-center justify-center ${className}`}>
      <div className="absolute z-10 w-full h-full flex items-center justify-center">{children}</div>

      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fish-tank-uqVPplbDW1uXmNAeEuWLSUYNQuDVA6.svg"
        alt="Fish Tank"
        className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none"
      />
    </div>
  )
}

