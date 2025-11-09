"use client";

import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';

export default function CrawlingHand() {
  const [position, setPosition] = useState(-100);
  const [isPaused, setIsPaused] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    // Load the animation
    fetch('/animations/Handchi-spooky.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error('Failed to load hand animation:', err));
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setPosition(prev => {
        // If hand reaches the end, reset to start
        if (prev > window.innerWidth + 100) {
          return -100;
        }
        return prev + 2; // Speed of crawling
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Pause when hovering
  const handleMouseEnter = () => {
    setIsPaused(true);
    if (lottieRef.current) {
      lottieRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    if (lottieRef.current) {
      lottieRef.current.play();
    }
  };

  if (!animationData) return null;

  return (
    <div
      className="fixed bottom-0 z-[9998] pointer-events-auto cursor-pointer transition-transform hover:scale-110"
      style={{
        left: `${position}px`,
        width: '100px',
        height: '100px',
        transform: 'scaleX(-1)', // Flip horizontally to face forward
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title="Spooky crawling hand! 👻"
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
