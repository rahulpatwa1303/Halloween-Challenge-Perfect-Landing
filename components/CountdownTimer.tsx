'use client';

import { useState, useEffect } from 'react';

const HALLOWEEN_DATE = new Date('2025-10-31T00:00:00');

function calculateTimeLeft() {
  const difference = +HALLOWEEN_DATE - +new Date();
  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = Object.entries(timeLeft).map(([interval, value]) => {
    return (
      <div key={interval} className="flex flex-col items-center">
        <span className="text-2xl md:text-4xl font-bold">{String(value).padStart(2, '0')}</span>
        <span className="text-xs uppercase">{interval}</span>
      </div>
    );
  });

  return (
    <div className="text-primary-orange bg-primary-black/50 p-2 rounded-lg backdrop-blur-sm">
      <div className="flex space-x-2 md:space-x-4">
        {timerComponents.length ? timerComponents : <span>Happy Halloween!</span>}
      </div>
    </div>
  );
}