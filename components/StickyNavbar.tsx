'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import navigationData from '@/data/navigation.json';

interface NavigationItem {
  label: string;
  route: string;
  icon?: string;
}

interface NavigationData {
  title: string;
  items: NavigationItem[];
}

export default function StickyNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const navData = navigationData as NavigationData;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'backdrop-blur-md shadow-lg border-b border-gray-700'
          : 'backdrop-blur-sm'
      }`}
      style={{ 
        backgroundColor: isScrolled ? 'rgba(38, 40, 44, 0.95)' : 'rgba(38, 40, 44, 0.8)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <Link
            href="/"
            className="flex items-center space-x-3 text-2xl font-bold transition-colors"
            style={{ color: '#f64295' }}
          >
            <span className="font-creepster bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, #f64295 0%, #ff6b9d 100%)`
                  }}>
              {navData.title}
            </span>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center space-x-2 md:space-x-6">
            {navData.items.map((item) => {
              const isActive = pathname === item.route;
              return (
                <Link
                  key={item.route}
                  href={item.route}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-white border'
                      : 'text-gray-300 hover:text-white'
                  }`}
                  style={isActive ? {
                    backgroundColor: 'rgba(246, 66, 149, 0.2)',
                    borderColor: '#f64295'
                  } : {}}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(246, 66, 149, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span className="md:hidden text-lg" role="img" aria-label={item.label}>
                    {item.icon}
                  </span>
                  <span className="hidden md:block">{item.label}</span>
                </Link>
              );
            })}
            
            {/* Search Icon */}
          </div>
        </div>
      </div>
    </nav>
  );
}