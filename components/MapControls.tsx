'use client';

import { useState, useEffect } from 'react';

interface MapControlsProps {
  onFilterChange: (filter: string) => void;
  currentFilter: string;
  onSpookyModeToggle: () => void;
  spookyMode: boolean;
}

export default function MapControls({ 
  onFilterChange, 
  currentFilter, 
  onSpookyModeToggle, 
  spookyMode 
}: MapControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filters = [
    { key: 'all', label: 'All Spots', icon: '🍭' },
    { key: 'premium', label: 'Premium', icon: '⭐' },
    { key: 'mansion', label: 'Mansions', icon: '🏚️' },
    { key: 'historic', label: 'Historic', icon: '🏛️' },
    { key: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' }
  ];

  return (
    <div className={`absolute z-[1002] ${
      isMobile 
        ? 'bottom-20 right-4 left-4' 
        : 'top-4 right-4 w-72'
    }`}>
      <div className="bg-gray-900/95 backdrop-blur-md border border-gray-600 rounded-lg overflow-hidden">
        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-3 flex items-center justify-between text-white hover:bg-gray-800 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">🎛️</span>
            <span className="font-medium">Controls</span>
          </div>
          <svg 
            className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="border-t border-gray-600">
            {/* Spooky Mode Toggle */}
            <div className="p-3 border-b border-gray-600">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={spookyMode}
                    onChange={onSpookyModeToggle}
                    className="sr-only"
                  />
                  <div className={`w-12 h-6 rounded-full transition-colors ${
                    spookyMode ? 'bg-purple-600' : 'bg-gray-600'
                  }`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                      spookyMode ? 'translate-x-6' : 'translate-x-0.5'
                    } mt-0.5`}></div>
                  </div>
                </div>
                <div>
                  <div className="text-white font-medium flex items-center gap-2">
                    <span>👻</span>
                    <span>Spooky Mode</span>
                  </div>
                  <div className="text-gray-400 text-xs">Enhanced spooky effects</div>
                </div>
              </label>
            </div>

            {/* Filters */}
            <div className="p-3">
              <h4 className="text-white font-medium mb-2 text-sm">Filter Spots</h4>
              <div className={`grid gap-2 ${isMobile ? 'grid-cols-2' : 'space-y-1'}`}>
                {filters.map(filter => (
                  <button
                    key={filter.key}
                    onClick={() => onFilterChange(filter.key)}
                    className={`px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2 justify-center ${
                      currentFilter === filter.key
                        ? 'bg-pink-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <span>{filter.icon}</span>
                    <span>{filter.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            {/* <div className="p-3 border-t border-gray-600">
              <h4 className="text-white font-medium mb-2 text-sm">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                <button className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-gray-300 transition-colors">
                  📍 My Location
                </button>
                <button className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-gray-300 transition-colors">
                  🎯 Best Route
                </button>
                <button className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-gray-300 transition-colors">
                  ⏰ Peak Times
                </button>
                <button className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-gray-300 transition-colors">
                  👥 Crowd Map
                </button>
              </div>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}