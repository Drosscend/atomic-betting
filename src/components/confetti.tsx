"use client";

import { create } from "zustand";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

type ConfettiStore = {
  isActive: boolean;
  duration: number;
  setConfetti: (isActive: boolean, duration: number) => void;
};

const useConfettiStore = create<ConfettiStore>((set) => ({
  isActive: false,
  duration: 0,
  setConfetti: (isActive, duration) => set({ isActive, duration }),
}));

export const useConfetti = () => {
  const setConfetti = useConfettiStore((state) => state.setConfetti);

  const showConfetti = useCallback(
    (duration: number = 5000) => {
      setConfetti(true, duration);
    },
    [setConfetti]
  );

  return { showConfetti };
};

export function Confetti() {
  const { isActive, duration } = useConfettiStore();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        useConfettiStore.getState().setConfetti(false, 0);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isActive, duration]);

  if (!isActive) return null;

  return <ReactConfetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={200} />;
}
