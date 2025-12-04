import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { createServer } from "./server";

// Copy public folder including admin files
function copyPublicPlugin(): Plugin {
  return {
    name: "copy-public",
    apply: "build",
    enforce: "post",
    closeBundle: async () => {
      const publicDir = path.resolve(__dirname, "public");
      const outDir = path.resolve(__dirname, "dist/spa");

      try {
        if (fs.existsSync(publicDir)) {
          fs.cpSync(publicDir, outDir, { recursive: true, force: true });
          console.log(`✓ Copied public folder to ${outDir}`);

          // Verify admin files exist
          const adminConfigPath = path.join(outDir, "admin", "config.yml");
          if (fs.existsSync(adminConfigPath)) {
            console.log(`✓ Verified admin/config.yml exists`);
          } else {
            console.warn(`✗ admin/config.yml not found after copy`);
          }
        }
      } catch (err) {
        console.error("Error copying public folder:", err);
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./client", "./shared", "./public"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  publicDir: "public",
  assetsInclude: ["**/*.yml", "**/*.yaml"],
  plugins: [react(), copyPublicPlugin(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();

      // Add Express app as middleware to Vite dev server
      server.middlewares.use(app);
    },
  };
}
