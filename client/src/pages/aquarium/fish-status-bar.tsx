import React, { useState, useEffect } from "react";
import { 
         fishStatusBarColors as statusColors, 
         fishStatusBarIconPaths as statusIconPaths, 
         getStatusByLevel
       } from "@/data/mock-data";
import clsx from "clsx";

interface FishStatusBarProps {
  level: number;
}

const FishStatusBar: React.FC<FishStatusBarProps> = ({ level }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animatedLevel, setAnimatedLevel] = useState(0);
  const [showBar, setShowBar] = useState(false);

  const status = getStatusByLevel(level);

  const handleClick = () => {

    if (isOpen) {
      setIsOpen(false); 
      setShowBar(false); 
    }
    else {

      setTimeout(() => {
        setIsOpen(true);
        setAnimatedLevel(0);
        setShowBar(true); 
  
        setTimeout(() => setAnimatedLevel(level), 50);
      }, 200);

    }

  };

  return (
    <div className="flex flex-col items-center w-24 relative">

      {isOpen && showBar && (
        <div className="absolute bottom-20 w-12 h-48 bg-gray-300 rounded-full overflow-hidden shadow-lg">

          <div
            className={clsx(
              "absolute bottom-0 w-full transition-all duration-1000",
              statusColors[status]
            )}
            style={{ height: `${animatedLevel}%` }} 
          />
        </div>
      )}

      <button
        onClick={handleClick}
        className={clsx(
          "w-16 h-16 flex items-center justify-center rounded-full text-4xl shadow-md transition-transform duration-300",
          statusColors[status],
          isOpen ? "scale-110" : "hover:scale-110"
        )}
      >
       <img src={statusIconPaths[status]} alt={`${status} face`} className="w-10 h-10" />
      </button>
    </div>
  );
};

export default FishStatusBar;
