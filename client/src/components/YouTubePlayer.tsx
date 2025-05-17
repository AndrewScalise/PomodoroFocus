import { useState, useEffect, useRef } from "react";
import { loadYouTubeAPI, createYouTubePlayer } from "@/lib/youtube";
import { Music } from "lucide-react";

interface YouTubePlayerProps {
  videoId: string;
  isPlaying: boolean;
  mode: "focus" | "break";
  showPlayer: boolean;
}

const YouTubePlayer = ({
  videoId,
  isPlaying,
  mode,
  showPlayer,
}: YouTubePlayerProps) => {
  const [isAPIReady, setIsAPIReady] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerElementRef = useRef<HTMLDivElement | null>(null);

  // Load YouTube API
  useEffect(() => {
    loadYouTubeAPI()
      .then(() => setIsAPIReady(true))
      .catch((error) => console.error("Error loading YouTube API:", error));
  }, []);

  // Initialize player once API is ready
  useEffect(() => {
    if (isAPIReady && containerRef.current) {
      // Create a temporary element since the API will replace it
      if (!playerElementRef.current) {
        const playerElement = document.createElement("div");
        playerElement.id = "youtube-player-element";
        containerRef.current.appendChild(playerElement);
        playerElementRef.current = playerElement;

        // Initialize player
        createYouTubePlayer("youtube-player-element", videoId, (player) => {
          playerRef.current = player;
          setIsPlayerReady(true);
        });
      }
    }
  }, [isAPIReady, videoId]);

  // Handle player state
  useEffect(() => {
    if (isPlayerReady && playerRef.current) {
      // Only play video during focus mode and when timer is running
      if (isPlaying && mode === "focus") {
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
      if (!isPlaying || mode === "break") {
        playerRef.current.pauseVideo();
      }
    }
  }, [videoId, isPlayerReady, isPlaying, mode]);

  // Handle show/hide player
  useEffect(() => {
    if (containerRef.current && playerRef.current) {
      const iframe = containerRef.current.querySelector("iframe");
      if (iframe) {
        if (showPlayer) {
          iframe.style.display = "block";
        } else {
          iframe.style.display = "none";
        }
      }
    }
  }, [showPlayer, isPlayerReady]);

  return (
    <div className="relative pt-0 pb-[56.25%] h-0 overflow-hidden rounded-lg mb-4">
      <div
        ref={containerRef}
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
        style={{ backgroundColor: showPlayer ? "black" : "transparent" }}
      >
        {!showPlayer && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/20 rounded-lg">
            <div className="text-center p-4">
              <Music className="h-16 w-16 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">
                Player hidden - audio will still play
              </p>
            </div>
          </div>
        )}

        {!isAPIReady && showPlayer && (
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
