interface HourglassTimerProps {
  percentage: number; // 0 to 1, where 1 is complete
  mode: "focus" | "break";
}

const HourglassTimer = ({ percentage, mode }: HourglassTimerProps) => {
  const sandColor = mode === "focus" ? "#6B9FE8" : "#B8B5A8";
  const accentColor = mode === "focus" ? "#4A7BC8" : "#9C998A";

  // Sand starts full at top, empties to bottom
  const topSandHeight = (1 - percentage) * 70;
  const bottomSandHeight = percentage * 70;

  return (
    <div className="relative w-64 h-80 mx-auto">
      <svg
        viewBox="0 0 200 300"
        className="w-full h-full filter drop-shadow-md"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Ghibli-style sand gradient - soft and dreamy */}
          <radialGradient id="ghibliSand" cx="45%" cy="35%">
            <stop offset="0%" stopColor={sandColor} stopOpacity="1" />
            <stop offset="60%" stopColor={sandColor} stopOpacity="0.9" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.8" />
          </radialGradient>

          {/* Magical sparkle gradient */}
          <radialGradient id="sparkle">
            <stop offset="0%" stopColor="#FFFACD" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FFE4B5" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFF8DC" stopOpacity="0" />
          </radialGradient>

          {/* Glass highlight */}
          <linearGradient id="glassHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.4" />
            <stop offset="50%" stopColor="white" stopOpacity="0.15" />
            <stop offset="100%" stopColor="white" stopOpacity="0.3" />
          </linearGradient>

          {/* Clip paths - rounded bulb shapes */}
          <clipPath id="topChamber">
            <path d="M 70 38 L 130 38 Q 132 40 132 45 L 132 58 Q 132 68 122 78 L 105 88 L 100 98 L 95 88 L 78 78 Q 68 68 68 58 L 68 45 Q 68 40 70 38 Z" />
          </clipPath>

          <clipPath id="bottomChamber">
            <path d="M 70 262 L 130 262 Q 132 260 132 255 L 132 242 Q 132 232 122 222 L 105 212 L 100 202 L 95 212 L 78 222 Q 68 232 68 242 L 68 255 Q 68 260 70 262 Z" />
          </clipPath>
        </defs>

        {/* Wooden base - bottom */}
        <g>
          <rect x="60" y="268" width="80" height="14" fill="#8B6F47" rx="3" />
          <rect x="62" y="270" width="76" height="10" fill="#A0826D" rx="2" />
          <path d="M 65 274 Q 100 276 135 274" stroke="#C9A882" strokeWidth="1.5" fill="none" opacity="0.6" />
        </g>

        {/* Wooden base - top */}
        <g>
          <rect x="60" y="18" width="80" height="14" fill="#8B6F47" rx="3" />
          <rect x="62" y="20" width="76" height="10" fill="#A0826D" rx="2" />
          <path d="M 65 24 Q 100 22 135 24" stroke="#C9A882" strokeWidth="1.5" fill="none" opacity="0.6" />
        </g>

        {/* Glass bulb - top chamber */}
        <g>
          {/* Main glass fill with subtle blue tint */}
          <path
            d="M 70 38 L 130 38 Q 132 40 132 45 L 132 58 Q 132 68 122 78 L 105 88 L 100 98 L 95 88 L 78 78 Q 68 68 68 58 L 68 45 Q 68 40 70 38 Z"
            fill="currentColor"
            className="text-sky-100/20"
          />
          {/* Glass outline - hand-drawn Ghibli style */}
          <path
            d="M 70 38 L 130 38 Q 132 40 132 45 L 132 58 Q 132 68 122 78 L 105 88 L 100 98 L 95 88 L 78 78 Q 68 68 68 58 L 68 45 Q 68 40 70 38 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-slate-700 dark:text-slate-400"
            opacity="0.7"
          />
        </g>

        {/* Glass bulb - bottom chamber */}
        <g>
          {/* Main glass fill */}
          <path
            d="M 70 262 L 130 262 Q 132 260 132 255 L 132 242 Q 132 232 122 222 L 105 212 L 100 202 L 95 212 L 78 222 Q 68 232 68 242 L 68 255 Q 68 260 70 262 Z"
            fill="currentColor"
            className="text-sky-100/20"
          />
          {/* Glass outline */}
          <path
            d="M 70 262 L 130 262 Q 132 260 132 255 L 132 242 Q 132 232 122 222 L 105 212 L 100 202 L 95 212 L 78 222 Q 68 232 68 242 L 68 255 Q 68 260 70 262 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-slate-700 dark:text-slate-400"
            opacity="0.7"
          />
        </g>

        {/* Neck - hand-drawn style */}
        <rect
          x="95"
          y="98"
          width="10"
          height="104"
          fill="currentColor"
          className="text-sky-100/20"
          rx="1"
        />
        <rect
          x="95"
          y="98"
          width="10"
          height="104"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-slate-700 dark:text-slate-400"
          opacity="0.5"
          rx="1"
        />

        {/* Top sand with Ghibli gradient */}
        <g clipPath="url(#topChamber)">
          <rect
            x="70"
            y={98 - topSandHeight}
            width="60"
            height={topSandHeight}
            fill="url(#ghibliSand)"
            className="transition-all duration-1000 ease-linear"
          />
        </g>

        {/* Bottom sand with Ghibli gradient */}
        <g clipPath="url(#bottomChamber)">
          <rect
            x="70"
            y={262 - bottomSandHeight}
            width="60"
            height={bottomSandHeight}
            fill="url(#ghibliSand)"
            className="transition-all duration-1000 ease-linear"
          />
        </g>

        {/* Magical falling sand stream - Ghibli style */}
        {percentage > 0 && percentage < 1 && (
          <g>
            {/* Main stream with glow */}
            <line
              x1="100"
              y1="98"
              x2="100"
              y2="202"
              stroke={sandColor}
              strokeWidth="3"
              opacity="0.6"
              strokeLinecap="round"
            >
              <animate
                attributeName="opacity"
                values="0.4;0.7;0.4"
                dur="2s"
                repeatCount="indefinite"
              />
            </line>

            {/* Sparkles falling with the sand */}
            {[...Array(6)].map((_, i) => (
              <circle
                key={`sparkle-${i}`}
                cx={96 + (i % 2) * 8}
                cy="98"
                r="2"
                fill="url(#sparkle)"
              >
                <animate
                  attributeName="cy"
                  values="98;202"
                  dur={`${2 + i * 0.3}s`}
                  begin={`${i * 0.4}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;0.5;0"
                  dur={`${2 + i * 0.3}s`}
                  begin={`${i * 0.4}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </g>
        )}
      </svg>

      {/* Completion indicator - Ghibli style */}
      {percentage >= 1 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative">
            <div className="text-7xl animate-bounce">⏰</div>
            {/* Magical sparkles around completion */}
            <div className="absolute -top-4 -left-4 text-2xl animate-ping">✨</div>
            <div className="absolute -top-4 -right-4 text-2xl animate-ping delay-100">✨</div>
            <div className="absolute -bottom-4 left-1/2 text-2xl animate-ping delay-200">✨</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HourglassTimer;
