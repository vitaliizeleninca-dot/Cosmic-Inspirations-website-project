import { useState } from "react";
import { Sparkles, PlayCircle } from "lucide-react";
import Footer from "./components/Footer";
import ContactModal from "./components/ContactModal";
import HeroModal from "./components/HeroModal";
import { siteContent } from "./data/content";

const artworks = [
  { id: 1, src: "/Future Couture.jpg" },
  { id: 2, src: "/northern_pulse_2.png" }
];

export default function Index() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);
  
  // Достаем блоки из контента
  const { hero, contact } = siteContent;

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <style>{`
        @keyframes rotate-3d {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(-360deg); }
        }
        .cosmic-perspective { perspective: 1500px; }
        .cosmic-spinner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          animation: rotate-3d 35s linear infinite;
        }
        .cosmic-spinner:hover { animation-play-state: paused; }
        .carousel-card {
          position: absolute;
          left: 50%;
          top: 50%;
          transform-style: preserve-3d;
        }
      `}</style>

      {/* Header/Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition">
            <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Cosmic Hub
            </h1>
          </a>
          
          <nav className="hidden sm:flex items-center gap-8">
            <a href="#podcast" className="text-sm text-gray-300 hover:text-purple-400">AI Art Podcast</a>
            <a href="#music" className="text-sm text-gray-300 hover:text-purple-400">Cosmic Ambient</a>
            <a href="#experience" className="text-sm text-gray-300 hover:text-purple-400">Feel the Cosmos</a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="w-px h-6 bg-white/10" />
            {contact.enabled && (
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105"
              >
                Contact Me
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        <section className="relative flex items-center justify-center px-4 overflow-hidden py-20">
          
          {/* Фоновое свечение */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
          </div>

          <div className="relative w-full max-w-7xl h-[500px] flex items-center justify-center">
            
            {/* 1. КАРУСЕЛЬ */}
            <div className="cosmic-perspective absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="cosmic-spinner">
                {artworks.map((art, index) => {
                  const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 180 : 400;
                  const angle = (index / artworks.length) * 360;
                  return (
                    <div
                      key={art.id}
                      className="carousel-card w-[200px] sm:w-[380px]"
                      style={{
                        transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`
                      }}
                    >
                      <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md">
                        <img src={art.src} className="w-full h-auto object-cover" alt="Art" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. ТЕКСТ */}
            <div className="relative z-20 text-center max-w-4xl mx-auto pointer-events-auto">
              <div className="mb-6 inline-block">
                <div className="px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur">
                  <span className="text-purple-400 text-sm font-semibold">{hero.badge}</span>
                </div>
              </div>

              <h2 className="text-4xl sm:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
                  {hero.title}
                </span>
                <br />
                <span className="text-gray-100">{hero.subtitle}</span>
              </h2>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
                <a href="/CV_Alpha_Ross.png" target="_blank" className="px-8 py-3 rounded-lg font-semibold border-2 border-purple-500/50 text-purple-400 hover:bg-purple-500 hover:text-white transition-all">
                  VIEW MY CV HERE
                </a>
                <a href="https://youtube.com/shorts/dB_wdhRoTpw" target="_blank" className="px-8 py-3 rounded-lg font-semibold border-2 border-white/10 text-gray-300 hover:bg-white/5 transition-all">
                  Show Me
                </a>
                <button onClick={() => setIsLearnMoreOpen(true)} className="px-8 py-3 rounded-lg font-semibold border-2 border-white/10 text-gray-300 hover:bg-white/5 transition-all">
                  Learn More
                </button>
              </div>

              {/* ИНТЕРАКТИВНЫЕ ССЫЛКИ */}
              <div className="mt-12 flex flex-col gap-4 items-center">
                <a href="https://youtu.be/fnwpdHiQy9Y" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2">
                  <PlayCircle className="w-4 h-4" /> United by Vision. Born for the Frontier. 🌊🚀
                </a>
                <a href="https://youtu.be/_ckn-2JPQfU" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 text-center px-4">
                  <PlayCircle className="w-4 h-4" /> Echoes of Tomorrow — Astral Couture
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>

      {/* Modals */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      <HeroModal isOpen={isLearnMoreOpen} onClose={() => setIsLearnMoreOpen(false)} />
    </div>
  );
}
        
        {/* Winner Showcase Section */}
<section id="exhibitions" className="py-24 px-4 bg-black/40 border-y border-white/5">
  <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
    
    {/* 1. Видео/Изображение СЛЕВА (на мобильных сверху) */}
    <div className="w-full lg:w-1/2 aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
      <iframe 
        width="100%" 
        height="100%" 
        src={winnerShowcase.video} 
        frameBorder="0" 
        allowFullScreen 
      />
    </div>

    {/* 2. Текстовый блок СПРАВА, но текст внутри выровнен ПО ЦЕНТРУ */}
    <div className="w-full lg:w-1/2 text-center">
      <div className="mb-4 inline-block">
        <span className="px-3 py-1 rounded-full border border-yellow-500/50 bg-yellow-500/10 text-yellow-500 text-[10px] font-bold uppercase tracking-widest">
          Selected Artist 2025-2026
        </span>
      </div>
      
      <h3 className="text-4xl font-bold mb-6 text-white leading-tight">
        International Open Call Selection
      </h3>
      
      <p className="text-gray-400 text-lg mb-8 leading-relaxed">
        Selected by 34 Gallery. The organization contributes to UN SDG 3.4 through creative arts. 
        Shown at One Love Miami Art Week, an event described by Forbes as a “must-see.” 
        Featured in #FCancer2025, linked to nonprofit LetsFCancer, which supports cancer prevention
      </p>
      
      <button 
        onClick={() => setIsGalleryOpen(true)}
        className="px-10 py-4 bg-white text-black rounded-full font-bold hover:bg-cosmic-purple hover:text-white transition-all shadow-lg"
      >
        Open Winner Gallery
      </button>
    </div>

  </div>
</section>

        {/* AI Art Podcast Section */}
        {siteContent.aiArtPodcast.enabled && (
          <section id="podcast" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cosmic-purple/30 rounded-full filter blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-6xl">
              <div className="text-center mb-16">
                <h3 className="text-5xl font-bold mb-4">{siteContent.aiArtPodcast.title}</h3>
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
          <section id="music" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-cosmic-violet/30 rounded-full filter blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-6xl">
              <div className="text-center mb-16">
                <h3 className="text-5xl font-bold mb-4">{cosmicAmbient.title}</h3>
                <p className="text-cosmic-purple text-lg font-semibold mb-4">{cosmicAmbient.subtitle}</p>
                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                  {cosmicAmbient.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cosmicAmbient.videos.map((url, index) => (
                  <div key={index} className="relative aspect-video rounded-2xl overflow-hidden cosmic-glow">
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
          <section id="experience" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cosmic-purple/30 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
            </div>

            <div className="relative z-10 max-w-6xl w-full">
              <div className="text-center mb-16">
                <h3 className="text-5xl font-bold mb-4">{feelCosmos.title}</h3>
                <p className="text-cosmic-purple text-lg font-semibold mb-4">{feelCosmos.subtitle}</p>
                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">{feelCosmos.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {feelCosmos.videos.map((url, index) => (
                  <div key={index} className="relative aspect-video rounded-2xl overflow-hidden cosmic-glow">
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
          <section id="nft" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cosmic-violet/30 rounded-full filter blur-3xl" />
            </div>

            <div className="relative z-10 max-w-6xl w-full">
              <div className="text-center mb-16">
                <h3 className="text-5xl font-bold mb-4">{nftCollections.title}</h3>
                <p className="text-cosmic-purple text-lg font-semibold mb-4">{nftCollections.subtitle}</p>
                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">{nftCollections.description}</p>
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
  {/* Оставляем только один этот блок */}
  <div className="absolute inset-0 bg-gradient-to-t from-cosmic-dark/90 to-transparent opacity-100 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-6 px-4">
    <p className="text-gray-100 font-semibold text-center whitespace-pre-line">
      {collection.name}
    </p>
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
          <section id="my-ai-tools" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-cosmic-violet/30 rounded-full filter blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-6xl">
              <div className="text-center mb-16">
                <h3 className="text-5xl font-bold mb-4">{aiTools.title}</h3>
                <p className="text-cosmic-purple text-lg font-semibold mb-4">{aiTools.subtitle}</p>
                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">{aiTools.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {aiTools.videos.map((url, index) => (
                  <div key={index} className="relative aspect-video rounded-2xl overflow-hidden cosmic-glow">
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
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

      {/* Hero Modal для Learn More */}
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
                <div
                  key={idx}
                  className="group relative rounded-xl overflow-hidden border border-white/5 bg-white/5 hover:border-cosmic-purple/50 transition-all"
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full aspect-square object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
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
