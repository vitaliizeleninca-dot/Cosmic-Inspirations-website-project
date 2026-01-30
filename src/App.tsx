import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import Footer from "./components/Footer";
import ContactModal from "./components/ContactModal";
import HeroModal from "./components/HeroModal";
import { siteContent } from "./data/content";

export default function Index() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const {
    hero,
    winnerShowcase,
    cosmicAmbient,
    feelCosmos,
    aiTools,
    nftCollections,
    contact,
  } = siteContent;

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-cosmic-purple/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-cosmic-purple animate-pulse" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cosmic-purple to-cosmic-violet bg-clip-text text-transparent">
              Cosmic Hub
            </h1>
          </div>

          {contact.enabled && (
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="hidden sm:inline-flex px-4 py-2 rounded-lg text-sm font-semibold text-cosmic-dark bg-gradient-to-r from-cosmic-purple to-cosmic-violet hover:cosmic-glow"
            >
              Contact Me
            </button>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="pt-20">
        {/* HERO */}
        <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-cosmic-purple/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-cosmic-violet/20 rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <div className="mb-6 inline-block px-4 py-2 rounded-full border border-cosmic-purple/50 bg-cosmic-purple/10">
              <span className="text-cosmic-purple text-sm font-semibold">
                {hero.badge}
              </span>
            </div>

            <h2 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cosmic-purple to-cosmic-violet bg-clip-text text-transparent">
                {hero.title}
              </span>
              <br />
              <span className="text-gray-100">{hero.subtitle}</span>
            </h2>

            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              {hero.description}
            </p>

            {/* ✅ FIXED BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/CV_Alpha_Ross.png"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cosmic text-center"
              >
                VIEW MY CV HERE
              </a>

              <button
                onClick={() => setIsLearnMoreOpen(true)}
                className="px-6 py-3 rounded-lg font-semibold border-2 border-cosmic-purple/50 text-cosmic-purple hover:cosmic-glow transition-all"
              >
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Winner Showcase */}
        {winnerShowcase.enabled && (
          <section className="py-20 px-4 bg-black/50 border-y border-cosmic-purple/10">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
              <div className="w-full lg:w-1/2 aspect-video rounded-2xl overflow-hidden border border-cosmic-purple/30">
                <iframe
                  src={winnerShowcase.video}
                  width="100%"
                  height="100%"
                  allowFullScreen
                />
              </div>

              <div className="w-full lg:w-1/2">
                <h3 className="text-4xl font-bold mb-4">
                  {winnerShowcase.title}
                </h3>
                <p className="text-gray-300 mb-6">
                  Officially selected for Miami Art Week & 34 Gallery.
                </p>

                <button
                  onClick={() => setIsGalleryOpen(true)}
                  className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition"
                >
                  Open Winner Gallery
                </button>
              </div>
            </div>
          </section>
        )}

        <Footer />
      </main>

      {/* Modals */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <HeroModal
        isOpen={isLearnMoreOpen}
        title="Learn More"
        content={hero.learnMoreText}
        onClose={() => setIsLearnMoreOpen(false)}
      />

      {/* Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 p-6 overflow-y-auto">
          <button
            onClick={() => setIsGalleryOpen(false)}
            className="absolute top-6 right-6 text-gray-400 hover:text-white"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
            {winnerShowcase.gallery.map((item, idx) => (
              <img
                key={idx}
                src={item.url}
                alt={item.title}
                className="rounded-xl"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
