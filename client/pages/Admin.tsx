import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Save, X, ArrowLeft, Music } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface Track {
  id: string;
  title: string;
  youtubeUrl: string;
  duration?: string;
}

const STORAGE_KEY = "cosmic-playlist-tracks";

interface AmbientTrack {
  id: string;
  title: string;
  youtubeUrl: string;
}

const DEFAULT_AMBIENT_TRACKS: AmbientTrack[] = [
  {
    id: "1",
    title: "Deep Space Ambient",
    youtubeUrl: "https://www.youtube.com/embed/jgpJVI3tDT0"
  },
  {
    id: "2",
    title: "Cosmic Meditation",
    youtubeUrl: "https://www.youtube.com/embed/1La4QzGeaaQ"
  },
  {
    id: "3",
    title: "Stellar Soundscape",
    youtubeUrl: "https://www.youtube.com/embed/TqOneWeDtFI"
  },
  {
    id: "4",
    title: "Nebula Dreams",
    youtubeUrl: "https://www.youtube.com/embed/lFcSrYw-ARY"
  }
];

const AMBIENT_STORAGE_KEY = "cosmic-ambient-tracks";

export default function Admin() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [bulkTracks, setBulkTracks] = useState<Array<{ title: string; url: string }>>(
    Array(10).fill(null).map(() => ({ title: "", url: "" }))
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editUrl, setEditUrl] = useState("");

  const [ambientTracks, setAmbientTracks] = useState<AmbientTrack[]>(DEFAULT_AMBIENT_TRACKS);
  const [currentAmbientTrack, setCurrentAmbientTrack] = useState<AmbientTrack | null>(DEFAULT_AMBIENT_TRACKS[0]);
  const [ambientVolume, setAmbientVolume] = useState(70);
  const [newAmbientTitle, setNewAmbientTitle] = useState("");
  const [newAmbientUrl, setNewAmbientUrl] = useState("");

  // Load tracks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setTracks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load tracks:", e);
      }
    }

    const savedAmbient = localStorage.getItem(AMBIENT_STORAGE_KEY);
    if (savedAmbient) {
      try {
        const loaded = JSON.parse(savedAmbient);
        setAmbientTracks(loaded);
        if (loaded.length > 0) {
          setCurrentAmbientTrack(loaded[0]);
        }
      } catch (e) {
        console.error("Failed to load ambient tracks:", e);
      }
    }
  }, []);

  // Save tracks to localStorage
  const saveTracks = (newTracks: Track[]) => {
    setTracks(newTracks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTracks));
  };

  const extractVideoId = (url: string): string => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return "";
  };

  const addBulkTracks = () => {
    const newTracks: Track[] = [];
    let errorCount = 0;

    bulkTracks.forEach((track, index) => {
      if (!track.title.trim() || !track.url.trim()) {
        return;
      }

      const videoId = extractVideoId(track.url);
      if (!videoId) {
        errorCount++;
        console.warn(`Invalid YouTube URL for track: ${track.title}`);
        return;
      }

      newTracks.push({
        id: Date.now().toString() + index,
        title: track.title,
        youtubeUrl: `https://www.youtube.com/embed/${videoId}`,
        duration: "0:00",
      });
    });

    if (newTracks.length === 0) {
      alert("Please fill at least one field with a track title and valid YouTube link");
      return;
    }

    if (errorCount > 0) {
      alert(`${errorCount} links were skipped - check the YouTube link format`);
    }

    saveTracks([...tracks, ...newTracks]);
    setBulkTracks(Array(10).fill(null).map(() => ({ title: "", url: "" })));
    alert(`Added ${newTracks.length} tracks!`);
  };

  const updateBulkTrack = (index: number, field: "title" | "url", value: string) => {
    const updated = [...bulkTracks];
    updated[index] = { ...updated[index], [field]: value };
    setBulkTracks(updated);
  };

  const deleteTrack = (id: string) => {
    saveTracks(tracks.filter((t) => t.id !== id));
  };

  const startEdit = (track: Track) => {
    setEditingId(track.id);
    setEditTitle(track.title);
    setEditUrl(track.youtubeUrl);
  };

  const saveEdit = () => {
    if (!editTitle.trim()) {
      alert("Введите название трека");
      return;
    }

    saveTracks(
      tracks.map((t) =>
        t.id === editingId ? { ...t, title: editTitle } : t
      )
    );
    setEditingId(null);
    setEditTitle("");
    setEditUrl("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditUrl("");
  };

  return (
    <div className="min-h-screen bg-cosmic-dark text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cosmic-purple to-cosmic-violet bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-gray-400">Manage playlist tracks</p>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cosmic-purple/50 text-cosmic-purple hover:border-cosmic-purple hover:bg-cosmic-purple/10 transition"
            title="Вернуться на главную"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Add 10 Tracks Form */}
        <div className="bg-cosmic-purple/5 border border-cosmic-purple/30 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-2 text-cosmic-purple">
            Add up to 10 tracks at once
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Add track titles and YouTube links. Empty fields will be skipped.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {bulkTracks.map((track, index) => (
              <div key={index} className="space-y-3 p-4 rounded-lg bg-cosmic-dark/50 border border-cosmic-purple/20">
                <div className="text-xs font-semibold text-cosmic-purple mb-2">
                  Трек #{index + 1}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={track.title}
                    onChange={(e) => updateBulkTrack(index, "title", e.target.value)}
                    placeholder="Например: Nebula Dreams"
                    className="w-full px-3 py-2 rounded bg-cosmic-dark border border-cosmic-purple/30 text-gray-100 placeholder-gray-600 text-sm focus:outline-none focus:border-cosmic-purple transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2">
                    YouTube Link
                  </label>
                  <input
                    type="text"
                    value={track.url}
                    onChange={(e) => updateBulkTrack(index, "url", e.target.value)}
                    placeholder="youtube.com/watch?v=... или youtu.be/..."
                    className="w-full px-3 py-2 rounded bg-cosmic-dark border border-cosmic-purple/30 text-gray-100 placeholder-gray-600 text-sm focus:outline-none focus:border-cosmic-purple transition"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addBulkTracks}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-cosmic-purple to-cosmic-violet text-cosmic-dark font-semibold hover:opacity-90 transition"
          >
            <Plus className="w-5 h-5" />
            Add All Filled Tracks
          </button>
        </div>

        {/* Tracks List */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-cosmic-purple">
            Current Tracks ({tracks.length})
          </h2>
          <div className="space-y-3">
            {tracks.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No tracks added yet. Add your first track above.
              </p>
            ) : (
              tracks.map((track) => (
                <div
                  key={track.id}
                  className="bg-cosmic-purple/5 border border-cosmic-purple/30 rounded-lg p-4 hover:border-cosmic-purple/50 transition"
                >
                  {editingId === track.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full px-3 py-2 rounded bg-cosmic-dark border border-cosmic-purple/50 text-gray-100 focus:outline-none focus:border-cosmic-purple"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={saveEdit}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded bg-green-600/20 border border-green-600/50 text-green-400 hover:bg-green-600/30 transition text-sm"
                        >
                          <Save className="w-4 h-4" />
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded bg-gray-600/20 border border-gray-600/50 text-gray-400 hover:bg-gray-600/30 transition text-sm"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-100 mb-1">
                          {track.title}
                        </h3>
                        <p className="text-xs text-gray-500 truncate">
                          {track.youtubeUrl}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => startEdit(track)}
                          className="p-2 rounded hover:bg-cosmic-purple/20 text-cosmic-purple transition"
                          title="Edit"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => deleteTrack(track.id)}
                          className="p-2 rounded hover:bg-red-600/20 text-red-400 transition"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 p-4 rounded-lg bg-cosmic-purple/10 border border-cosmic-purple/30 space-y-2">
          <p className="text-sm text-gray-400">
            💡 <strong>Tip:</strong> All changes are saved automatically in your browser.
          </p>
          <p className="text-xs text-gray-500">
            • Use YouTube links (youtube.com/watch?v=... or youtu.be/...)<br/>
            • Player will show only controls, video is hidden to save bandwidth<br/>
            • Audio will play with full volume control
          </p>
        </div>
      </div>
    </div>
  );
}
