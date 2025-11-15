import { useEffect, useState } from "react";
import {
  X,
  Youtube,
  Instagram,
  Facebook,
  Send,
  MessageCircle,
  Music,
  Sparkles,
} from "lucide-react";

export default function Footer() {
  const [socialLinks, setSocialLinks] = useState([
    { name: "X", icon: X, url: "#", label: "X (Twitter)" },
    { name: "YouTube", icon: Youtube, url: "#", label: "YouTube" },
    { name: "Instagram", icon: Instagram, url: "#", label: "Instagram" },
    { name: "Threads", icon: MessageCircle, url: "#", label: "Threads", isCustom: true },
    { name: "Facebook", icon: Facebook, url: "#", label: "Facebook" },
    { name: "Telegram", icon: Send, url: "#", label: "Telegram" },
    { name: "TikTok", icon: Music, url: "#", label: "TikTok", isCustom: true },
    { name: "Discord", icon: MessageCircle, url: "#", label: "Discord", isCustom: true },
    { name: "Webbie Social", icon: Sparkles, url: "#", label: "Webbie Social", isCustom: true },
  ]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("social-links");
      const savedSocialLinks = saved ? JSON.parse(saved) : {};

      setSocialLinks(prevLinks =>
        prevLinks.map(link => {
          const key = link.name.toLowerCase().replace(/\s+/g, "");
          const urlKey =
            key === "x" ? "twitter" :
            key === "youtube" ? "youtube" :
            key === "instagram" ? "instagram" :
            key === "threads" ? "threads" :
            key === "facebook" ? "facebook" :
            key === "telegram" ? "telegram" :
            key === "tiktok" ? "tiktok" :
            key === "discord" ? "discord" :
            key === "webbie social" ? "webbie" :
            key;

          return {
            ...link,
            url: savedSocialLinks[urlKey] || "#",
          };
        })
      );
    } catch (error) {
      console.error("Failed to load social links:", error);
    }
  }, []);

  return (
    <footer className="border-t border-cosmic-purple/20 bg-cosmic-dark/50 backdrop-blur-sm py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Social Icons Section */}
        <div className="flex flex-col items-center gap-8">
          {/* Circular Icon Grid */}
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  title={social.label}
                  className="group relative w-12 h-12 rounded-full flex items-center justify-center bg-cosmic-purple/10 border border-cosmic-purple/30 hover:border-cosmic-purple hover:bg-cosmic-purple/20 transition-all duration-300 hover:cosmic-glow"
                  aria-label={social.label}
                >
                  <IconComponent className="w-5 h-5 text-cosmic-purple group-hover:text-gray-100 transition-colors duration-300" />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {social.label}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Divider */}
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-cosmic-purple/50 to-transparent" />

          {/* Footer Text */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © 2026 Cosmic Hub. Journey through the cosmos responsibly.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Where art, music, and technology transcend reality
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
