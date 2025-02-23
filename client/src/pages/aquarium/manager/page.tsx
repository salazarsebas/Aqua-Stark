"use client";

import { useState } from "react";
import Aquarium from "@/components/aquarium/aquarium";
import StatusBar from "@/components/aquarium/status-bar";
import AquariumMenu from "@/components/aquarium/aquarium-menu";
import SideMenu from "@/components/aquarium/side-menu";
import FloatingControls from "@/components/aquarium/floating-controls";
import { mockAquariums } from "@/data/mock-data";
import CenteredMenu from "@/components/aquarium/centered-menu";

export default function AquariumManagerPage() {
  const [aquariums, setAquariums] = useState(mockAquariums);
  const [activeAquarium, setActiveAquarium] = useState(mockAquariums[0].id);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-screen h-screen flex flex-col bg-blue-200">
      <StatusBar setIsMenuOpen={setIsMenuOpen} />
      <div className="flex-grow flex items-center justify-center relative">
        <Aquarium aquariumId={activeAquarium} />
        <SideMenu />
      </div>
      <AquariumMenu aquariums={aquariums} setActiveAquarium={setActiveAquarium} />
      <FloatingControls />
      {isMenuOpen && <CenteredMenu onClose={() => setIsMenuOpen(false)} />}
    </div>
  );
}