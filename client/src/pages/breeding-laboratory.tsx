"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Beaker, Dna, FileText, Heart, Search, Sparkles } from "lucide-react"
import { BubblesBackground } from "@/components/bubble-background"
import { BreedingTab } from "@/components/laboratory/tabs/breeding-tab"
import { GeneticsTab } from "@/components/laboratory/tabs/genetics-tab"
import { DiscoveriesTab } from "@/components/laboratory/tabs/discoveries-tab"
import { GenealogyTab } from "@/components/laboratory/tabs/genealogy-tab"
import { fishCollection } from "@/data/fish-data"
import "@/styles/laboratory.css"
import { Footer } from "@/components/layout/footer"
import { PageHeader } from "@/components/layout/page-header"

export default function LaboratoryPage() {
  const [activeTab, setActiveTab] = useState("breeding")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFish = searchQuery
    ? fishCollection.filter(
        (fish) =>
          fish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          fish.rarity.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : fishCollection

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-600 to-blue-900">
      <BubblesBackground bubbles={[]} />

      <PageHeader
        title="Breeding Laboratory"
        backTo="/game"
        backText="Back to Game"
        rightContent={
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
        }
      />

      <main className="relative z-10 container mx-auto p-4 md:p-6">
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

          <TabsContent value="breeding" className="space-y-6">
            <BreedingTab filteredFish={filteredFish} />
          </TabsContent>

          <TabsContent value="genetics" className="space-y-6">
            <GeneticsTab setActiveTab={setActiveTab} />
          </TabsContent>

          <TabsContent value="discoveries" className="space-y-6">
            <DiscoveriesTab />
          </TabsContent>

          <TabsContent value="genealogy" className="space-y-6">
            <GenealogyTab />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
