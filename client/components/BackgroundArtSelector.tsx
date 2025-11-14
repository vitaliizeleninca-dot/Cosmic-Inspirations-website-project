import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";

interface NFTItem {
  id: string;
  tokenId: string;
  name: string;
  imageUrl: string;
  thumbnailUrl: string;
}

export default function BackgroundArtSelector() {
  const [nfts, setNfts] = useState<NFTItem[]>([]);
  const [selectedNFT, setSelectedNFT] = useState<NFTItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Fetch NFTs from Objkt collection via server endpoint
  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        setLoading(true);
        setError(null);

        // Call our server endpoint which proxies the Objkt API
        const response = await fetch("/api/nft-collection");

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success || !data.tokens || data.tokens.length === 0) {
          throw new Error(data.error || "No NFTs found in collection");
        }

        setNfts(data.tokens);

        // Set first NFT as default
        if (data.tokens.length > 0) {
          setSelectedNFT(data.tokens[0]);
          updatePageBackground(data.tokens[0].imageUrl);
        }
      } catch (err) {
        console.error("Failed to fetch NFTs:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load NFT collection"
        );
        setNfts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  const updatePageBackground = (imageUrl: string) => {
    // Update using CSS custom property to maintain animation
    document.documentElement.style.setProperty(
      "--bg-image-url",
      `url('${imageUrl}')`
    );
  };

  const handleNFTSelect = (nft: NFTItem) => {
    setSelectedNFT(nft);
    updatePageBackground(nft.imageUrl);
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-2">
        <Loader className="w-4 h-4 text-cosmic-purple animate-spin" />
        <span className="text-xs text-gray-400">Loading art...</span>
      </div>
    );
  }

  if (error || nfts.length === 0) {
    return (
      <div className="flex items-center gap-2 px-3 py-2">
        <span className="text-xs text-gray-400">Art collection unavailable</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => scroll("left")}
        className="p-1 text-cosmic-purple hover:text-cosmic-purple/80 transition hidden sm:block"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div
        ref={scrollContainerRef}
        className="flex gap-2 overflow-x-auto scroll-smooth no-scrollbar max-w-xs sm:max-w-sm"
        style={{
          scrollBehavior: "smooth",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {nfts.map((nft) => (
          <button
            key={nft.id}
            onClick={() => handleNFTSelect(nft)}
            title={nft.name}
            className={`flex-shrink-0 w-10 h-10 rounded-lg transition-all duration-300 border-2 overflow-hidden relative group ${
              selectedNFT?.id === nft.id
                ? "border-cosmic-purple cosmic-glow scale-110"
                : "border-cosmic-purple/40 hover:border-cosmic-purple/70 hover:scale-105"
            }`}
            aria-label={`Select ${nft.name}`}
          >
            <img
              src={nft.thumbnailUrl}
              alt={nft.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if image fails to load
                (e.target as HTMLImageElement).src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%235522ff' width='100' height='100'/%3E%3C/svg%3E";
              }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
          </button>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="p-1 text-cosmic-purple hover:text-cosmic-purple/80 transition hidden sm:block"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
