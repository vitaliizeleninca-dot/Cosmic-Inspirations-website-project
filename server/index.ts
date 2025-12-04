import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleNFTCollection } from "./routes/nft-collection";
import { handleYouTubeDuration } from "./routes/youtube-duration";
import { handleOpenSeaCollection } from "./routes/opensea-collection";
import menuRouter from "./routes/menu";
import cmsConfigRouter from "./routes/cms-config";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.get("/api/nft-collection", handleNFTCollection);
  app.get("/api/youtube-duration", handleYouTubeDuration);
  app.get("/api/opensea-collection", handleOpenSeaCollection);
  app.use("/", menuRouter);
  app.use("/", cmsConfigRouter);

  return app;
}
