import { RequestHandler } from "express";

export const handleOpenSeaCollection: RequestHandler = async (req, res) => {
  try {
    const { url } = req.query;

    if (!url || typeof url !== "string") {
      res.status(400).json({
        success: false,
        error: "Missing or invalid 'url' query parameter",
      });
      return;
    }

    // Ensure URL has protocol
    let fullUrl = url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      fullUrl = `https://${url}`;
    }

    // Determine platform and handle accordingly
    const isOpenSea = fullUrl.includes("opensea.io");
    const isObjkt = fullUrl.includes("objkt.com");

    if (!isOpenSea && !isObjkt) {
      res.status(400).json({
        success: false,
        error: "URL must be from OpenSea (opensea.io) or Objkt (objkt.com)",
      });
      return;
    }

    if (isOpenSea) {
      await handleOpenSeaUrl(fullUrl, res);
    } else if (isObjkt) {
      await handleObjktUrl(fullUrl, res);
    }
  } catch (error) {
    console.error("Error in collection endpoint:", error);
    res.status(500).json({
      success: false,
      error:
        error instanceof Error ? error.message : "Internal server error",
    });
  }
};

async function handleOpenSeaUrl(fullUrl: string, res: any): Promise<void> {
  try {
    // Extract collection slug from OpenSea URL
    const collectionMatch = fullUrl.match(/opensea\.io\/collection\/([a-z0-9\-]+)/i);
    if (!collectionMatch) {
      res.status(400).json({
        success: false,
        error: "Invalid OpenSea collection URL format",
      });
      return;
    }

    const collectionSlug = collectionMatch[1];

    try {
      // Fetch collection info from OpenSea API v2
      const apiUrl = `https://api.opensea.io/api/v2/collections/${collectionSlug}`;

      const response = await fetch(apiUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; Cosmic-Hub/1.0)",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const imageUrl = data.image_url || data.imageUrl || null;

        if (imageUrl) {
          res.json({
            success: true,
            imageUrl,
            collectionUrl: fullUrl,
            collectionName: data.name || collectionSlug,
          });
          return;
        }
      }
    } catch (apiErr) {
      console.warn("OpenSea API not available, trying og:image fallback:", apiErr);
    }

    // Fallback: try fetching og:image from the URL directly
    const pageResponse = await fetch(fullUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Cosmic-Hub/1.0)",
      },
    });

    if (pageResponse.ok) {
      const html = await pageResponse.text();
      const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
      
      if (ogImageMatch && ogImageMatch[1]) {
        res.json({
          success: true,
          imageUrl: ogImageMatch[1],
          collectionUrl: fullUrl,
        });
        return;
      }
    }

    res.status(404).json({
      success: false,
      error: "Could not retrieve image from OpenSea collection",
    });
  } catch (error) {
    console.error("Error fetching OpenSea data:", error);
    res.status(500).json({
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch OpenSea collection image",
    });
  }
}

async function handleObjktUrl(fullUrl: string, res: any): Promise<void> {
  try {
    // Extract contract address from Objkt URL
    // Example: https://objkt.com/collections/KT1KS9HczgmgFuqkSSe3AeZsbu7eyH9MeRXZ
    const contractMatch = fullUrl.match(/objkt\.com\/collections\/([a-zA-Z0-9]+)/i);
    if (!contractMatch) {
      res.status(400).json({
        success: false,
        error: "Invalid Objkt collection URL format",
      });
      return;
    }

    const contractAddress = contractMatch[1];
    let imageUrl: string | null = null;

    try {
      // Try multiple endpoints for Objkt API
      const endpoints = [
        `https://api.objkt.com/v3/tokens?contract=${contractAddress}&limit=1`,
        `https://objkt.com/api/v3/contracts/${contractAddress}`,
      ];

      for (const apiUrl of endpoints) {
        try {
          const response = await fetch(apiUrl, {
            headers: {
              "User-Agent": "Mozilla/5.0 (compatible; Cosmic-Hub/1.0)",
              "Accept": "application/json",
            },
            timeout: 5000,
          });

          if (response.ok) {
            const data = await response.json();
            const tokens = Array.isArray(data) ? data : data.tokens || [];

            if (tokens.length > 0) {
              const token = tokens[0];
              imageUrl = token.display_uri || token.thumbnail_uri || token.image_url;

              if (imageUrl) {
                if (imageUrl.startsWith("ipfs://")) {
                  imageUrl = `https://ipfs.io/ipfs/${imageUrl.replace("ipfs://", "")}`;
                }
                break;
              }
            }
          }
        } catch (e) {
          // Try next endpoint
          continue;
        }
      }
    } catch (apiErr) {
      console.warn("Objkt API endpoints not available:", apiErr);
    }

    // If no image from API, try og:image from the page
    if (!imageUrl) {
      try {
        const pageResponse = await fetch(fullUrl, {
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; Cosmic-Hub/1.0)",
          },
          timeout: 5000,
        });

        if (pageResponse.ok) {
          const html = await pageResponse.text();
          const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);

          if (ogImageMatch && ogImageMatch[1]) {
            imageUrl = ogImageMatch[1];
          }
        }
      } catch (pageErr) {
        console.warn("Could not fetch Objkt page:", pageErr);
      }
    }

    // Return success with or without image
    res.json({
      success: true,
      imageUrl: imageUrl || null,
      collectionUrl: fullUrl,
      collectionName: contractAddress,
    });
  } catch (error) {
    console.error("Error fetching Objkt data:", error);
    // Even on error, return success with null image to show placeholder
    const contractMatch = fullUrl.match(/objkt\.com\/collections\/([a-zA-Z0-9]+)/i);
    res.json({
      success: true,
      imageUrl: null,
      collectionUrl: fullUrl,
      collectionName: contractMatch ? contractMatch[1] : "Tezos Collection",
    });
  }
}
