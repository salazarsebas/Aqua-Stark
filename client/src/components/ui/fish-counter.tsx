import { mockAquariumStats } from "@/data/mock-data";
import { FishIcon } from "@/components/icons/FishIcon";

export default function FishCounter() {
  return (
    <div className="relative w-20 h-20">
      <FishIcon className="w-14 h-14 text-white" />
      <span className="absolute top-[50%] left-[50%] transform translate-y-[-50%] translate-x-[-50%] w-full h-full flex items-center justify-center text-white font-bold text-lg">
        {mockAquariumStats.currentFish} / {mockAquariumStats.maxFish}
      </span>
    </div>
  );
}
