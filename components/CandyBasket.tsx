'use client';

interface CandyBasketProps {
  collectedCount: number;
  totalCount: number;
}

export default function CandyBasket({ collectedCount, totalCount }: CandyBasketProps) {
  const handleClick = () => {
    // We'll open a modal here later.
    alert(`You've collected ${collectedCount} out of ${totalCount} candies!`);
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-20 flex items-center justify-center w-16 h-16 bg-primary-orange rounded-full shadow-lg transform hover:scale-110 transition-transform duration-200"
      aria-label="View collected candies"
    >
      <span className="text-3xl">🍬</span>
      <span className="absolute -top-1 -right-1 flex items-center justify-center w-7 h-7 bg-primary-purple text-white text-sm font-bold rounded-full border-2 border-black">
        {collectedCount}
      </span>
    </button>
  );
}