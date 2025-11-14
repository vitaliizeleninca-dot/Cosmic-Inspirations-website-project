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

  // Fetch NFTs from Objkt collection
  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try multiple API endpoints
        let fetchedNFTs: NFTItem[] = [];

        try {
          // First attempt: Try the OBJKT REST API
          const params = new URLSearchParams({
            contract: "KT1KS9HczgmgFuqkSSe3AeZsbu7eyH9MeRXZ",
            limit: "100",
          });

          const response = await fetch(
            `https://api.objkt.com/v3/tokens?${params.toString()}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            const tokens = Array.isArray(data) ? data : data.tokens || [];

            fetchedNFTs = tokens
              .filter(
                (token: any) =>
                  token.display_uri &&
                  (token.display_uri.startsWith("http") ||
                    token.display_uri.startsWith("ipfs://"))
              )
              .map((token: any, index: number) => ({
                id: `${token.token_id || index}-${token.contract}`,
                tokenId: token.token_id?.toString() || "",
                name:
                  token.name || token.title || `Token #${token.token_id}`,
                imageUrl: token.display_uri.startsWith("ipfs://")
                  ? `https://ipfs.io/ipfs/${token.display_uri.replace("ipfs://", "")}`
                  : token.display_uri,
                thumbnailUrl: token.thumbnail_uri
                  ? token.thumbnail_uri.startsWith("ipfs://")
                    ? `https://ipfs.io/ipfs/${token.thumbnail_uri.replace("ipfs://", "")}`
                    : token.thumbnail_uri
                  : token.display_uri.startsWith("ipfs://")
                    ? `https://ipfs.io/ipfs/${token.display_uri.replace("ipfs://", "")}`
                    : token.display_uri,
              }));
          }
        } catch (apiErr) {
          console.warn("REST API attempt failed:", apiErr);
        }

        // If REST API failed, try GraphQL with CORS proxy
        if (fetchedNFTs.length === 0) {
          try {
            const gqlResponse = await fetch("https://api.objkt.com/graphql", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                query: `
                  query {
                    tokens(
                      where: {
                        contract: "KT1KS9HczgmgFuqkSSe3AeZsbu7eyH9MeRXZ"
                      }
                      limit: 100
                    ) {
                      id
                      tokenId
                      name
                      displayUri
                      thumbnailUri
                    }
                  }
                `,
              }),
            });

            if (gqlResponse.ok) {
              const gqlData = await gqlResponse.json();

              if (!gqlData.errors) {
                fetchedNFTs = (gqlData.data?.tokens || [])
                  .filter(
                    (token: any) =>
                      token.displayUri &&
                      (token.displayUri.startsWith("http") ||
                        token.displayUri.startsWith("ipfs://"))
                  )
                  .map((token: any, index: number) => ({
                    id: `${token.id}-${index}`,
                    tokenId: token.tokenId || "",
                    name: token.name || `Token #${token.tokenId}`,
                    imageUrl: token.displayUri.startsWith("ipfs://")
                      ? `https://ipfs.io/ipfs/${token.displayUri.replace("ipfs://", "")}`
                      : token.displayUri,
                    thumbnailUrl: token.thumbnailUri
                      ? token.thumbnailUri.startsWith("ipfs://")
                        ? `https://ipfs.io/ipfs/${token.thumbnailUri.replace("ipfs://", "")}`
                        : token.thumbnailUri
                      : token.displayUri.startsWith("ipfs://")
                        ? `https://ipfs.io/ipfs/${token.displayUri.replace("ipfs://", "")}`
                        : token.displayUri,
                  }));
              }
            }
          } catch (gqlErr) {
            console.warn("GraphQL attempt failed:", gqlErr);
          }
        }

        if (fetchedNFTs.length === 0) {
          throw new Error(
            "Could not fetch NFT collection from Objkt API. The API may be temporarily unavailable or have CORS restrictions."
          );
        }

        setNfts(fetchedNFTs);

        // Set first NFT as default
        if (fetchedNFTs.length > 0) {
          setSelectedNFT(fetchedNFTs[0]);
          updatePageBackground(fetchedNFTs[0].imageUrl);
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
