"use client";

import { useState, useEffect } from "react";
import NewInteractiveMapWrapper from "@/components/NewInteractiveMapWrapper";
import CountdownTimer from "@/components/CountdownTimer";
import { useTheme } from "next-themes";

const STORAGE_KEY = "trick-or-treat-map-collected";

export default function MapPage() {
  const { theme } = useTheme();
  const [collectedCandies, setCollectedCandies] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add map-page class to body to prevent scrolling
    document.body.classList.add('map-page');
    
    setMounted(true);
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      setCollectedCandies(JSON.parse(savedData));
    }

    // Check mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      // Clean up: remove map-page class when leaving the page
      document.body.classList.remove('map-page');
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleCollectCandy = (candyId: number) => {
    if (collectedCandies.includes(candyId)) return;
    const newCollectedCandies = [...collectedCandies, candyId];
    setCollectedCandies(newCollectedCandies);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newCollectedCandies));
  };

  if (!mounted) {
    return (
      <div className="w-full h-screen flex items-center justify-center" style={{ backgroundColor: '#26282c' }}>
        <div className="text-center">
          <div className="text-4xl mb-4">🗺️</div>
          <div className="text-white text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <main className="relative h-[calc(100vh-4rem)] overflow-hidden"
          style={{ backgroundColor: '#26282c' }}>
      
      {/* Header - Floating and Responsive */}
      {/* <div className={`absolute top-4 right-4 z-[1002] bg-gray-900/90 backdrop-blur-md border border-gray-600 rounded-lg ${
        isMobile ? 'p-3' : 'p-4'
      }`}>
        <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-4'}`}>
          <div className="text-center">
            <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-400`}>Collected Spots</div>
            <div className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold`} style={{ color: '#f64295' }}>
              {collectedCandies.length}
            </div>
          </div>
          <div className="border-l border-gray-600 pl-2 md:pl-4">
            <div className={isMobile ? 'scale-75 origin-left' : ''}>
              <CountdownTimer />
            </div>
          </div>
        </div>
      </div> */}

      {/* Map */}
      <div className="w-full h-full">
        <NewInteractiveMapWrapper
          collectedCandies={collectedCandies}
          onCollectCandy={handleCollectCandy}
          theme={theme}
        />
      </div>
    </main>
  );
}