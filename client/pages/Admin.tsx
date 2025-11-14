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

  const [cosmicVideos, setCosmicVideos] = useState<string[]>(() => {
    const saved = localStorage.getItem("cosmic-videos");
    return saved ? JSON.parse(saved) : ["", "", "", ""];
  });

  const [playlistVideos, setPlaylistVideos] = useState<string[]>(() => {
    const saved = localStorage.getItem("playlist-videos");
    return saved ? JSON.parse(saved) : ["", "", "", ""];
  });

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
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{10,12})/,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]{10,12})/,
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

  const saveAmbientTracks = (newTracks: AmbientTrack[]) => {
    setAmbientTracks(newTracks);
    localStorage.setItem(AMBIENT_STORAGE_KEY, JSON.stringify(newTracks));
  };

  const addAmbientTrack = () => {
    if (!newAmbientTitle.trim() || !newAmbientUrl.trim()) {
      alert("Пожалуйста, ��аполните название и ссылку");
      return;
    }

    const videoId = extractVideoId(newAmbientUrl);
    if (!videoId) {
      alert("Непра��ильная ссылка на YouTube");
      return;
    }

    const newTrack: AmbientTrack = {
      id: Date.now().toString(),
      title: newAmbientTitle,
      youtubeUrl: `https://www.youtube.com/embed/${videoId}`
    };

    saveAmbientTracks([...ambientTracks, newTrack]);
    setNewAmbientTitle("");
    setNewAmbientUrl("");
    alert("Трек добавлен!");
  };

  const deleteAmbientTrack = (id: string) => {
    const newTracks = ambientTracks.filter(t => t.id !== id);
    saveAmbientTracks(newTracks);
    if (currentAmbientTrack?.id === id) {
      setCurrentAmbientTrack(newTracks[0] || null);
    }
  };

  const saveCosmicVideo = (index: number, url: string) => {
    const updated = [...cosmicVideos];
    updated[index] = url;
    setCosmicVideos(updated);
    localStorage.setItem("cosmic-videos", JSON.stringify(updated));
  };

  const savePlaylistVideo = (index: number, url: string) => {
    const updated = [...playlistVideos];
    updated[index] = url;
    setPlaylistVideos(updated);
    localStorage.setItem("playlist-videos", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-cosmic-dark text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cosmic-purple to-cosmic-violet bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-gray-400">Manage your cosmic content</p>
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

        <Tabs defaultValue="playlist" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-cosmic-purple/10 border border-cosmic-purple/30 rounded-lg p-1">
            <TabsTrigger value="ambient" className="data-[state=active]:bg-cosmic-purple/30 data-[state=active]:text-cosmic-purple">
              <Music className="w-4 h-4 mr-2" />
              Ambient Music
            </TabsTrigger>
            <TabsTrigger value="links" className="data-[state=active]:bg-cosmic-purple/30 data-[state=active]:text-cosmic-purple">
              Cosmic Ambient
            </TabsTrigger>
          </TabsList>


          <TabsContent value="ambient" className="mt-8">
            {/* Ambient Music Player */}
            <div className="space-y-6">
              {/* Current Player */}
              {currentAmbientTrack ? (
                <div className="bg-cosmic-purple/5 border border-cosmic-purple/30 rounded-2xl p-6">
                  <h2 className="text-xl font-bold mb-4 text-cosmic-purple">Now Playing</h2>
                  <h3 className="text-lg font-semibold text-gray-100 mb-4">{currentAmbientTrack.title}</h3>

                  <div className="rounded-lg overflow-hidden border border-cosmic-purple/30 bg-black mb-6 aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={currentAmbientTrack.youtubeUrl}
                      title={currentAmbientTrack.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm text-gray-400">Volume</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={ambientVolume}
                      onChange={(e) => setAmbientVolume(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="text-sm text-gray-400">{ambientVolume}%</div>
                  </div>
                </div>
              ) : null}

              {/* Add New Ambient Track */}
              <div className="bg-cosmic-purple/5 border border-cosmic-purple/30 rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4 text-cosmic-purple">Add Ambient Track</h2>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2">Title</label>
                    <input
                      type="text"
                      value={newAmbientTitle}
                      onChange={(e) => setNewAmbientTitle(e.target.value)}
                      placeholder="e.g., Deep Space Ambient"
                      className="w-full px-3 py-2 rounded bg-cosmic-dark border border-cosmic-purple/30 text-gray-100 placeholder-gray-600 text-sm focus:outline-none focus:border-cosmic-purple transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2">YouTube Link</label>
                    <input
                      type="text"
                      value={newAmbientUrl}
                      onChange={(e) => setNewAmbientUrl(e.target.value)}
                      placeholder="youtube.com/watch?v=... или youtu.be/..."
                      className="w-full px-3 py-2 rounded bg-cosmic-dark border border-cosmic-purple/30 text-gray-100 placeholder-gray-600 text-sm focus:outline-none focus:border-cosmic-purple transition"
                    />
                  </div>
                </div>
                <button
                  onClick={addAmbientTrack}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-cosmic-purple to-cosmic-violet text-cosmic-dark font-semibold hover:opacity-90 transition"
                >
                  <Plus className="w-5 h-5" />
                  Add Ambient Track
                </button>
              </div>

              {/* Ambient Tracks List */}
              <div>
                <h2 className="text-xl font-bold mb-4 text-cosmic-purple">Available Ambient Tracks ({ambientTracks.length})</h2>
                <div className="space-y-3">
                  {ambientTracks.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No ambient tracks added yet.</p>
                  ) : (
                    ambientTracks.map((track) => (
                      <div
                        key={track.id}
                        className="bg-cosmic-purple/5 border border-cosmic-purple/30 rounded-lg p-4 hover:border-cosmic-purple/50 transition flex items-center justify-between"
                      >
                        <button
                          onClick={() => setCurrentAmbientTrack(track)}
                          className="flex-1 text-left hover:text-cosmic-purple transition"
                        >
                          <h3 className={`font-semibold mb-1 ${
                            currentAmbientTrack?.id === track.id ? "text-cosmic-purple" : "text-gray-100"
                          }`}>
                            {track.title}
                          </h3>
                          <p className="text-xs text-gray-500 truncate">{track.youtubeUrl}</p>
                        </button>
                        <button
                          onClick={() => deleteAmbientTrack(track.id)}
                          className="p-2 rounded hover:bg-red-600/20 text-red-400 transition ml-4"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="p-4 rounded-lg bg-cosmic-purple/10 border border-cosmic-purple/30 space-y-2">
                <p className="text-sm text-gray-400">
                  💡 <strong>Tip:</strong> All changes are saved automatically in your browser.
                </p>
                <p className="text-xs text-gray-500">
                  • Use YouTube links (youtube.com/watch?v=... or youtu.be/...)<br/>
                  • Click on a track to play it<br/>
                  • Adjust volume with the slider
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="links" className="mt-8">
            {/* Cosmic Ambient Videos - 4 Windows */}
            <div className="grid grid-cols-2 gap-6">
              {cosmicVideos.map((url, index) => (
                <div key={index} className="bg-cosmic-purple/5 border border-cosmic-purple/30 rounded-2xl p-6 flex flex-col">
                  <h3 className="text-sm font-semibold text-cosmic-purple mb-3">Video {index + 1}</h3>
                  <textarea
                    value={url}
                    onChange={(e) => saveCosmicVideo(index, e.target.value)}
                    placeholder="youtube.com/watch?v=xxx или youtu.be/yyy"
                    className="flex-1 px-3 py-2 rounded bg-cosmic-dark border border-cosmic-purple/30 text-gray-100 placeholder-gray-600 text-xs focus:outline-none focus:border-cosmic-purple transition font-mono resize-none"
                  />
                </div>
              ))}
            </div>

            {/* Info */}
            <div className="mt-8 p-4 rounded-lg bg-cosmic-purple/10 border border-cosmic-purple/30 space-y-2">
              <p className="text-sm text-gray-400">
                💡 <strong>Tip:</strong> Paste YouTube link and it will appear on the main page
              </p>
              <p className="text-xs text-gray-500">
                • One link per window<br/>
                • Supports youtube.com/watch?v=... and youtu.be/...<br/>
                • Changes save automatically
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
