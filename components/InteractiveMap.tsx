'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

// Define the props it will receive from the parent page
interface InteractiveMapProps {
  collectedCandies: number[];
  onCollectCandy: (candyId: number) => void;
  theme: string | undefined;
}

export default function InteractiveMap({ collectedCandies, onCollectCandy,theme }: InteractiveMapProps) {
  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/Map'), {
        loading: () => <p className="text-center text-2xl">A map is loading...</p>,
        ssr: false,
      }),
    []
  );

  // Simply pass the props through to the actual Map component
  return <Map collectedCandies={collectedCandies} onCollectCandy={onCollectCandy} theme={theme} />;
}