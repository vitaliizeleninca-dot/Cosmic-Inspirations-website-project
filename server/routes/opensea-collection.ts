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

    // Extract collection slug from OpenSea URL
    // Example: https://opensea.io/collection/cosmic-inspirations-master-study-sketches
    const collectionMatch = url.match(/opensea\.io\/collection\/([a-z0-9\-]+)/i);
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

      if (!response.ok) {
        // If OpenSea API fails, try fetching og:image from the URL directly
        const pageResponse = await fetch(url, {
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
              collectionUrl: url,
            });
            return;
          }
        }

        throw new Error("Could not retrieve image from OpenSea");
      }

      const data = await response.json();

      // Extract image URL from OpenSea API response
      const imageUrl = data.image_url || data.imageUrl || null;

      if (!imageUrl) {
        res.status(404).json({
          success: false,
          error: "No image found for this collection",
        });
        return;
      }

      res.json({
        success: true,
        imageUrl,
        collectionUrl: url,
        collectionName: data.name || collectionSlug,
      });
    } catch (fetchError) {
      console.error("Error fetching OpenSea data:", fetchError);
      res.status(500).json({
        success: false,
        error:
          fetchError instanceof Error ? fetchError.message : "Failed to fetch collection image",
      });
    }
  } catch (error) {
    console.error("Error in OpenSea collection endpoint:", error);
    res.status(500).json({
      success: false,
      error:
        error instanceof Error ? error.message : "Internal server error",
    });
  }
};
