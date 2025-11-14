import { RequestHandler } from "express";

export const handleNFTCollection: RequestHandler = async (req, res) => {
  try {
    const contractAddress = "KT1KS9HczgmgFuqkSSe3AeZsbu7eyH9MeRXZ";

    // Try to fetch from Objkt API
    const apiUrl = `https://api.objkt.com/v3/tokens?contract=${contractAddress}&limit=100`;

    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; Cosmic-Hub/1.0)",
      },
    });

    if (!response.ok) {
      throw new Error(`Objkt API error: ${response.status}`);
    }

    const data = await response.json();
    const tokens = Array.isArray(data) ? data : data.tokens || [];

    // Process and filter NFT tokens
    const nfts = tokens
      .filter(
        (token: any) =>
          token.display_uri &&
          (token.display_uri.startsWith("http") ||
            token.display_uri.startsWith("ipfs://"))
      )
      .map((token: any, index: number) => ({
        id: `${token.token_id || index}-${token.contract}`,
        tokenId: token.token_id?.toString() || "",
        name: token.name || token.title || `Token #${token.token_id}`,
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
      }))
      .slice(0, 100);

    res.json({ success: true, count: nfts.length, tokens: nfts });
  } catch (error) {
    console.error("Error fetching NFT collection:", error);
    res.status(500).json({
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch NFT collection",
    });
  }
};
