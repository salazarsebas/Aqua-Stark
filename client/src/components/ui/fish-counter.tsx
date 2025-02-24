import { mockAquariumStats } from "@/data/mock-data";

export default function FishCounter() {
  return (
    <div className="relative  w-16 h-16">
      <img src="/icons/fish.png" alt="Fish Count" width={36} height={36} className="w-full h-full" />
      <span className="absolute top-[50%] left-[50%] transform translate-y-[-50%] translate-x-[-50%] w-full h-full flex items-center justify-center   text-white font-bold text-base">
        {mockAquariumStats.currentFish} / {mockAquariumStats.maxFish}
      </span>
    </div>
  );
}
