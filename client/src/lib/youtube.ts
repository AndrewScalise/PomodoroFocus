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
    id: 'oirRMykdd5E',
    title: '40 Hz Brain Activation',
    description: 'Gamma Waves',
  },
  {
    id: 'wOGa3w9jS2k',
    title: 'Super Intelligence Alpha Waves',
    description: 'SUPER INTELLIGENCE 🧠 ALPHA WAVES',
  },
  {
    id: 'EEINHtysOdI',
    title: 'Mugen',
    description: 'MUGEN 「 無限 」 ☯ japanese lofi hip hop mix ☯',
  },
  {
    id: 'jfKfPfyJRdk',
    title: 'Lofi Girl',
    description: 'Chill beats to focus',
  },
];

// Add global interface for window to include YouTube API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}
