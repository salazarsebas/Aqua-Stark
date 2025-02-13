import Fish from "@/components/aquarium/fish";
import mockFishData from "@/data/mock-data";

type AquariumProps = {
  aquariumId: string;
};

export default function Aquarium({ aquariumId }: AquariumProps) {
  return (
    <div className="w-full h-full bg-blue-300 relative overflow-hidden flex items-center justify-center">
      {mockFishData.map((fish) => (
        <Fish key={fish.id} {...fish} />
      ))}
    </div>
  );
}
