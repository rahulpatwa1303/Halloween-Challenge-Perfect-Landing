'use client';

import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import locationsData from '@/data/locations.json';
import MapControls from './MapControls';

// Custom hook to update map view
function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

interface CandySpot {
  id: number;
  cityId: number;
  name: string;
  type: string;
  coords: [number, number];
  rating: number;
  candyTypes: string[];
  description: string;
  bestTime: string;
  difficulty: string;
  crowdLevel: string;
  spookyLevel: number;
  tips: string;
}

interface City {
  id: number;
  name: string;
  state: string;
  country: string;
  center: [number, number];
  zoom: number;
  description: string;
  popularAreas: string[];
}

interface MapProps {
  collectedCandies: number[];
  onCollectCandy: (candyId: number) => void;
  theme: string | undefined;
}

// Create custom icons
const createCandyIcon = (type: string, rating: number, spookyMode: boolean = false) => {
  const color = rating >= 4.8 ? '#f64295' : rating >= 4.5 ? '#ff6b35' : '#ffa500';
  const glowEffect = spookyMode ? `box-shadow: 0 0 20px ${color}, 0 0 40px ${color}55;` : 'box-shadow: 0 2px 10px rgba(0,0,0,0.3);';
  
  let emoji = '🍭';
  if (type === 'mansion') emoji = '🏚️';
  else if (type === 'historic') emoji = '⭐';
  else if (spookyMode) emoji = '👻';
  
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        border: 3px solid white;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        ${glowEffect}
        font-size: 16px;
        animation: ${spookyMode ? 'pulse 2s infinite' : 'none'};
      ">
        ${emoji}
      </div>
    `,
    className: 'custom-candy-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

export default function NewInteractiveMap({ collectedCandies, onCollectCandy, theme }: MapProps) {
  const [selectedCity, setSelectedCity] = useState<City>(locationsData.cities[0] as City);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Changed to false by default for mobile
  const [selectedSpot, setSelectedSpot] = useState<CandySpot | null>(null);
  const [mounted, setMounted] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [spookyMode, setSpookyMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDrawerExpanded, setIsDrawerExpanded] = useState(false);
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    
    // Load recent searches from localStorage
    const savedSearches = localStorage.getItem('recent-city-searches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
    
    // Check if it's mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-close sidebar on mobile
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredCities = (locationsData.cities as City[]).filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFilteredSpots = () => {
    let spots = (locationsData.candySpots as CandySpot[]).filter(spot => 
      spot.cityId === selectedCity.id
    );

    switch (currentFilter) {
      case 'premium':
        return spots.filter(spot => spot.rating >= 4.8);
      case 'mansion':
        return spots.filter(spot => spot.type === 'mansion');
      case 'historic':
        return spots.filter(spot => spot.type === 'historic');
      case 'family':
        return spots.filter(spot => spot.difficulty === 'Easy');
      default:
        return spots;
    }
  };

  const currentCandySpots = getFilteredSpots();

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setSearchQuery('');
    setIsSearchOpen(false);
    setSelectedSpot(null);
    setShowSuggestions(false);
    
    // Add to recent searches
    const cityName = `${city.name}, ${city.state}`;
    const newRecentSearches = [cityName, ...recentSearches.filter(s => s !== cityName)].slice(0, 5);
    setRecentSearches(newRecentSearches);
    localStorage.setItem('recent-city-searches', JSON.stringify(newRecentSearches));
  };

  const getPopularCities = () => {
    // Return a subset of cities that are most popular/interesting
    return locationsData.cities.slice(0, 4);
  };

  const handleSearchFocus = () => {
    setIsSearchOpen(true);
    if (!searchQuery) {
      setShowSuggestions(true);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setIsSearchOpen(true);
    setShowSuggestions(!value);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSpookyLevel = (level: number) => {
    return '👻'.repeat(level);
  };

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: '#26282c' }}>
        <div className="text-white text-xl">Loading spooky map...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex">
      {/* Add CSS for spooky animations and zoom control positioning */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        .spooky-map {
          filter: ${spookyMode ? 'sepia(0.2) contrast(1.1) brightness(0.9)' : 'none'};
          transition: filter 0.5s ease;
        }
        
        ${spookyMode ? `
          .leaflet-container {
            background-color: #1a1a2e !important;
          }
        ` : ''}
        
        /* Reposition zoom controls to avoid conflicts */
        .leaflet-control-zoom {
          position: absolute !important;
          top: auto !important;
          bottom: 20px !important;
          right: 20px !important;
          left: auto !important;
          z-index: 999 !important;
        }
        
        @media (max-width: 768px) {
          .leaflet-control-zoom {
            bottom: 250px !important;
            right: 10px !important;
          }
          
          .leaflet-control-zoom a {
            width: 35px !important;
            height: 35px !important;
            line-height: 35px !important;
            font-size: 16px !important;
          }
        }
        
        /* Style the zoom controls to match our theme */
        .leaflet-control-zoom a {
          background-color: rgba(17, 24, 39, 0.9) !important;
          border: 1px solid #374151 !important;
          color: #f3f4f6 !important;
          backdrop-filter: blur(8px);
          transition: all 0.2s ease !important;
        }
        
        .leaflet-control-zoom a:hover {
          background-color: rgba(17, 24, 39, 1) !important;
          border-color: #f64295 !important;
          color: #f64295 !important;
        }
        
        .leaflet-control-zoom a.leaflet-control-zoom-in {
          border-bottom: none !important;
          border-radius: 8px 8px 0 0 !important;
        }
        
        .leaflet-control-zoom a.leaflet-control-zoom-out {
          border-radius: 0 0 8px 8px !important;
        }
      `}</style>

      {/* Mobile Search Bar */}
      {isMobile && (
        <div className="absolute top-4 left-4 right-4 z-[1001] space-y-3">
          {/* Search Input */}
          <div className="bg-gray-900/95 backdrop-blur-md border border-gray-600 rounded-lg">
            <div className="p-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search cities... (e.g., New York, Salem)"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={handleSearchFocus}
                  onBlur={(e) => {
                    // Only hide if not clicking on a related element
                    const relatedTarget = e.relatedTarget as Element;
                    if (!relatedTarget || (!relatedTarget.closest('[data-search-dropdown]') && !relatedTarget.closest('nav'))) {
                      setTimeout(() => {
                        setIsSearchOpen(false);
                        setShowSuggestions(false);
                      }, 200);
                    }
                  }}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': '#f64295' } as any}
                />
                <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Mobile Search Results & Suggestions */}
              {isSearchOpen && (
                <div className="mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-lg max-h-64 overflow-y-auto" data-search-dropdown>
                  {/* Show suggestions when no search query */}
                  {showSuggestions && !searchQuery && (
                    <>
                      {/* Popular Cities */}
                      <div className="px-4 py-2 border-b border-gray-700">
                        <div className="text-gray-400 text-xs font-medium mb-2">🔥 Popular Destinations</div>
                        {getPopularCities().map(city => (
                          <button
                            key={city.id}
                            onClick={() => handleCitySelect(city as any)}
                            className="w-full px-2 py-2 text-left hover:bg-gray-700 transition-colors rounded"
                          >
                            <div className="text-white font-medium text-sm">{city.name}</div>
                            <div className="text-gray-400 text-xs">{city.state}, {city.country}</div>
                          </button>
                        ))}
                      </div>

                      {/* Recent Searches */}
                      {recentSearches.length > 0 && (
                        <div className="px-4 py-2 border-b border-gray-700">
                          <div className="text-gray-400 text-xs font-medium mb-2">🕐 Recent Searches</div>
                          {recentSearches.map((search, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                const city = locationsData.cities.find(c => 
                                  search.includes(c.name) && search.includes(c.state)
                                );
                                if (city) handleCitySelect(city as any);
                              }}
                              className="w-full px-2 py-2 text-left hover:bg-gray-700 transition-colors rounded"
                            >
                              <div className="text-white text-sm">{search}</div>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Explore All */}
                      <div className="px-4 py-3">
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setShowSuggestions(false);
                            // Show all cities
                            const allCitiesQuery = '';
                            setSearchQuery(allCitiesQuery);
                            setIsSearchOpen(true);
                          }}
                          className="w-full px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm font-medium transition-colors"
                        >
                          🗺️ Explore All Cities ({locationsData.cities.length})
                        </button>
                      </div>
                    </>
                  )}

                  {/* Search Results */}
                  {searchQuery && (
                    <>
                      {filteredCities.map(city => (
                        <button
                          key={city.id}
                          onClick={() => handleCitySelect(city)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors border-b border-gray-700 last:border-b-0"
                        >
                          <div className="text-white font-medium">{city.name}</div>
                          <div className="text-gray-400 text-sm">{city.state}, {city.country}</div>
                        </button>
                      ))}
                      {filteredCities.length === 0 && (
                        <div className="px-4 py-3">
                          <div className="text-gray-400 text-sm">No cities found</div>
                          <div className="text-gray-500 text-xs mt-1">
                            Try searching for: {getPopularCities().map(c => c.name).join(', ')}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Legend Shortcuts */}
          <div className="bg-gray-900/95 backdrop-blur-md border border-gray-600 rounded-lg p-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#f64295' }}></div>
                  <span className="text-gray-300 text-xs">Premium</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span className="text-gray-300 text-xs">Great</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <span className="text-gray-300 text-xs">Good</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span>🏚️</span>
                <span>⭐</span>
                <span>🍭</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Drawer */}
      {isMobile && (
        <div className={`absolute bottom-0 left-0 right-0 z-[1001] transition-all duration-300 ${
          isDrawerExpanded ? 'h-[80vh]' : 'h-auto'
        }`}>
          <div className="bg-gray-900/95 backdrop-blur-md border-t border-gray-600 rounded-t-2xl h-full flex flex-col">
            {/* Drawer Handle */}
            <div 
              className="flex justify-center py-3 cursor-pointer flex-shrink-0"
              onClick={() => setIsDrawerExpanded(!isDrawerExpanded)}
            >
              <div className="w-12 h-1 bg-gray-500 rounded-full"></div>
            </div>
            
            {/* Current City Quick Info */}
            <div className="px-4 pb-3 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📍</span>
                  <div>
                    <h3 className="text-white font-semibold text-sm">{selectedCity.name}</h3>
                    <p className="text-gray-400 text-xs">{selectedCity.state}, {selectedCity.country}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Spots</div>
                    <div className="text-lg font-bold" style={{ color: '#f64295' }}>
                      {currentCandySpots.length}
                    </div>
                  </div>
                  <button
                    onClick={() => setIsDrawerExpanded(!isDrawerExpanded)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <svg 
                      className={`w-5 h-5 transition-transform ${isDrawerExpanded ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Filter Buttons */}
            <div className="px-4 pb-4 flex-shrink-0">
              <div className="flex gap-2 overflow-x-auto">
                {[
                  { key: 'all', label: 'All', icon: '🍭' },
                  { key: 'premium', label: 'Premium', icon: '⭐' },
                  { key: 'mansion', label: 'Mansions', icon: '🏚️' },
                  { key: 'historic', label: 'Historic', icon: '🏛️' }
                ].map(filter => (
                  <button
                    key={filter.key}
                    onClick={() => setCurrentFilter(filter.key)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                      currentFilter === filter.key
                        ? 'text-white'
                        : 'text-gray-300 bg-gray-700'
                    }`}
                    style={currentFilter === filter.key ? { backgroundColor: '#f64295' } : {}}
                  >
                    <span>{filter.icon}</span>
                    <span>{filter.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Expanded Content */}
            {isDrawerExpanded && (
              <div className="flex-1 overflow-y-auto px-4 pb-4 min-h-0">
                {/* City Description */}
                <div className="mb-4 p-3 bg-gray-800/50 rounded-lg">
                  <p className="text-gray-300 text-sm mb-3">{selectedCity.description}</p>
                  
                  <div>
                    <h4 className="text-white text-sm font-medium mb-2">Popular Areas:</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedCity.popularAreas.map((area, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Candy Spots List */}
                <div className="pb-20">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm sticky top-0 bg-gray-900/95 py-2 -mx-4 px-4">
                    🍭 Candy Spots ({currentCandySpots.length})
                  </h3>
                  
                  <div className="space-y-3">
                    {currentCandySpots.map(spot => (
                      <div
                        key={spot.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedSpot?.id === spot.id
                            ? 'bg-gray-700 border-pink-500'
                            : 'bg-gray-800 border-gray-600'
                        }`}
                        onClick={() => setSelectedSpot(selectedSpot?.id === spot.id ? null : spot as CandySpot)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-medium text-sm">{spot.name}</h4>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-gray-300 text-xs">{spot.rating}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-400 text-xs mb-2">{spot.description}</p>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-0.5 rounded text-xs ${getDifficultyColor(spot.difficulty)} text-white`}>
                            {spot.difficulty}
                          </span>
                          <span className="text-xs">{getSpookyLevel(spot.spookyLevel)}</span>
                          <span className="text-gray-400 text-xs">{spot.crowdLevel} crowd</span>
                        </div>

                        {selectedSpot?.id === spot.id && (
                          <div className="mt-3 pt-3 border-t border-gray-600 space-y-2">
                            <div>
                              <span className="text-gray-400 text-xs">Best Time: </span>
                              <span className="text-white text-xs">{spot.bestTime}</span>
                            </div>
                            <div>
                              <span className="text-gray-400 text-xs">Candy Types: </span>
                              <span className="text-white text-xs">{spot.candyTypes.join(', ')}</span>
                            </div>
                            <div>
                              <span className="text-gray-400 text-xs">💡 Tip: </span>
                              <span className="text-white text-xs">{spot.tips}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Spooky Mode Toggle for Mobile */}
            <div className="px-4 pb-4 border-t border-gray-600 pt-3 flex-shrink-0">
              <button
                onClick={() => setSpookyMode(!spookyMode)}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
                  spookyMode
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <span className="text-lg">{spookyMode ? '🌙' : '👻'}</span>
                <span className="font-medium">{spookyMode ? 'Spooky Mode ON' : 'Enable Spooky Mode'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Map Controls */}
      {!isMobile && (
        <MapControls
          onFilterChange={setCurrentFilter}
          currentFilter={currentFilter}
          onSpookyModeToggle={() => setSpookyMode(!spookyMode)}
          spookyMode={spookyMode}
        />
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className={`absolute left-0 top-0 h-full z-[1000] transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="w-80 h-full bg-gray-900/95 backdrop-blur-md border-r border-gray-700 overflow-y-auto">
            {/* Header */}
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white mb-2">🗺️ Candy Map</h2>
              <p className="text-gray-400 text-sm">Discover the best trick-or-treat locations</p>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-gray-700">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search cities... (e.g., New York, Salem)"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={handleSearchFocus}
                  onBlur={(e) => {
                    // Only hide if not clicking on a related element
                    const relatedTarget = e.relatedTarget as Element;
                    if (!relatedTarget || (!relatedTarget.closest('[data-search-dropdown]') && !relatedTarget.closest('nav'))) {
                      setTimeout(() => {
                        setIsSearchOpen(false);
                        setShowSuggestions(false);
                      }, 200);
                    }
                  }}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': '#f64295' } as any}
                />
                <svg className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Search Results & Suggestions */}
              {isSearchOpen && (
                <div className="absolute left-4 right-4 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-lg max-h-80 overflow-y-auto z-10" data-search-dropdown>
                  {/* Show suggestions when no search query */}
                  {showSuggestions && !searchQuery && (
                    <>
                      {/* Popular Cities */}
                      <div className="px-4 py-3 border-b border-gray-700">
                        <div className="text-gray-400 text-xs font-medium mb-3">🔥 Popular Destinations</div>
                        <div className="space-y-1">
                          {getPopularCities().map(city => (
                            <button
                              key={city.id}
                              onClick={() => handleCitySelect(city as any)}
                              className="w-full px-3 py-2 text-left hover:bg-gray-700 transition-colors rounded"
                            >
                              <div className="text-white font-medium">{city.name}</div>
                              <div className="text-gray-400 text-sm">{city.state}, {city.country}</div>
                              <div className="text-gray-500 text-xs mt-1 line-clamp-2">{city.description}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Recent Searches */}
                      {recentSearches.length > 0 && (
                        <div className="px-4 py-3 border-b border-gray-700">
                          <div className="text-gray-400 text-xs font-medium mb-3">🕐 Recent Searches</div>
                          <div className="space-y-1">
                            {recentSearches.map((search, index) => (
                              <button
                                key={index}
                                onClick={() => {
                                  const city = locationsData.cities.find(c => 
                                    search.includes(c.name) && search.includes(c.state)
                                  );
                                  if (city) handleCitySelect(city as any);
                                }}
                                className="w-full px-3 py-2 text-left hover:bg-gray-700 transition-colors rounded flex items-center gap-2"
                              >
                                <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div className="text-white">{search}</div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* All Cities */}
                      <div className="px-4 py-3">
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setShowSuggestions(false);
                            setIsSearchOpen(true);
                          }}
                          className="w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          <span>🗺️</span>
                          <span>Explore All Cities ({locationsData.cities.length})</span>
                        </button>
                      </div>
                    </>
                  )}

                  {/* Search Results */}
                  {(searchQuery || (!showSuggestions && isSearchOpen)) && (
                    <>
                      {(searchQuery ? filteredCities : locationsData.cities).map(city => (
                        <button
                          key={city.id}
                          onClick={() => handleCitySelect(city as any)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors border-b border-gray-700 last:border-b-0"
                        >
                          <div className="text-white font-medium">{city.name}</div>
                          <div className="text-gray-400 text-sm">{city.state}, {city.country}</div>
                        </button>
                      ))}
                      {searchQuery && filteredCities.length === 0 && (
                        <div className="px-4 py-3">
                          <div className="text-gray-400">No cities found</div>
                          <div className="text-gray-500 text-sm mt-1">
                            Try searching for: {getPopularCities().map(c => c.name).join(', ')}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Current City Info */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">📍</span>
                <div>
                  <h3 className="text-white font-semibold">{selectedCity.name}</h3>
                  <p className="text-gray-400 text-sm">{selectedCity.state}, {selectedCity.country}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">{selectedCity.description}</p>
              
              {/* Popular Areas */}
              <div className="mt-3">
                <h4 className="text-white text-sm font-medium mb-2">Popular Areas:</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedCity.popularAreas.map((area, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Candy Spots List */}
            <div className="p-4">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                🍭 Candy Spots ({currentCandySpots.length})
              </h3>
              
              <div className="space-y-3">
                {currentCandySpots.map(spot => (
                  <div
                    key={spot.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedSpot?.id === spot.id
                        ? 'bg-gray-700 border-pink-500'
                        : 'bg-gray-800 border-gray-600 hover:bg-gray-700'
                    }`}
                    onClick={() => setSelectedSpot(selectedSpot?.id === spot.id ? null : spot as CandySpot)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-medium text-sm">{spot.name}</h4>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-gray-300 text-xs">{spot.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-xs mb-2">{spot.description}</p>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs ${getDifficultyColor(spot.difficulty)} text-white`}>
                        {spot.difficulty}
                      </span>
                      <span className="text-xs">{getSpookyLevel(spot.spookyLevel)}</span>
                      <span className="text-gray-400 text-xs">{spot.crowdLevel} crowd</span>
                    </div>

                    {selectedSpot?.id === spot.id && (
                      <div className="mt-3 pt-3 border-t border-gray-600 space-y-2">
                        <div>
                          <span className="text-gray-400 text-xs">Best Time: </span>
                          <span className="text-white text-xs">{spot.bestTime}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 text-xs">Candy Types: </span>
                          <span className="text-white text-xs">{spot.candyTypes.join(', ')}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 text-xs">💡 Tip: </span>
                          <span className="text-white text-xs">{spot.tips}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar Toggle */}
      {!isMobile && (
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`absolute top-4 z-[1001] p-3 bg-gray-900/90 backdrop-blur-md border border-gray-600 rounded-lg text-white hover:bg-gray-800 transition-colors ${
            isSidebarOpen ? 'left-[324px]' : 'left-4'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      )}

      {/* Desktop/Tablet Legend - Right Bottom */}
      {!isMobile && (
        <div className="absolute bottom-4 right-4 z-[1001]">
          {/* Always Visible Legend */}
          <div className="bg-gray-900/95 backdrop-blur-md border border-gray-600 rounded-lg p-4 max-w-xs">
            <button
              onClick={() => setIsLegendOpen(!isLegendOpen)}
              className="w-full flex items-center justify-between text-white hover:bg-gray-800/50 transition-colors rounded p-2 -m-2 mb-1"
            >
              <div className="flex items-center gap-2">
                <span>🗺️</span>
                <span className="text-sm font-medium">Map Legend</span>
              </div>
              <svg 
                className={`w-4 h-4 transition-transform ${isLegendOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div className="space-y-2 text-sm mt-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#f64295' }}></div>
                <span className="text-gray-300">Premium Spots (4.8+ ⭐)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-gray-300">Great Spots (4.5+ ⭐)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-gray-300">Good Spots (4.0+ ⭐)</span>
              </div>
            </div>
            
            {isLegendOpen && (
              <div className="mt-3 pt-3 border-t border-gray-600">
                <div className="text-xs text-gray-400 mb-2">
                  💡 Use the sidebar to filter spots and enable spooky mode!
                </div>
                
                <div className="text-xs text-gray-400 space-y-1">
                  <div>🏚️ = Haunted Mansions</div>
                  <div>⭐ = Historic Locations</div>
                  <div>🍭 = Regular Candy Spots</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}      {/* Map Container */}
      <div className={`flex-1 transition-all duration-300 ${
        isMobile ? 'ml-0' : (isSidebarOpen ? 'ml-80' : 'ml-0')
      } ${spookyMode ? 'spooky-map' : ''}`}>
        <MapContainer
          center={selectedCity.center}
          zoom={selectedCity.zoom}
          scrollWheelZoom={true}
          className="w-full h-full"
          key={`${selectedCity.id}-${theme}-${spookyMode}`}
        >
          <ChangeView center={selectedCity.center} zoom={selectedCity.zoom} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={theme === 'dark' || spookyMode
              ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
              : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            }
          />

          {/* Candy Spots Markers */}
          {currentCandySpots.map(spot => (
            <Marker
              key={spot.id}
              position={spot.coords as [number, number]}
              icon={createCandyIcon(spot.type, spot.rating, spookyMode)}
              eventHandlers={{
                click: () => {
                  setSelectedSpot(spot as CandySpot);
                  if (!collectedCandies.includes(spot.id)) {
                    onCollectCandy(spot.id);
                  }
                }
              }}
            >
              <Popup>
                <div className="p-2 max-w-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-gray-900">{spot.name}</h3>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm">{spot.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-2">{spot.description}</p>
                  
                  <div className="space-y-1 text-xs">
                    <div><strong>Best Time:</strong> {spot.bestTime}</div>
                    <div><strong>Difficulty:</strong> {spot.difficulty}</div>
                    <div><strong>Spooky Level:</strong> {getSpookyLevel(spot.spookyLevel)}</div>
                  </div>
                  
                  <div className="mt-2 pt-2 border-t">
                    <div className="text-xs text-gray-600">
                      <strong>💡 Tip:</strong> {spot.tips}
                    </div>
                  </div>

                  {collectedCandies.includes(spot.id) && (
                    <div className="mt-2 p-2 bg-green-100 rounded text-center">
                      <span className="text-green-800 text-sm font-medium">✅ Visited!</span>
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}