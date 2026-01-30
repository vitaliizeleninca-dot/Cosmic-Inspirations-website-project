import { useState } from "react";
import { Sparkles } from "lucide-react";
import Footer from "./components/Footer";
import ContactModal from "./components/ContactModal";
import HeroModal from "./components/HeroModal";
import { siteContent } from "./data/content";

export default function Index() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAboutMeOpen, setIsAboutMeOpen] = useState(false);
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);

  const { hero, cosmicAmbient, feelCosmos, aiTools, nftCollections, contact, aiArtPodcast, nftVideos } = siteContent;

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Header/Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-cosmic-purple/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition">
            <Sparkles className="w-8 h-8 text-cosmic-purple animate-pulse" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cosmic-purple to-cosmic-violet bg-clip-text text-transparent">
              Cosmic Hub
            </h1>
          </div>
          <nav className="hidden sm:flex items-center gap-8">
            <a href="#podcast" className="text-sm text-gray-300 hover:text-cosmic-purple transition">AI Art Podcast</a>
            <a href="#music" className="text-sm text-gray-300 hover:text-cosmic-purple transition">Cosmic Ambient</a>
            <a href="#experience" className="text-sm text-gray-300 hover:text-cosmic-purple transition">Feel the Cosmos</a>
            <a href="#nft" className="text-sm text-gray-300 hover:text-cosmic-purple transition">NFT Collections</a>
            <a href="#my-ai-tools" className="text-sm text-gray-300 hover:text-cosmic-purple transition">My AI Tools</a>
          </nav>
          <div className="flex items-center gap-4">
            <div className="w-px h-6 bg-cosmic-purple/20" />
            {contact.enabled && (
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="hidden sm:inline-flex px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 text-cosmic-dark bg-gradient-to-r from-cosmic-purple to-cosmic-violet hover:from-cosmic-violet hover:to-cosmic-purple hover:cosmic-glow cursor-pointer"
              >
                Contact Me
              </button>
            )}
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
                <span className="text-cosmic-purple text-sm font-semibold">{hero.badge}</span>
              </div>
            </div>
            <h2 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cosmic-purple via-cosmic-violet to-cosmic-purple bg-clip-text text-transparent">{hero.title}</span>
              <br />
              <span className="text-gray-100">{hero.subtitle}</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">{hero.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setIsAboutMeOpen(true)} className="btn-cosmic">About Me</button>
              <button onClick={() => setIsLearnMoreOpen(true)} className="px-6 py-3 rounded-lg font-semibold border-2 border-cosmic-purple/50 text-cosmic-purple hover:border-cosmic-purple hover:cosmic-glow transition-all duration-300">Learn More</button>
            </div>
          </div>
        </section>

        {/* AI Art Podcast */}
        {aiArtPodcast.enabled && (
          <section id="podcast" className="flex items-center justify-center px-4 py-20 relative">
            <div className="relative z-10 w-full max-w-6xl text-center">
              <h3 className="text-5xl font-bold mb-4">{aiArtPodcast.title}</h3>
              <p className="text-gray-300 mb-12 max-w-2xl mx-auto">{aiArtPodcast.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {aiArtPodcast.videos.map((url, i) => (
                  <div key={i} className="aspect-video rounded-2xl overflow-hidden cosmic-glow">
                    <iframe width="100%" height="100%" src={url} frameBorder="0" allowFullScreen />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* NFT Showcase Videos (НОВЫЙ БЛОК ПЕРЕД КОЛЛЕКЦИЯМИ) */}
        {nftVideos && nftVideos.enabled && (
          <section className="flex items-center justify-center px-4 py-20 relative">
             <div className="relative z-10 w-full max-w-6xl text-center">
              <h3 className="text-5xl font-bold mb-4">{nftVideos.title}</h3>
              <p className="text-gray-300 mb-12 max-w-2xl mx-auto">{nftVideos.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {nftVideos.videos.map((url, i) => (
                  <div key={i} className="aspect-video rounded-2xl overflow-hidden cosmic-glow">
                    <iframe width="100%" height="100%" src={url} frameBorder="0" allowFullScreen />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* NFT Collections Section */}
        {nftCollections.enabled && (
          <section id="nft" className="flex items-center justify-center px-4 py-20 relative">
            <div className="relative z-10 max-w-6xl w-full text-center">
              <h3 className="text-5xl font-bold mb-4">{nftCollections.title}</h3>
              <p className="text-cosmic-purple text-lg font-semibold mb-12">{nftCollections.subtitle}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {nftCollections.collections.map((collection, index) => (
                  <a key={index} href={collection.url} target="_blank" rel="noopener noreferrer" className="group relative aspect-square rounded-2xl overflow-hidden cosmic-glow bg-cosmic-dark/50">
                    {collection.image && <img src={collection.image} alt={collection.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-cosmic-dark/90 to-transparent flex flex-col items-center justify-end pb-6 px-4">
                      <p className="text-gray-100 font-semibold">{collection.name}</p>
                      <span className="text-gray-300 text-sm">View Collection</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* My AI Tools Section */}
        {aiTools.enabled && (
          <section id="my-ai-tools" className="flex items-center justify-center px-4 py-20 relative">
            <div className="relative z-10 w-full max-w-6xl text-center">
              <h3 className="text-5xl font-bold mb-4">{aiTools.title}</h3>
              <p className="text-cosmic-purple font-semibold mb-12">{aiTools.subtitle}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {aiTools.videos.map((url, index) => (
                  <div key={index} className="aspect-video rounded-2xl overflow-hidden cosmic-glow">
                    <iframe width="100%" height="100%" src={url} frameBorder="0" allowFullScreen />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </main>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      <HeroModal isOpen={isAboutMeOpen} title="About Me" content={hero.aboutMeText} onClose={() => setIsAboutMeOpen(false)} />
      <HeroModal isOpen={isLearnMoreOpen} title="Learn More" content={hero.learnMoreText} onClose={() => setIsLearnMoreOpen(false)} />
    </div>
  );
}
