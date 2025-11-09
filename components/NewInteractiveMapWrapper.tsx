'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

interface NewInteractiveMapWrapperProps {
  collectedCandies: number[];
  onCollectCandy: (candyId: number) => void;
  theme: string | undefined;
}

export default function NewInteractiveMapWrapper({ collectedCandies, onCollectCandy, theme }: NewInteractiveMapWrapperProps) {
  const NewInteractiveMap = useMemo(
    () =>
      dynamic(() => import('@/components/NewInteractiveMap'), {
        loading: () => (
          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: '#26282c' }}>
            <div className="text-center">
              <div className="text-4xl mb-4">🗺️</div>
              <div className="text-white text-xl mb-2">Loading Spooky Map...</div>
              <div className="text-gray-400">Discovering the best candy spots...</div>
            </div>
          </div>
        ),
        ssr: false,
      }),
    []
  );

  return <NewInteractiveMap collectedCandies={collectedCandies} onCollectCandy={onCollectCandy} theme={theme} />;
}