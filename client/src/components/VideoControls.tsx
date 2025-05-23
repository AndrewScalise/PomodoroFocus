import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Music, EyeOff, Eye } from "lucide-react";
import { videoOptions } from "@/lib/youtube";

interface VideoControlsProps {
  onSelectVideo: (videoId: string) => void;
  showPlayer: boolean;
  onTogglePlayer: (show: boolean) => void;
}

const VideoControls = ({
  onSelectVideo,
  showPlayer,
  onTogglePlayer,
}: VideoControlsProps) => {
  const [customVideoId, setCustomVideoId] = useState("");

  const handleCustomVideoLoad = () => {
    if (customVideoId.trim()) {
      onSelectVideo(customVideoId.trim());
    }
  };

  return (
    <div className="mt-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Suggested Study Music</h3>
        <div className="flex items-center gap-2">
          <Label htmlFor="show-player" className="text-sm cursor-pointer">
            {showPlayer ? (
              <span className="flex items-center gap-1">
                <Eye size={16} /> Show Player
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <EyeOff size={16} /> Hide Player
              </span>
            )}
          </Label>
          <Switch
            id="show-player"
            checked={showPlayer}
            onCheckedChange={onTogglePlayer}
          />
        </div>
      </div>

      {/* Video selection buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
        {videoOptions.map((video, index) => (
          <button
            key={video.id}
            className="text-left p-3 rounded-lg flex items-center hover:bg-neutral transition border border-muted"
            onClick={() => onSelectVideo(video.id)}
          >
            <div
              className={`w-10 h-10 rounded flex items-center justify-center text-white mr-3 ${
                index < 2 ? "bg-primary" : "bg-secondary"
              }`}
            >
              <Music size={20} />
            </div>
            <div>
              <span className="block font-medium">{video.title}</span>
              <span className="text-sm">{video.description}</span>
              <span
                className={`text-xs block mt-1 text-primary/80`}
              >
                {index < 2 ? "Binaural Beats" : "Lofi Music"}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Custom URL input */}
      <div className="mb-2">
        <Label htmlFor="customVideo" className="block text-gray-700 mb-2">
          Custom YouTube Video ID
        </Label>
        <div className="flex">
          <Input
            type="text"
            id="customVideo"
            placeholder="e.g. dQw4w9WgXcQ"
            className="flex-1 rounded-r-none"
            value={customVideoId}
            onChange={(e) => setCustomVideoId(e.target.value)}
          />
          <Button
            className="bg-primary hover:bg-primary/90 text-white rounded-l-none"
            onClick={handleCustomVideoLoad}
          >
            Load
          </Button>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Enter the video ID from the YouTube URL: youtube.com/watch?v=
          <span className="font-semibold">VIDEO_ID</span>
        </div>
      </div>

      <div className="text-sm text-gray-500 mt-3">
        The video will play automatically during focus sessions
      </div>
    </div>
  );
};

export default VideoControls;
