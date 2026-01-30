import { useState } from "react";
import { Sparkles, X, PlayCircle } from "lucide-react"; // PlayCircle пригодится для красоты видео
import Footer from "./components/Footer";
import ContactModal from "./components/ContactModal";
import HeroModal from "./components/HeroModal";
import { siteContent } from "./data/content";;

export default function Index() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAboutMeOpen, setIsAboutMeOpen] = useState(false);
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);
        const [isGalleryOpen, setIsGalleryOpen] = useState(false); // Теперь на месте!

 // Достаем новый блок из контента
  const { hero, winnerShowcase, cosmicAmbient, feelCosmos, aiTools, nftCollections, contact } = siteContent;

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
            <a
              href="#podcast"
              className="text-sm text-gray-300 hover:text-cosmic-purple transition"
            >
              AI Art Podcast
            </a>
            <a
              href="#music"
              className="text-sm text-gray-300 hover:text-cosmic-purple transition"
            >
              Cosmic Ambient
            </a>
            <a
              href="#experience"
              className="text-sm text-gray-300 hover:text-cosmic-purple transition"
            >
              Feel the Cosmos
            </a>
            <a
              href="#nft"
              className="text-sm text-gray-300 hover:text-cosmic-purple transition"
            >
              NFT Collections
            </a>
            <a
              href="#my-ai-tools"
              className="text-sm text-gray-300 hover:text-cosmic-purple transition"
            >
              My AI Tools
            </a>
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
                <span className="text-cosmic-purple text-sm font-semibold">
                  {hero.badge}
                </span>
              </div>
            </div>

            <h2 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cosmic-purple via-cosmic-violet to-cosmic-purple bg-clip-text text-transparent">
                {hero.title}
              </span>
              <br />
              <span className="text-gray-100">{hero.subtitle}</span>
            </h2>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              {hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    
  {/* Эта кнопка теперь работает как ссылка на файл, а не как открывашка окна */}
  <a
    href="/CV_Alpha_Ross.png"
    target="_blank"
    rel="noopener noreferrer"
    className="btn-cosmic inline-flex items-center justify-center text-center cursor-pointer"
  >
    About Me (CV)
  </a>

  <button
    onClick={() => setIsLearnMoreOpen(true)}
    className="px-6 py-3 rounded-lg font-semibold border-2 border-cosmic-purple/50 text-cosmic-purple hover:border-cosmic-purple hover:cosmic-glow transition-all duration-300 cursor-pointer"
  >
    Learn More
  </button>
</div>
        </section>

{/* Winner Showcase - Официальные достижения */}
{winnerShowcase.enabled && (
  <section id="exhibitions" className="py-20 px-4 bg-black/50 border-y border-cosmic-purple/10">
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
      {/* Видео */}
      <div className="w-full lg:w-1/2 aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-cosmic-purple/20 border border-cosmic-purple/30">
        <iframe 
          width="100%" height="100%" 
          src={winnerShowcase.video} 
          title="Exhibition Showcase"
          frameBorder="0" allowFullScreen 
        />
      </div>
      
      {/* Текст на основе писем */}
      <div className="w-full lg:w-1/2 text-left">
        <div className="inline-block px-3 py-1 rounded-full border border-yellow-500/50 text-yellow-500 text-xs font-bold uppercase tracking-wider mb-4">
          Selected Artist 2025-2026
        </div>
        <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          {winnerShowcase.title}
        </h3>
        <p className="text-gray-300 mb-8 leading-relaxed">
          Officially selected for the <strong>"Awakening Radiance"</strong> exhibit by 34 Gallery. 
          Featured in <strong>One Love Miami Art Week</strong> (referenced by Forbes as a "must-attend" event). 
          Recognized for contributions to <strong>#FCancer2025</strong> Art for Impact.
        </p>
        <button 
          onClick={() => setIsGalleryOpen(true)}
          className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
        >
          Open Winner Gallery
        </button>
      </div>
    </div>
  </section>
)}


              

        {/* AI Art Podcast Section */}
        {siteContent.aiArtPodcast.enabled && (
          <section
            id="podcast"
            className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative"
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cosmic-purple/30 rounded-full filter blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-6xl">
              <div className="text-center mb-16">
                <h3 className="text-5xl font-bold mb-4">
                  {siteContent.aiArtPodcast.title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                  {siteContent.aiArtPodcast.description}
                </p>
              </div>

              {siteContent.aiArtPodcast.videos.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {siteContent.aiArtPodcast.videos.map((url, index) => (
                    <div
                      key={index}
                      className="relative aspect-video rounded-2xl overflow-hidden cosmic-glow"
                    >
                      <iframe
                        width="100%"
                        height="100%"
                        src={url}
                        title={`AI Art Podcast Episode ${index + 1}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Cosmic Ambient Section */}
        {cosmicAmbient.enabled && cosmicAmbient.videos.length > 0 && (
          <section
            id="music"
            className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative"
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-cosmic-violet/30 rounded-full filter blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-6xl">
              <div className="text-center mb-16">
                <h3 className="text-5xl font-bold mb-4">
                  {cosmicAmbient.title}
                </h3>
                <p className="text-cosmic-purple text-lg font-semibold mb-4">
                  {cosmicAmbient.subtitle}
                </p>
                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                  {cosmicAmbient.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cosmicAmbient.videos.map((url, index) => (
                  <div
                    key={index}
                    className="relative aspect-video rounded-2xl overflow-hidden cosmic-glow"
                  >
                    <iframe
                      width="100%"
                      height="100%"
                      src={url}
                      title={`Cosmic Ambient ${index + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Feel the Cosmos Section */}
        {feelCosmos.enabled && feelCosmos.videos.length > 0 && (
          <section
            id="experience"
            className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative"
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cosmic-purple/30 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
            </div>

            <div className="relative z-10 max-w-6xl w-full">
              <div className="text-center mb-16">
                <h3 className="text-5xl font-bold mb-4">{feelCosmos.title}</h3>
                <p className="text-cosmic-purple text-lg font-semibold mb-4">
                  {feelCosmos.subtitle}
                </p>
                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                  {feelCosmos.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {feelCosmos.videos.map((url, index) => (
                  <div
                    key={index}
                    className="relative aspect-video rounded-2xl overflow-hidden cosmic-glow"
                  >
                    <iframe
                      width="100%"
                      height="100%"
                      src={url}
                      title={`Feel the Cosmos ${index + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* NFT Collections Section */}
        {nftCollections.enabled && nftCollections.collections.length > 0 && (
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
                  {nftCollections.title}
                </h3>
                <p className="text-cosmic-purple text-lg font-semibold mb-4">
                  {nftCollections.subtitle}
                </p>
                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                  {nftCollections.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {nftCollections.collections.map((collection, index) => (
                  <a
                    key={index}
                    href={collection.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative aspect-square rounded-2xl overflow-hidden cosmic-glow cursor-pointer bg-cosmic-dark/50"
                  >
                    {collection.image && (
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-cosmic-dark/90 to-transparent opacity-100 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-6 px-4">
                      <p className="text-gray-100 font-semibold text-center">
                        {collection.name}
                      </p>
                      <span className="text-gray-300 text-sm">
                        View Collection
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* NFT Showcase Videos */}
{siteContent.nftVideos && siteContent.nftVideos.enabled && (
  <section className="flex items-center justify-center px-4 py-10 relative">
    <div className="relative z-10 w-full max-w-6xl text-center">
      <h3 className="text-4xl font-bold mb-4">{siteContent.nftVideos.title}</h3>
      <p className="text-gray-300 mb-8 max-w-2xl mx-auto">{siteContent.nftVideos.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {siteContent.nftVideos.videos.map((url, i) => (
          <div key={i} className="aspect-video rounded-2xl overflow-hidden cosmic-glow">
            <iframe width="100%" height="100%" src={url} frameBorder="0" allowFullScreen />
          </div>
        ))}
      </div>
    </div>
  </section>
)}

        {/* My AI Tools Section */}
        {aiTools.enabled && aiTools.videos.length > 0 && (
          <section
            id="my-ai-tools"
            className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative"
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-cosmic-violet/30 rounded-full filter blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-6xl">
              <div className="text-center mb-16">
                <h3 className="text-5xl font-bold mb-4">{aiTools.title}</h3>
                <p className="text-cosmic-purple text-lg font-semibold mb-4">
                  {aiTools.subtitle}
                </p>
                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                  {aiTools.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {aiTools.videos.map((url, index) => (
                  <div
                    key={index}
                    className="relative aspect-video rounded-2xl overflow-hidden cosmic-glow"
                  >
                    <iframe
                      width="100%"
                      height="100%"
                      src={url}
                      title={`My AI Tools ${index + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <Footer />
      </main>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* Hero Modals */}
      <HeroModal
        isOpen={isAboutMeOpen}
        title="About Me"
        content={hero.aboutMeText}
        onClose={() => setIsAboutMeOpen(false)}
      />
      <HeroModal
        isOpen={isLearnMoreOpen}
        title="Learn More"
        content={hero.learnMoreText}
        onClose={() => setIsLearnMoreOpen(false)}
      />

            {/* Модальное окно галереи победителей */}
{isGalleryOpen && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
    <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-cosmic-dark border border-cosmic-purple/30 rounded-3xl p-6 sm:p-10">
      <button 
        onClick={() => setIsGalleryOpen(false)}
        className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
      >
        <X className="w-8 h-8" />
      </button>
      
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white uppercase tracking-tighter">Exhibition Masterpieces</h2>
        <p className="text-cosmic-purple text-sm font-semibold mt-2">Official Selection - International Open Calls</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {winnerShowcase.gallery.map((item, idx) => (
          <div key={idx} className="group relative rounded-xl overflow-hidden border border-white/5 bg-white/5 hover:border-cosmic-purple/50 transition-all">
            <img src={item.url} alt={item.title} className="w-full aspect-square object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="p-4 border-t border-white/5 bg-black/20">
              <span className="text-yellow-500 text-[10px] font-bold uppercase tracking-widest">{item.achievement}</span>
              <p className="text-sm font-medium text-gray-200 mt-1">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

            
    </div>
  );
}
