"use client";

import { createContext, useContext, useState, useEffect } from 'react';

interface SpookyContextType {
  isSpookyMode: boolean;
  toggleSpookyMode: () => void;
}

const SpookyContext = createContext<SpookyContextType>({
  isSpookyMode: false,
  toggleSpookyMode: () => {},
});

export const useSpookyMode = () => useContext(SpookyContext);

export function SpookyModeProvider({ children }: { children: React.ReactNode }) {
  const [isSpookyMode, setIsSpookyMode] = useState(false);

  useEffect(() => {
    if (isSpookyMode) {
      document.body.classList.add('spooky-mode');
    } else {
      document.body.classList.remove('spooky-mode');
    }
  }, [isSpookyMode]);

  const toggleSpookyMode = () => {
    setIsSpookyMode(!isSpookyMode);
  };

  return (
    <SpookyContext.Provider value={{ isSpookyMode, toggleSpookyMode }}>
      {children}
      
      {/* Spooky Mode Effects */}
      {isSpookyMode && (
        <>
          {/* Lightning Flash Effect */}
          <div className="lightning-flash" />
          
          {/* Fog Effect */}
          <div className="fog-overlay">
            <div className="fog fog1" />
            <div className="fog fog2" />
          </div>

          {/* Blood Drip Effect on Screen Edges */}
          <div className="blood-drips">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="blood-drip"
                style={{
                  left: `${i * 11}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>
        </>
      )}

      <style jsx global>{`
        .spooky-mode {
          filter: contrast(1.1) brightness(0.9);
        }

        .lightning-flash {
          position: fixed;
          inset: 0;
          background: white;
          opacity: 0;
          pointer-events: none;
          z-index: 9996;
          animation: lightning 8s infinite;
        }

        @keyframes lightning {
          0%, 90%, 92%, 100% { opacity: 0; }
          91% { opacity: 0.8; }
        }

        .fog-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9995;
          overflow: hidden;
        }

        .fog {
          position: absolute;
          width: 200%;
          height: 100%;
          background: linear-gradient(to bottom, 
            rgba(139, 0, 139, 0.1) 0%,
            rgba(75, 0, 130, 0.2) 50%,
            rgba(0, 0, 0, 0.3) 100%
          );
        }

        .fog1 {
          animation: fogMove1 20s infinite linear;
        }

        .fog2 {
          animation: fogMove2 25s infinite linear;
          opacity: 0.5;
        }

        @keyframes fogMove1 {
          0% { transform: translateX(-50%) translateY(0); }
          100% { transform: translateX(0%) translateY(-10px); }
        }

        @keyframes fogMove2 {
          0% { transform: translateX(0%) translateY(0); }
          100% { transform: translateX(-50%) translateY(10px); }
        }

        .blood-drips {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 200px;
          pointer-events: none;
          z-index: 9994;
        }

        .blood-drip {
          position: absolute;
          top: 0;
          width: 20px;
          height: 0;
          background: linear-gradient(to bottom, 
            rgba(139, 0, 0, 0.8) 0%,
            rgba(139, 0, 0, 0.6) 50%,
            rgba(139, 0, 0, 0) 100%
          );
          animation: drip 3s ease-in-out infinite;
        }

        @keyframes drip {
          0% { height: 0; }
          50% { height: 150px; }
          100% { height: 0; }
        }
      `}</style>
    </SpookyContext.Provider>
  );
}

// Toggle Button Component
export function SpookyModeToggle() {
  const { isSpookyMode, toggleSpookyMode } = useSpookyMode();

  return (
    <button
      onClick={toggleSpookyMode}
      className="fixed hidden top-24 right-28 z-[9999] px-4 py-2 rounded-full font-medium transition-all duration-300 border-2 shadow-lg"
      style={{
        backgroundColor: isSpookyMode ? 'rgba(139, 0, 0, 0.8)' : 'rgba(107, 114, 128, 0.8)',
        borderColor: isSpookyMode ? '#8B0000' : '#6B7280',
        color: 'white',
      }}
      title={isSpookyMode ? 'Disable ultra spooky mode' : 'Enable ultra spooky mode'}
    >
      {isSpookyMode ? '💀 SPOOKY' : '👻 Normal'}
    </button>
  );
}
