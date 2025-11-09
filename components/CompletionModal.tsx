"use client";
import Lottie from "lottie-react";
import { useRouter } from "next/router";
interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CompletionModal({
  isOpen,
  onClose,
}: CompletionModalProps) {
  if (!isOpen) return null;
  const router = useRouter();
  const spookyAnimationPath = `${router.basePath}/animations/Handchi-spooky.json`;
  console.log('spookyAnimationPath',spookyAnimationPath)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-night-gradient border-2 border-primary-orange p-8 rounded-lg text-center relative max-w-sm w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-2xl"
        >
          &times;
        </button>
        <Lottie
          animationData={spookyAnimationPath}
          loop={true}
          style={{ height: 150 }}
        />
        <h2 className="font-display text-4xl text-primary-orange mt-4">
          You found them all!
        </h2>
        <p className="mt-2 text-white">
          🎃 You've uncovered the Halloween Secret Message! 🎃
        </p>
        <p className="mt-4 text-lg text-white font-bold">Happy Haunting!</p>
      </div>
    </div>
  );
}
