import { useState } from "react";
import { Helmet } from 'react-helmet';
import PomodoroTimer from "@/components/PomodoroTimer";
import YouTubePlayer from "@/components/YouTubePlayer";
import VideoControls from "@/components/VideoControls";
import DonationButton from "@/components/DonationButton";

const Home = () => {
  const [timerMode, setTimerMode] = useState<'focus' | 'break'>('focus');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState('tU3oAyin8W4');

  // Handle timer mode changes (focus/break)
  const handleModeChange = (mode: 'focus' | 'break') => {
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
        <title>Pomodoro Timer with Binaural Beats</title>
        <meta name="description" content="Boost your productivity with a customizable Pomodoro timer and integrated binaural beats. Set your focus and break times and stay in the flow." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">Pomodoro Timer</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Timer and Controls */}
          <PomodoroTimer 
            onModeChange={handleModeChange} 
            onTimerStateChange={handleTimerStateChange}
          />
          
          {/* Right Column - Binaural Beats Player */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
            <h2 className="text-xl font-medium mb-4">Binaural Beats</h2>
            
            <YouTubePlayer 
              videoId={selectedVideoId}
              isPlaying={isTimerRunning}
              mode={timerMode}
            />
            
            <VideoControls onSelectVideo={handleSelectVideo} />
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>Pomodoro Timer with Binaural Beats &copy; {new Date().getFullYear()}</p>
        </footer>
        
        {/* Donation Button */}
        <DonationButton />
      </div>
    </>
  );
};

export default Home;
