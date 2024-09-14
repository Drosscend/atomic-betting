"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

export function TimeRemaining({ endDate }: { endDate: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const end = new Date(endDate).getTime();
    const updateProgress = () => {
      const now = new Date().getTime();
      const total = end - now;
      const percentage = Math.max(0, Math.min(100, (total / (24 * 60 * 60 * 1000)) * 100));
      setProgress(percentage);
    };
    updateProgress();
    const interval = setInterval(updateProgress, 1000);
    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div className="mb-6">
      <p className="mb-2 text-sm font-medium">Temps restant</p>
      <Progress value={progress} className="w-full" />
    </div>
  );
}
