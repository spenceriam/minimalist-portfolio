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

interface Constellation {
  id: number;
  points: { x: number; y: number }[];
}

export default function AnimatedBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [constellations, setConstellations] = useState<Constellation[]>([]);

  useEffect(() => {
    // Generate visible stars
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1, // 1-4px stars
          opacity: Math.random() * 0.8 + 0.3, // 0.3-1.1 opacity
          duration: Math.random() * 3 + 2, // 2-5s duration
          delay: Math.random() * 2,
        });
      }
      setStars(newStars);
    };

    // Generate constellation patterns
    const generateConstellations = () => {
      const newConstellations: Constellation[] = [];
      for (let i = 0; i < 8; i++) {
        const points: { x: number; y: number }[] = [];
        const centerX = Math.random() * 80 + 10;
        const centerY = Math.random() * 80 + 10;
        
        // Create constellation with 3-6 connected points
        const numPoints = Math.floor(Math.random() * 4) + 3;
        for (let j = 0; j < numPoints; j++) {
          points.push({
            x: centerX + (Math.random() - 0.5) * 30,
            y: centerY + (Math.random() - 0.5) * 30,
          });
        }
        
        newConstellations.push({ id: i, points });
      }
      setConstellations(newConstellations);
    };

    generateStars();
    generateConstellations();
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Constellation lines */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="constellationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.3" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {constellations.map((constellation) => (
          <g key={constellation.id}>
            {constellation.points.map((point, index) => {
              const nextPoint = constellation.points[index + 1];
              if (!nextPoint) return null;
              
              return (
                <motion.line
                  key={`${constellation.id}-${index}`}
                  x1={`${point.x}%`}
                  y1={`${point.y}%`}
                  x2={`${nextPoint.x}%`}
                  y2={`${nextPoint.y}%`}
                  stroke="url(#constellationGradient)"
                  strokeWidth="1.5"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: [0, 0.8, 0.4, 0.8, 0.6] 
                  }}
                  transition={{ 
                    pathLength: { duration: 3, delay: index * 0.5 },
                    opacity: { 
                      duration: 4, 
                      repeat: Infinity, 
                      repeatType: 'reverse',
                      delay: index * 0.3 
                    }
                  }}
                />
              );
            })}
          </g>
        ))}
      </svg>

      {/* Major stars (constellation points) */}
      {constellations.map((constellation) =>
        constellation.points.map((point, index) => (
          <motion.div
            key={`major-${constellation.id}-${index}`}
            className="absolute rounded-full"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              width: '4px',
              height: '4px',
              background: 'radial-gradient(circle, rgba(96, 165, 250, 1) 0%, rgba(167, 139, 250, 0.8) 50%, rgba(34, 211, 238, 0.6) 100%)',
              boxShadow: '0 0 12px rgba(96, 165, 250, 0.8), 0 0 24px rgba(96, 165, 250, 0.4)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.6, 1, 0.8, 1, 0.7],
              scale: [0.8, 1.2, 1, 1.1, 0.9],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: index * 0.2,
            }}
          />
        ))
      )}

      {/* Regular animated stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: `radial-gradient(circle, rgba(255, 255, 255, ${star.opacity}) 0%, rgba(96, 165, 250, ${star.opacity * 0.8}) 50%, rgba(167, 139, 250, ${star.opacity * 0.6}) 100%)`,
            boxShadow: `0 0 ${star.size * 4}px rgba(255, 255, 255, ${star.opacity * 0.5})`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, star.opacity, star.opacity * 0.7, star.opacity, 0],
            scale: [0, 1, 1.2, 1, 0],
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
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 50}%`,
            boxShadow: '0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(96, 165, 250, 0.6)',
          }}
          initial={{ 
            x: -100, 
            y: 0, 
            opacity: 0,
            scale: 0 
          }}
          animate={{
            x: [0, 200, 400],
            y: [0, 100, 200],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 8 + Math.random() * 5,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Floating particles */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-blue-300/60 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: Math.random() * 4 + 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}