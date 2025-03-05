import { mockAquariumStats } from "@/data/mock-data";

export default function FishCounter() {
  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <img src="/icons/fish.png" alt="Fish Count" className="w-full h-full" />
      <span
        className="absolute flex items-center justify-center text-white font-bold text-sm whitespace-nowrap"
        style={{ top: "51%", left: "57%", transform: "translate(-50%, -50%)" }}
      >
        {mockAquariumStats.currentFish} / {mockAquariumStats.maxFish}
      </span>
    </div>
  );
}
