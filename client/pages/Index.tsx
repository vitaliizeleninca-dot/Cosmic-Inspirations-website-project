import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Pause, SkipForward, Music, Podcast, Sparkles, Zap } from "lucide-react";
import Footer from "@/components/Footer";
import BackgroundModal from "@/components/BackgroundModal";
import PlaylistModal from "@/components/PlaylistModal";

const DEFAULT_COSMIC_VIDEOS = [
  "https://www.youtube.com/embed/jgpJVI3tDT0",
  "https://www.youtube.com/embed/1La4QzGeaaQ",
  "https://www.youtube.com/embed/TqOneWeDtFI",
  "https://www.youtube.com/embed/lFcSrYw-ARY"
];

const DEFAULT_PLAYLIST_VIDEOS = ["", "", "", ""];

export default function Index() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBackgroundModalOpen, setIsBackgroundModalOpen] = useState(false);
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
  const [playlistType, setPlaylistType] = useState<"cosmic" | "feelCosmos">("cosmic");
  const [cosmicVideos, setCosmicVideos] = useState<string[]>(DEFAULT_COSMIC_VIDEOS);
  const [playlistVideos, setPlaylistVideos] = useState<string[]>(DEFAULT_PLAYLIST_VIDEOS);
  const [feelCosmosVideos, setFeelCosmosVideos] = useState<string[]>(DEFAULT_PLAYLIST_VIDEOS);
  const [feelCosmosSongs, setFeelCosmosSongs] = useState<Array<{ title: string; url: string }>>([]);
  const [activeCosmicVideosList, setActiveCosmicVideosList] = useState<boolean[]>([true, true, true, true]);
  const [activePlaylistVideos, setActivePlaylistVideos] = useState<boolean>(true);
  const [activePlaylistSongs, setActivePlaylistSongs] = useState<boolean>(true);
  const [activeFeelCosmosVideosList, setActiveFeelCosmosVideosList] = useState<boolean[]>([true, true, true, true]);
  const [activeFeelCosmosSongs, setActiveFeelCosmosSongs] = useState<boolean>(true);
  const [podcastVideos, setPodcastVideos] = useState<string[]>(["", "", "", ""]);
  const [activePodcastVideosList, setActivePodcastVideosList] = useState<boolean[]>([true, true, true, true]);
  const [nftVideos, setNftVideos] = useState<string[]>(["", "", "", ""]);
  const [activeNftVideosList, setActiveNftVideosList] = useState<boolean[]>([true, true, true, true]);
  const [nftCollections, setNftCollections] = useState<string[]>(["", "", "", "", "", ""]);

  useEffect(() => {
    const saved = localStorage.getItem("cosmic-videos");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Only use non-empty URLs, fallback to defaults for empty ones
        const videos = parsed.map((url: string, index: number) =>
          url.trim() ? convertToEmbedUrl(url) : DEFAULT_COSMIC_VIDEOS[index]
        );
        setCosmicVideos(videos);
      } catch (e) {
        setCosmicVideos(DEFAULT_COSMIC_VIDEOS);
      }
    }

    const savedPlaylist = localStorage.getItem("playlist-videos");
    if (savedPlaylist) {
      try {
        const parsed = JSON.parse(savedPlaylist);
        const videos = parsed.map((url: string) =>
          url.trim() ? convertToEmbedUrl(url) : ""
        ).filter((url: string) => url);
        setPlaylistVideos(videos);
      } catch (e) {
        setPlaylistVideos(DEFAULT_PLAYLIST_VIDEOS);
      }
    }

    const savedFeelCosmosVideos = localStorage.getItem("feel-cosmos-videos");
    if (savedFeelCosmosVideos) {
      try {
        const parsed = JSON.parse(savedFeelCosmosVideos);
        const videos = parsed.map((url: string) =>
          url.trim() ? convertToEmbedUrl(url) : ""
        ).filter((url: string) => url);
        setFeelCosmosVideos(videos);
      } catch (e) {
        setFeelCosmosVideos(DEFAULT_PLAYLIST_VIDEOS);
      }
    }

    const savedFeelCosmosSongs = localStorage.getItem("feel-cosmos-songs");
    if (savedFeelCosmosSongs) {
      try {
        const parsed = JSON.parse(savedFeelCosmosSongs);
        setFeelCosmosSongs(parsed);
      } catch (e) {
        setFeelCosmosSongs([]);
      }
    }

    const savedCosmicVideosListActive = localStorage.getItem("cosmic-videos-list-active");
    if (savedCosmicVideosListActive) {
      setActiveCosmicVideosList(JSON.parse(savedCosmicVideosListActive));
    }

    const savedPlaylistVideosActive = localStorage.getItem("playlist-videos-active");
    if (savedPlaylistVideosActive) {
      setActivePlaylistVideos(JSON.parse(savedPlaylistVideosActive));
    }

    const savedPlaylistSongsActive = localStorage.getItem("playlist-songs-active");
    if (savedPlaylistSongsActive) {
      setActivePlaylistSongs(JSON.parse(savedPlaylistSongsActive));
    }

    const savedFeelCosmosVideosListActive = localStorage.getItem("feel-cosmos-videos-list-active");
    if (savedFeelCosmosVideosListActive) {
      setActiveFeelCosmosVideosList(JSON.parse(savedFeelCosmosVideosListActive));
    }

    const savedFeelCosmosSongsActive = localStorage.getItem("feel-cosmos-songs-active");
    if (savedFeelCosmosSongsActive) {
      setActiveFeelCosmosSongs(JSON.parse(savedFeelCosmosSongsActive));
    }

    const savedPodcastVideos = localStorage.getItem("podcast-videos");
    if (savedPodcastVideos) {
      try {
        const parsed = JSON.parse(savedPodcastVideos);
        const videos = parsed.map((url: string) =>
          url.trim() ? convertToEmbedUrl(url) : ""
        );
        setPodcastVideos(videos);
      } catch (e) {
        setPodcastVideos(["", "", "", ""]);
      }
    }

    const savedPodcastVideosListActive = localStorage.getItem("podcast-videos-list-active");
    if (savedPodcastVideosListActive) {
      setActivePodcastVideosList(JSON.parse(savedPodcastVideosListActive));
    }

    const savedNftVideos = localStorage.getItem("nft-videos");
    if (savedNftVideos) {
      try {
        const parsed = JSON.parse(savedNftVideos);
        const videos = parsed.map((url: string) =>
          url.trim() ? convertToEmbedUrl(url) : ""
        );
        setNftVideos(videos);
      } catch (e) {
        setNftVideos(["", "", "", ""]);
      }
    }

    const savedNftVideosListActive = localStorage.getItem("nft-videos-list-active");
    if (savedNftVideosListActive) {
      setActiveNftVideosList(JSON.parse(savedNftVideosListActive));
    }

    const savedNftCollections = localStorage.getItem("nft-collections");
    if (savedNftCollections) {
      try {
        const parsed = JSON.parse(savedNftCollections);
        setNftCollections(parsed);
      } catch (e) {
        setNftCollections(["", "", "", "", "", ""]);
      }
    }
  }, []);

  const convertToEmbedUrl = (url: string): string => {
    if (!url) return "";

    // Extract video ID from various YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{10,12})/,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]{10,12})/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return `https://www.youtube.com/embed/${match[1]}`;
      }
    }

    return url;
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Header/Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-cosmic-purple/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
            aria-label="Go to admin panel"
          >
            <Sparkles className="w-8 h-8 text-cosmic-purple animate-pulse" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cosmic-purple to-cosmic-violet bg-clip-text text-transparent">
              Cosmic Hub
            </h1>
          </button>
          <nav className="hidden sm:flex items-center gap-8">
            <a
              href="#podcast"
              className="text-sm text-gray-300 hover:text-cosmic-purple transition"
            >
              Podcast
            </a>
            <a
              href="#music"
              className="text-sm text-gray-300 hover:text-cosmic-purple transition"
            >
              Music
            </a>
            <a
              href="#experience"
              className="text-sm text-gray-300 hover:text-cosmic-purple transition"
            >
              Experience
            </a>
            <a
              href="#nft"
              className="text-sm text-gray-300 hover:text-cosmic-purple transition"
            >
              NFT Collections
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <div className="w-px h-6 bg-cosmic-purple/20" />
            <button
              onClick={() => setIsBackgroundModalOpen(true)}
              className="hidden sm:inline-flex px-4 py-2 rounded-lg text-sm font-semibold text-cosmic-dark bg-gradient-to-r from-cosmic-purple to-cosmic-violet hover:from-cosmic-violet hover:to-cosmic-purple transition-all duration-300 hover:cosmic-glow"
              aria-label="Select cosmic background"
            >
              Select Cosmic Background
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-cosmic-purple/20 rounded-full filter blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-cosmic-violet/20 rounded-full filter blur-3xl animate-pulse" />
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <div className="mb-6 inline-block">
              <div className="px-4 py-2 rounded-full border border-cosmic-purple/50 bg-cosmic-purple/10 backdrop-blur">
                <span className="text-cosmic-purple text-sm font-semibold">
                  Welcome to the Cosmic Realm
                </span>
              </div>
            </div>

            <h2 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cosmic-purple via-cosmic-violet to-cosmic-purple bg-clip-text text-transparent">
                Immerse Yourself
              </span>
              <br />
              <span className="text-gray-100">in the Cosmos</span>
            </h2>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              A unique fusion of AI-powered art, ambient soundscapes, interactive
              experiences, and digital collectibles from the depths of space
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#experience"
                className="btn-cosmic"
              >
                Enter the Experience
              </a>
              <button className="px-6 py-3 rounded-lg font-semibold border-2 border-cosmic-purple/50 text-cosmic-purple hover:border-cosmic-purple hover:cosmic-glow transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* AI Art Podcast Section */}
        <section
          id="podcast"
          className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cosmic-purple/30 rounded-full filter blur-3xl" />
          </div>

          <div className="relative z-10 w-full max-w-6xl">
            <div className="text-center mb-16">
              <h3 className="text-5xl font-bold mb-4">
                AI Art Podcast Videos
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {podcastVideos.map((url, index) => (
                activePodcastVideosList[index] && url && (
                  <div
                    key={index}
                    className="relative aspect-video rounded-2xl overflow-hidden cosmic-glow"
                  >
                    <iframe
                      width="100%"
                      height="100%"
                      src={url}
                      title={`AI Art Podcast Episode ${index + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                )
              ))}
            </div>

          </div>
        </section>

        {/* Cosmic Ambient Music Player Section */}
        {activeCosmicVideosList.some(v => v) && (
          <section
            id="music"
            className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative"
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-cosmic-violet/30 rounded-full filter blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-6xl">
              <div className="text-center mb-16">
                <h3 className="text-5xl font-bold mb-4">
                  Cosmic Ambient
                </h3>
                <p className="text-cosmic-purple text-lg font-semibold mb-4">
                  Music Player
                </p>
                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                  Immerse yourself in ethereal soundscapes designed to elevate your
                  consciousness. Our AI-curated ambient music draws inspiration from
                  the vastness of space, creating an otherworldly listening experience.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {cosmicVideos.map((url, index) => (
                  activeCosmicVideosList[index] && (
                    <div
                      key={index}
                      className="relative aspect-video rounded-2xl overflow-hidden cosmic-glow block"
                    >
                      <iframe
                        width="100%"
                        height="100%"
                        src={url}
                        title={`Cosmic Ambient Visualization ${index + 1}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  )
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={() => {
                    setPlaylistType("cosmic");
                    setIsPlaylistModalOpen(true);
                  }}
                  className="btn-cosmic"
                >
                  View Full Playlist
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Feel the Cosmos Interactive Experience Section */}
        {(activeFeelCosmosVideosList.some(v => v) || activeFeelCosmosSongs) && (
          <section
            id="experience"
            className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative"
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cosmic-purple/30 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
            </div>

            <div className="relative z-10 max-w-6xl w-full">
              <div className="text-center mb-16">
                <h3 className="text-5xl font-bold mb-4">
                  Feel the Cosmos
                </h3>
                <p className="text-cosmic-purple text-lg font-semibold mb-4">
                  Interactive Experience
                </p>
                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                  Engage with a dynamic, interactive universe that responds to your
                  presence. Move through dimensional spaces and discover hidden
                  connections between art, sound, and reality.
                </p>
              </div>

              {/* Feel the Cosmos Videos */}
              {activeFeelCosmosVideosList.some(v => v) && (
                <div className="mb-12">
                  <h4 className="text-2xl font-bold text-cosmic-purple mb-6">Featured Videos</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {feelCosmosVideos.map((url, index) => (
                      activeFeelCosmosVideosList[index] && (
                        <div
                          key={index}
                          className="relative aspect-video rounded-2xl overflow-hidden cosmic-glow"
                        >
                          <iframe
                            width="100%"
                            height="100%"
                            src={url}
                            title={`Feel the Cosmos Video ${index + 1}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                          />
                        </div>
                      )
                    ))}
                  </div>
                  <div className="text-center">
                    <button
                      onClick={() => {
                        setPlaylistType("feelCosmos");
                        setIsPlaylistModalOpen(true);
                      }}
                      className="btn-cosmic"
                    >
                      View Full Playlist
                    </button>
                  </div>
                </div>
              )}

            </div>
          </section>
        )}

        {/* NFT Collections Section */}
        <section
          id="nft"
          className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cosmic-violet/30 rounded-full filter blur-3xl" />
          </div>

          <div className="relative z-10 max-w-6xl w-full">
            {activeNftVideosList.some(v => v) && nftVideos.some(v => v) && (
              <div className="mb-16">
                <div className="text-center mb-12">
                  <h3 className="text-5xl font-bold mb-4">
                    NFT Collections Videos
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {nftVideos.map((url, index) => (
                    activeNftVideosList[index] && url && (
                      <div
                        key={index}
                        className="relative aspect-video rounded-2xl overflow-hidden cosmic-glow"
                      >
                        <iframe
                          width="100%"
                          height="100%"
                          src={url}
                          title={`NFT Collection Video ${index + 1}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="text-center mb-16">
                <h3 className="text-5xl font-bold mb-4">
                  NFT Collections
                </h3>
                <p className="text-cosmic-purple text-lg font-semibold mb-4">
                  Legendary Digital Artifacts
                </p>
                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                  Own a piece of the cosmos with our exclusive NFT collections,
                  each representing a unique moment in the digital universe.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {nftCollections.map((url, index) => (
                  url && (
                    <a
                      key={index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative aspect-square rounded-2xl overflow-hidden cosmic-glow cursor-pointer"
                    >
                      <img
                        src={url}
                        alt={`NFT Collection ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cosmic-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                        <span className="text-gray-100 font-semibold">View Collection</span>
                      </div>
                    </a>
                  )
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>

      {/* Background Selection Modal */}
      <BackgroundModal
        isOpen={isBackgroundModalOpen}
        onClose={() => setIsBackgroundModalOpen(false)}
      />

      {/* Playlist Modal */}
      <PlaylistModal
        isOpen={isPlaylistModalOpen}
        onClose={() => setIsPlaylistModalOpen(false)}
        playlistType={playlistType}
        playlistSongs={playlistType === "cosmic" ? [] : feelCosmosSongs}
      />
    </div>
  );
}
