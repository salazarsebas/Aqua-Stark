import { useEffect, useState } from "react";
import { FishType } from "@/types/game";
import { useFishMovement } from "@/hooks/use-fish-movement";
import { Fish } from "@/components/aquarium/fish";

interface FishDisplayProps {
  fish: FishType[];
  containerWidth?: number;
  containerHeight?: number;
}

export function FishDisplay({
  fish,
  containerWidth = 1000,
  containerHeight = 600,
}: FishDisplayProps) {
  const [dimensions, setDimensions] = useState({
    width: containerWidth,
    height: containerHeight,
  });

  // Generar posición única cerca del centro para cada pez
  const generateCenteredPosition = (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 2;
    const radius = 10 + Math.random() * 10; // 10–20% de dispersión
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    return { x, y };
  };

  const fishWithInitialPosition = fish.map((f, i) => ({
    ...f,
    position:
      f.position && (f.position.x !== 0 || f.position.y !== 0)
        ? f.position
        : generateCenteredPosition(i, fish.length),
  }));

  useEffect(() => {
    const handleResize = () => {
      const container = document.querySelector('.fish-container');
      if (container) {
        setDimensions({
          width: container.clientWidth,
          height: container.clientHeight,
        });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fishWithMovement = useFishMovement(fishWithInitialPosition, {
    aquariumBounds: dimensions,
    collisionRadius: 40,
  });

  return (
    <div className="relative w-full h-full fish-container overflow-hidden">
      {fishWithMovement.map((fishState) => {
        const fishData = fishWithInitialPosition.find((f) => f.id === fishState.id);
        if (!fishData) return null;

        return (
          <Fish
            key={fishData.id}
            fish={fishData}
            position={fishState.position}
            facingLeft={fishState.facingLeft}
            behaviorState={fishState.behaviorState}
          />
        );
      })}
    </div>
  );
}
