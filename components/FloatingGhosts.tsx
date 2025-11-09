"use client";

import { useEffect, useState } from 'react';

interface Ghost {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
  emoji: string;
}

export default function FloatingGhosts() {
  const [ghosts, setGhosts] = useState<Ghost[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  const ghostEmojis = ['👻', '🎃', '💀', '🦇', '🕷️', '🕸️'];

  useEffect(() => {
    // Create initial ghosts
    const initialGhosts: Ghost[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speed: 0.3 + Math.random() * 0.7,
      size: 30 + Math.random() * 30,
      emoji: ghostEmojis[Math.floor(Math.random() * ghostEmojis.length)],
    }));
    setGhosts(initialGhosts);

    // Animate ghosts
    const interval = setInterval(() => {
      setGhosts(prev =>
        prev.map(ghost => ({
          ...ghost,
          y: ghost.y - ghost.speed,
          // Reset to bottom if it goes off screen
          ...(ghost.y < -100 && {
            y: window.innerHeight + 100,
            x: Math.random() * window.innerWidth,
          }),
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed top-24 right-4 z-[9999] p-2 bg-gray-800/80 hover:bg-gray-700/90 rounded-full text-2xl transition-all duration-300 border border-gray-600"
        title="Toggle floating spirits"
      >
        👻
      </button>

      {/* Floating ghosts */}
      <div className="fixed inset-0 pointer-events-none z-[100]">
        {ghosts.map(ghost => (
          <div
            key={ghost.id}
            className="absolute transition-opacity duration-1000 animate-pulse"
            style={{
              left: `${ghost.x}px`,
              top: `${ghost.y}px`,
              fontSize: `${ghost.size}px`,
              opacity: 0.3 + Math.random() * 0.4,
            }}
          >
            {ghost.emoji}
          </div>
        ))}
      </div>
    </>
  );
}
