"use client";

import { useEffect, useState } from 'react';

interface Trail {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export default function SpookyCursorTrail() {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [enabled, setEnabled] = useState(true);
  const trailEmojis = ['💀', '👻', '🎃', '🦇', '🕷️', '⚰️', '🔮'];

  useEffect(() => {
    if (!enabled) return;

    let trailId = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const newTrail: Trail = {
        id: trailId++,
        x: e.clientX,
        y: e.clientY,
        emoji: trailEmojis[Math.floor(Math.random() * trailEmojis.length)],
      };

      setTrails(prev => [...prev, newTrail]);

      // Remove trail after animation
      setTimeout(() => {
        setTrails(prev => prev.filter(t => t.id !== newTrail.id));
      }, 1000);
    };

    // Throttle mouse move events
    let lastMove = 0;
    const throttledMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMove > 100) { // Only create trail every 100ms
        handleMouseMove(e);
        lastMove = now;
      }
    };

    window.addEventListener('mousemove', throttledMove);
    return () => window.removeEventListener('mousemove', throttledMove);
  }, [enabled]);

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setEnabled(!enabled)}
        className="fixed top-24 right-16 z-[9999] p-2 bg-gray-800/80 hover:bg-gray-700/90 rounded-full text-2xl transition-all duration-300 border border-gray-600"
        title="Toggle cursor trail"
      >
        ✨
      </button>

      {/* Cursor trails */}
      <div className="fixed inset-0 pointer-events-none z-[9997]">
        {trails.map(trail => (
          <div
            key={trail.id}
            className="absolute animate-ping"
            style={{
              left: `${trail.x}px`,
              top: `${trail.y}px`,
              fontSize: '24px',
              transform: 'translate(-50%, -50%)',
              animation: 'fadeOut 1s ease-out forwards',
            }}
          >
            {trail.emoji}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeOut {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.5);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.5);
          }
        }
      `}</style>
    </>
  );
}
