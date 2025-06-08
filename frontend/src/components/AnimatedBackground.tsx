import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

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

export default function AnimatedBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [constellations, setConstellations] = useState<Constellation[]>([]);

  useEffect(() => {
    // Define actual constellation patterns with proper spacing
    const realConstellations: Constellation[] = [
      {
        id: 1,
        name: "Ursa Major (Big Dipper)",
        region: { x: 10, y: 15, width: 25, height: 20 },
        points: [
          { x: 15, y: 20 }, // Dubhe
          { x: 20, y: 18 }, // Merak
          { x: 25, y: 22 }, // Phecda
          { x: 30, y: 25 }, // Megrez
          { x: 32, y: 30 }, // Alioth
          { x: 28, y: 32 }, // Mizar
          { x: 25, y: 35 }  // Alkaid
        ],
        connections: [[0,1], [1,2], [2,3], [3,4], [4,5], [5,6]]
      },
      {
        id: 2,
        name: "Orion",
        region: { x: 60, y: 25, width: 20, height: 30 },
        points: [
          { x: 65, y: 30 }, // Betelgeuse
          { x: 75, y: 35 }, // Bellatrix
          { x: 68, y: 40 }, // Alnitak
          { x: 70, y: 42 }, // Alnilam
          { x: 72, y: 44 }, // Mintaka
          { x: 67, y: 48 }, // Saiph
          { x: 77, y: 50 }  // Rigel
        ],
        connections: [[0,1], [2,3], [3,4], [0,2], [1,6], [5,6]]
      },
      {
        id: 3,
        name: "Cassiopeia",
        region: { x: 15, y: 60, width: 25, height: 15 },
        points: [
          { x: 20, y: 65 }, // Schedar
          { x: 25, y: 62 }, // Caph
          { x: 30, y: 68 }, // Gamma Cas
          { x: 35, y: 65 }, // Ruchbah
          { x: 38, y: 70 }  // Segin
        ],
        connections: [[0,1], [1,2], [2,3], [3,4]]
      },
      {
        id: 4,
        name: "Leo",
        region: { x: 65, y: 65, width: 20, height: 18 },
        points: [
          { x: 70, y: 70 }, // Regulus
          { x: 75, y: 68 }, // Algieba
          { x: 80, y: 72 }, // Adhafera
          { x: 82, y: 78 }, // Zosma
          { x: 78, y: 80 }, // Chertan
          { x: 72, y: 75 }  // Denebola
        ],
        connections: [[0,1], [1,2], [0,5], [3,4], [4,5]]
      }
    ];

    // Generate background stars with exclusion zones around constellations
    const generateStars = () => {
      const newStars: Star[] = [];
      const exclusionZones = realConstellations.map(c => c.region);
      
      for (let i = 0; i < 120; i++) {
        let x, y;
        let attempts = 0;
        
        // Try to place star outside constellation regions
        do {
          x = Math.random() * 100;
          y = Math.random() * 100;
          attempts++;
        } while (
          attempts < 20 && 
          exclusionZones.some(zone => 
            x >= zone.x && x <= zone.x + zone.width &&
            y >= zone.y && y <= zone.y + zone.height
          )
        );
        
        newStars.push({
          id: i,
          x,
          y,
          size: Math.random() * 2 + 0.5, // Smaller background stars
          opacity: Math.random() * 0.6 + 0.2,
          duration: Math.random() * 4 + 3,
          delay: Math.random() * 3,
        });
      }
      setStars(newStars);
    };

    setConstellations(realConstellations);
    generateStars();
  }, []);

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
          <g key={constellation.id}>
            {constellation.connections.map(([startIdx, endIdx], connectionIdx) => {
              const startPoint = constellation.points[startIdx];
              const endPoint = constellation.points[endIdx];
              
              return (
                <motion.line
                  key={`${constellation.id}-${connectionIdx}`}
                  x1={`${startPoint.x}%`}
                  y1={`${startPoint.y}%`}
                  x2={`${endPoint.x}%`}
                  y2={`${endPoint.y}%`}
                  stroke="url(#constellationGradient)"
                  strokeWidth="1.2"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: [0, 0.8, 0.5, 0.8, 0.6] 
                  }}
                  transition={{ 
                    pathLength: { duration: 2.5, delay: connectionIdx * 0.3 + constellation.id * 0.5 },
                    opacity: { 
                      duration: 5, 
                      repeat: Infinity, 
                      repeatType: 'reverse',
                      delay: connectionIdx * 0.2 + constellation.id * 0.3
                    }
                  }}
                />
              );
            })}
          </g>
        ))}
      </svg>

      {/* Constellation stars */}
      {constellations.map((constellation) =>
        constellation.points.map((point, index) => (
          <motion.div
            key={`constellation-${constellation.id}-${index}`}
            className="absolute rounded-full"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              width: '5px',
              height: '5px',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(96, 165, 250, 0.9) 40%, rgba(167, 139, 250, 0.7) 100%)',
              boxShadow: '0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(96, 165, 250, 0.5)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.7, 1, 0.8, 1, 0.9],
              scale: [0.9, 1.1, 1, 1.2, 0.95],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: index * 0.15 + constellation.id * 0.2,
            }}
          />
        ))
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

      {/* Shooting stars - reduced frequency */}
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

      {/* Floating particles - reduced count */}
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