// YouTube Player API interface
interface YouTubePlayer {
  playVideo(): void;
  pauseVideo(): void;
  stopVideo(): void;
  loadVideoById(videoId: string, startSeconds?: number): void;
  cueVideoById(videoId: string, startSeconds?: number): void;
  getPlayerState(): number;
}

// Initialize the YouTube API
export const loadYouTubeAPI = (): Promise<void> => {
  return new Promise((resolve) => {
    if (window.YT) {
      resolve();
      return;
    }

    // Create YouTube API script tag
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      document.head.appendChild(tag);
    }

    // The API will call this function when ready
    window.onYouTubeIframeAPIReady = () => {
      resolve();
    };
  });
};

// Create a new YouTube player
export const createYouTubePlayer = (
  elementId: string,
  videoId: string,
  onReady: (player: YouTubePlayer) => void,
): void => {
  new window.YT.Player(elementId, {
    height: '100%',
    width: '100%',
    videoId,
    playerVars: {
      playsinline: 1,
      controls: 1,
      rel: 0,
    },
    events: {
      onReady: (event: any) => onReady(event.target),
    },
  });
};

// Define suggested videos with their information
export const videoOptions = [
  {
    id: 'GjgkrklG4rA',
    title: 'Focus Alpha Waves',
    description: '8-10 Hz • 3 hours',
  },
  {
    id: 'XXPqqd3QBKY',
    title: 'Productivity Theta',
    description: '4-7 Hz • 2 hours',
  },
  {
    id: 'nfLIc4cjDRQ',
    title: 'Deep Concentration',
    description: 'Beta Waves • 1 hour',
  },
  {
    id: 'MYM7CFh3YAI',
    title: 'Study Session',
    description: 'Gamma Waves • 2.5 hours',
  },
];

// Add global interface for window to include YouTube API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}
