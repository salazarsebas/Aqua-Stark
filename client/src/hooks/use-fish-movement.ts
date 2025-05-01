import { useState, useEffect, useRef } from 'react';
import { FishType } from '@/types/game';

// Movement parameters for different fish behaviors
interface MovementParams {
  speed: number;
  turnRate: number;
  darting: {
    probability: number;
    speedMultiplier: number;
    duration: number;
  };
  hovering: {
    probability: number;
    duration: number;
    intensity: number;
  };
  boundaryPadding: number;
}

// Current movement state of a fish
interface FishMovementState {
  id: number;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  targetPosition: { x: number; y: number };
  behaviorState: 'idle' | 'darting' | 'hovering';
  behaviorTimer: number;
  facingLeft: boolean;
  lastDirectionChangeTime: number; // Track when we last changed direction
  stuckTimer: number; // Track how long a fish has been "stuck" in the same position
}

interface UseFishMovementOptions {
  aquariumBounds: { width: number; height: number };
  collisionRadius: number;
}

export function useFishMovement(
  initialFish: FishType[],
  options: UseFishMovementOptions
) {
  const { aquariumBounds, collisionRadius } = options;
  
  // Store movement state for each fish
  const [fishStates, setFishStates] = useState<FishMovementState[]>(() => 
    initialFish.map(fish => initializeFishState(fish))
  );
  
  // Store movement parameters for each fish
  const fishParamsRef = useRef<Map<number, MovementParams>>(new Map());
  
  // Timestamp for animation frame
  const lastUpdateTimeRef = useRef<number>(Date.now());
  // Request animation frame ID for cleanup
  const animationFrameRef = useRef<number | null>(null);
  
  // Debug: log initial fish
  useEffect(() => {    
    
    // Ensure we reinitialize fish states when initialFish changes
    if (initialFish.length > 0) {      
      setFishStates(initialFish.map(fish => initializeFishState(fish)));
    }
  }, [initialFish.length]);
  
  // Initialize fish movement parameters
  useEffect(() => {
    // Reset fish parameters when initialFish changes significantly
    if (initialFish.length !== fishParamsRef.current.size) {
      fishParamsRef.current.clear();
    }
    
    // Initialize movement parameters for each fish
    initialFish.forEach(fish => {
      if (!fishParamsRef.current.has(fish.id)) {
        fishParamsRef.current.set(fish.id, generateMovementParams(fish));
      }
    });
            
    
    // Start animation loop
    const animate = () => {
      const now = Date.now();
      const deltaTime = Math.min((now - lastUpdateTimeRef.current) / 1000, 0.1); // Convert to seconds, cap to avoid large jumps
      lastUpdateTimeRef.current = now;
      
      // Update fish positions based on their movement behaviors
      setFishStates(prevStates => updateFishStates(prevStates, deltaTime, now));
      
      // Continue animation loop
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);
    
    // Cleanup on unmount
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [initialFish]);
  
  // Initialize a fish's movement state
  function initializeFishState(fish: FishType): FishMovementState {
    // Generate random direction for initial velocity
    const angle = Math.random() * Math.PI * 2;
    const speed = 15 + Math.random() * 20; // Increased speed for more visible movement
    const velocityX = Math.cos(angle) * speed;
    
    // Ensure the fish is positioned within bounds
    const safePosition = {
      x: Math.min(Math.max(fish.position.x / 100 * aquariumBounds.width, 20), aquariumBounds.width - 20),
      y: Math.min(Math.max(fish.position.y / 100 * aquariumBounds.height, 20), aquariumBounds.height - 20)
    };
    
    return {
      id: fish.id,
      position: safePosition,
      velocity: {
        x: velocityX,
        y: Math.sin(angle) * speed
      },
      targetPosition: {
        x: Math.random() * (aquariumBounds.width - 40) + 20,
        y: Math.random() * (aquariumBounds.height - 40) + 20
      },
      behaviorState: 'idle',
      behaviorTimer: 0,
      // Initialize facing direction based on the initial velocity
      facingLeft: velocityX < 0,
      lastDirectionChangeTime: Date.now(),
      stuckTimer: 0
    };
  }
  
  // Generate movement parameters based on fish properties
  function generateMovementParams(fish: FishType): MovementParams {
    // Use fish properties to influence movement parameters
    // Higher rarity could mean more complex or interesting movement patterns
    const isExotic = fish.rarity.toLowerCase().includes('exotic') || 
                     fish.rarity.toLowerCase().includes('legendary');
    
    return {
      // Base speed inversely related to generation (older fish are slower)
      // Increased speeds overall for better visibility
      speed: Math.max(20, 40 - fish.generation * 2),
      
      // Turn rate - how quickly the fish can change direction
      turnRate: isExotic ? 3.0 : 2.0, // Increased for faster responsiveness
      
      // Darting behavior - sudden bursts of speed
      darting: {
        probability: isExotic ? 0.02 : 0.01, // Increased probability
        speedMultiplier: isExotic ? 5 : 4,   // Increased speed boost
        duration: 0.8 + Math.random() * 0.5  // Longer darting duration
      },
      
      // Hovering behavior - staying in one place with small movements
      hovering: {
        probability: isExotic ? 0.008 : 0.01, // Reduced slightly to favor movement
        duration: 1.5 + Math.random() * 2,    // Shorter hover time
        intensity: isExotic ? 0.7 : 1.2       // Increased movement while hovering
      },
      
      // Padding from boundaries - prevents fish from getting too close to edges
      boundaryPadding: 30 // Increased to keep fish further from edges
    };
  }
  
  // Get a safe target position within the aquarium bounds
  function getSafeTargetPosition(params: MovementParams): { x: number; y: number } {
    const padding = params.boundaryPadding;
    return {
      x: Math.random() * (aquariumBounds.width - 2 * padding) + padding,
      y: Math.random() * (aquariumBounds.height - 2 * padding) + padding
    };
  }
  
  // Update all fish states for a new frame
  function updateFishStates(
    prevStates: FishMovementState[],
    deltaTime: number,
    currentTime: number
  ): FishMovementState[] {
    // First get all updated states
    const newStates = prevStates.map(fishState => {
      const params = fishParamsRef.current.get(fishState.id);
      if (!params) return fishState; // Skip if no params found
      
      // Clone the state to avoid mutations
      const newState = { ...fishState };
      
      // Check if fish is stuck (not moving much)
      const velocityMagnitude = Math.sqrt(
        newState.velocity.x * newState.velocity.x + 
        newState.velocity.y * newState.velocity.y
      );
      
      if (velocityMagnitude < 5) {
        newState.stuckTimer += deltaTime;
        
        // If stuck for too long, give it a new target and velocity boost
        if (newState.stuckTimer > 2) { // 2 seconds of being stuck
          newState.stuckTimer = 0;
          newState.targetPosition = getSafeTargetPosition(params);
          
          // Give a strong push in a random direction
          const angle = Math.random() * Math.PI * 2;
          newState.velocity = {
            x: Math.cos(angle) * params.speed * 2,
            y: Math.sin(angle) * params.speed * 2
          };
          
          // Update facing based on new velocity
          newState.facingLeft = newState.velocity.x < 0;
          newState.lastDirectionChangeTime = currentTime;
                    
        }
      } else {
        // Reset stuck timer if moving
        newState.stuckTimer = 0;
      }
      
      // Update behavior state
      newState.behaviorTimer -= deltaTime;
      
      // Check if behavior state should change
      if (newState.behaviorTimer <= 0) {
        // Reset timer and potentially change behavior
        if (newState.behaviorState !== 'idle') {
          // Return to idle if in a special state
          newState.behaviorState = 'idle';
          newState.behaviorTimer = 1 + Math.random() * 3; // Idle for 1-4 seconds
        } else {
          // Possibly transition to a special state
          const dartRoll = Math.random();
          const hoverRoll = Math.random();
          
          if (dartRoll < params.darting.probability) {
            newState.behaviorState = 'darting';
            newState.behaviorTimer = params.darting.duration;
            
            // Set a new target when darting
            newState.targetPosition = getSafeTargetPosition(params);
          } else if (hoverRoll < params.hovering.probability) {
            newState.behaviorState = 'hovering';
            newState.behaviorTimer = params.hovering.duration;
          } else {
            // Stay in idle
            newState.behaviorTimer = 1 + Math.random() * 3;
            
            // Occasionally set a new target while idle
            if (Math.random() < 0.2) {
              newState.targetPosition = getSafeTargetPosition(params);
            }
          }
        }
      }
      
      // Calculate desired velocity based on behavior state
      let desiredVelocity = calculateDesiredVelocity(newState, params);
      
      // Only update facing direction if the X velocity is significant and some time has passed
      // This avoids rapid flipping or "jittering" of the fish orientation
      const velocityMagnitudeX = Math.abs(desiredVelocity.x);
      const timeSinceLastDirectionChange = currentTime - newState.lastDirectionChangeTime;
      
      if (velocityMagnitudeX > 8 && timeSinceLastDirectionChange > 500) {
        // Fix: Fish should face in the direction they're moving
        // If velocity is negative (moving left), face left. If positive (moving right), face right.
        const newFacingLeft = desiredVelocity.x < 0;
        
        // Only update if direction actually changed
        if (newFacingLeft !== newState.facingLeft) {
          newState.facingLeft = newFacingLeft;
          newState.lastDirectionChangeTime = currentTime;
        }
      }
      
      // Update velocity with easing for smooth transitions
      // More aggressive smoothing to avoid erratic movements
      newState.velocity = {
        x: newState.velocity.x + (desiredVelocity.x - newState.velocity.x) * params.turnRate * deltaTime,
        y: newState.velocity.y + (desiredVelocity.y - newState.velocity.y) * params.turnRate * deltaTime
      };
      
      // Update position based on velocity
      newState.position = {
        x: newState.position.x + newState.velocity.x * deltaTime,
        y: newState.position.y + newState.velocity.y * deltaTime
      };
      
      // Apply boundary constraints
      applyBoundaryConstraints(newState, params);
      
      return newState;
    });
    
    // Apply collision avoidance
    return applyCollisionAvoidance(newStates, collisionRadius);
  }
  
  // Apply collision avoidance - prevent fish from overlapping
  function applyCollisionAvoidance(states: FishMovementState[], radius: number): FishMovementState[] {
    // We'll just make slight position adjustments to avoid fish clustering too much
    return states.map((fish, index) => {
      // Skip collision check on hovering or darting fish
      if (fish.behaviorState !== 'idle') return fish;
      
      const newFish = { ...fish };
      let totalPush = { x: 0, y: 0 };
      let pushCount = 0;
      
      // Check against all other fish
      for (let j = 0; j < states.length; j++) {
        if (index === j) continue;
        
        const otherFish = states[j];
        
        // Calculate distance between fish
        const dx = newFish.position.x - otherFish.position.x;
        const dy = newFish.position.y - otherFish.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // If they're too close, calculate a push vector
        if (distance < radius) {
          // Direction to push (away from other fish)
          const pushFactor = (radius - distance) / radius;
          totalPush.x += dx * pushFactor * 0.5;
          totalPush.y += dy * pushFactor * 0.5;
          pushCount++;
        }
      }
      
      // Apply the average push if there were any collisions
      if (pushCount > 0) {
        newFish.position.x += totalPush.x / pushCount;
        newFish.position.y += totalPush.y / pushCount;
        
        // Ensure the fish stays within bounds after collision avoidance
        const params = fishParamsRef.current.get(newFish.id);
        if (params) {
          applyBoundaryConstraints(newFish, params);
        }
      }
      
      return newFish;
    });
  }
  
  // Calculate desired velocity based on current state and behavior
  function calculateDesiredVelocity(
    state: FishMovementState,
    params: MovementParams
  ) {
    // Direction to target
    const dx = state.targetPosition.x - state.position.x;
    const dy = state.targetPosition.y - state.position.y;
    
    // Distance to target
    const distToTarget = Math.sqrt(dx * dx + dy * dy);
    
    // Base speed depends on behavior state
    let speed = params.speed;
    
    // Apply behavior-specific modifications
    switch (state.behaviorState) {
      case 'darting':
        speed *= params.darting.speedMultiplier;
        break;
        
      case 'hovering':
        // When hovering, move very little and make random small adjustments
        return {
          x: (Math.random() - 0.5) * params.hovering.intensity * 15, // Increased
          y: (Math.random() - 0.5) * params.hovering.intensity * 15  // Increased
        };
        
      case 'idle':
      default:
        // If very close to target, slow down
        if (distToTarget < 20) {
          speed *= distToTarget / 20;
        }
        break;
    }
    
    // Normalize direction and apply speed
    if (distToTarget > 0) {
      return {
        x: (dx / distToTarget) * speed,
        y: (dy / distToTarget) * speed
      };
    } else {
      // If at target, move in a random direction
      const angle = Math.random() * Math.PI * 2;
      return {
        x: Math.cos(angle) * speed * 0.3, // Increased
        y: Math.sin(angle) * speed * 0.3  // Increased
      };
    }
  }
  
  // Apply constraints to keep fish within boundaries
  function applyBoundaryConstraints(state: FishMovementState, params: MovementParams) {
    const padding = params.boundaryPadding;
    
    // Check horizontal boundaries
    if (state.position.x < padding) {
      state.position.x = padding;
      state.velocity.x = Math.abs(state.velocity.x) * 0.8; // Stronger bounce
      // Fix: When bouncing off left wall, should face right (not left)
      state.facingLeft = false;
    } else if (state.position.x > aquariumBounds.width - padding) {
      state.position.x = aquariumBounds.width - padding;
      state.velocity.x = -Math.abs(state.velocity.x) * 0.8; // Stronger bounce
      // Fix: When bouncing off right wall, should face left (not right)
      state.facingLeft = true;
    }
    
    // Check vertical boundaries
    if (state.position.y < padding) {
      state.position.y = padding;
      state.velocity.y = Math.abs(state.velocity.y) * 0.8; // Stronger bounce
    } else if (state.position.y > aquariumBounds.height - padding) {
      state.position.y = aquariumBounds.height - padding;
      state.velocity.y = -Math.abs(state.velocity.y) * 0.8; // Stronger bounce
    }
  }
  
  // Return fish states with transformed positions as percentages for rendering
  return fishStates.map(state => ({
    id: state.id,
    position: {
      x: (state.position.x / aquariumBounds.width) * 100,
      y: (state.position.y / aquariumBounds.height) * 100
    },
    facingLeft: state.facingLeft,
    behaviorState: state.behaviorState
  }));
} 