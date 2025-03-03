import Button from "@/components/ui/button";
import { useState } from "react";

export default function FloatingControls() {
  const [isOpen, setIsOpen] = useState(false);
  const controls = [
    "/textures/icons/Cup01.svg",
    "/textures/icons/Basket.svg",
    "/textures/icons/Help.svg",
    "/textures/icons/camera.svg",
    "/textures/icons/SpeakerMute.svg",
    "/textures/icons/Arrow02Up.svg",
  ];

  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <div className="flex items-center gap-2 absolute bottom-4 right-4 md:bottom-8 md:right-8">
      <div
        className={`h-16 flex items-center justify-center bg-cyan-500 rounded-full py-2 px-5 shadow-[0px_5px_0px_rgba(1,147,201,1)] cursor-pointer transition-all duration-300 ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        {controls.map((icon, index) => (
          <div
            key={index}
            onClick={handleClick}
            className="w-6 md:w-8 h-6 md:h-8 flex items-center justify-center mx-1 md:mx-2 transition-transform duration-200 hover:scale-110 active:scale-95 active:shadow-inner cursor-pointer"
          >
            <img src={icon} alt={`${icon}-icon`} className="object-contain" />
          </div>
        ))}
      </div>

      <div className="h-16 md:h-20 flex items-center">
        <Button
          color="teal"
          className="shrink-0"
          size="medium"
          iconSrc="/textures/icons/Tiles.svg"
          onClick={() => setIsOpen(!isOpen)}
        >
        </Button>
      </div>
    </div>
  );
}
