import Fish from "@/components/aquarium/fish";
import AquariumBackground from "@/components/aquarium/aquarium-background";
import mockFishData from "@/data/mock-data";

type AquariumProps = {
  aquariumId: string;
};

export default function Aquarium({ aquariumId }: AquariumProps) {
  return (
    <AquariumBackground backgroundImage="/textures/backgrounds/Bg2.svg">
      <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
        {mockFishData.map((fish) => (
          <Fish key={fish.id} {...fish} />
        ))}
      </div>
    </AquariumBackground>
  );
}
