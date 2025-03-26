"use client";
import { useState } from "react";
import { LaboratoryHeader } from "@/components/breeding-laboratory/laboratory-header";
import { LaboratoryTabs } from "@/components/breeding-laboratory/laboratory-tabs";
import { DiscoveriesStats } from "@/components/breeding-laboratory/discoveries-stats";
import { DiscoveryRegistry } from "@/components/breeding-laboratory/discovery-registry";
import { UndiscoveredSpecies } from "@/components/breeding-laboratory/undiscovered-species";
import { bubblesData, backgroundBubblesData, particlesData, discoveriesData, undiscoveredSpeciesData } from "@/data/breeding-data";
import { Filter, Search } from "lucide-react";

export default function BreedingLaboratory() {
  const [bubbles] = useState(bubblesData);
  const [backgroundBubbles] = useState(backgroundBubblesData);
  const [particles] = useState(particlesData);

  const stats = [
    { title: 'Total Discoveries', value: discoveriesData.length },
    { 
      title: 'Rare+ Discoveries', 
      value: discoveriesData.filter(d => d.rarity === 'Rare' || d.rarity === 'Epic').length 
    },
    { 
      title: 'Special Traits', 
      value: discoveriesData.filter(d => d.traits.includes('Special')).length 
    },
    { 
      title: 'Completion', 
      value: `${Math.round((discoveriesData.length / (discoveriesData.length + undiscoveredSpeciesData.length)) * 100)}%` 
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-500 to-blue-700 animated-background">
      {/* Background elements */}
      <div className="water-movement"></div>

      {backgroundBubbles.map((bubble) => (
        <div
          key={`bg-bubble-${bubble.id}`}
          className="background-bubble"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            bottom: "-100px",
            "--duration": `${bubble.duration}s`,
            "--delay": `${bubble.delay}s`,
            "--drift": `${bubble.drift}px`,
          } as React.CSSProperties}
        />
      ))}

      {particles.map((particle) => (
        <div
          key={`particle-${particle.id}`}
          className="floating-particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            "--float-duration": `${particle.duration}s`,
            "--float-delay": `${particle.delay}s`,
            "--float-x": `${particle.floatX}px`,
            "--float-y": `${particle.floatY}px`,
          } as React.CSSProperties}
        />
      ))}

      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            "--duration": `${bubble.animationDuration}s`,
          } as React.CSSProperties}
        />
      ))}

      <LaboratoryHeader />
      
      <div className="w-[85%] mx-auto text-gray-300">
        <LaboratoryTabs />

        {/* Tab Content */}
        <div className="flex items-center justify-between my-8">
          <h2 className="text-gray-100 text-lg">Breeding Discoveries</h2>
          <div className="flex justify-center items-center gap-8">
            <div className="bg-blue-600/30 flex items-center px-2 py-1 gap-6 rounded border border-blue-600/60">
              <input type="text" placeholder="Search discoveries" className="bg-transparent px-2 py-1" />
              <Search size={16} />
            </div>
            <div className="relative">
              <div className="flex items-center rounded gap-2 bg-blue-900/40 px-3 py-2 cursor-pointer hover:bg-blue-800/60 transition-colors duration-200">
                <Filter size={16} />
                <span>Filter</span>
              </div>
            </div>
          </div>
        </div>

        <DiscoveriesStats stats={stats} />
        <DiscoveryRegistry discoveries={discoveriesData} />
        <UndiscoveredSpecies species={undiscoveredSpeciesData} />
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-8 bg-blue-800 py-6 border-t-2 border-blue-400/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/80">© 2025 Aqua Stark - All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}