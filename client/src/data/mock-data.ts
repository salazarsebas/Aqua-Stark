export const mockFishData = [
  {
    id: "1",
    name: "Fish 1",
    image: "/fish/fish1.png",
    position: { x: 20, y: 30 },
    nftMetadata: { rarity: "Common", generation: 1, traits: ["Fast", "Small"] }
  },
  {
    id: "2",
    name: "Fish 2",
    image: "/fish/fish2.png",
    position: { x: 50, y: 60 },
    nftMetadata: { rarity: "Rare", generation: 2, traits: ["Shiny", "Big"] }
  }
];

export const mockAquariumStats = {
  currentFish: mockFishData.length,
  maxFish: 10,
  cleanliness: 80,
  food: 60 
};

export const mockAquariums = [
  { id: "1", name: "My First Aquarium" },
  { id: "2", name: "Second Aquarium" },
  { id: "3", name: "Tropical Paradise", locked: true }
];

export const mockPlayerData = {
  playerLevel: 5,
  playerExperience: 50000,
  maxExperience: 100000,
  profileImage: "profile-mock.png"
};

export const fishStatusBarColors = {
    sad: "bg-red-500",
    neutral: "bg-yellow-500",
    happy: "bg-green-500",
  };

  export const fishStatusBarIconPaths = {
    sad: "/textures/icons/EmojiFrown.svg",
    neutral: "/textures/icons/EmojiSerious.svg",
    happy: "/textures/icons/EmojiSmile.svg",
  };

  export const getStatusByLevel = (level: number): "sad"| "neutral" | "happy" => {
    if (level < 50) return "sad";
    else if (level < 75) return "neutral";
    else return "happy";
  };

export default mockFishData;
