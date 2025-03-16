"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ShoppingBag, Wallet, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FishTank } from "@/components/fish-tank"

export default function LandingPage() {
  const [bubbles, setBubbles] = useState<Array<{ id: number; size: number; left: number; animationDuration: number }>>(
    [],
  )
  const [backgroundBubbles, setBackgroundBubbles] = useState<
    Array<{
      id: number
      size: number
      left: number
      duration: number
      delay: number
      drift: number
    }>
  >([])
  const [particles, setParticles] = useState<
    Array<{
      id: number
      size: number
      top: number
      left: number
      duration: number
      delay: number
      floatX: number
      floatY: number
    }>
  >([])

  useEffect(() => {
    const newBubbles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 30 + 10,
      left: Math.random() * 100,
      animationDuration: Math.random() * 15 + 5,
    }))
    setBubbles(newBubbles)

    const newBackgroundBubbles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 60 + 40, 
      left: Math.random() * 100,
      duration: Math.random() * 25 + 15, 
      delay: Math.random() * 10,
      drift: (Math.random() - 0.5) * 100, 
    }))
    setBackgroundBubbles(newBackgroundBubbles)

    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      floatX: (Math.random() - 0.5) * 200,
      floatY: (Math.random() - 0.5) * 200,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-500 to-blue-700 animated-background">
      <div className="water-movement"></div>

      {backgroundBubbles.map((bubble) => (
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

      {particles.map((particle) => (
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

      {bubbles.map((bubble) => (
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

      <nav className="relative z-10 flex justify-between items-center p-4">
        <div className="flex items-center">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Aqua_Stark-removebg-preview-ubKSrqYo7jzOH5qXqxEw4CyRHXIjfq.png"
            alt="Aqua Stark Logo"
            width={180}
            height={80}
            className="drop-shadow-lg"
          />
        </div>
        <div className="flex items-center">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 border-2 border-purple-400 border-b-4 border-r-4">
            <Wallet className="mr-2 h-6 w-6" />
            Connect Wallet
          </Button>
        </div>
      </nav>

      <main className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-6">
            <span className="inline-block animate-float">Dive into the world of Aqua Stark!</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Breed, feed, and collect unique fish while customizing your aquarium in this incredible aquatic adventure.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link to="/game">
              <Button className="play-button text-xl font-bold py-6 px-12 bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 border-2 border-green-300 border-b-4 border-r-4">
                PLAY NOW
              </Button>
            </Link>
            <Button
              variant="outline"
              className="text-lg font-bold py-6 px-8 bg-gradient-to-b from-blue-400/80 to-blue-600/80 hover:from-blue-500/80 hover:to-blue-700/80 text-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 border-2 border-blue-300 border-b-4 border-r-4"
            >
              WATCH TUTORIAL
            </Button>
          </div>
        </div>

        <div className="w-full max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-lg">Featured Fish</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FishCard
              name="REDGLOW"
              image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fish3-LOteAGqWGR4lDQ8VBBAlRSUByZL2KX.png"
              price={1500}
            />
            <FishCard
              name="BLUESHINE"
              image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fish1-ioYn5CvkJkCHPwgx1jBGoqibnAu5to.png"
              price={2000}
            />
            <FishCard
              name="TROPICORAL"
              image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fish2-D0YdqsjY0OgI0AZg98FS0Sq7zMm2Fe.png"
              price={2500}
            />
          </div>
          <div className="flex justify-center mt-8">
            <Link to="/store">
              <Button className="text-lg font-bold py-4 px-8 bg-gradient-to-b from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 border-2 border-orange-300 border-b-4 border-r-4">
                <ShoppingBag className="mr-2 h-5 w-5" />
                VISIT STORE
              </Button>
            </Link>
          </div>
        </div>

        <div className="w-full max-w-5xl mx-auto mb-16 bg-blue-600/50 rounded-3xl p-8 backdrop-blur-sm border-2 border-blue-400/50">
          <h2 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-lg">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard
              title="Collect Unique Fish"
              description="Discover and collect over 100 species of fish with different rarities and special abilities."
              icon="🐠"
            />
            <FeatureCard
              title="Customize Your Aquarium"
              description="Decorate your aquarium with plants, rocks, castles, and many more objects to create the perfect habitat."
              icon="🏰"
            />
            <FeatureCard
              title="Feed and Care for Your Fish"
              description="Keep your fish happy and healthy with different types of food and special care."
              icon="🍽️"
            />
            <FeatureCard
              title="Compete with Friends"
              description="Show off your collection to your friends and compete to have the most impressive aquarium."
              icon="🏆"
            />
          </div>
        </div>

        <div className="w-full max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-lg">Game Tips</h2>
          <div className="bg-blue-600/50 rounded-3xl p-8 backdrop-blur-sm border-2 border-blue-400/50">
            <h3 className="text-2xl font-bold text-white mb-4">Get to know the State Bars</h3>
            <p className="text-white/90 mb-6">
              In Aqua Stark, each fish has three status bars that you must monitor to keep them happy and healthy:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
              <div className="flex flex-col items-center">
                <div className="relative h-40 w-12 bg-white/30 rounded-full mb-2 overflow-hidden border-2 border-white/50">
                  <div
                    className="absolute bottom-0 w-full bg-green-500 transition-all duration-500"
                    style={{ height: "90%" }}
                  ></div>
                </div>
                <div className="text-center text-2xl mb-2">😃</div>
                <div className="text-center">
                  <h4 className="font-bold text-white">Happiness</h4>
                  <p className="text-white/80 text-sm">
                    Keep your fish happy with decorations and regular attention.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="relative h-40 w-12 bg-white/30 rounded-full mb-2 overflow-hidden border-2 border-white/50">
                  <div
                    className="absolute bottom-0 w-full bg-orange-500 transition-all duration-500"
                    style={{ height: "50%" }}
                  ></div>
                </div>
                <div className="text-center text-2xl mb-2">😐</div>
                <div className="text-center">
                  <h4 className="font-bold text-white">Hunger</h4>
                  <p className="text-white/80 text-sm">
                    Feed your fish regularly to keep this bar full.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="relative h-40 w-12 bg-white/30 rounded-full mb-2 overflow-hidden border-2 border-white/50">
                  <div
                    className="absolute bottom-0 w-full bg-red-500 transition-all duration-500"
                    style={{ height: "20%" }}
                  ></div>
                </div>
                <div className="text-center text-2xl mb-2">😟</div>
                <div className="text-center">
                  <h4 className="font-bold text-white">Energy</h4>
                  <p className="text-white/80 text-sm">Let your fish rest to regain their energy.</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-700/50 rounded-xl p-4 border border-blue-400/30">
              <p className="text-white/90 text-center">
                <span className="font-bold">PRO TIP!</span> Keep all bars above 50% to unlock special behaviors in your fish.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-4xl mx-auto text-center mb-12">
          <div className="bg-blue-600/70 rounded-3xl p-8 backdrop-blur-sm border-2 border-blue-400/50">
            <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">Ready to dive in?</h2>
            <p className="text-xl text-white/90 mb-8">Play Aqua Stark now and begin your aquatic adventure</p>
            <Button className="play-button text-xl font-bold py-6 px-12 bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 border-2 border-green-300 border-b-4 border-r-4">
              PLAY NOW
            </Button>
          </div>
        </div>
      </main>

      <footer className="relative z-10 bg-blue-800 py-6 border-t-2 border-blue-400/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/80 mb-2">© 2025 Aqua Stark - All rights reserved</p>
          <div className="flex justify-center gap-4 mt-4">
            <Link to="#" className="text-white hover:text-blue-200 transition-colors">
              Polity and Privacy
            </Link>
            <Link to="#" className="text-white hover:text-blue-200 transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="text-white hover:text-blue-200 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FishCard({ name, image, price }: { name: string; image: string; price: number }) {
  return (
    <div className="bg-blue-600 rounded-3xl overflow-hidden shadow-xl border-2 border-blue-400 transform hover:scale-105 transition-all duration-200">
      <div className="p-4 text-center">
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <div className="relative mx-auto w-full h-48 bg-blue-400/50 rounded-2xl mb-4 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 rounded-2xl border-2 border-blue-300/50"></div>
          <FishTank>
            <img
              src={image || "/placeholder.svg"}
              alt={name}
              width={120}
              height={120}
              className="object-contain transform hover:scale-110 transition-all duration-500"
            />
          </FishTank>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <Coins className="text-yellow-400 mr-1" size={20} />
            <span className="text-white font-bold text-xl">{price}</span>
          </div>
          <Button className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg px-6 py-2 border-2 border-green-400">
            BUY
          </Button>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="bg-blue-500/50 rounded-2xl p-6 backdrop-blur-sm border-2 border-blue-400/30 shadow-lg">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/90">{description}</p>
    </div>
  )
}

