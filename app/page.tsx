"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import Image from "next/image";
import skullImage from "../public/skull.svg";

export default function HomePage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className="h-[calc(100vh-4rem)] relative overflow-hidden" style={{ backgroundColor: '#26282c' }}>
      {/* Radial gradient at top right */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 opacity-20 blur-3xl"
        style={{
          background: `radial-gradient(circle, #f64295 0%, transparent 70%)`
        }}
      ></div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10"></div>

      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-20">
            {/* Left side - Content */}
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                Transform Your{" "}
                <span 
                  className="font-creepster bg-clip-text text-transparent block sm:inline"
                  style={{
                    backgroundImage: `linear-gradient(135deg, #f64295 0%, #ff6b9d 100%)`
                  }}
                >
                  Halloween
                </span>{" "}
                Experience
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Discover the ultimate trick-or-treat locations with our interactive mapping platform. 
                Find premium candy destinations and explore spine-chilling stories from the community.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start">
                <Link
                  href="/map"
                  className="group px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 text-white"
                  style={{ backgroundColor: '#f64295' }}
                >
                  Explore Map
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                
                <Link
                  href="/entertainment"
                  className="group border-2 border-[#f64295] text-gray-300 hover:text-white hover:bg-[#f64295] px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                >
                  Read Stories
                </Link>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="flex justify-center lg:justify-end order-first lg:order-last">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                <Image
                  src={skullImage}
                  alt="Spooky Halloween illustration"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  style={{ 
                    maxHeight: '400px',
                    filter: 'drop-shadow(0 10px 20px rgba(246, 66, 149, 0.2))'
                  }}
                  priority
                />
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
            <div className="bg-white/5 backdrop-blur-sm border border-gray-700 p-6 md:p-8 rounded-xl hover:bg-white/10 transition-all duration-300">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg mb-4 md:mb-6 flex items-center justify-center" style={{ backgroundColor: '#f64295' }}>
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">Interactive Mapping</h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                Navigate through detailed neighborhood maps to discover the most rewarding trick-or-treat destinations.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-gray-700 p-6 md:p-8 rounded-xl hover:bg-white/10 transition-all duration-300">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg mb-4 md:mb-6 flex items-center justify-center" style={{ backgroundColor: '#f64295' }}>
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">Community Stories</h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                Immerse yourself in carefully curated Halloween tales and urban legends from our community.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-gray-700 p-6 md:p-8 rounded-xl hover:bg-white/10 transition-all duration-300 sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg mb-4 md:mb-6 flex items-center justify-center" style={{ backgroundColor: '#f64295' }}>
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">Premium Locations</h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                Access community-verified ratings and reviews for the best candy distribution points.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div className="space-y-1 md:space-y-2">
              <div className="text-2xl md:text-3xl font-bold" style={{ color: '#f64295' }}>500+</div>
              <div className="text-sm md:text-base text-gray-400">Mapped Locations</div>
            </div>
            <div className="space-y-1 md:space-y-2">
              <div className="text-2xl md:text-3xl font-bold" style={{ color: '#f64295' }}>1,200+</div>
              <div className="text-sm md:text-base text-gray-400">Community Reviews</div>
            </div>
            <div className="space-y-1 md:space-y-2">
              <div className="text-2xl md:text-3xl font-bold" style={{ color: '#f64295' }}>50+</div>
              <div className="text-sm md:text-base text-gray-400">Spooky Stories</div>
            </div>
            <div className="space-y-1 md:space-y-2">
              <div className="text-2xl md:text-3xl font-bold" style={{ color: '#f64295' }}>5,000+</div>
              <div className="text-sm md:text-base text-gray-400">Active Users</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}