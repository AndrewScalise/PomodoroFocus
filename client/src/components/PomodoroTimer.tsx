import { useState, useEffect, useRef } from "react";
import CircularProgressBar from "./CircularProgressBar";
import TimerControls from "./TimerControls";
import TimerSettings from "./TimerSettings";
import DonationButton from "./DonationButton";

interface PomodoroTimerProps {
  onModeChange: (mode: "focus" | "break") => void;
  onTimerStateChange?: (isRunning: boolean) => void;
}

const PomodoroTimer = ({
  onModeChange,
  onTimerStateChange,
}: PomodoroTimerProps) => {
  // Timer settings
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [playSoundNotification, setPlaySoundNotification] = useState(true);

  // Timer state
  const [timeRemaining, setTimeRemaining] = useState(focusTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"focus" | "break">("focus");

  // Refs
  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    // Create audio element from public folder
    const audio = new Audio("/notification.mp3");
    audio.preload = "auto";

    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle timer logic
  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            // Timer complete
            clearInterval(timerRef.current!);

            // Play notification sound
            if (playSoundNotification && audioRef.current) {
              // Reset to beginning in case it was already played
              audioRef.current.currentTime = 0;
              audioRef.current
                .play()
                .catch((err) =>
                  console.error("Error playing notification sound:", err)
                );
            }

            // Switch modes
            const newMode = mode === "focus" ? "break" : "focus";
            const newTime =
              newMode === "focus" ? focusTime * 60 : breakTime * 60;

            setMode(newMode);
            onModeChange(newMode);

            // Restart timer
            timerRef.current = window.setInterval(() => {
              setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
            }, 1000);

            return newTime;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [
    isRunning,
    mode,
    focusTime,
    breakTime,
    playSoundNotification,
    onModeChange,
  ]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Calculate progress percentage
  const calculateProgress = (): number => {
    const totalSeconds = mode === "focus" ? focusTime * 60 : breakTime * 60;
    return 1 - timeRemaining / totalSeconds;
  };

  // Start or pause the timer
  const toggleTimer = () => {
    const newIsRunning = !isRunning;
    setIsRunning(newIsRunning);
    if (onTimerStateChange) {
      onTimerStateChange(newIsRunning);
    }
  };

  // Reset the timer
  const resetTimer = () => {
    setIsRunning(false);
    setMode("focus");
    setTimeRemaining(focusTime * 60);
    onModeChange("focus");
    if (onTimerStateChange) {
      onTimerStateChange(false);
    }
  };

  // Update focus time
  const updateFocusTime = (newTime: number) => {
    setFocusTime(newTime);
    if (mode === "focus" && !isRunning) {
      setTimeRemaining(newTime * 60);
    }
  };

  // Update break time
  const updateBreakTime = (newTime: number) => {
    setBreakTime(newTime);
    if (mode === "break" && !isRunning) {
      setTimeRemaining(newTime * 60);
    }
  };

  return (
    <div className="bg-card text-card-foreground rounded-xl shadow-lg p-6 flex flex-col items-center">
      <CircularProgressBar percentage={calculateProgress()} mode={mode}>
        {formatTime(timeRemaining)}
      </CircularProgressBar>

      <div className="text-xl font-medium mb-4 flex items-center gap-2">
        <span
          className={`inline-block w-3 h-3 rounded-full ${
            mode === "focus" ? "bg-primary" : "bg-secondary"
          }`}
        ></span>
        {mode === "focus" ? "Focus Mode" : "Break Mode"}
      </div>

      <TimerControls
        isRunning={isRunning}
        onStartPause={toggleTimer}
        onReset={resetTimer}
      />

      <TimerSettings
        focusTime={focusTime}
        breakTime={breakTime}
        playSoundNotification={playSoundNotification}
        onUpdateFocusTime={updateFocusTime}
        onUpdateBreakTime={updateBreakTime}
        onToggleSoundNotification={setPlaySoundNotification}
      />

      <DonationButton />
    </div>
  );
};

export default PomodoroTimer;
