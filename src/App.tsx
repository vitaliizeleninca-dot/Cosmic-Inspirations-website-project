import { useState } from "react";
import { Sparkles, X, PlayCircle } from "lucide-react";
import Footer from "./components/Footer";
import ContactModal from "./components/ContactModal";
import HeroModal from "./components/HeroModal";
import { siteContent } from "./data/content";

/* ARTWORKS FOR HERO CAROUSEL */
const artworks = [
  { id: 1, src: "/Future Couture 2.png", title: "Future Couture" },
  { id: 2, src: "/northern_pulse_2.png", title: "Northern Pulse" },
];

export default function Index() {

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);

  const {
    hero,
    winnerShowcase,
    cosmicAmbient,
    feelCosmos,
    aiTools,
    nftCollections,
    contact
  } = siteContent;

  const radius = 450;

  return (

    <div className="min-h-screen overflow-x-hidden">

      {/* CAROUSEL CSS */}
      <style>{`

      @keyframes rotate-3d {
        from { transform: rotateY(0deg); }
        to { transform: rotateY(-360deg); }
      }

      .cosmic-perspective{
        perspective:1500px;
        perspective-origin:center -10%;
      }

      .cosmic-spinner{
        position:relative;
        width:100%;
        height:100%;
        transform-style:preserve-3d;
        animation:rotate-3d 35s linear infinite;
      }

      .cosmic-spinner:hover{
        animation-play-state:paused;
      }

      .carousel-card{
        position:absolute;
        left:50%;
        top:50%;
        backface-visibility:hidden;
      }

      `}</style>


      {/* HEADER */}

      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-cosmic-purple/20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

          <a href="#" className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition">
            <Sparkles className="w-8 h-8 text-cosmic-purple animate-pulse" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cosmic-purple to-cosmic-violet bg-clip-text text-transparent">
              Cosmic Hub
            </h1>
          </a>

          <nav className="hidden sm:flex items-center gap-8">
            <a href="#podcast" className="text-sm text-gray-300 hover:text-cosmic-purple transition">
              AI Art Podcast
            </a>
            <a href="#music" className="text-sm text-gray-300 hover:text-cosmic-purple transition">
              Cosmic Ambient
            </a>
            <a href="#experience" className="text-sm text-gray-300 hover:text-cosmic-purple transition">
              Feel the Cosmos
            </a>
            <a href="#nft" className="text-sm text-gray-300 hover:text-cosmic-purple transition">
              Art Collections
            </a>
            <a href="#my-ai-tools" className="text-sm text-gray-300 hover:text-cosmic-purple transition">
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


      {/* MAIN */}

      <main className="pt-20">

        {/* HERO */}

        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">

          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-cosmic-purple/20 rounded-full filter blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-cosmic-violet/20 rounded-full filter blur-3xl animate-pulse" />
          </div>


          <div className="relative z-10 text-center max-w-4xl mx-auto opacity-30">

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
              <span className="text-gray-100">
                {hero.subtitle}
              </span>
            </h2>


            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              {hero.description}
            </p>


            {/* 3D HERO CAROUSEL */}

            <div className="cosmic-perspective w-full h-[420px] sm:h-[520px] mb-16 relative flex items-center justify-center">

              <div className="cosmic-spinner">

                {artworks.map((art, index) => {

                  const angle = (index / artworks.length) * 360;

                  return (

                    <div
                      key={art.id}
                      className="carousel-card w-[280px] sm:w-[420px]"
                      style={{
                        transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`
                      }}
                    >

                      <div className="relative rounded-2xl overflow-hidden border border-cosmic-purple/30 bg-black/40 backdrop-blur-md shadow-2xl shadow-cosmic-purple/20">

                        <img
                          src={art.src}
                          alt={art.title}
                          className="w-full h-auto object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-6 flex flex-col justify-end text-left">

                          <p className="text-white text-lg font-bold">
                            {art.title}
                          </p>

                          <p className="text-cosmic-purple text-[10px] uppercase font-bold tracking-widest">
                            Selected Masterpiece
                          </p>

                        </div>

                      </div>

                    </div>

                  );

                })}

              </div>

              <div className="absolute w-64 h-64 bg-cosmic-purple/10 blur-[100px] rounded-full -z-10" />

            </div>


            <div className="flex flex-col sm:flex-row gap-4 justify-center">

              <a
                href="/CV_Alpha_Ross.png"
                target="_blank"
                className="px-6 py-3 rounded-lg font-semibold border-2 border-cosmic-purple/50 text-cosmic-purple hover:border-cosmic-purple hover:cosmic-glow transition-all duration-300"
              >
                VIEW MY CV HERE
              </a>

              <button
                onClick={() => setIsLearnMoreOpen(true)}
                className="px-6 py-3 rounded-lg font-semibold border-2 border-cosmic-purple/50 text-cosmic-purple hover:border-cosmic-purple hover:cosmic-glow transition-all duration-300"
              >
                Learn More
              </button>

            </div>

          </div>

        </section>


        {/* ДАЛЬШЕ ИДЕТ ОРИГИНАЛЬНЫЙ КОД СЕКЦИЙ */}

        {/* Winner Showcase */}

        {winnerShowcase.enabled && (
          <section id="exhibitions" className="py-20 px-4 bg-black/50 border-y border-cosmic-purple/10">
            ...
          </section>
        )}


        <Footer />

      </main>


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


      {isGalleryOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">

          <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-cosmic-dark border border-cosmic-purple/30 rounded-3xl p-6 sm:p-10">

            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

          </div>

        </div>
      )}

    </div>

  );

}
