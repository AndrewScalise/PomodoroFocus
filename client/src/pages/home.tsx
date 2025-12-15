import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import PomodoroTimer from "@/components/PomodoroTimer";
import YouTubePlayer from "@/components/YouTubePlayer";
import VideoControls from "@/components/VideoControls";
import ThemeToggle from "@/components/ThemeToggle";

const Home = () => {
  const [timerMode, setTimerMode] = useState<"focus" | "break">("focus");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState("1Waq8ohWbV4");
  const [showPlayer, setShowPlayer] = useState(true);

  // Load player visibility preference from localStorage
  useEffect(() => {
    const savedPlayerVisibility = localStorage.getItem("showYouTubePlayer");
    if (savedPlayerVisibility !== null) {
      setShowPlayer(savedPlayerVisibility === "true");
    }
  }, []);

  // Save player visibility preference to localStorage
  const handleTogglePlayer = (show: boolean) => {
    setShowPlayer(show);
    localStorage.setItem("showYouTubePlayer", String(show));
  };

  // Handle timer mode changes (focus/break)
  const handleModeChange = (mode: "focus" | "break") => {
    setTimerMode(mode);
  };

  // Handle timer state changes (running/paused)
  const handleTimerStateChange = (isRunning: boolean) => {
    setIsTimerRunning(isRunning);
  };

  // Handle video selection
  const handleSelectVideo = (videoId: string) => {
    setSelectedVideoId(videoId);
  };

  return (
    <>
      <Helmet>
        <title>Pomodoro Timer with Beats</title>
        <meta
          name="description"
          content="Boost your productivity with a customizable Pomodoro timer and integrated beats. Set your focus and break times and stay in the flow."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            Pomodoro Timer
          </h1>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Timer and Controls */}
          <PomodoroTimer
            onModeChange={handleModeChange}
            onTimerStateChange={handleTimerStateChange}
          />

          {/* Right Column - Binaural Beats Player */}
          <div className="bg-card text-card-foreground rounded-xl shadow-lg p-6 flex flex-col">
            <h2 className="text-xl font-medium mb-4">Beats</h2>

            <YouTubePlayer
              videoId={selectedVideoId}
              isPlaying={isTimerRunning}
              mode={timerMode}
              showPlayer={showPlayer}
            />

            <VideoControls
              onSelectVideo={handleSelectVideo}
              showPlayer={showPlayer}
              onTogglePlayer={handleTogglePlayer}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-muted-foreground text-sm">
          <p>Pomodoro Timer with Beats &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </>
  );
};

export default Home;
