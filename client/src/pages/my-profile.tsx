"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  BarChart2,
  ChevronRight,
  Clock,
  Fish,
  Medal,
  Star,
  Trophy,
  ShoppingBag,
  Calendar,
  Check,
  Lock,
  Coins,
  Gem,
  Utensils,
  FlaskConical,
  RefreshCw,
  Egg,
  Sparkles,
  Stethoscope,
  ChartColumnBig,
} from "lucide-react"
import { Link } from "react-router-dom"
import mockProfileData from "@/data/mock-my-profile"

export default function MyProfile() {
  const [activeTab, setActiveTab] = useState("collection")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const { username, level, joinDate, experience, currency, stats, fishCollection, playerStats } = mockProfileData

  return (
    <div className="min-h-screen bg-blue-700 text-white relative overflow-hidden">
      {/* Background bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-600/20 animate-float"
            style={{
              width: `${Math.random() * 60 + 20}px`,
              height: `${Math.random() * 60 + 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content container with margins */}
      <div
        className={`max-w-4xl mx-auto px-4 py-6 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        {/* Header */}
        <header className="flex items-center justify-between mb-6 animate-fadeDown" style={{ animationDelay: "0.1s" }}>
          <Link to="/" className="flex items-center text-white hover:text-blue-200 transition-colors group">
            <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Game</span>
          </Link>
          <h1 className="text-2xl font-bold">My Profile</h1>
          <div className="flex items-center">
            <Coins className="w-5 h-5 mr-2 text-yellow-400 animate-pulse-slow" />
            <span className="font-bold">{currency.toLocaleString()}</span>
          </div>
        </header>

        {/* Profile Card */}
        <div className="bg-blue-800 rounded-xl p-6 mb-6 shadow-lg animate-fadeIn" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-start">
            {/* Level Circle */}
            <div className="relative mr-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 flex items-center justify-center animate-pulse-slow">
                <div className="text-center">
                  <div className="text-4xl font-bold">{level}</div>
                  <div className="text-xs">LEVEL</div>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 bg-yellow-400 rounded-full p-1 animate-bounce-small">
                <Star className="w-4 h-4 text-yellow-800" />
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{username}</h2>
              <p className="text-blue-200 text-sm mb-4">Joined {joinDate}</p>

              {/* Experience Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Experience</span>
                  <span>
                    {experience.current} / {experience.total} XP
                  </span>
                </div>
                <div className="h-2 bg-blue-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-300 animate-expandWidth"
                    style={{ width: `${(experience.current / experience.total) * 100}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  {
                    icon: <Clock className="w-5 h-5 text-blue-300" />,
                    label: "Play Time",
                    value: stats.playTime,
                    delay: 0.3,
                  },
                  {
                    icon: <Fish className="w-5 h-5 text-blue-300" />,
                    label: "Fish Collected",
                    value: `${stats.fishCollected}/${stats.totalFish}`,
                    delay: 0.4,
                  },
                  {
                    icon: <Star className="w-5 h-5 text-blue-300" />,
                    label: "Special Fish",
                    value: stats.specialFish,
                    delay: 0.5,
                  },
                  {
                    icon: <Medal className="w-5 h-5 text-blue-300" />,
                    label: "Achievements",
                    value: `${stats.achievements.completed}/${stats.achievements.total}`,
                    delay: 0.6,
                  },
                ].map((stat, index) => (
                  <div key={index} className="text-center animate-fadeIn" style={{ animationDelay: `${stat.delay}s` }}>
                    <div className="flex justify-center mb-1">{stat.icon}</div>
                    <div className="text-sm text-blue-200">{stat.label}</div>
                    <div className="font-bold">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-3 gap-2 mb-6 animate-fadeIn" style={{ animationDelay: "0.4s" }}>
          <button
            className={`py-3 px-4 rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
              activeTab === "achievements" ? "bg-blue-600 shadow-md" : "bg-blue-800 hover:bg-blue-700"
            }`}
            onClick={() => setActiveTab("achievements")}
          >
            <div className="flex items-center justify-center">
              <Trophy
                className={`w-4 h-4 mr-2 transition-transform duration-300 ${activeTab === "achievements" ? "scale-110" : ""}`}
              />
              Achievements
            </div>
          </button>
          <button
            className={`py-3 px-4 rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
              activeTab === "collection" ? "bg-blue-600 shadow-md" : "bg-blue-800 hover:bg-blue-700"
            }`}
            onClick={() => setActiveTab("collection")}
          >
            <div className="flex items-center justify-center">
              <Fish
                className={`w-4 h-4 mr-2 transition-transform duration-300 ${activeTab === "collection" ? "scale-110" : ""}`}
              />
              Collection
            </div>
          </button>
          <button
            className={`py-3 px-4 rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
              activeTab === "purchase" ? "bg-blue-600 shadow-md" : "bg-blue-800 hover:bg-blue-700"
            }`}
            onClick={() => setActiveTab("purchase")}
          >
            <div className="flex items-center justify-center">
              <ShoppingBag
                className={`w-4 h-4 mr-2 transition-transform duration-300 ${activeTab === "purchase" ? "scale-110" : ""}`}
              />
              Purchase History
            </div>
          </button>
        </div>

        {/* Tab Content */}
        <div className="animate-fadeIn transition-all duration-500">
          {activeTab === "collection" && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">Fish Collection</h2>
                <span className="text-sm">
                  {fishCollection.collected} of {fishCollection.total} collected
                </span>
              </div>
              <div className="h-2 bg-blue-900 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-green-300 animate-expandWidth"
                  style={{ width: `${(fishCollection.collected / fishCollection.total) * 100}%` }}
                />
              </div>

              {/* Fish Grid */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                {fishCollection.displayedFish.map((fish, index) => (
                  <div
                    key={fish.id}
                    className="bg-blue-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fadeIn"
                    style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                  >
                    <div className="p-4 flex justify-center items-center h-24 relative">
                      <div
                        className={`absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full ${
                          fish.rarity === "Legendary"
                            ? "bg-purple-500"
                            : fish.rarity === "Rare"
                              ? "bg-blue-500"
                              : fish.rarity === "Special"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                        }`}
                      >
                        {fish.rarity}
                      </div>
                      <img
                        src={fish.imageUrl}
                        alt={fish.name}
                        width={80}
                        height={80}
                        className="h-20 w-auto animate-float-small"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm mb-1">{fish.name}</h3>
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-400 mr-1" fill="currentColor" />
                          <span>Level {fish.level}</span>
                        </div>
                        <span className="text-blue-300">Obtained: {fish.obtainedDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full py-3 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors transform hover:scale-[1.01] active:scale-[0.99] transition-transform shadow-md">
                <span>View Full Collection</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {activeTab === "achievements" && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-400 animate-pulse-slow" />
                  Achievements
                </h2>
                <span className="text-sm">
                  {stats.achievements.completed} of {stats.achievements.total} completed
                </span>
              </div>
              <div className="h-2 bg-blue-900 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300 animate-expandWidth"
                  style={{ width: `${(stats.achievements.completed / stats.achievements.total) * 100}%` }}
                />
              </div>

              {/* Achievement Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Collector Category */}
                <div
                  className="bg-blue-800 rounded-xl overflow-hidden shadow-lg animate-fadeIn"
                  style={{ animationDelay: "0.1s" }}
                >
                  <div className="bg-blue-700 p-4">
                    <h3 className="font-bold text-lg flex items-center">
                      <Fish className="w-5 h-5 mr-2 animate-wiggle" />
                      Collector
                    </h3>
                  </div>
                  <div className="p-4">
                    <div
                      className="flex items-center p-3 rounded-lg mb-2 bg-blue-700 transform hover:scale-[1.02] transition-transform animate-fadeIn"
                      style={{ animationDelay: "0.2s" }}
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-gradient-to-br from-yellow-400 to-yellow-600 animate-pulse-slow">
                        <Check className="w-5 h-5 text-yellow-900" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">First Catch</h4>
                        <p className="text-xs text-blue-300">Catch your first fish</p>
                      </div>
                      <div className="text-xs text-blue-300">Feb 15, 2025</div>
                    </div>

                    <div
                      className="flex items-center p-3 rounded-lg mb-2 bg-blue-700 transform hover:scale-[1.02] transition-transform animate-fadeIn"
                      style={{ animationDelay: "0.3s" }}
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-gradient-to-br from-yellow-400 to-yellow-600 animate-pulse-slow">
                        <Check className="w-5 h-5 text-yellow-900" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Novice Collector</h4>
                        <p className="text-xs text-blue-300">Collect 10 different fish species</p>
                      </div>
                      <div className="text-xs text-blue-300">Mar 10, 2025</div>
                    </div>

                    <div
                      className="flex items-center p-3 rounded-lg mb-2 bg-blue-900/50 transform hover:scale-[1.02] transition-transform animate-fadeIn"
                      style={{ animationDelay: "0.4s" }}
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-blue-950">
                        <Lock className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-blue-300">Advanced Collector</h4>
                        <p className="text-xs text-blue-300">Collect 50 different fish species</p>
                      </div>
                    </div>

                    <div
                      className="flex items-center p-3 rounded-lg mb-2 bg-blue-900/50 transform hover:scale-[1.02] transition-transform animate-fadeIn"
                      style={{ animationDelay: "0.5s" }}
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-blue-950">
                        <Lock className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-blue-300">Master Collector</h4>
                        <p className="text-xs text-blue-300">Collect all 100 fish species</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mastery Category */}
                <div
                  className="bg-blue-800 rounded-xl overflow-hidden shadow-lg animate-fadeIn"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="bg-blue-700 p-4">
                    <h3 className="font-bold text-lg flex items-center">
                      <Trophy className="w-5 h-5 mr-2 animate-wiggle" />
                      Mastery
                    </h3>
                  </div>
                  <div className="p-4">
                    <div
                      className="flex items-center p-3 rounded-lg mb-2 bg-blue-700 transform hover:scale-[1.02] transition-transform animate-fadeIn"
                      style={{ animationDelay: "0.3s" }}
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-gradient-to-br from-yellow-400 to-yellow-600 animate-pulse-slow">
                        <Check className="w-5 h-5 text-yellow-900" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Aquarium Starter</h4>
                        <p className="text-xs text-blue-300">Create your first aquarium</p>
                      </div>
                      <div className="text-xs text-blue-300">Feb 16, 2025</div>
                    </div>

                    <div
                      className="flex items-center p-3 rounded-lg mb-2 bg-blue-700 transform hover:scale-[1.02] transition-transform animate-fadeIn"
                      style={{ animationDelay: "0.4s" }}
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-gradient-to-br from-yellow-400 to-yellow-600 animate-pulse-slow">
                        <Check className="w-5 h-5 text-yellow-900" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Aquarium Designer</h4>
                        <p className="text-xs text-blue-300">Place 50 decorations in your aquariums</p>
                      </div>
                      <div className="text-xs text-blue-300">Mar 25, 2025</div>
                    </div>

                    <div
                      className="flex items-center p-3 rounded-lg mb-2 bg-blue-900/50 transform hover:scale-[1.02] transition-transform animate-fadeIn"
                      style={{ animationDelay: "0.5s" }}
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-blue-950">
                        <Lock className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-blue-300">Fish Breeder</h4>
                        <p className="text-xs text-blue-300">Successfully breed 20 fish</p>
                      </div>
                    </div>

                    <div
                      className="flex items-center p-3 rounded-lg mb-2 bg-blue-900/50 transform hover:scale-[1.02] transition-transform animate-fadeIn"
                      style={{ animationDelay: "0.6s" }}
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-blue-950">
                        <Lock className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-blue-300">Legendary Hunter</h4>
                        <p className="text-xs text-blue-300">Collect all legendary fish</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "purchase" && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <ShoppingBag className="w-5 h-5 mr-2 text-blue-300" />
                  Purchase History
                </h2>
              </div>

              {/* Purchase History */}
              <div className="bg-blue-800 rounded-xl overflow-hidden shadow-lg">
                {/* Transaction 1 */}
                <div
                  className="p-4 flex items-center border-b border-blue-700 hover:bg-blue-700/50 transition-colors animate-fadeIn"
                  style={{ animationDelay: "0.1s" }}
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-700 flex items-center justify-center mr-4">
                    <Gem className="w-6 h-6 text-blue-300" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Premium Aquarium Bundle</h4>
                    <div className="flex items-center text-xs text-blue-300">
                      <Calendar className="w-3 h-3 mr-1" />
                      Apr 2, 2025
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Coins className="w-4 h-4 mr-1 text-yellow-400" />
                    <span className="font-bold">-2,500</span>
                  </div>
                </div>

                {/* Transaction 2 */}
                <div
                  className="p-4 flex items-center border-b border-blue-700 hover:bg-blue-700/50 transition-colors animate-fadeIn"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-700 flex items-center justify-center mr-4">
                    <Utensils className="w-6 h-6 text-blue-300" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Rare Fish Food Pack</h4>
                    <div className="flex items-center text-xs text-blue-300">
                      <Calendar className="w-3 h-3 mr-1" />
                      Mar 28, 2025
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Coins className="w-4 h-4 mr-1 text-yellow-400" />
                    <span className="font-bold">-750</span>
                  </div>
                </div>

                {/* Transaction 3 */}
                <div
                  className="p-4 flex items-center border-b border-blue-700 hover:bg-blue-700/50 transition-colors animate-fadeIn"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-700 flex items-center justify-center mr-4">
                    <FlaskConical className="w-6 h-6 text-blue-300" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Celestial Breeding Tank</h4>
                    <div className="flex items-center text-xs text-blue-300">
                      <Calendar className="w-3 h-3 mr-1" />
                      Mar 15, 2025
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Coins className="w-4 h-4 mr-1 text-yellow-400" />
                    <span className="font-bold">-1,200</span>
                  </div>
                </div>

                {/* Transaction 4 */}
                <div
                  className="p-4 flex items-center border-b border-blue-700 hover:bg-blue-700/50 transition-colors animate-fadeIn"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-700 flex items-center justify-center mr-4">
                    <RefreshCw className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Coin Package Refund</h4>
                    <div className="flex items-center text-xs text-blue-300">
                      <Calendar className="w-3 h-3 mr-1" />
                      Mar 10, 2025
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Coins className="w-4 h-4 mr-1 text-green-400" />
                    <span className="font-bold text-green-400 animate-pulse-slow">+500</span>
                  </div>
                </div>

                {/* Transaction 5 */}
                <div
                  className="p-4 flex items-center hover:bg-blue-700/50 transition-colors animate-fadeIn"
                  style={{ animationDelay: "0.5s" }}
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-700 flex items-center justify-center mr-4">
                    <Egg className="w-6 h-6 text-blue-300" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Exotic Fish Egg</h4>
                    <div className="flex items-center text-xs text-blue-300">
                      <Calendar className="w-3 h-3 mr-1" />
                      Mar 5, 2025
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Coins className="w-4 h-4 mr-1 text-yellow-400" />
                    <span className="font-bold">-1,800</span>
                  </div>
                </div>
              </div>

              <div
                className="mt-4 flex justify-between items-center p-4 bg-blue-800 rounded-lg shadow-lg animate-fadeIn"
                style={{ animationDelay: "0.6s" }}
              >
                <span className="text-sm">Showing recent purchases</span>
                <button className="text-sm text-blue-300 hover:text-white transition-colors flex items-center group">
                  View All Transactions
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {/* Player Statistics */}
          <div className="animate-fadeIn" style={{ animationDelay: "0.5s" }}>
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <BarChart2 className="w-5 h-5 mr-2" />
              Player Statistics
            </h2>

            <div className="grid grid-cols-4 gap-4">
              {[
                {
                  icon: <Fish className="w-4 h-4 text-blue-300" />,
                  label: "Fish Fed",
                  value: playerStats.fishFed.toLocaleString(),
                  color: "bg-blue-700",
                  delay: 0.6,
                },
                {
                  icon: <Sparkles className="w-4 h-4 text-purple-300" />,
                  label: "Decorations Placed",
                  value: playerStats.decorationsPlaced,
                  color: "bg-purple-700",
                  delay: 0.7,
                },
                {
                  icon: <Stethoscope className="w-4 h-4 text-red-300" />,
                  label: "Fish Bred",
                  value: playerStats.fishBred,
                  color: "bg-red-700",
                  delay: 0.8,
                },
                {
                  icon: <ChartColumnBig className="w-4 h-4 text-yellow-300" />,
                  label: "Aquariums Created",
                  value: playerStats.aquariumsCreated,
                  color: "bg-yellow-700",
                  delay: 0.9,
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-blue-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fadeIn"
                  style={{ animationDelay: `${stat.delay}s` }}
                >
                  <div className="flex justify-center mb-2">
                    <div
                      className={`w-8 h-8 rounded-full ${stat.color} flex items-center justify-center animate-pulse-slow`}
                    >
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-center text-sm text-blue-300">{stat.label}</div>
                  <div className="text-center text-2xl font-bold animate-count">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
