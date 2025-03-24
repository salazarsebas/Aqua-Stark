import React from "react";
import type { Bubble } from "@/hooks/useBubbles";

interface BubblesBackgroundProps {
  bubbles: Bubble[];
  className?: string;
  animationName?: string;
  customStyles?: React.CSSProperties;
}

export function BubblesBackground({
  bubbles,
  className = "",
  animationName = "float-up",
  customStyles = {},
}: BubblesBackgroundProps) {
  return (
    <div
      className={`absolute inset-x-0 bottom-0 overflow-hidden ${className}`}
      style={{ height: "100vh", ...customStyles }}
    >
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            bottom: "0",
            background:
              "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2))",
            animation: `${animationName} ${bubble.animationDuration}s ease-in infinite`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes ${animationName} {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-50vh) scale(1.1);
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
