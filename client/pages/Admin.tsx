import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Save, X } from "lucide-react";

interface Track {
  id: string;
  title: string;
  youtubeUrl: string;
  duration?: string;
}

const STORAGE_KEY = "cosmic-playlist-tracks";

export default function Admin() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editUrl, setEditUrl] = useState("");

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

  const addTrack = () => {
    if (!newTitle.trim() || !newUrl.trim()) {
      alert("Введите название трека и YouTube ссылку");
      return;
    }

    const videoId = extractVideoId(newUrl);
    if (!videoId) {
      alert("Неверная YouTube ссылка. Используйте ссылку вида: youtube.com/watch?v=... или youtu.be/...");
      return;
    }

    const track: Track = {
      id: Date.now().toString(),
      title: newTitle,
      youtubeUrl: `https://www.youtube.com/embed/${videoId}`,
      duration: "0:00",
    };

    saveTracks([...tracks, track]);
    setNewTitle("");
    setNewUrl("");
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cosmic-purple to-cosmic-violet bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <p className="text-gray-400">Управление треками плейлиста</p>
        </div>

        {/* Add Track Form */}
        <div className="bg-cosmic-purple/5 border border-cosmic-purple/30 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-cosmic-purple">
            Добавить новый трек
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Название трека
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Например: Nebula Dreams"
                className="w-full px-4 py-2 rounded-lg bg-cosmic-dark border border-cosmic-purple/30 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-cosmic-purple transition"
                onKeyPress={(e) => e.key === "Enter" && addTrack()}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                YouTube ссылка
              </label>
              <input
                type="text"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=... или https://youtu.be/..."
                className="w-full px-4 py-2 rounded-lg bg-cosmic-dark border border-cosmic-purple/30 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-cosmic-purple transition"
                onKeyPress={(e) => e.key === "Enter" && addTrack()}
              />
            </div>
            <button
              onClick={addTrack}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cosmic-purple to-cosmic-violet text-cosmic-dark font-semibold hover:opacity-90 transition"
            >
              <Plus className="w-5 h-5" />
              Добавить трек
            </button>
          </div>
        </div>

        {/* Tracks List */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-cosmic-purple">
            Текущие треки ({tracks.length})
          </h2>
          <div className="space-y-3">
            {tracks.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Нет добавленных треков. Добавьте первый трек выше.
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
                          Сохранить
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded bg-gray-600/20 border border-gray-600/50 text-gray-400 hover:bg-gray-600/30 transition text-sm"
                        >
                          <X className="w-4 h-4" />
                          Отмена
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
                          title="Редактировать"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => deleteTrack(track.id)}
                          className="p-2 rounded hover:bg-red-600/20 text-red-400 transition"
                          title="Удалить"
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
        <div className="mt-8 p-4 rounded-lg bg-cosmic-purple/10 border border-cosmic-purple/30">
          <p className="text-sm text-gray-400">
            💡 <strong>Совет:</strong> Все изменения сохраняются автоматически в вашем браузере. Используйте YouTube ссылки в форме youtube.com/watch?v=... или youtu.be/...
          </p>
        </div>
      </div>
    </div>
  );
}
