import { useState } from "react";

export default function BackgroundArtSelector() {
  const [selectedArt, setSelectedArt] = useState(0);

  const artOptions = [
    {
      id: 0,
      name: "Milky Way",
      thumbnail: "linear-gradient(135deg, #6a2d7f 0%, #3d1a4a 100%)",
    },
    {
      id: 1,
      name: "Nebula Dream",
      thumbnail: "linear-gradient(135deg, #1a0033 0%, #4d0066 100%)",
    },
    {
      id: 2,
      name: "Cosmic Void",
      thumbnail: "linear-gradient(135deg, #0a0a1a 0%, #2a1a4a 100%)",
    },
  ];

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-400 font-medium hidden sm:inline">
        Background
      </span>
      <div className="flex gap-2">
        {artOptions.map((art) => (
          <button
            key={art.id}
            onClick={() => setSelectedArt(art.id)}
            title={art.name}
            className={`w-10 h-10 rounded-lg transition-all duration-300 border-2 ${
              selectedArt === art.id
                ? "border-cosmic-purple cosmic-glow scale-110"
                : "border-cosmic-purple/40 hover:border-cosmic-purple/70 hover:scale-105"
            }`}
            style={{
              background: art.thumbnail,
            }}
            aria-label={`Select ${art.name} background`}
          >
            <span className="sr-only">{art.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
