import { motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

interface ConstellationPoint {
  x: number;
  y: number;
  name?: string;
}

interface Constellation {
  id: number;
  name: string;
  points: ConstellationPoint[];
  connections: [number, number][];
  region: { x: number; y: number; width: number; height: number };
}

interface AnimationState {
  phase: 'drawing' | 'waiting' | 'undrawing' | 'repositioning';
  cycle: number;
}

export default function AnimatedBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [constellations, setConstellations] = useState<Constellation[]>([]);
  const [animationState, setAnimationState] = useState<AnimationState>({ phase: 'drawing', cycle: 0 });

  // Base constellation templates
  const constellationTemplates = [
    {
      name: "Ursa Major (Big Dipper)",
      points: [
        { x: 0, y: 5 }, { x: 5, y: 3 }, { x: 10, y: 7 }, { x: 15, y: 10 },
        { x: 17, y: 15 }, { x: 13, y: 17 }, { x: 10, y: 20 }
      ],
      connections: [[0,1], [1,2], [2,3], [3,4], [4,5], [5,6]],
      size: { width: 20, height: 18 }
    },
    {
      name: "Orion",
      points: [
        { x: 5, y: 5 }, { x: 15, y: 10 }, { x: 8, y: 15 }, { x: 10, y: 17 },
        { x: 12, y: 19 }, { x: 7, y: 23 }, { x: 17, y: 25 }
      ],
      connections: [[0,1], [2,3], [3,4], [0,2], [1,6], [5,6]],
      size: { width: 18, height: 22 }
    },
    {
      name: "Cassiopeia",
      points: [
        { x: 5, y: 5 }, { x: 10, y: 2 }, { x: 15, y: 8 }, { x: 20, y: 5 }, { x: 23, y: 10 }
      ],
      connections: [[0,1], [1,2], [2,3], [3,4]],
      size: { width: 20, height: 10 }
    },
    {
      name: "Leo",
      points: [
        { x: 5, y: 5 }, { x: 10, y: 3 }, { x: 15, y: 7 }, { x: 17, y: 13 },
        { x: 13, y: 15 }, { x: 7, y: 10 }
      ],
      connections: [[0,1], [1,2], [0,5], [3,4], [4,5]],
      size: { width: 15, height: 14 }
    }
  ];

  // Check if two rectangles overlap
  const rectanglesOverlap = (rect1: any, rect2: any, buffer = 8) => {
    return !(
      rect1.x + rect1.width + buffer < rect2.x ||
      rect2.x + rect2.width + buffer < rect1.x ||
      rect1.y + rect1.height + buffer < rect2.y ||
      rect2.y + rect2.height + buffer < rect1.y
    );
  };

  // Generate non-overlapping positions using grid-based approach
  const generateNonOverlappingPositions = useCallback(() => {
    const positions: Array<{ x: number; y: number; width: number; height: number }> = [];
    const margin = 15; // Margin from screen edges
    const maxAttempts = 50;

    // Create a grid of possible positions
    const gridSize = 25;
    const gridPositions: Array<{ x: number; y: number }> = [];
    
    for (let x = margin; x <= 100 - margin - gridSize; x += gridSize) {
      for (let y = margin; y <= 100 - margin - gridSize; y += gridSize) {
        gridPositions.push({ x, y });
      }
    }

    // Shuffle grid positions for randomness
    const shuffledPositions = gridPositions.sort(() => Math.random() - 0.5);

    constellationTemplates.forEach((template) => {
      let placed = false;
      let attempts = 0;

      for (const gridPos of shuffledPositions) {
        if (attempts >= maxAttempts) break;
        attempts++;

        const newRegion = {
          x: gridPos.x,
          y: gridPos.y,
          width: template.size.width,
          height: template.size.height
        };

        // Check if this position overlaps with any existing constellation
        const overlaps = positions.some(existingRegion => 
          rectanglesOverlap(newRegion, existingRegion)
        );

        if (!overlaps) {
          positions.push(newRegion);
          placed = true;
          break;
        }
      }

      // Fallback: if we can't place without overlap, place in a corner
      if (!placed) {
        const fallbackPositions = [
          { x: margin, y: margin },
          { x: 100 - margin - template.size.width, y: margin },
          { x: margin, y: 100 - margin - template.size.height },
          { x: 100 - margin - template.size.width, y: 100 - margin - template.size.height }
        ];

        for (const fallback of fallbackPositions) {
          const newRegion = {
            x: fallback.x,
            y: fallback.y,
            width: template.size.width,
            height: template.size.height
          };

          const overlaps = positions.some(existingRegion => 
            rectanglesOverlap(newRegion, existingRegion)
          );

          if (!overlaps) {
            positions.push(newRegion);
            break;
          }
        }
      }
    });

    return positions;
  }, []);

  const createConstellations = useCallback(() => {
    const positions = generateNonOverlappingPositions();
    
    return constellationTemplates.map((template, index) => {
      const position = positions[index] || { x: 20 + index * 30, y: 20, width: template.size.width, height: template.size.height };
      
      return {
        id: index + 1,
        name: template.name,
        points: template.points.map(point => ({
          x: position.x + point.x,
          y: position.y + point.y
        })),
        connections: template.connections,
        region: position
      };
    });
  }, [generateNonOverlappingPositions]);

  useEffect(() => {
    const initialConstellations = createConstellations();
    setConstellations(initialConstellations);

    // Generate background stars with exclusion zones around constellations
    const generateStars = () => {
      const newStars: Star[] = [];
      const exclusionZones = initialConstellations.map(c => c.region);
      
      for (let i = 0; i < 100; i++) {
        let x, y;
        let attempts = 0;
        
        // Try to place star outside constellation regions
        do {
          x = Math.random() * 100;
          y = Math.random() * 100;
          attempts++;
        } while (
          attempts < 30 && 
          exclusionZones.some(zone => 
            x >= zone.x - 5 && x <= zone.x + zone.width + 5 &&
            y >= zone.y - 5 && y <= zone.y + zone.height + 5
          )
        );
        
        newStars.push({
          id: i,
          x,
          y,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.6 + 0.2,
          duration: Math.random() * 4 + 3,
          delay: Math.random() * 3,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, [createConstellations]);

  // Animation cycle management
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const runAnimationCycle = () => {
      switch (animationState.phase) {
        case 'drawing':
          // Wait for drawing to complete (3 seconds) then wait
          timeout = setTimeout(() => {
            setAnimationState(prev => ({ ...prev, phase: 'waiting' }));
          }, 3000);
          break;
          
        case 'waiting':
          // Wait 5 seconds then start undrawing
          timeout = setTimeout(() => {
            setAnimationState(prev => ({ ...prev, phase: 'undrawing' }));
          }, 5000);
          break;
          
        case 'undrawing':
          // Wait for undrawing to complete (2 seconds) then reposition
          timeout = setTimeout(() => {
            setAnimationState(prev => ({ ...prev, phase: 'repositioning' }));
          }, 2000);
          break;
          
        case 'repositioning':
          // Generate new positions and start drawing again
          const newConstellations = createConstellations();
          setConstellations(newConstellations);
          setAnimationState(prev => ({ 
            phase: 'drawing', 
            cycle: prev.cycle + 1 
          }));
          break;
      }
    };

    runAnimationCycle();

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [animationState.phase, createConstellations]);

  const getLineAnimation = (connectionIdx: number, constellationId: number) => {
    const baseDelay = connectionIdx * 0.3 + (constellationId - 1) * 0.5;
    
    switch (animationState.phase) {
      case 'drawing':
        return {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 0.8 },
          transition: { 
            pathLength: { duration: 0.8, delay: baseDelay },
            opacity: { duration: 0.5, delay: baseDelay + 0.3 }
          }
        };
        
      case 'waiting':
        return {
          initial: { pathLength: 1, opacity: 0.8 },
          animate: { 
            pathLength: 1, 
            opacity: [0.8, 0.5, 0.8, 0.6, 0.8] 
          },
          transition: { 
            opacity: { 
              duration: 3, 
              repeat: Infinity, 
              repeatType: 'loop' as const
            }
          }
        };
        
      case 'undrawing':
        return {
          initial: { pathLength: 1, opacity: 0.8 },
          animate: { pathLength: 0, opacity: 0 },
          transition: { 
            pathLength: { duration: 0.6, delay: baseDelay * 0.3 },
            opacity: { duration: 0.4, delay: baseDelay * 0.3 }
          }
        };
        
      default:
        return {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 0, opacity: 0 },
          transition: { duration: 0 }
        };
    }
  };

  const getStarAnimation = (index: number, constellationId: number) => {
    const baseDelay = index * 0.15 + (constellationId - 1) * 0.2;
    
    switch (animationState.phase) {
      case 'drawing':
        return {
          initial: { opacity: 0, scale: 0 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.6, delay: baseDelay }
        };
        
      case 'waiting':
        return {
          initial: { opacity: 1, scale: 1 },
          animate: {
            opacity: [1, 0.7, 1, 0.8, 1],
            scale: [1, 1.1, 1, 1.2, 0.95],
          },
          transition: {
            duration: 4,
            repeat: Infinity,
            repeatType: 'loop' as const,
          }
        };
        
      case 'undrawing':
        return {
          initial: { opacity: 1, scale: 1 },
          animate: { opacity: 0, scale: 0 },
          transition: { duration: 0.5, delay: baseDelay * 0.3 }
        };
        
      default:
        return {
          initial: { opacity: 0, scale: 0 },
          animate: { opacity: 0, scale: 0 },
          transition: { duration: 0 }
        };
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Constellation lines */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="constellationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.4" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {constellations.map((constellation) => (
          <g key={`${constellation.id}-${animationState.cycle}`}>
            {constellation.connections.map(([startIdx, endIdx], connectionIdx) => {
              const startPoint = constellation.points[startIdx];
              const endPoint = constellation.points[endIdx];
              const animation = getLineAnimation(connectionIdx, constellation.id);
              
              return (
                <motion.line
                  key={`${constellation.id}-${connectionIdx}-${animationState.cycle}`}
                  x1={`${startPoint.x}%`}
                  y1={`${startPoint.y}%`}
                  x2={`${endPoint.x}%`}
                  y2={`${endPoint.y}%`}
                  stroke="url(#constellationGradient)"
                  strokeWidth="1.2"
                  filter="url(#glow)"
                  {...animation}
                />
              );
            })}
          </g>
        ))}
      </svg>

      {/* Constellation stars */}
      {constellations.map((constellation) =>
        constellation.points.map((point, index) => {
          const animation = getStarAnimation(index, constellation.id);
          
          return (
            <motion.div
              key={`constellation-${constellation.id}-${index}-${animationState.cycle}`}
              className="absolute rounded-full"
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
                width: '5px',
                height: '5px',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(96, 165, 250, 0.9) 40%, rgba(167, 139, 250, 0.7) 100%)',
                boxShadow: '0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(96, 165, 250, 0.5)',
              }}
              {...animation}
            />
          );
        })
      )}

      {/* Background stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: `radial-gradient(circle, rgba(255, 255, 255, ${star.opacity}) 0%, rgba(148, 163, 184, ${star.opacity * 0.7}) 100%)`,
            boxShadow: `0 0 ${star.size * 3}px rgba(255, 255, 255, ${star.opacity * 0.4})`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, star.opacity, star.opacity * 0.6, star.opacity, 0],
            scale: [0, 1, 1.1, 1, 0],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            repeatType: 'loop',
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Shooting stars */}
      {Array.from({ length: 2 }).map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 40}%`,
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.9), 0 0 16px rgba(96, 165, 250, 0.7)',
          }}
          initial={{ 
            x: -150, 
            y: 0, 
            opacity: 0,
            scale: 0 
          }}
          animate={{
            x: [0, 300, 500],
            y: [0, 150, 250],
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 12 + Math.random() * 8,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Floating particles */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-0.5 h-0.5 bg-blue-200/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: Math.random() * 6 + 6,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}