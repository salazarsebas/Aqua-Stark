import { FishType } from "@/types/game"

// Tipos
export interface GameState {
  happiness: number
  food: number
  energy: number
}

// Datos mock
export const MOCK_FISH: FishType[] = [
  {
    id: "1",
    name: "Nemo",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fish1-8J9X1J6jlWP2xj88XACJcaMqDLbHW.png",
    position: { x: 20, y: 30 },
    rarity: "Common",
    generation: 1,
  },
  {
    id: "2",
    name: "Dory",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fish2-8J9X1J6jlWP2xj88XACJcaMqDLbHW.png",
    position: { x: 80, y: 40 },
    rarity: "Rare",
    generation: 2,
  },
]

export const MOCK_AQUARIUMS = ["Main Tank", "Breeding Tank", "Nursery"]

export const INITIAL_GAME_STATE: GameState = {
  happiness: 80,
  food: 90,
  energy: 75,
} 