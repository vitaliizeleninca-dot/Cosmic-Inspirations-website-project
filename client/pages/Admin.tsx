import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Save, X, ArrowLeft, Music, Podcast } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface Track {
  id: string;
  title: string;
  youtubeUrl: string;
  duration?: string;
}

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

const STORAGE_KEY = "cosmic-playlist-tracks";
const AMBIENT_STORAGE_KEY = "cosmic-ambient-tracks";

interface AdminPageProps {}

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

  const [playlistSongs, setPlaylistSongs] = useState<Array<{ title: string; url: string }>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const loaded = JSON.parse(saved);
        const songs = loaded.map((track: Track) => ({ title: track.title, url: track.youtubeUrl }));
        while (songs.length < 10) {
          songs.push({ title: "", url: "" });
        }
        return songs.slice(0, 10);
      } catch (e) {
        return Array(10).fill(null).map(() => ({ title: "", url: "" }));
      }
    }
    return Array(10).fill(null).map(() => ({ title: "", url: "" }));
  });

  const [feelCosmosVideos, setFeelCosmosVideos] = useState<string[]>(() => {
    const saved = localStorage.getItem("feel-cosmos-videos");
    return saved ? JSON.parse(saved) : ["", "", "", ""];
  });

  const [feelCosmosSongs, setFeelCosmosSongs] = useState<Array<{ title: string; url: string }>>(() => {
    const saved = localStorage.getItem("feel-cosmos-songs");
    if (saved) {
      try {
        const loaded = JSON.parse(saved);
        const songs = loaded.map((track: Track) => ({ title: track.title, url: track.youtubeUrl }));
        while (songs.length < 10) {
          songs.push({ title: "", url: "" });
        }
        return songs.slice(0, 10);
      } catch (e) {
        return Array(10).fill(null).map(() => ({ title: "", url: "" }));
      }
    }
    return Array(10).fill(null).map(() => ({ title: "", url: "" }));
  });

  const [podcastVideos, setPodcastVideos] = useState<string[]>(() => {
    const saved = localStorage.getItem("podcast-videos");
    return saved ? JSON.parse(saved) : ["", "", "", ""];
  });

  const [activePodcastVideosList, setActivePodcastVideosList] = useState<boolean[]>(() => {
    const saved = localStorage.getItem("podcast-videos-list-active");
    return saved ? JSON.parse(saved) : [true, true, true, true];
  });

  // Activation state for sections
  const [activeCosmicVideosList, setActiveCosmicVideosList] = useState<boolean[]>(() => {
    const saved = localStorage.getItem("cosmic-videos-list-active");
    return saved ? JSON.parse(saved) : [true, true, true, true];
  });

  const [activePlaylistVideos, setActivePlaylistVideos] = useState<boolean>(() => {
    const saved = localStorage.getItem("playlist-videos-active");
    return saved ? JSON.parse(saved) : true;
  });

  const [activePlaylistSongs, setActivePlaylistSongs] = useState<boolean>(() => {
    const saved = localStorage.getItem("playlist-songs-active");
    return saved ? JSON.parse(saved) : true;
  });

  const [activeFeelCosmosVideosList, setActiveFeelCosmosVideosList] = useState<boolean[]>(() => {
    const saved = localStorage.getItem("feel-cosmos-videos-list-active");
    return saved ? JSON.parse(saved) : [true, true, true, true];
  });

  const [activeFeelCosmosSongs, setActiveFeelCosmosSongs] = useState<boolean>(() => {
    const saved = localStorage.getItem("feel-cosmos-songs-active");
    return saved ? JSON.parse(saved) : true;
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
      alert("Please enter a track title");
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

  const updatePlaylistSong = (index: number, field: "title" | "url", value: string) => {
    const updated = [...playlistSongs];
    updated[index] = { ...updated[index], [field]: value };
    setPlaylistSongs(updated);

    // Auto-save to localStorage
    const newTracks: Track[] = [];
    updated.forEach((song, idx) => {
      if (!song.title.trim() || !song.url.trim()) {
        return;
      }

      const videoId = extractVideoId(song.url);
      if (!videoId) {
        return;
      }

      newTracks.push({
        id: Date.now().toString() + idx,
        title: song.title,
        youtubeUrl: `https://www.youtube.com/embed/${videoId}`,
        duration: "0:00",
      });
    });

    saveTracks(newTracks);
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

  const saveFeelCosmosVideo = (index: number, url: string) => {
    const updated = [...feelCosmosVideos];
    updated[index] = url;
    setFeelCosmosVideos(updated);
    localStorage.setItem("feel-cosmos-videos", JSON.stringify(updated));
  };

  const updateFeelCosmosSong = (index: number, field: "title" | "url", value: string) => {
    const updated = [...feelCosmosSongs];
    updated[index] = { ...updated[index], [field]: value };
    setFeelCosmosSongs(updated);

    // Auto-save to localStorage
    const newTracks: Track[] = [];
    updated.forEach((song, idx) => {
      if (!song.title.trim() || !song.url.trim()) {
        return;
      }

      const videoId = extractVideoId(song.url);
      if (!videoId) {
        return;
      }

      newTracks.push({
        id: Date.now().toString() + idx,
        title: song.title,
        youtubeUrl: `https://www.youtube.com/embed/${videoId}`,
        duration: "0:00",
      });
    });

    localStorage.setItem("feel-cosmos-songs", JSON.stringify(newTracks));
  };

  const saveAmbientTracks = (newTracks: AmbientTrack[]) => {
    setAmbientTracks(newTracks);
    localStorage.setItem(AMBIENT_STORAGE_KEY, JSON.stringify(newTracks));
  };

  const addAmbientTrack = () => {
    if (!newAmbientTitle.trim() || !newAmbientUrl.trim()) {
      alert("Please fill in both title and YouTube link");
      return;
    }

    const videoId = extractVideoId(newAmbientUrl);
    if (!videoId) {
      alert("Invalid YouTube link format");
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
    alert("Track added!");
  };

  const deleteAmbientTrack = (id: string) => {
    const newTracks = ambientTracks.filter(t => t.id !== id);
    saveAmbientTracks(newTracks);
    if (currentAmbientTrack?.id === id) {
      setCurrentAmbientTrack(newTracks[0] || null);
    }
  };

  const savePodcastVideo = (index: number, url: string) => {
    const updated = [...podcastVideos];
    updated[index] = url;
    setPodcastVideos(updated);
    localStorage.setItem("podcast-videos", JSON.stringify(updated));
  };

  const toggleCosmicVideoActive = (index: number, isActive: boolean) => {
    const updated = [...activeCosmicVideosList];
    updated[index] = isActive;
    setActiveCosmicVideosList(updated);
    localStorage.setItem("cosmic-videos-list-active", JSON.stringify(updated));
  };

  const togglePlaylistVideosActive = (isActive: boolean) => {
    setActivePlaylistVideos(isActive);
    localStorage.setItem("playlist-videos-active", JSON.stringify(isActive));
  };

  const togglePlaylistSongsActive = (isActive: boolean) => {
    setActivePlaylistSongs(isActive);
    localStorage.setItem("playlist-songs-active", JSON.stringify(isActive));
  };

  const toggleFeelCosmosVideoActive = (index: number, isActive: boolean) => {
    const updated = [...activeFeelCosmosVideosList];
    updated[index] = isActive;
    setActiveFeelCosmosVideosList(updated);
    localStorage.setItem("feel-cosmos-videos-list-active", JSON.stringify(updated));
  };

  const toggleFeelCosmosSongsActive = (isActive: boolean) => {
    setActiveFeelCosmosSongs(isActive);
    localStorage.setItem("feel-cosmos-songs-active", JSON.stringify(isActive));
  };

  const togglePodcastVideoActive = (index: number, isActive: boolean) => {
    const updated = [...activePodcastVideosList];
    updated[index] = isActive;
    setActivePodcastVideosList(updated);
    localStorage.setItem("podcast-videos-list-active", JSON.stringify(updated));
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
            title="Back to home"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>

        <Tabs defaultValue="ambient" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-cosmic-purple/10 border border-cosmic-purple/30 rounded-lg p-1">
            <TabsTrigger value="ambient" className="data-[state=active]:bg-cosmic-purple/30 data-[state=active]:text-cosmic-purple">
              AI Art Podcast
            </TabsTrigger>
            <TabsTrigger value="links" className="data-[state=active]:bg-cosmic-purple/30 data-[state=active]:text-cosmic-purple">
              Cosmic Ambient
            </TabsTrigger>
            <TabsTrigger value="cosmos" className="data-[state=active]:bg-cosmic-purple/30 data-[state=active]:text-cosmic-purple">
              Feel the Cosmos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ambient" className="mt-8 space-y-8">
            {/* Podcast Videos Section */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-cosmic-purple">AI Art Podcast Videos</h2>
              <div className="grid grid-cols-2 gap-6">
                {podcastVideos.map((url, index) => (
                  <div key={index} className={`bg-cosmic-purple/5 border border-cosmic-purple/30 rounded-2xl p-6 flex flex-col ${activePodcastVideosList[index] ? "" : "opacity-50"}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-cosmic-purple">Episode {index + 1}</h3>
                      <button
                        onClick={() => togglePodcastVideoActive(index, !activePodcastVideosList[index])}
                        className={`px-3 py-1 rounded text-xs font-semibold transition ${
                          activePodcastVideosList[index]
                            ? "bg-cosmic-purple/30 text-cosmic-purple border border-cosmic-purple/50"
                            : "bg-gray-700/50 text-gray-400 border border-gray-600/50"
                        }`}
                      >
                        {activePodcastVideosList[index] ? "On" : "Off"}
                      </button>
                    </div>
                    <textarea
                      value={url}
                      onChange={(e) => savePodcastVideo(index, e.target.value)}
                      placeholder="youtube.com/watch?v=xxx or youtu.be/yyy"
                      className="flex-1 px-3 py-2 rounded bg-cosmic-dark border border-cosmic-purple/30 text-gray-100 placeholder-gray-600 text-xs focus:outline-none focus:border-cosmic-purple transition font-mono resize-none"
                      disabled={!activePodcastVideosList[index]}
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="links" className="mt-8 space-y-8">
            {/* Cosmic Ambient Videos Section */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-cosmic-purple">Cosmic Ambient Videos</h2>
              <div className="grid grid-cols-2 gap-6">
                {cosmicVideos.map((url, index) => (
                  <div key={index} className={`bg-cosmic-purple/5 border border-cosmic-purple/30 rounded-2xl p-6 flex flex-col ${activeCosmicVideosList[index] ? "" : "opacity-50"}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-cosmic-purple">Video {index + 1}</h3>
                      <button
                        onClick={() => toggleCosmicVideoActive(index, !activeCosmicVideosList[index])}
                        className={`px-3 py-1 rounded text-xs font-semibold transition ${
                          activeCosmicVideosList[index]
                            ? "bg-cosmic-purple/30 text-cosmic-purple border border-cosmic-purple/50"
                            : "bg-gray-700/50 text-gray-400 border border-gray-600/50"
                        }`}
                      >
                        {activeCosmicVideosList[index] ? "On" : "Off"}
                      </button>
                    </div>
                    <textarea
                      value={url}
                      onChange={(e) => saveCosmicVideo(index, e.target.value)}
                      placeholder="youtube.com/watch?v=xxx or youtu.be/yyy"
                      className="flex-1 px-3 py-2 rounded bg-cosmic-dark border border-cosmic-purple/30 text-gray-100 placeholder-gray-600 text-xs focus:outline-none focus:border-cosmic-purple transition font-mono resize-none"
                      disabled={!activeCosmicVideosList[index]}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Playlist Songs Section */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-cosmic-purple">Audio Playlist (up to 10 songs)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {playlistSongs.map((song, index) => (
                  <div key={index} className="space-y-3 p-4 rounded-lg bg-cosmic-dark/50 border border-cosmic-purple/20">
                    <div className="text-xs font-semibold text-cosmic-purple mb-2">
                      Song #{index + 1}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={song.title}
                        onChange={(e) => updatePlaylistSong(index, "title", e.target.value)}
                        placeholder="e.g., Cosmic Meditation"
                        className="w-full px-3 py-2 rounded bg-cosmic-dark border border-cosmic-purple/30 text-gray-100 placeholder-gray-600 text-sm focus:outline-none focus:border-cosmic-purple transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-2">
                        YouTube Link
                      </label>
                      <input
                        type="text"
                        value={song.url}
                        onChange={(e) => updatePlaylistSong(index, "url", e.target.value)}
                        placeholder="youtube.com/watch?v=... or youtu.be/..."
                        className="w-full px-3 py-2 rounded bg-cosmic-dark border border-cosmic-purple/30 text-gray-100 placeholder-gray-600 text-sm focus:outline-none focus:border-cosmic-purple transition"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cosmos" className="mt-8 space-y-8">
            {/* Feel the Cosmos Videos Section */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-cosmic-purple">Feel the Cosmos Videos</h2>
              <div className="grid grid-cols-2 gap-6">
                {feelCosmosVideos.map((url, index) => (
                  <div key={index} className={`bg-cosmic-purple/5 border border-cosmic-purple/30 rounded-2xl p-6 flex flex-col ${activeFeelCosmosVideosList[index] ? "" : "opacity-50"}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-cosmic-purple">Video {index + 1}</h3>
                      <button
                        onClick={() => toggleFeelCosmosVideoActive(index, !activeFeelCosmosVideosList[index])}
                        className={`px-3 py-1 rounded text-xs font-semibold transition ${
                          activeFeelCosmosVideosList[index]
                            ? "bg-cosmic-purple/30 text-cosmic-purple border border-cosmic-purple/50"
                            : "bg-gray-700/50 text-gray-400 border border-gray-600/50"
                        }`}
                      >
                        {activeFeelCosmosVideosList[index] ? "On" : "Off"}
                      </button>
                    </div>
                    <textarea
                      value={url}
                      onChange={(e) => saveFeelCosmosVideo(index, e.target.value)}
                      placeholder="youtube.com/watch?v=xxx or youtu.be/yyy"
                      className="flex-1 px-3 py-2 rounded bg-cosmic-dark border border-cosmic-purple/30 text-gray-100 placeholder-gray-600 text-xs focus:outline-none focus:border-cosmic-purple transition font-mono resize-none"
                      disabled={!activeFeelCosmosVideosList[index]}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Feel the Cosmos Songs Section */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-cosmic-purple">Feel the Cosmos Playlist (up to 10 songs)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {feelCosmosSongs.map((song, index) => (
                  <div key={index} className="space-y-3 p-4 rounded-lg bg-cosmic-dark/50 border border-cosmic-purple/20">
                    <div className="text-xs font-semibold text-cosmic-purple mb-2">
                      Song #{index + 1}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={song.title}
                        onChange={(e) => updateFeelCosmosSong(index, "title", e.target.value)}
                        placeholder="e.g., Cosmic Meditation"
                        className="w-full px-3 py-2 rounded bg-cosmic-dark border border-cosmic-purple/30 text-gray-100 placeholder-gray-600 text-sm focus:outline-none focus:border-cosmic-purple transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-2">
                        YouTube Link
                      </label>
                      <input
                        type="text"
                        value={song.url}
                        onChange={(e) => updateFeelCosmosSong(index, "url", e.target.value)}
                        placeholder="youtube.com/watch?v=... or youtu.be/..."
                        className="w-full px-3 py-2 rounded bg-cosmic-dark border border-cosmic-purple/30 text-gray-100 placeholder-gray-600 text-sm focus:outline-none focus:border-cosmic-purple transition"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
