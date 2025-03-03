"use client"
import { useState } from "react";
import ButtonLarge from "@/components/ui/button-large";

type Aquarium = {
    id: string;
    name: string;
    locked?: boolean;
  };
  
  type Props = {
    aquariums: Aquarium[];
    activeAquarium:string;
    setActiveAquarium: (id: string) => void;
  };
  
  export default function AquariumMenu({ aquariums, setActiveAquarium,activeAquarium }: Props) {
    const [active,setActive] = useState<string|null>(null)
    return (
      <div className="w-full h-20 bg-blue-600 flex items-center justify-center space-x-4 text-white px-4 py-2 sm:justify-start overflow-hidden">
          {aquariums.map((aquarium) => (
          <ButtonLarge
          color={aquarium.locked ?"inactive" : activeAquarium === aquarium.id ?"green":"blue"}
            key={aquarium.id}
            className={`px-4 py-2 rounded whitespace-nowrap text-sm w-fit transition-all duration-300 ${
              aquarium.locked
                ? "cursor-not-allowed"
                : ""
            }`}
            onClick={() => setActiveAquarium(aquarium.id)}
            disabled={aquarium.locked}
          >
            {aquarium.name} {aquarium.locked && "🔒"}
          </ButtonLarge>
        ))}
      </div>
    );
  }
  