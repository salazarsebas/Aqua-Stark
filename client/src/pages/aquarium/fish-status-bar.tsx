import React, { useState, useEffect } from "react";
import clsx from "clsx";

interface FishStatusBarProps {
  level: number;
}

const FishStatusBar: React.FC<FishStatusBarProps> = ({ level }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animatedLevel, setAnimatedLevel] = useState(0);
  const [showBar, setShowBar] = useState(false);

  let status: "sad" | "neutral" | "happy";
  if (level <= 49) status = "sad";
  else if (level <= 74) status = "neutral";
  else status = "happy";

  const statusColors = {
    sad: "bg-red-500",
    neutral: "bg-yellow-500",
    happy: "bg-green-500",
  };

  const statusIcons = {
    sad: <img src="/textures/icons/EmojiFrown.svg" alt="Sad face" className="w-10 h-10" />,
    neutral: <img src="/textures/icons/EmojiSerious.svg" alt="Neutral face" className="w-10 h-10" />,
    happy: <img src="/textures/icons/EmojiSmile.svg" alt="Happy face" className="w-10 h-10" />,
  };


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
        {statusIcons[status]}
      </button>
    </div>
  );
};

export default FishStatusBar;
