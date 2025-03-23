/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { FishTank } from "@/components/fish-tank";
import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom";
import { Heart, Tangent, FileText, SatelliteDish, Beaker, Search, Filter, Sparkles, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button";
import { bubblesData, backgroundBubblesData, particlesData, discoveriesData, undiscoveredSpeciesData } from "@/data/mock-breeding-laboratory";

export default function BreedingLaboratory() {
  const [bubbles] = useState(bubblesData);
  const [backgroundBubbles] = useState(backgroundBubblesData);
  const [particles] = useState(particlesData);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-500 to-blue-700 animated-background">
      <div className="water-movement"></div>

      {backgroundBubbles.map((bubble: { id: any; size: any; left: any; duration: any; delay: any; drift: any; }) => (
        <div
          key={`bg-bubble-${bubble.id}`}
          className="background-bubble"
          style={
            {
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.left}%`,
              bottom: "-100px",
              "--duration": `${bubble.duration}s`,
              "--delay": `${bubble.delay}s`,
              "--drift": `${bubble.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}

      {particles.map((particle: { id: any; size: any; top: any; left: any; duration: any; delay: any; floatX: any; floatY: any; }) => (
        <div
          key={`particle-${particle.id}`}
          className="floating-particle"
          style={
            {
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              top: `${particle.top}%`,
              left: `${particle.left}%`,
              "--float-duration": `${particle.duration}s`,
              "--float-delay": `${particle.delay}s`,
              "--float-x": `${particle.floatX}px`,
              "--float-y": `${particle.floatY}px`,
            } as React.CSSProperties
          }
        />
      ))}

      {bubbles.map((bubble: { id: React.Key | null | undefined; size: any; left: any; animationDuration: any; }) => (
        <div
          key={bubble.id}
          className="bubble"
          style={
            {
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.left}%`,
              "--duration": `${bubble.animationDuration}s`,
            } as React.CSSProperties
          }
        />
      ))}

      <div className="bg-blue-900/40 backdrop-blur-sm px-3 py-4 ">
        <div className="text-gray-200 flex items-center justify-between w-[85%] mx-auto">
          <div className="flex items-center gap-4">
            <Link to='/' className="flex itemes-center gap-2 text-sm"><ArrowLeft size={20} /> Back to Game</Link>
            <h2 className="text-2xl font-semibold">Breading Laboratory</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-blue-600/30 flex items-center px-2 py-1 gap-6 rounded border border-blue-600/60">
              <input type="text" placeholder="Search discoveries " className="bg-transparent px-2 py-1" />
              <Search size={16} />
            </div>

            <div className="bg-purple-700 py-2 px-5 w-full rounded ">
              <button className="justify-center flex items-center gap-2" > <Beaker size={20} /> Lab Status</button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[85%] mx-auto text-gray-300">
        <nav className="bg-blue-900/40 backdrop-blur-sm px-3 py-2 rounded-xl mt-8 ">
          <div className="text-gray-300 text-md flex justify-between w-[90%] mx-auto ">
            <Link className="flex items-center gap-1 " to='/'><Heart size={16} /> Breeding </Link>
            <Link className="flex items-center gap-1" to='/'><Tangent size={16} /> Genetics </Link>
            <Link className="flex items-center gap-1 bg-blue-600/30 px-6 rounded-md py-2" to='/'><SatelliteDish size={16} />Discoveries </Link>
            <Link className="flex items-center gap-1" to='/'><FileText size={16} />Genealogy </Link>
          </div>
        </nav>
        <div className="flex items-center justify-between my-8">
          <h2 className="text-gray-100 text-2xl">Breeding Discoveries</h2>
          <div className="flex justify-center items-center gap-8">
            <div className="bg-blue-600/30 flex items-center px-2 py-1 gap-6 rounded border border-blue-600/60">
              <input type="text" placeholder="Search discoveries " className="bg-transparent px-2 py-1" />
              <Search size={16} />
            </div>
            <div className="flex items-center rounded gap-2 bg-blue-900/40 px-3 py-2">
              <Filter size={16} />
              <span>Filter</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-900/40 backdrop-blur-sm px-4 py-4 rounded flex items-center justify-between gap-6">
          <div className="bg-blue-600/30 backdrop-blur-sm rounded w-full py-4">
            <h3 className="text-center text-md">Total Discoveries</h3>
            <p className="text-gray-100 text-center text-xl"> 3 </p>
          </div>
          <div className="bg-blue-600/30 backdrop-blur-sm rounded w-full py-4">
            <h3 className="text-center text-md">Rare+ Discoveries</h3>
            <p className="text-gray-100 text-center text-xl"> 2 </p>
          </div>
          <div className="bg-blue-600/30 backdrop-blur-sm rounded w-full py-4">
            <h3 className="text-center text-md">Special Traits</h3>
            <p className="text-gray-100 text-center text-xl"> 1 </p>
          </div>
          <div className="bg-blue-600/30 backdrop-blur-sm rounded w-full py-4">
            <h3 className="text-center text-md">Completion</h3>
            <p className="text-gray-100 text-center text-xl"> 15% </p>
          </div>
        </div>

        <div className="bg-blue-900/40 backdrop-blur-sm px-4 py-4 rounded mt-8">
          <h2 className="text-gray-100 text-2xl">Discovery Registry</h2>
          <div className="rounded p-4 mt-4 flex justify-between items-center bg-blue-500/30 backdrop-blur-sm">
            {discoveriesData.map((discovery: { id: React.Key | null | undefined; date: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; image: string | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; rarity: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; parents: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; traits: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
              <div key={discovery.id} className="shadow-xl">
                <div>
                  <div className="flex justify-end items-end text-end mr-3">
                    <h3 className="text-center bg-blue-900/40 px-3 py-1 rounded text-sm">{discovery.date}</h3>
                  </div>
                  <div>
                    <FishTank>
                      <img src={discovery.image} className="w-36" />
                    </FishTank>
                    <div className="bg-blue-600/30 flex flex-col gap-4 p-4 rounded">
                      <div className="flex items-center justify-between">
                        <h4 className="text-gray-100">{discovery.name}</h4>
                        <h5 className={`bg-${discovery.rarity === 'Epic' ? 'purple' : 'blue'}-900/40 w-fit px-3 py-1 text-sm rounded text-gray-200`}>{discovery.rarity}</h5>
                      </div>
                      <div>
                        <h3 className="text-primary">Parents : <span className="text-gray-300 text-sm">{discovery.parents}</span></h3>
                        <h3 className="text-primary">Traits : <span className="text-gray-300 text-sm">{discovery.traits}</span></h3>
                      </div>
                      <div className="flex justify-center items-center">
                        <Button>View Details</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-900/40 backdrop-blur-sm px-4 py-4 rounded mt-8">
          <h2 className="text-gray-100 text-2xl">Undiscovered Species</h2>
          <div className="rounded p-4 mt-4 flex justify-between items-center bg-blue-500/30 backdrop-blur-sm">
            {undiscoveredSpeciesData.map((species: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; rarity: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; hints: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
              <div key={species.id} className="shadow-xl">
                <div>
                  <div className="flex justify-center items-center text-center flex-col gap-3 mb-3">
                    <div className="bg-blue-600/30 h-16 w-16 rounded-full flex justify-center items-center"> <Sparkles className="text-primary" /></div>
                    <h4 className="text-gray-100">{species.name}</h4>
                  </div>
                  <div className="bg-blue-600/30 flex flex-col gap-4 p-4 rounded">
                    <div className="flex items-center justify-between">
                      <h4 className="text-gray-100"> ??</h4>
                      <h5 className="bg-purple-900/40 w-fit px-3 py-1 text-sm rounded text-gray-200">{species.rarity}</h5>
                    </div>
                    <div>
                      <h3 className="text-primary">Hints : <span className="text-gray-300 text-sm">{species.hints}</span></h3>
                    </div>
                    <div className="flex justify-center items-center">
                      <button className="bg-purple-700 py-2 w-full">Research</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="relative z-10 mt-8 bg-blue-800 py-6 border-t-2 border-blue-400/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/80 ">© 2025 Aqua Stark - All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}