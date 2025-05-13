import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CircularProgressBarProps {
  percentage: number;
  mode: 'focus' | 'break';
  children?: React.ReactNode;
}

const CircularProgressBar = ({ percentage, mode, children }: CircularProgressBarProps) => {
  const [offset, setOffset] = useState(0);
  
  // SVG properties
  const size = 250;
  const center = size / 2;
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  
  useEffect(() => {
    const progressOffset = circumference - (percentage * circumference);
    setOffset(progressOffset);
  }, [percentage, circumference]);

  return (
    <div className={cn(
      "relative w-[250px] h-[250px] mb-6",
      mode === 'break' ? "break-mode" : ""
    )}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle 
          className="fill-none stroke-[#E0E0E0] stroke-[12] rounded-full"
          cx={center} 
          cy={center} 
          r={radius} 
        />
        <circle 
          className={cn(
            "fill-none stroke-[12] rounded-full transition-all duration-300 ease-out -rotate-90 origin-center",
            mode === 'focus' ? "stroke-primary" : "stroke-secondary"
          )}
          cx={center} 
          cy={center} 
          r={radius} 
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[2.5rem] font-medium">
        {children}
      </div>
    </div>
  );
};

export default CircularProgressBar;
