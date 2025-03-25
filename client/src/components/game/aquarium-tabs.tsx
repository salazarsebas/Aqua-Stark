import React from "react"
import { Grid } from "lucide-react"

interface AquariumTabProps {
  name: string
  active: boolean
  icon?: React.ReactNode
  onClick: () => void
}

function AquariumTab({ name, active, icon, onClick }: AquariumTabProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center px-4 py-2 rounded-t-lg text-sm font-medium
        ${
          active
            ? "bg-blue-600/90 text-white"
            : "bg-blue-800/50 text-white/70 hover:bg-blue-700/60 hover:text-white"
        }
      `}
    >
      {icon}
      {name}
    </button>
  )
}

interface AquariumTabsProps {
  aquariums: string[]
  selectedAquarium: string
  onAquariumSelect: (aquarium: string) => void
}

export function AquariumTabs({
  aquariums,
  selectedAquarium,
  onAquariumSelect,
}: AquariumTabsProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/90 to-transparent p-4">
      <div className="flex justify-between items-end">
        <div className="flex gap-2">
          {aquariums.map((aquarium) => (
            <AquariumTab
              key={aquarium}
              name={aquarium}
              active={selectedAquarium === aquarium}
              onClick={() => onAquariumSelect(aquarium)}
            />
          ))}
          <AquariumTab
            name="View All"
            active={false}
            icon={<Grid className="h-4 w-4 mr-1" />}
            onClick={() => alert("View All Aquariums")}
          />
        </div>
      </div>
    </div>
  )
} 