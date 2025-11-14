import { X, Play } from "lucide-react";
import { useState, useEffect } from "react";

interface PlaylistTrack {
  id: string;
  title: string;
  youtubeUrl: string;
  duration?: string;
}

interface PlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_TRACKS: PlaylistTrack[] = [
  {
    id: "1",
    title: "Nebula Dreams",
    youtubeUrl: "https://www.youtube.com/embed/jgpJVI3tDT0",
    duration: "7:45",
  },
  {
    id: "2",
    title: "Void Echo",
    youtubeUrl: "https://www.youtube.com/embed/1La4QzGeaaQ",
    duration: "6:32",
  },
  {
    id: "3",
    title: "Cosmic Drift",
    youtubeUrl: "https://www.youtube.com/embed/TqOneWeDtFI",
    duration: "8:12",
  },
  {
    id: "4",
    title: "Star Light",
    youtubeUrl: "https://www.youtube.com/embed/lFcSrYw-ARY",
    duration: "5:48",
  },
];

const STORAGE_KEY = "cosmic-playlist-tracks";

export default function PlaylistModal({ isOpen, onClose }: PlaylistModalProps) {
  const [tracks, setTracks] = useState<PlaylistTrack[]>(DEFAULT_TRACKS);
  const [currentTrack, setCurrentTrack] = useState<PlaylistTrack | null>(null);

  // Load tracks from localStorage on mount and when modal opens
  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const loadedTracks = JSON.parse(saved);
          setTracks(loadedTracks.length > 0 ? loadedTracks : DEFAULT_TRACKS);
        } catch (e) {
          console.error("Failed to load tracks:", e);
          setTracks(DEFAULT_TRACKS);
        }
      } else {
        setTracks(DEFAULT_TRACKS);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const playTrack = (track: PlaylistTrack) => {
    setCurrentTrack(track);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md max-h-[80vh] bg-cosmic-dark border border-cosmic-purple/30 rounded-2xl shadow-2xl z-50 flex flex-col cosmic-glow">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-cosmic-purple/20">
          <h2 className="text-2xl font-bold text-gray-100">
            Full Audio Playlist
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-cosmic-purple/20 rounded-lg transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-cosmic-purple" />
          </button>
        </div>

        {/* Scrollable Playlist */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-3">
            {PLAYLIST_TRACKS.map((track, index) => (
              <div
                key={track.id}
                className="p-4 rounded-lg border border-cosmic-purple/20 bg-cosmic-purple/5 hover:border-cosmic-purple/40 hover:bg-cosmic-purple/10 transition cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-semibold text-cosmic-purple/60 w-6">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-sm font-semibold text-gray-100 group-hover:text-cosmic-purple transition">
                        {track.title}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-500 ml-9">{track.artist}</p>
                  </div>
                  <span className="text-xs text-gray-400 font-mono ml-4 flex-shrink-0">
                    {track.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-cosmic-purple/20">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-cosmic-purple to-cosmic-violet text-cosmic-dark font-semibold hover:cosmic-glow transition"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
