
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  className?: string;
}

export const ScrollProgress = ({ className }: ScrollProgressProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const calculatedProgress = (scrollTop / scrollHeight) * 100;
      setProgress(calculatedProgress);
    };

    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <CustomProgress
      value={progress}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-1 bg-transparent rounded-none",
        className
      )}
      indicatorClassName="bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-400"
    />
  );
};

interface CustomProgressProps {
  value: number;
  className?: string;
  indicatorClassName?: string;
}

export function CustomProgress({
  value,
  className,
  indicatorClassName,
}: CustomProgressProps) {
  return (
    <div
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-indigo-800/30",
        className
      )}
    >
      <div
        className={cn("h-full flex-1 transition-all", indicatorClassName)}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  );
}
