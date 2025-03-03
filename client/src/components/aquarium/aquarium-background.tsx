import React from "react";

type AquariumBackgroundProps = {
  backgroundImage: string;
  children?: React.ReactNode;
};

export default function AquariumBackground({ backgroundImage, children }: AquariumBackgroundProps) {
  return (
    <div
      className="relative w-full h-full bg-cover bg-center rounded-lg overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {children}
    </div>
  );
}
