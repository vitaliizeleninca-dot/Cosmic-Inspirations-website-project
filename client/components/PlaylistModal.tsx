import { X, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface PlaylistTrack {
  id: string;
  title: string;
  audioUrl: string;
  duration?: string;
}

interface PlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_TRACKS: PlaylistTrack[] = [];

const STORAGE_KEY = "cosmic-playlist-tracks";

export default function PlaylistModal({ isOpen, onClose }: PlaylistModalProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [tracks, setTracks] = useState<PlaylistTrack[]>(DEFAULT_TRACKS);
  const [currentTrack, setCurrentTrack] = useState<PlaylistTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [volumeBeforeMute, setVolumeBeforeMute] = useState(70);

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

  // Handle current track change
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      // For demo purposes, we'll use a silent audio or placeholder
      // In production, you would use currentTrack.audioUrl
      audioRef.current.src = currentTrack.audioUrl || "";
      if (isPlaying) {
        audioRef.current.play().catch((e) => {
          console.log(
            "Playback failed (audio URL not configured):",
            e
          );
        });
      }
    }
  }, [currentTrack]);

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((e) => {
        console.log("Playback failed:", e);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handle volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  // Update progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrack, tracks]);

  if (!isOpen) return null;

  const playTrack = (track: PlaylistTrack) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setProgress(0);
  };

  const togglePlay = () => {
    if (!currentTrack && tracks.length > 0) {
      playTrack(tracks[0]);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(volumeBeforeMute);
    } else {
      setVolumeBeforeMute(volume);
      setIsMuted(true);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = (parseFloat(e.target.value) / 100) * duration;
      audioRef.current.currentTime = newTime;
      setProgress(parseFloat(e.target.value));
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${String(secs).padStart(2, "0")}`;
  };

  const nextTrack = () => {
    if (!currentTrack) return;
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    if (currentIndex < tracks.length - 1) {
      playTrack(tracks[currentIndex + 1]);
    }
  };

  const prevTrack = () => {
    if (!currentTrack) return;
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    if (currentIndex > 0) {
      playTrack(tracks[currentIndex - 1]);
    }
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

        {/* Audio Player */}
        <div className="p-6 border-b border-cosmic-purple/20 bg-cosmic-purple/10">
          <p className="text-xs text-cosmic-purple font-semibold mb-3">
            NOW PLAYING
          </p>
          {currentTrack ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-100 truncate">
                {currentTrack.title}
              </h3>

              {/* YouTube Player (Audio Only) */}
              <div className="bg-black rounded-lg overflow-hidden border border-cosmic-purple/30">
                <iframe
                  width="100%"
                  height="100"
                  src={`${currentTrack.youtubeUrl}?controls=1&modestbranding=1`}
                  title={currentTrack.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    display: "block",
                    background: "#000"
                  }}
                />
              </div>

              {/* Player Controls */}
              <div className="bg-cosmic-dark/50 rounded-xl p-6 space-y-4 border border-cosmic-purple/30">
                {/* Control Buttons */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={prevTrack}
                    disabled={!currentTrack || tracks.findIndex((t) => t.id === currentTrack.id) === 0}
                    className="p-2 rounded-lg hover:bg-cosmic-purple/20 text-cosmic-purple disabled:opacity-50 disabled:cursor-not-allowed transition"
                    title="Предыдущий трек"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>

                  <button
                    onClick={nextTrack}
                    disabled={!currentTrack || tracks.findIndex((t) => t.id === currentTrack.id) === tracks.length - 1}
                    className="p-2 rounded-lg hover:bg-cosmic-purple/20 text-cosmic-purple disabled:opacity-50 disabled:cursor-not-allowed transition"
                    title="Следующий трек"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>
                </div>

                {/* Info */}
                <p className="text-xs text-gray-400 text-center">
                  Используйте встроенные контролы YouTube для управления воспроизведением и громкостью
                </p>
              </div>
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
