import { useState, useEffect, useRef } from 'react';
import { loadYouTubeAPI, createYouTubePlayer } from '@/lib/youtube';

interface YouTubePlayerProps {
  videoId: string;
  isPlaying: boolean;
  mode: 'focus' | 'break';
}

const YouTubePlayer = ({ videoId, isPlaying, mode }: YouTubePlayerProps) => {
  const [isAPIReady, setIsAPIReady] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load YouTube API
  useEffect(() => {
    loadYouTubeAPI()
      .then(() => setIsAPIReady(true))
      .catch(error => console.error('Error loading YouTube API:', error));
  }, []);

  // Initialize player once API is ready
  useEffect(() => {
    if (isAPIReady && containerRef.current) {
      // Create a temporary element since the API will replace it
      const playerElement = document.createElement('div');
      playerElement.id = 'youtube-player-element';
      containerRef.current.appendChild(playerElement);

      // Initialize player
      createYouTubePlayer('youtube-player-element', videoId, (player) => {
        playerRef.current = player;
        setIsPlayerReady(true);
      });
    }
  }, [isAPIReady, videoId]);

  // Handle player state
  useEffect(() => {
    if (isPlayerReady && playerRef.current) {
      // Only play video during focus mode and when timer is running
      if (isPlaying && mode === 'focus') {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying, mode, isPlayerReady]);

  // Change video when videoId changes
  useEffect(() => {
    if (isPlayerReady && playerRef.current) {
      playerRef.current.loadVideoById(videoId);
      
      // Pause if timer is not running or in break mode
      if (!isPlaying || mode === 'break') {
        playerRef.current.pauseVideo();
      }
    }
  }, [videoId, isPlayerReady, isPlaying, mode]);

  return (
    <div className="relative pt-0 pb-[56.25%] h-0 overflow-hidden rounded-lg mb-4">
      <div 
        ref={containerRef}
        className="absolute top-0 left-0 w-full h-full bg-black flex items-center justify-center"
      >
        {!isAPIReady && (
          <div className="text-white text-center p-4">
            <div className="text-5xl mb-2">▶️</div>
            <p>Loading YouTube player...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default YouTubePlayer;
