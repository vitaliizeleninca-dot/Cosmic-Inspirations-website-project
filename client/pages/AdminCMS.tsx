import { useEffect, useState } from "react";
import { useCMSHealthCheck } from "@/hooks/useCMSHealthCheck";

export default function AdminCMS() {
  const { health } = useCMSHealthCheck();
  const [statusMessage, setStatusMessage] = useState<string>("");

  useEffect(() => {
    if (!health.lastChecked) return;

    if (!health.isPrimaryAvailable && health.isBackupAvailable) {
      setStatusMessage(
        "⚠️ Primary server unavailable - Using backup CMS server"
      );
    } else if (!health.isBackupAvailable && health.isPrimaryAvailable) {
      setStatusMessage("✓ CMS connected");
    } else if (!health.isPrimaryAvailable && !health.isBackupAvailable) {
      setStatusMessage("❌ Both CMS servers unavailable - Please try again later");
    } else {
      setStatusMessage("✓ CMS connected");
    }
  }, [health]);

  useEffect(() => {
    // Load Netlify Identity widget
    const script1 = document.createElement("script");
    script1.src = "https://identity.netlify.com/v1/netlify-identity-widget.js";
    document.body.appendChild(script1);

    // Load Decap CMS
    const script2 = document.createElement("script");
    script2.src = "https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js";
    script2.onload = () => {
      // Initialize CMS with inline config after it loads
      if (window.CMS) {
        window.CMS.init({
          config: {
            backend: {
              name: "github",
              repo: "username/repo", // User needs to update this
              branch: "main",
              auth_endpoint: "api/auth",
            },
            media_folder: "public/uploads",
            public_path: "/uploads",
            publish_mode: "editorial_workflow",
            collections: [
              {
                name: "menu",
                label: "Menu Content",
                folder: "data",
                create: false,
                files: [
                  {
                    name: "menu",
                    label: "Menu Items",
                    file: "data/menu.yml",
                    fields: [
                      {
                        label: "Podcast Videos",
                        name: "podcast_videos",
                        widget: "list",
                        fields: [
                          {
                            label: "Title",
                            name: "title",
                            widget: "string",
                          },
                          {
                            label: "YouTube URL",
                            name: "youtube_url",
                            widget: "string",
                          },
                          {
                            label: "Active",
                            name: "active",
                            widget: "boolean",
                            default: true,
                          },
                        ],
                      },
                      {
                        label: "Cosmic Ambient Videos",
                        name: "cosmic_ambient_videos",
                        widget: "list",
                        fields: [
                          {
                            label: "Title",
                            name: "title",
                            widget: "string",
                          },
                          {
                            label: "YouTube URL",
                            name: "youtube_url",
                            widget: "string",
                          },
                          {
                            label: "Active",
                            name: "active",
                            widget: "boolean",
                            default: true,
                          },
                        ],
                      },
                      {
                        label: "Feel Cosmos Videos",
                        name: "feel_cosmos_videos",
                        widget: "list",
                        fields: [
                          {
                            label: "Title",
                            name: "title",
                            widget: "string",
                          },
                          {
                            label: "YouTube URL",
                            name: "youtube_url",
                            widget: "string",
                          },
                          {
                            label: "Active",
                            name: "active",
                            widget: "boolean",
                            default: true,
                          },
                        ],
                      },
                      {
                        label: "NFT Collections Videos",
                        name: "nft_videos",
                        widget: "list",
                        fields: [
                          {
                            label: "Title",
                            name: "title",
                            widget: "string",
                          },
                          {
                            label: "YouTube URL",
                            name: "youtube_url",
                            widget: "string",
                          },
                          {
                            label: "Active",
                            name: "active",
                            widget: "boolean",
                            default: true,
                          },
                        ],
                      },
                      {
                        label: "NFT Collections (Grid)",
                        name: "nft_collections",
                        widget: "list",
                        fields: [
                          {
                            label: "Collection Name",
                            name: "name",
                            widget: "string",
                          },
                          {
                            label: "Collection URL",
                            name: "url",
                            widget: "string",
                          },
                          {
                            label: "Image URL",
                            name: "image_url",
                            widget: "string",
                            required: false,
                          },
                          {
                            label: "Active",
                            name: "active",
                            widget: "boolean",
                            default: true,
                          },
                        ],
                      },
                      {
                        label: "Social Links",
                        name: "social_links",
                        widget: "object",
                        fields: [
                          {
                            label: "Twitter",
                            name: "twitter",
                            widget: "string",
                            required: false,
                          },
                          {
                            label: "YouTube",
                            name: "youtube",
                            widget: "string",
                            required: false,
                          },
                          {
                            label: "Threads",
                            name: "threads",
                            widget: "string",
                            required: false,
                          },
                          {
                            label: "Facebook",
                            name: "facebook",
                            widget: "string",
                            required: false,
                          },
                          {
                            label: "Telegram",
                            name: "telegram",
                            widget: "string",
                            required: false,
                          },
                          {
                            label: "TikTok",
                            name: "tiktok",
                            widget: "string",
                            required: false,
                          },
                          {
                            label: "Discord",
                            name: "discord",
                            widget: "string",
                            required: false,
                          },
                          {
                            label: "LinkedIn",
                            name: "linkedin",
                            widget: "string",
                            required: false,
                          },
                          {
                            label: "Contra",
                            name: "contra",
                            widget: "string",
                            required: false,
                          },
                          {
                            label: "Webbie",
                            name: "webbie",
                            widget: "string",
                            required: false,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        });
      }
    };
    document.body.appendChild(script2);

    return () => {
      if (document.body.contains(script1)) document.body.removeChild(script1);
      if (document.body.contains(script2)) document.body.removeChild(script2);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h2>Loading Decap CMS...</h2>
        <p>Please wait while the admin interface loads.</p>
        {statusMessage && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor:
                statusMessage.includes("❌") || statusMessage.includes("⚠️")
                  ? "#fff3cd"
                  : "#d4edda",
              color: statusMessage.includes("❌") ? "#721c24" : "#155724",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            {statusMessage}
          </div>
        )}
        {!health.isPrimaryAvailable && !health.isBackupAvailable && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#f8d7da",
              color: "#721c24",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            <p>
              Unable to connect to CMS servers. Please check your internet
              connection or try again later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

declare global {
  interface Window {
    CMS: any;
  }
}
