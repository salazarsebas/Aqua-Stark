"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Heart, Search, Beaker, Dna, Sparkles, FileText } from "lucide-react"
import { Link } from "react-router-dom"
import { BubblesBackground } from "@/components/bubble-background"
import { BreedingTab } from "@/components/laboratory/tabs/breeding-tab"
import { GeneticsTab } from "@/components/laboratory/tabs/genetics-tab"
import { DiscoveriesTab } from "@/components/laboratory/tabs/discoveries-tab"
import { GenealogyTab } from "@/components/laboratory/tabs/genealogy-tab"
import { fishCollection } from "@/data/fish-data"
import "@/styles/laboratory.css"

export default function LaboratoryPage() {
  const [activeTab, setActiveTab] = useState("breeding")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter fish based on search query
  const filteredFish = searchQuery
    ? fishCollection.filter(
        (fish) =>
          fish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          fish.rarity.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : fishCollection

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-600 to-blue-900">
      {/* Background bubbles */}
      <BubblesBackground bubbles={[]} />

      {/* Header */}
      <header className="relative z-10 bg-blue-800/50 backdrop-blur-sm border-b border-blue-700/50 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/game" className="mr-4">
              <Button variant="ghost" className="text-white hover:bg-blue-700/50 rounded-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Game
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-white">Breeding Laboratory</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-64 hidden md:block">
              <Input
                type="text"
                placeholder="Search fish..."
                className="bg-blue-700/50 border-blue-600/50 text-white placeholder:text-blue-300/70 pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-300/70" />
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Beaker className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Lab Status</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 container mx-auto p-4 md:p-6">
        {/* Tabs for different sections */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6 bg-blue-800/50 border border-blue-700/50">
            <TabsTrigger
              value="breeding"
              className="data-[state=active]:bg-blue-700 data-[state=active]:text-white text-blue-200"
            >
              <Heart className="h-4 w-4 mr-2 md:mr-1" />
              <span className="hidden md:inline">Breeding</span>
            </TabsTrigger>
            <TabsTrigger
              value="genetics"
              className="data-[state=active]:bg-blue-700 data-[state=active]:text-white text-blue-200"
            >
              <Dna className="h-4 w-4 mr-2 md:mr-1" />
              <span className="hidden md:inline">Genetics</span>
            </TabsTrigger>
            <TabsTrigger
              value="discoveries"
              className="data-[state=active]:bg-blue-700 data-[state=active]:text-white text-blue-200"
            >
              <Sparkles className="h-4 w-4 mr-2 md:mr-1" />
              <span className="hidden md:inline">Discoveries</span>
            </TabsTrigger>
            <TabsTrigger
              value="genealogy"
              className="data-[state=active]:bg-blue-700 data-[state=active]:text-white text-blue-200"
            >
              <FileText className="h-4 w-4 mr-2 md:mr-1" />
              <span className="hidden md:inline">Genealogy</span>
            </TabsTrigger>
          </TabsList>

          {/* Breeding Tab */}
          <TabsContent value="breeding" className="space-y-6">
            <BreedingTab filteredFish={filteredFish} />
          </TabsContent>

          {/* Genetics Tab */}
          <TabsContent value="genetics" className="space-y-6">
            <GeneticsTab setActiveTab={setActiveTab} />
          </TabsContent>

          {/* Discoveries Tab */}
          <TabsContent value="discoveries" className="space-y-6">
            <DiscoveriesTab />
          </TabsContent>

          {/* Genealogy Tab */}
          <TabsContent value="genealogy" className="space-y-6">
            <GenealogyTab />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-blue-900/50 backdrop-blur-sm border-t border-blue-800/50 p-4 mt-8">
        <div className="container mx-auto text-center text-blue-200 text-sm">
          <p>© 2025 Aqua Stark - All rights reserved</p>
        </div>
      </footer>
    </div>
  )
}

