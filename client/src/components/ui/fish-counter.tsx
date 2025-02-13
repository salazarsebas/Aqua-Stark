import { mockAquariumStats } from "@/data/mock-data";

export default function FishCounter() {
  return (
    <div className="flex items-center">
      <img src="/icons/fish.png" alt="Fish Count" width={36} height={36} />
      <span className="text-blue-900 font-extrabold text-2xl ml-3">
        {mockAquariumStats.currentFish} / {mockAquariumStats.maxFish}
      </span>
    </div>
  );
} 