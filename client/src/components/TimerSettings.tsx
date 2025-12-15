import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Minus } from "lucide-react";
import { ChangeEvent } from "react";

interface TimerSettingsProps {
  focusTime: number;
  breakTime: number;
  playSoundNotification: boolean;
  onUpdateFocusTime: (time: number) => void;
  onUpdateBreakTime: (time: number) => void;
  onToggleSoundNotification: (value: boolean) => void;
}

const TimerSettings = ({
  focusTime,
  breakTime,
  playSoundNotification,
  onUpdateFocusTime,
  onUpdateBreakTime,
  onToggleSoundNotification
}: TimerSettingsProps) => {
  
  // Handle focus time input change
  const handleFocusTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= 120) {
      onUpdateFocusTime(value);
    }
  };
  
  // Handle break time input change
  const handleBreakTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= 60) {
      onUpdateBreakTime(value);
    }
  };
  
  // Increment/decrement handlers
  const incrementFocusTime = () => {
    if (focusTime < 120) {
      onUpdateFocusTime(focusTime + 1);
    }
  };
  
  const decrementFocusTime = () => {
    if (focusTime > 1) {
      onUpdateFocusTime(focusTime - 1);
    }
  };
  
  const incrementBreakTime = () => {
    if (breakTime < 60) {
      onUpdateBreakTime(breakTime + 1);
    }
  };
  
  const decrementBreakTime = () => {
    if (breakTime > 1) {
      onUpdateBreakTime(breakTime - 1);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-medium mb-4">Timer Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Focus Time Setting */}
        <div className="mb-4">
          <Label className="block mb-2" htmlFor="focusTime">
            Focus Time (minutes)
          </Label>
          <div className="flex items-center">
            <button 
              className="bg-muted hover:bg-muted/80 px-3 py-2 rounded-l-lg"
              onClick={decrementFocusTime}
              type="button"
            >
              <Minus className="h-4 w-4" />
            </button>
            <Input
              type="number"
              id="focusTime"
              min="1"
              max="120"
              value={focusTime}
              onChange={handleFocusTimeChange}
              className="w-full text-center py-2 rounded-none border-x-0"
            />
            <button 
              className="bg-muted hover:bg-muted/80 px-3 py-2 rounded-r-lg"
              onClick={incrementFocusTime}
              type="button"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Break Time Setting */}
        <div className="mb-4">
          <Label className="block mb-2" htmlFor="breakTime">
            Break Time (minutes)
          </Label>
          <div className="flex items-center">
            <button 
              className="bg-muted hover:bg-muted/80 px-3 py-2 rounded-l-lg"
              onClick={decrementBreakTime}
              type="button"
            >
              <Minus className="h-4 w-4" />
            </button>
            <Input
              type="number"
              id="breakTime"
              min="1"
              max="60"
              value={breakTime}
              onChange={handleBreakTimeChange}
              className="w-full text-center py-2 rounded-none border-x-0"
            />
            <button 
              className="bg-muted hover:bg-muted/80 px-3 py-2 rounded-r-lg"
              onClick={incrementBreakTime}
              type="button"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Sound Settings */}
      <div className="mt-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="sound-notification" 
            checked={playSoundNotification}
            onCheckedChange={(checked) => onToggleSoundNotification(checked as boolean)}
          />
          <Label 
            htmlFor="sound-notification"
            className="cursor-pointer"
          >
            Play sound when timer ends
          </Label>
        </div>
      </div>
    </div>
  );
};

export default TimerSettings;
