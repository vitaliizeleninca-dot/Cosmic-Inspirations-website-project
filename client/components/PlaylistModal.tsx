import { X, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Shuffle, Repeat, Repeat1 } from "lucide-react";
import { useState, useEffect, useRef } from "react";

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

type PlaybackMode = "sequential" | "repeat-all" | "repeat-one" | "shuffle";

const DEFAULT_TRACKS: PlaylistTrack[] = [];

const STORAGE_KEY = "cosmic-playlist-tracks";

const PLAYBACK_MODES: Record<PlaybackMode, { label: string; icon: string }> = {
  sequential: { label: "Все по порядку", icon: "▶" },
  "repeat-all": { label: "Повторять всё", icon: "🔁" },
  "repeat-one": { label: "Повторять одно", icon: "🔂" },
  shuffle: { label: "Рандом", icon: "🔀" },
};

export default function PlaylistModal({ isOpen, onClose }: PlaylistModalProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const [tracks, setTracks] = useState<PlaylistTrack[]>(DEFAULT_TRACKS);
  const [currentTrack, setCurrentTrack] = useState<PlaylistTrack | null>(null);
  const [playbackMode, setPlaybackMode] = useState<PlaybackMode>("sequential");

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

  const nextTrack = () => {
    if (!currentTrack || tracks.length === 0) return;

    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);

    if (playbackMode === "repeat-one") {
      // Повторять текущий трек
      playTrack(currentTrack);
    } else if (playbackMode === "shuffle") {
      // Случайный трек
      const randomIndex = Math.floor(Math.random() * tracks.length);
      playTrack(tracks[randomIndex]);
    } else if (playbackMode === "repeat-all") {
      // Повторять всё - зациклить плейлист
      if (currentIndex < tracks.length - 1) {
        playTrack(tracks[currentIndex + 1]);
      } else {
        playTrack(tracks[0]);
      }
    } else {
      // sequential - просто следующий или стоп
      if (currentIndex < tracks.length - 1) {
        playTrack(tracks[currentIndex + 1]);
      }
    }
  };

  const prevTrack = () => {
    if (!currentTrack) return;
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    if (currentIndex > 0) {
      playTrack(tracks[currentIndex - 1]);
    } else if (playbackMode === "repeat-all") {
      // В режиме repeat-all, на предыдущий в конце плейлиста переходим в начало
      playTrack(tracks[tracks.length - 1]);
    }
  };

  const cyclePlaybackMode = () => {
    const modes: PlaybackMode[] = ["sequential", "repeat-all", "repeat-one", "shuffle"];
    const currentIndex = modes.indexOf(playbackMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setPlaybackMode(nextMode);
  };

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

        {/* Audio Player with YouTube */}
        <div className="p-6 border-b border-cosmic-purple/20 bg-cosmic-purple/10">
          <p className="text-xs text-cosmic-purple font-semibold mb-3">
            NOW PLAYING
          </p>
          {currentTrack ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-100 truncate">
                {currentTrack.title}
              </h3>

              {/* YouTube Player - Audio Only (Video Hidden) */}
              <div ref={playerRef} className="bg-black rounded-lg border border-cosmic-purple/30 overflow-hidden">
                <iframe
                  width="100%"
                  height="60"
                  src={`${currentTrack.youtubeUrl}?controls=1&modestbranding=1&fs=0`}
                  title={currentTrack.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  style={{
                    display: "block",
                    background: "#000"
                  }}
                />
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={prevTrack}
                  disabled={!currentTrack || tracks.findIndex((t) => t.id === currentTrack.id) === 0}
                  className="p-2 rounded-lg hover:bg-cosmic-purple/20 text-cosmic-purple disabled:opacity-50 disabled:cursor-not-allowed transition"
                  title="Предыдущий трек"
                >
                  <SkipBack className="w-5 h-5" />
                </button>

                <span className="text-xs text-gray-400">
                  {tracks.findIndex((t) => t.id === currentTrack.id) + 1} / {tracks.length}
                </span>

                <button
                  onClick={nextTrack}
                  disabled={!currentTrack || tracks.findIndex((t) => t.id === currentTrack.id) === tracks.length - 1}
                  className="p-2 rounded-lg hover:bg-cosmic-purple/20 text-cosmic-purple disabled:opacity-50 disabled:cursor-not-allowed transition"
                  title="Следующий трек"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-gray-400 text-center">
                💡 Используйте управление YouTube плеера для громкости и других функций
              </p>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">Выберите трек из плейлиста</p>
          )}
        </div>

        {/* Scrollable Playlist */}
        <div className="flex-1 overflow-y-auto p-6">
          <p className="text-xs text-cosmic-purple font-semibold mb-3">
            PLAYLIST ({tracks.length})
          </p>
          <div className="space-y-2">
            {tracks.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Нет треков. Добавьте треки в админ-панели.
              </p>
            ) : (
              tracks.map((track, index) => (
                <button
                  key={track.id}
                  onClick={() => playTrack(track)}
                  className={`w-full text-left p-3 rounded-lg border transition ${
                    currentTrack?.id === track.id
                      ? "border-cosmic-purple/60 bg-cosmic-purple/20"
                      : "border-cosmic-purple/20 bg-cosmic-purple/5 hover:border-cosmic-purple/40 hover:bg-cosmic-purple/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {currentTrack?.id === track.id && (
                      <Play className="w-4 h-4 text-cosmic-purple flex-shrink-0" />
                    )}
                    {currentTrack?.id !== track.id && (
                      <span className="text-xs text-cosmic-purple/60 w-4 text-center flex-shrink-0">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-100 truncate">
                        {track.title}
                      </h3>
                    </div>
                    {track.duration && (
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
            Закрыть
          </button>
          <a
            href="/admin"
            className="flex-1 px-4 py-2 rounded-lg border border-cosmic-purple/50 text-cosmic-purple font-semibold hover:border-cosmic-purple hover:cosmic-glow transition text-center"
          >
            Управление
          </a>
        </div>
      </div>
    </>
  );
}
