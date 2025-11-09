"use client";

import { useState, useRef, useEffect } from 'react';

export default function SpookySounds() {
  const [isMuted, setIsMuted] = useState(true);
  const [currentSound, setCurrentSound] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const sounds = {
    creaking: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3', // Creaking door
    thunder: 'https://assets.mixkit.co/active_storage/sfx/1295/1295-preview.mp3', // Thunder
    crow: 'https://assets.mixkit.co/active_storage/sfx/1842/1842-preview.mp3', // Crow
    wind: 'https://assets.mixkit.co/active_storage/sfx/2017/2017-preview.mp3', // Wind
  };

  const playRandomSound = () => {
    if (isMuted) return;
    const soundKeys = Object.keys(sounds);
    const randomKey = soundKeys[Math.floor(Math.random() * soundKeys.length)] as keyof typeof sounds;
    const soundUrl = sounds[randomKey];
    
    if (audioRef.current) {
      audioRef.current.src = soundUrl;
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
      setCurrentSound(randomKey);
    }
  };

  useEffect(() => {
    if (!isMuted) {
      // Play random sound every 30-60 seconds
      const interval = setInterval(() => {
        playRandomSound();
      }, 30000 + Math.random() * 30000);

      return () => clearInterval(interval);
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted && audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <>
      <audio ref={audioRef} />
      <button
        onClick={toggleMute}
        className="fixed bottom-4 right-4 z-[9999] p-3 rounded-full transition-all duration-300 border-2"
        style={{
          backgroundColor: isMuted ? 'rgba(107, 114, 128, 0.8)' : 'rgba(246, 66, 149, 0.8)',
          borderColor: isMuted ? '#6B7280' : '#f64295',
        }}
        title={isMuted ? 'Enable spooky sounds' : 'Mute sounds'}
      >
        <span className="text-2xl">
          {isMuted ? '🔇' : '🔊'}
        </span>
      </button>
      {currentSound && !isMuted && (
        <div className="fixed bottom-20 right-4 bg-gray-800/90 text-white px-3 py-2 rounded-lg text-sm">
          Playing: {currentSound} 👻
        </div>
      )}
    </>
  );
}
