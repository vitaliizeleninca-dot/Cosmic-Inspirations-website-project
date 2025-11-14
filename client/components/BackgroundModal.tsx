import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Loader } from "lucide-react";

interface NFTItem {
  id: string;
  tokenId: string;
  name: string;
  imageUrl: string;
  thumbnailUrl: string;
}

interface BackgroundModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BackgroundModal({ isOpen, onClose }: BackgroundModalProps) {
  const [nfts, setNfts] = useState<NFTItem[]>([]);
  const [selectedNFT, setSelectedNFT] = useState<NFTItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Fetch NFTs from server endpoint
  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        setLoading(true);
        setError(null);

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

    if (isOpen) {
      fetchNFTs();
    }
  }, [isOpen]);

  const updatePageBackground = (imageUrl: string) => {
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
      const scrollAmount = 600;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="bg-cosmic-dark/95 border border-cosmic-purple/30 rounded-2xl shadow-2xl cosmic-glow-lg w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="border-b border-cosmic-purple/20 p-6 flex items-center justify-between">
            <h2
              id="modal-title"
              className="text-2xl font-bold text-cosmic-purple"
            >
              Choose Your Background NFT
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-300 hover:text-cosmic-purple transition rounded-lg hover:bg-cosmic-purple/10"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <div className="flex items-center justify-center h-full gap-3">
                <Loader className="w-6 h-6 text-cosmic-purple animate-spin" />
                <span className="text-gray-300">Loading NFT collection...</span>
              </div>
            ) : error || nfts.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <span className="text-gray-300 text-center">
                  {error || "No NFTs available"}
                </span>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Gallery Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {nfts.map((nft) => (
                    <button
                      key={nft.id}
                      onClick={() => handleNFTSelect(nft)}
                      className={`group relative aspect-square rounded-lg overflow-hidden transition-all duration-300 border-2 ${
                        selectedNFT?.id === nft.id
                          ? "border-cosmic-purple cosmic-glow scale-105"
                          : "border-cosmic-purple/40 hover:border-cosmic-purple/70"
                      }`}
                      title={nft.name}
                      aria-label={nft.name}
                    >
                      <img
                        src={nft.thumbnailUrl}
                        alt={nft.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%235522ff' width='100' height='100'/%3E%3C/svg%3E";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <span className="text-xs font-semibold text-cosmic-purple truncate">
                          {nft.name}
                        </span>
                      </div>
                      {selectedNFT?.id === nft.id && (
                        <div className="absolute inset-0 border-2 border-cosmic-purple animate-pulse" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Selected Preview */}
                {selectedNFT && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-cosmic-purple">
                      Preview
                    </h3>
                    <div className="relative rounded-xl overflow-hidden border border-cosmic-purple/30 aspect-video max-h-96">
                      <img
                        src={selectedNFT.imageUrl}
                        alt={selectedNFT.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%235522ff' width='100' height='100'/%3E%3C/svg%3E";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-cosmic-purple font-semibold text-lg">
                          {selectedNFT.name}
                        </p>
                        <p className="text-gray-300 text-sm mt-1">
                          Token ID: {selectedNFT.tokenId}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-cosmic-purple/20 p-4 sm:p-6 bg-cosmic-purple/5">
            <button
              onClick={onClose}
              className="w-full btn-cosmic"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
