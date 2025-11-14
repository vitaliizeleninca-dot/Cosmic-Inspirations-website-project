import { X } from "lucide-react";
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

const DEFAULT_TRACKS: PlaylistTrack[] = [];

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
          // Set first track as current if none selected
          if (!currentTrack && loadedTracks.length > 0) {
            setCurrentTrack(loadedTracks[0]);
          }
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

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] bg-cosmic-dark border border-cosmic-purple/30 rounded-2xl shadow-2xl z-50 flex flex-col cosmic-glow overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-cosmic-purple/20">
          <h2 className="text-2xl font-bold text-gray-100">
            Audio Playlist
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-cosmic-purple/20 rounded-lg transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-cosmic-purple" />
          </button>
        </div>

        {/* Player Area */}
        {currentTrack ? (
          <div className="p-6 border-b border-cosmic-purple/20 bg-cosmic-purple/10">
            <p className="text-xs text-cosmic-purple font-semibold mb-3">
              NOW PLAYING
            </p>
            <h3 className="text-lg font-semibold text-gray-100 mb-4 truncate">
              {currentTrack.title}
            </h3>

            {/* Compact YouTube Player */}
            <div className="rounded-lg overflow-hidden border border-cosmic-purple/30 bg-black">
              <iframe
                width="100%"
                height="200"
                src={`${currentTrack.youtubeUrl}?controls=1&modestbranding=1`}
                title={currentTrack.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                style={{
                  display: "block",
                  background: "#000"
                }}
              />
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-400">
            Select a track to play
          </div>
        )}

        {/* Scrollable Playlist */}
        <div className="flex-1 overflow-y-auto p-6">
          <p className="text-xs text-cosmic-purple font-semibold mb-4">
            PLAYLIST ({tracks.length})
          </p>
          <div className="space-y-2">
            {tracks.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No tracks added. Add tracks in the admin panel.
              </p>
            ) : (
              tracks.map((track, index) => (
                <button
                  key={track.id}
                  onClick={() => setCurrentTrack(track)}
                  className={`w-full text-left p-3 rounded-lg border transition ${
                    currentTrack?.id === track.id
                      ? "border-cosmic-purple/60 bg-cosmic-purple/20"
                      : "border-cosmic-purple/20 bg-cosmic-purple/5 hover:border-cosmic-purple/40 hover:bg-cosmic-purple/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-cosmic-purple/60 w-6 text-center flex-shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-100 truncate">
                        {track.title}
                      </h3>
                    </div>
                    {track.duration && track.duration !== "0:00" && (
                      <span className="text-xs text-gray-400 font-mono flex-shrink-0">
                        {track.duration}
                      </span>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-cosmic-purple/20 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-cosmic-purple to-cosmic-violet text-cosmic-dark font-semibold hover:cosmic-glow transition"
          >
            Close
          </button>
          <a
            href="/admin"
            className="flex-1 px-4 py-2 rounded-lg border border-cosmic-purple/50 text-cosmic-purple font-semibold hover:border-cosmic-purple hover:cosmic-glow transition text-center"
          >
            Manage
          </a>
        </div>
      </div>
    </>
  );
}
