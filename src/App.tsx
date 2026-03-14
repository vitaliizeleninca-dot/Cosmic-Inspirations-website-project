```tsx
import { useState, useEffect } from "react"
import { Sparkles } from "lucide-react"
import Footer from "./components/Footer"
import ContactModal from "./components/ContactModal"
import HeroModal from "./components/HeroModal"
import { siteContent } from "./data/content"

const artworks = [
  { id: 1, src: "/Future Couture 2.png", title: "Future Couture" },
  { id: 2, src: "/northern_pulse_2.png", title: "Northern Pulse" }
]

export default function App() {

  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  const { hero, contact } = siteContent
  const radius = 450

  useEffect(() => {

    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)

    // Inject CSS safely
    const style = document.createElement("style")
    style.innerHTML = `
    @keyframes rotate3d {
      0% { transform: rotateY(0deg); }
      100% { transform: rotateY(-360deg); }
    }

    .cosmicPerspective {
      perspective: 2000px;
      perspective-origin: center -10%;
    }

    .cosmicSpinner {
      position: relative;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      animation: rotate3d 40s linear infinite;
    }

    .cosmicSpinner:hover {
      animation-play-state: paused;
    }

    .carouselCard {
      position: absolute;
      left: 50%;
      top: 50%;
      backface-visibility: hidden;
      transition: transform .6s ease;
    }

    .heroFade {
      transition: opacity .6s ease, transform .6s ease;
    }
    `
    document.head.appendChild(style)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.head.removeChild(style)
    }

  }, [])

  return (

<div className="min-h-screen overflow-x-hidden bg-[#030014] text-gray-100">

<header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-cosmic-purple/20">

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

<a href="#" className="flex items-center gap-3">

<Sparkles className="w-8 h-8 text-cosmic-purple animate-pulse"/>

<h1 className="text-2xl font-bold bg-gradient-to-r from-cosmic-purple to-cosmic-violet bg-clip-text text-transparent">
Cosmic Hub
</h1>

</a>

{contact.enabled && (

<button
onClick={() => setIsContactModalOpen(true)}
className="px-4 py-2 rounded-lg text-sm font-semibold text-cosmic-dark bg-gradient-to-r from-cosmic-purple to-cosmic-violet"
>

Contact Me

</button>

)}

</div>

</header>

<main className="pt-20">

<section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">

<div
className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none"
style={{
opacity: Math.max(0.03, 0.08 - scrollY / 3000),
transform: `translateY(${scrollY * 0.2}px)`
}}
>

<h2 className="text-[12vw] font-bold leading-none text-center">

<span className="bg-gradient-to-r from-cosmic-purple via-cosmic-violet to-cosmic-purple bg-clip-text text-transparent">
{hero.title}
</span>

<br/>

<span className="text-gray-200">
{hero.subtitle}
</span>

</h2>

</div>

<div className="cosmicPerspective w-full h-[420px] mb-16 flex items-center justify-center z-20 relative">

<div
className="cosmicSpinner"
style={{ transform: `rotateX(${scrollY * 0.02}deg)` }}
>

{artworks.map((art,index)=>{

const angle = artworks.length > 1 ? (index / artworks.length) * 360 : 0

return(

<div
key={art.id}
className="carouselCard w-[280px] sm:w-[460px]"
style={{
transform:`translate(-50%,-50%) rotateY(${angle}deg) translateZ(${radius}px)`
}}
>

<div className="relative rounded-2xl overflow-hidden border border-cosmic-purple/30 bg-black/40 shadow-2xl shadow-cosmic-purple/20 backdrop-blur-md">

<img
src={art.src}
alt={art.title}
className="w-full object-cover transition-transform duration-[1200ms] hover:scale-105"
/>

<div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent p-6 flex flex-col justify-end text-left">

<p className="text-white text-lg font-bold">
{art.title}
</p>

<p className="text-cosmic-purple text-[10px] uppercase font-bold tracking-widest">
Selected Masterpiece
</p>

</div>

</div>

</div>

)

})}

</div>

<div className="absolute w-64 h-64 bg-cosmic-purple/20 blur-[120px] rounded-full -z-10"/>

</div>

<div
className="heroFade flex flex-col sm:flex-row gap-4 justify-center"
style={{
opacity: 1 - scrollY / 600,
transform: `translateY(${scrollY * 0.2}px)`
}}
>

<a
href="/CV_Alpha_Ross.png"
target="_blank"
rel="noopener noreferrer"
className="px-8 py-3 rounded-lg font-semibold border-2 border-cosmic-purple/50 text-cosmic-purple"
>

View My CV

</a>

<button
onClick={() => setIsLearnMoreOpen(true)}
className="px-8 py-3 rounded-lg font-semibold border-2 border-white/10 text-gray-300"
>

Learn More

</button>

</div>

</section>

<Footer/>

</main>

<ContactModal
isOpen={isContactModalOpen}
onClose={()=>setIsContactModalOpen(false)}
/>

<HeroModal
isOpen={isLearnMoreOpen}
title="Learn More"
content={hero.learnMoreText}
onClose={()=>setIsLearnMoreOpen(false)}
/>

</div>

)
}




    
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
