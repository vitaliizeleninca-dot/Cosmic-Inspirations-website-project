import { Router, Request, Response } from "express";
import {
  getLinksFromGitHub,
  saveLinksToGitHub,
  deduplicateLinks,
  sortLinksByDate,
} from "../lib/github-client";

interface SaveLinkRequest extends Request {
  body: {
    url: string;
  };
}

const router = Router();

router.post("/api/save-link", async (req: SaveLinkRequest, res: Response) => {
  try {
    const { url } = req.body;

    if (!url || typeof url !== "string") {
      return res.status(400).json({
        success: false,
        error: "URL is required and must be a string",
      });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return res.status(400).json({
        success: false,
        error: "Invalid URL format",
      });
    }

    // Get current links from GitHub
    const linksData = await getLinksFromGitHub();

    // Add new link with current timestamp
    const newLink = {
      url,
      date: new Date().toISOString(),
    };

    linksData.links.push(newLink);

    // Remove duplicates and sort
    linksData.links = deduplicateLinks(linksData.links);
    linksData.links = sortLinksByDate(linksData.links);

    // Save back to GitHub
    const success = await saveLinksToGitHub(linksData);

    if (!success) {
      return res.status(500).json({
        success: false,
        error: "Failed to save link to GitHub",
      });
    }

    res.json({
      success: true,
      message: "Link saved successfully",
      link: newLink,
      links: linksData.links,
    });
  } catch (error) {
    console.error("Error in POST /api/save-link:", error);
    res.status(500).json({
      success: false,
      error: "Failed to save link",
    });
  }
});

export default router;
