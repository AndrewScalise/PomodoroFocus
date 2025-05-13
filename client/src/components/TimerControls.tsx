import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

interface TimerControlsProps {
  isRunning: boolean;
  onStartPause: () => void;
  onReset: () => void;
}

const TimerControls = ({ isRunning, onStartPause, onReset }: TimerControlsProps) => {
  return (
    <div className="flex gap-4 mb-8">
      <Button 
        className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full flex items-center"
        onClick={onStartPause}
      >
        {isRunning ? (
          <>
            <Pause className="mr-2 h-5 w-5" />
            <span>Pause</span>
          </>
        ) : (
          <>
            <Play className="mr-2 h-5 w-5" />
            <span>Start</span>
          </>
        )}
      </Button>
      
      <Button 
        className="bg-destructive hover:bg-destructive/90 text-white px-6 py-3 rounded-full flex items-center"
        onClick={onReset}
      >
        <RotateCcw className="mr-2 h-5 w-5" />
        Reset
      </Button>
    </div>
  );
};

export default TimerControls;
