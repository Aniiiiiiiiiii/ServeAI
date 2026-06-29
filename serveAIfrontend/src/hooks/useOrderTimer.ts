// hooks/useOrderTimer.ts
import { useState, useEffect } from "react";

interface UseOrderTimerProps {
  readyAt?: string | number | Date;
  targetDurationSeconds?: number; // Default 120 seconds (2 mins)
  isActive: boolean; // Sirf tabhi chalega jab status "Ready" ho
}

export function useOrderTimer({
  readyAt,
  targetDurationSeconds = 120,
  isActive,
}: UseOrderTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(targetDurationSeconds);
  const [isDelayed, setIsDelayed] = useState<boolean>(false);

  useEffect(() => {
    if (!isActive || !readyAt) {
      return;
    }

    const readyTimestamp = new Date(readyAt).getTime();

    // Setup interval loop
    const calculateTime = () => {
      const now = Date.now();
      const elapsedSeconds = Math.floor((now - readyTimestamp) / 1000);
      const remaining = targetDurationSeconds - elapsedSeconds;

      if (remaining <= 0) {
        setTimeLeft(0);
        setIsDelayed(true);
      } else {
        setTimeLeft(remaining);
        setIsDelayed(false);
      }
    };

    // Initial run immediate execution
    calculateTime();

    const intervalId = setInterval(calculateTime, 1000);

    // Cleanup to prevent memory leaks
    return () => clearInterval(intervalId);
  }, [readyAt, targetDurationSeconds, isActive]);

  // Format helper to display MM:SS
  const formatTime = () => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return { timeLeft, isDelayed, formattedTime: formatTime() };
}