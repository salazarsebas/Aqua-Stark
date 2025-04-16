"use client"

import { Calendar, Star, Target, Trophy } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Achievements } from "@/components/achievements/achievements"
import { LoginRewards } from "@/components/achievements/login-rewards"
import { Milestones } from "@/components/achievements/milestones"
import { Missions } from "@/components/achievements/missions"
import { Footer } from "@/components/layout/footer"
import { BubblesBackground } from "@/components/bubble-background"
import { useBubbles } from "@/hooks/use-bubbles"
import { mockGameMilestones, mockLoginRewards } from "@/data/mock-data"
import { PageHeader } from "@/components/layout/page-header"

const TABS = [
  { id: "achievements", name: "Achievements", icon: Trophy },
  { id: "missions", name: "Missions", icon: Target },
  { id: "login_rewards", name: "Login Rewards", icon: Calendar },
  { id: "milestones", name: "Milestones", icon: Star },
]

export default function AchievementsPage() {
  const bubbles = useBubbles()

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-500 to-blue-900 animated-background">
      <BubblesBackground bubbles={bubbles} />

      <PageHeader
        title="Achievements & Rewards"
        backTo="/"
        backText="Back to Game"
        rightContent={
          <div className="flex items-center px-3 py-1 sm:px-4 sm:py-2 border rounded-full bg-blue-700/50 border-blue-400/50">
            <Trophy className="mr-1 sm:mr-2 text-yellow-400" size={14} />
            <span className="font-bold text-xs sm:text-sm text-white">2/8</span>
          </div>
        }
      />

      <main className="relative z-20 flex flex-col items-center px-4 py-8 mx-auto max-w-7xl">
        <Tabs defaultValue="achievements" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1 bg-blue-700 rounded-lg mb-6">
            {TABS.map(({ id, name, icon: Icon }) => (
              <TabsTrigger key={id} value={id} className="flex items-center gap-1 text-xs md:text-sm">
                <Icon size={14} />
                {name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="achievements">
            <Achievements />
          </TabsContent>

          <TabsContent value="missions">
            <Missions />
          </TabsContent>

          <TabsContent value="login_rewards">
            <LoginRewards data={mockLoginRewards} />
          </TabsContent>

          <TabsContent value="milestones">
            <Milestones data={mockGameMilestones} />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
