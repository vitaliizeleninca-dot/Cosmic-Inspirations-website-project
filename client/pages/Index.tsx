import { useState } from "react";
import { Play, Pause, SkipForward, Music, Podcast, Sparkles, Zap } from "lucide-react";
import Footer from "@/components/Footer";
import BackgroundModal from "@/components/BackgroundModal";

export default function Index() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBackgroundModalOpen, setIsBackgroundModalOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Header/Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-cosmic-purple/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-cosmic-purple animate-pulse" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cosmic-purple to-cosmic-violet bg-clip-text text-transparent">
              Cosmic Hub
            </h1>
          </div>
          <nav className="hidden sm:flex items-center gap-8">
            <a
              href="#podcast"
              className="text-sm text-gray-300 hover:text-cosmic-purple transition"
            >
              Podcast
            </a>
            <a
              href="#music"
              className="text-sm text-gray-300 hover:text-cosmic-purple transition"
            >
              Music
            </a>
            <a
              href="#experience"
              className="text-sm text-gray-300 hover:text-cosmic-purple transition"
            >
              Experience
            </a>
            <a
              href="#nft"
              className="text-sm text-gray-300 hover:text-cosmic-purple transition"
            >
              NFT Collections
            </a>
          </nav>
          <div className="flex items-center gap-6">
            <div className="w-px h-6 bg-cosmic-purple/20" />
            <BackgroundArtSelector />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-cosmic-purple/20 rounded-full filter blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-cosmic-violet/20 rounded-full filter blur-3xl animate-pulse" />
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <div className="mb-6 inline-block">
              <div className="px-4 py-2 rounded-full border border-cosmic-purple/50 bg-cosmic-purple/10 backdrop-blur">
                <span className="text-cosmic-purple text-sm font-semibold">
                  Welcome to the Cosmic Realm
                </span>
              </div>
            </div>

            <h2 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cosmic-purple via-cosmic-violet to-cosmic-purple bg-clip-text text-transparent">
                Immerse Yourself
              </span>
              <br />
              <span className="text-gray-100">in the Cosmos</span>
            </h2>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              A unique fusion of AI-powered art, ambient soundscapes, interactive
              experiences, and digital collectibles from the depths of space
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#experience"
                className="btn-cosmic"
              >
                Enter the Experience
              </a>
              <button className="px-6 py-3 rounded-lg font-semibold border-2 border-cosmic-purple/50 text-cosmic-purple hover:border-cosmic-purple hover:cosmic-glow transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* AI Art Podcast Section */}
        <section
          id="podcast"
          className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cosmic-purple/30 rounded-full filter blur-3xl" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl w-full">
            <div className="order-2 lg:order-1">
              <div className="relative aspect-square rounded-2xl overflow-hidden cosmic-glow">
                <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple/40 to-cosmic-violet/40 flex items-center justify-center">
                  <Podcast className="w-24 h-24 text-cosmic-purple opacity-50" />
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="mb-6">
                <h3 className="text-5xl font-bold mb-4">
                  AI Art Podcast
                </h3>
                <p className="text-cosmic-purple text-lg font-semibold mb-4">
                  Legendary Avatars
                </p>
              </div>

              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Dive into conversations with AI-generated legendary avatars from
                across the cosmos. Explore storytelling, philosophy, and creativity
                through the eyes of artificial intelligences shaped by the universe.
              </p>

              <div className="space-y-4 mb-8">
                <div className="p-4 rounded-lg border border-cosmic-purple/30 bg-cosmic-purple/5 hover:bg-cosmic-purple/10 transition">
                  <h4 className="text-cosmic-purple font-semibold mb-2">
                    Episode 1: Genesis
                  </h4>
                  <p className="text-gray-400 text-sm">
                    The origin story of consciousness in artificial minds
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-cosmic-purple/30 bg-cosmic-purple/5 hover:bg-cosmic-purple/10 transition">
                  <h4 className="text-cosmic-purple font-semibold mb-2">
                    Episode 2: Celestial Wisdom
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Ancient knowledge reinterpreted through modern AI
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-cosmic-purple/30 bg-cosmic-purple/5 hover:bg-cosmic-purple/10 transition">
                  <h4 className="text-cosmic-purple font-semibold mb-2">
                    Episode 3: The Void Speaks
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Exploring the mysteries of silence and emptiness
                  </p>
                </div>
              </div>

              <button className="btn-cosmic">
                <Podcast className="w-5 h-5 mr-2 inline" />
                Listen Now
              </button>
            </div>
          </div>
        </section>

        {/* Cosmic Ambient Music Player Section */}
        <section
          id="music"
          className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cosmic-violet/30 rounded-full filter blur-3xl" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl w-full">
            <div>
              <h3 className="text-5xl font-bold mb-4">
                Cosmic Ambient
              </h3>
              <p className="text-cosmic-purple text-lg font-semibold mb-4">
                Music Player
              </p>

              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Immerse yourself in ethereal soundscapes designed to elevate your
                consciousness. Our AI-curated ambient music draws inspiration from
                the vastness of space, creating an otherworldly listening experience.
              </p>

              <div className="bg-cosmic-purple/10 border border-cosmic-purple/30 rounded-2xl p-8 cosmic-glow mb-8">
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold text-cosmic-purple mb-2">
                    Now Playing
                  </h4>
                  <p className="text-gray-300">Nebula Dreams</p>
                  <p className="text-gray-500 text-sm">3:24 / 7:45</p>
                </div>

                <div className="w-full h-2 bg-cosmic-dark rounded-full mb-6 overflow-hidden">
                  <div className="w-1/3 h-full bg-gradient-to-r from-cosmic-purple to-cosmic-violet" />
                </div>

                <div className="flex items-center justify-center gap-4">
                  <button className="p-3 rounded-full border border-cosmic-purple/50 hover:border-cosmic-purple hover:cosmic-glow transition">
                    <SkipForward className="w-6 h-6 text-cosmic-purple rotate-180" />
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-4 rounded-full bg-gradient-cosmic hover:cosmic-glow-lg transition transform hover:-translate-y-1"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-cosmic-dark" />
                    ) : (
                      <Play className="w-6 h-6 text-cosmic-dark ml-1" />
                    )}
                  </button>
                  <button className="p-3 rounded-full border border-cosmic-purple/50 hover:border-cosmic-purple hover:cosmic-glow transition">
                    <SkipForward className="w-6 h-6 text-cosmic-purple" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border border-cosmic-purple/30 bg-cosmic-purple/5 text-center hover:bg-cosmic-purple/10 cursor-pointer transition">
                  <Music className="w-5 h-5 text-cosmic-purple mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-300">
                    Cosmic Drift
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-cosmic-purple/30 bg-cosmic-purple/5 text-center hover:bg-cosmic-purple/10 cursor-pointer transition">
                  <Music className="w-5 h-5 text-cosmic-purple mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-300">
                    Void Echo
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-cosmic-purple/30 bg-cosmic-purple/5 text-center hover:bg-cosmic-purple/10 cursor-pointer transition">
                  <Music className="w-5 h-5 text-cosmic-purple mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-300">
                    Star Light
                  </p>
                </div>
              </div>
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden cosmic-glow">
              <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple/40 to-cosmic-violet/40 flex items-center justify-center">
                <Music className="w-24 h-24 text-cosmic-purple opacity-50" />
              </div>
            </div>
          </div>
        </section>

        {/* Feel the Cosmos Interactive Experience Section */}
        <section
          id="experience"
          className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cosmic-purple/30 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
          </div>

          <div className="relative z-10 max-w-6xl w-full">
            <div className="text-center mb-16">
              <h3 className="text-5xl font-bold mb-4">
                Feel the Cosmos
              </h3>
              <p className="text-cosmic-purple text-lg font-semibold mb-4">
                Interactive Experience
              </p>
              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                Engage with a dynamic, interactive universe that responds to your
                presence. Move through dimensional spaces and discover hidden
                connections between art, sound, and reality.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple/20 to-cosmic-violet/20 rounded-2xl blur-xl group-hover:blur-2xl transition" />
                <div className="relative bg-cosmic-purple/5 border border-cosmic-purple/30 rounded-2xl p-8 hover:border-cosmic-purple transition cosmic-glow">
                  <Zap className="w-10 h-10 text-cosmic-purple mb-4" />
                  <h4 className="text-xl font-bold text-gray-100 mb-3">
                    Dimensional Explorer
                  </h4>
                  <p className="text-gray-400">
                    Navigate through multi-dimensional spaces and uncover cosmic
                    secrets hidden within alternate realities.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple/20 to-cosmic-violet/20 rounded-2xl blur-xl group-hover:blur-2xl transition" />
                <div className="relative bg-cosmic-purple/5 border border-cosmic-purple/30 rounded-2xl p-8 hover:border-cosmic-purple transition cosmic-glow">
                  <Sparkles className="w-10 h-10 text-cosmic-purple mb-4" />
                  <h4 className="text-xl font-bold text-gray-100 mb-3">
                    Stellar Meditation
                  </h4>
                  <p className="text-gray-400">
                    Guided journeys through visual and auditory realms designed to
                    expand consciousness and inner peace.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple/20 to-cosmic-violet/20 rounded-2xl blur-xl group-hover:blur-2xl transition" />
                <div className="relative bg-cosmic-purple/5 border border-cosmic-purple/30 rounded-2xl p-8 hover:border-cosmic-purple transition cosmic-glow">
                  <Music className="w-10 h-10 text-cosmic-purple mb-4" />
                  <h4 className="text-xl font-bold text-gray-100 mb-3">
                    Frequency Resonance
                  </h4>
                  <p className="text-gray-400">
                    Feel the vibrations of the universe as frequencies from
                    galactic sources wash over your being.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple/20 to-cosmic-violet/20 rounded-2xl blur-xl group-hover:blur-2xl transition" />
                <div className="relative bg-cosmic-purple/5 border border-cosmic-purple/30 rounded-2xl p-8 hover:border-cosmic-purple transition cosmic-glow">
                  <Podcast className="w-10 h-10 text-cosmic-purple mb-4" />
                  <h4 className="text-xl font-bold text-gray-100 mb-3">
                    Cosmic Storytelling
                  </h4>
                  <p className="text-gray-400">
                    Immerse yourself in narrative experiences crafted by both
                    human creativity and artificial intelligence.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <button className="btn-cosmic">
                Start Your Journey
              </button>
            </div>
          </div>
        </section>

        {/* NFT Collections Section */}
        <section
          id="nft"
          className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cosmic-violet/30 rounded-full filter blur-3xl" />
          </div>

          <div className="relative z-10 max-w-6xl w-full">
            <div className="text-center mb-16">
              <h3 className="text-5xl font-bold mb-4">
                NFT Collections
              </h3>
              <p className="text-cosmic-purple text-lg font-semibold mb-4">
                Legendary Digital Artifacts
              </p>
              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                Own a piece of the cosmos with our exclusive NFT collections,
                each representing a unique moment in the digital universe.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple/20 to-cosmic-violet/20 rounded-2xl blur-xl group-hover:blur-2xl transition group-hover:scale-110 transition" />
                <div className="relative bg-cosmic-purple/5 border border-cosmic-purple/30 rounded-2xl p-8 hover:border-cosmic-purple transition cosmic-glow h-full">
                  <div className="aspect-square rounded-lg bg-gradient-to-br from-cosmic-purple/30 to-cosmic-violet/30 mb-6 flex items-center justify-center border border-cosmic-purple/50">
                    <Sparkles className="w-12 h-12 text-cosmic-purple opacity-50" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-100 mb-2">
                    Retro Edition
                  </h4>
                  <p className="text-cosmic-purple text-sm font-semibold mb-3">
                    Limited to 500
                  </p>
                  <p className="text-gray-400 mb-6">
                    Nostalgic artifacts inspired by the golden age of digital
                    computing, blended with futuristic cosmic elements.
                  </p>
                  <button className="btn-cosmic w-full text-center justify-center">
                    View Collection
                  </button>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple/20 to-cosmic-violet/20 rounded-2xl blur-xl group-hover:blur-2xl transition group-hover:scale-110 transition" />
                <div className="relative bg-cosmic-purple/5 border border-cosmic-purple/30 rounded-2xl p-8 hover:border-cosmic-purple transition cosmic-glow h-full">
                  <div className="aspect-square rounded-lg bg-gradient-to-br from-cosmic-purple/30 to-cosmic-violet/30 mb-6 flex items-center justify-center border border-cosmic-purple/50">
                    <Music className="w-12 h-12 text-cosmic-purple opacity-50" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-100 mb-2">
                    Animated Edition
                  </h4>
                  <p className="text-cosmic-purple text-sm font-semibold mb-3">
                    Limited to 250
                  </p>
                  <p className="text-gray-400 mb-6">
                    Living NFTs that dance to cosmic rhythms, each piece a
                    animated journey through the stars.
                  </p>
                  <button className="btn-cosmic w-full text-center justify-center">
                    View Collection
                  </button>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple/20 to-cosmic-violet/20 rounded-2xl blur-xl group-hover:blur-2xl transition group-hover:scale-110 transition" />
                <div className="relative bg-cosmic-purple/5 border border-cosmic-purple/30 rounded-2xl p-8 hover:border-cosmic-purple transition cosmic-glow h-full">
                  <div className="aspect-square rounded-lg bg-gradient-to-br from-cosmic-purple/30 to-cosmic-violet/30 mb-6 flex items-center justify-center border border-cosmic-purple/50">
                    <Zap className="w-12 h-12 text-cosmic-purple opacity-50" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-100 mb-2">
                    Digital Echoes
                  </h4>
                  <p className="text-cosmic-purple text-sm font-semibold mb-3">
                    Limited to 1000
                  </p>
                  <p className="text-gray-400 mb-6">
                    Reverberations of digital consciousness captured in time,
                    each a unique frequency from the cosmic network.
                  </p>
                  <button className="btn-cosmic w-full text-center justify-center">
                    View Collection
                  </button>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple/20 to-cosmic-violet/20 rounded-2xl blur-xl group-hover:blur-2xl transition group-hover:scale-110 transition" />
                <div className="relative bg-cosmic-purple/5 border border-cosmic-purple/30 rounded-2xl p-8 hover:border-cosmic-purple transition cosmic-glow h-full">
                  <div className="aspect-square rounded-lg bg-gradient-to-br from-cosmic-purple/30 to-cosmic-violet/30 mb-6 flex items-center justify-center border border-cosmic-purple/50">
                    <Podcast className="w-12 h-12 text-cosmic-purple opacity-50" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-100 mb-2">
                    Podcast Collection 2026
                  </h4>
                  <p className="text-cosmic-purple text-sm font-semibold mb-3">
                    Limited to 100
                  </p>
                  <p className="text-gray-400 mb-6">
                    Exclusive artifacts commemorating the legendary avatars from
                    our podcast journeys through space and time.
                  </p>
                  <button className="btn-cosmic w-full text-center justify-center">
                    View Collection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
