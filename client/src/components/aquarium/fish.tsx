import { motion } from 'framer-motion';
import { FishType } from '@/types/game';

interface FishProps {
  fish: FishType;
  position: {
    x: number;
    y: number;
  };
  facingLeft: boolean;
  behaviorState: 'idle' | 'darting' | 'hovering';
}

// Define valid rarity types for type safety
type RarityType = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'exotic';

export function Fish({ fish, position, facingLeft, behaviorState }: FishProps) {
  // Scale effect based on behavior state
  const scaleVariants = {
    idle: { scale: 1 },
    darting: { scale: 1.15 },
    hovering: { scale: 0.9 }
  };
  
  // Rotation for natural swimming effect
  const rotationVariants = {
    idle: {
      rotate: [-2, 2, -2],
      transition: { 
        duration: 3, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }
    },
    darting: {
      rotate: [-5, 5, -5],
      transition: { 
        duration: 0.8, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }
    },
    hovering: {
      rotate: [-1, 1, -1],
      transition: { 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }
    }
  };
  
  // Subtle vertical bobbing for more natural movement
  const yOffsetVariants = {
    idle: {
      y: [0, 4, 0],
      transition: { 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }
    },
    darting: {
      y: [0, 2, 0],
      transition: { 
        duration: 0.5, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }
    },
    hovering: {
      y: [0, 3, 0],
      transition: { 
        duration: 2, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }
    }
  };
  
  // Calculate fish size based on rarity
  const getFishSize = () => {
    const rarityFactor: Record<RarityType, number> = {
      'common': 80,
      'uncommon': 90,
      'rare': 100,
      'epic': 110,
      'legendary': 120,
      'exotic': 130
    };
    
    // Get the lowercase rarity and check if it's a valid key
    const rarityKey = fish.rarity.toLowerCase() as RarityType;
    
    // Default to medium size if rarity is not recognized
    const baseSize = rarityFactor[rarityKey] || 100;
    
    // Add some slight random variation (±10%)
    const variation = 1 + (fish.id % 20 - 10) / 100;
    
    return Math.round(baseSize * variation);
  };
  
  const fishSize = getFishSize();

  // Fix: Determine bubble position based on facing direction
  // Bubbles should appear behind the fish, opposite to the direction of movement
  const bubblePosition = facingLeft ? 'right-[-5px]' : 'left-[-5px]';
  
  return (
    <div
      className="absolute transition-all duration-300 ease-in-out cursor-pointer group"
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`,
        zIndex: behaviorState === 'darting' ? 10 : 1 // Bring darting fish to front
      }}
    >
      <div className="relative">
        <motion.div
          animate={{
            ...scaleVariants[behaviorState],
            ...rotationVariants[behaviorState],
            ...yOffsetVariants[behaviorState]
          }}
          style={{
            // Critical fix: Apply the transform based on facingLeft
            // If facingLeft is true, the fish should be displayed facing left (scaleX(-1) flips it)
            // If facingLeft is false, the fish should be displayed facing right (no flip)
            transform: facingLeft ? 'scaleX(-1)' : 'scaleX(1)',
            transformOrigin: 'center',
            display: 'inline-block',
            // Add drop shadow for better visibility
            filter: 'drop-shadow(0 0 5px rgba(0, 0, 0, 0.3))'
          }}
        >
          {/* Wrapper to add glow effect for better visibility */}
          <div className={`
            relative 
            ${behaviorState === 'darting' ? 'animate-pulse' : ''}
          `}>
            <img
              src={fish.image || "/fish/fish1.png"}
              alt={fish.name}
              width={fishSize}
              height={fishSize}
              className="transition-transform duration-200 hover:scale-110"
              style={{
                filter: behaviorState === 'darting' ? 'brightness(1.3)' : 'brightness(1.1)'
              }}
            />
            
            {/* Optional subtle glow behind fish for better visibility */}
            <div 
              className="absolute top-0 left-0 w-full h-full rounded-full opacity-30 -z-10"
              style={{
                background: `radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)`,
                transform: 'scale(1.2)',
              }}
            />
          </div>
        </motion.div>
        
        {/* Tooltip on hover */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 game-container p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20">
          <div className="font-bold text-white">{fish.name}</div>
          <div className="text-xs text-white/80">
            Rarity: {fish.rarity} • Gen {fish.generation}
          </div>
        </div>
        
        {/* Tail bubbles that appear on the opposite side of the facing direction */}
        {behaviorState === 'darting' && (
          <motion.div
            className={`absolute ${bubblePosition} top-1/2 -translate-y-1/2`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.8, 0],
              scale: [0, 1, 1.5],
              x: facingLeft ? [0, -15] : [0, 15] // Bubbles go opposite to facing direction
            }}
            transition={{
              duration: 0.4,
              repeat: Infinity,
              repeatDelay: 0.1
            }}
          >
            <div className="w-2 h-2 bg-white/50 rounded-full" />
          </motion.div>
        )}
        
        {/* Additional smaller bubbles for darting fish */}
        {behaviorState === 'darting' && (
          <motion.div
            className={`absolute ${bubblePosition} top-1/3 -translate-y-1/2`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.6, 0],
              scale: [0, 0.7, 1],
              x: facingLeft ? [0, -10] : [0, 10]
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatDelay: 0.2,
              delay: 0.1
            }}
          >
            <div className="w-1 h-1 bg-white/40 rounded-full" />
          </motion.div>
        )}
      </div>
    </div>
  );
} 