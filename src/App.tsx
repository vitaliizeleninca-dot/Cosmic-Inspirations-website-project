import { Sparkles } from "lucide-react";
import Footer from "./components/Footer";
import { siteContent } from "./data/content";

export default function App() {
  const { hero, contact } = siteContent;

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
              <a
                href={`mailto:${contact.email}`}
                className="hidden sm:inline-flex px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 text-cosmic-dark bg-gradient-to-r from-cosmic-purple to-cosmic-violet hover:from-cosmic-violet hover:to-cosmic-purple hover:cosmic-glow cursor-pointer"
              >
                Contact Me
              </a>
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
              <a
                href="#about"
                className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-cosmic-purple to-cosmic-violet hover:from-cosmic-violet hover:to-cosmic-purple text-white transition-all duration-300 transform hover:scale-105 inline-block text-center"
              >
                {hero.cta}
              </a>
            </div>
          </div>
        </section>

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
                <h3 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cosmic-purple to-cosmic-violet bg-clip-text text-transparent">
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
                      className="relative aspect-video rounded-2xl overflow-hidden cosmic-glow border border-cosmic-purple/20"
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
        {siteContent.cosmicAmbient.enabled &&
          siteContent.cosmicAmbient.videos.length > 0 && (
            <section
              id="music"
              className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative"
            >
              <div className="absolute inset-0 opacity-20">
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-cosmic-violet/30 rounded-full filter blur-3xl" />
              </div>

              <div className="relative z-10 w-full max-w-6xl">
                <div className="text-center mb-16">
                  <h3 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cosmic-purple to-cosmic-violet bg-clip-text text-transparent">
                    {siteContent.cosmicAmbient.title}
                  </h3>
                  <p className="text-cosmic-purple text-lg font-semibold mb-4">
                    {siteContent.cosmicAmbient.subtitle}
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                    {siteContent.cosmicAmbient.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {siteContent.cosmicAmbient.videos.map((url, index) => (
                    <div
                      key={index}
                      className="relative aspect-video rounded-2xl overflow-hidden cosmic-glow border border-cosmic-purple/20"
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
        {siteContent.feelCosmos.enabled &&
          siteContent.feelCosmos.videos.length > 0 && (
            <section
              id="experience"
              className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative"
            >
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cosmic-purple/30 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
              </div>

              <div className="relative z-10 max-w-6xl w-full">
                <div className="text-center mb-16">
                  <h3 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cosmic-purple to-cosmic-violet bg-clip-text text-transparent">
                    {siteContent.feelCosmos.title}
                  </h3>
                  <p className="text-cosmic-purple text-lg font-semibold mb-4">
                    {siteContent.feelCosmos.subtitle}
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                    {siteContent.feelCosmos.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {siteContent.feelCosmos.videos.map((url, index) => (
                    <div
                      key={index}
                      className="relative aspect-video rounded-2xl overflow-hidden cosmic-glow border border-cosmic-purple/20"
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
        {siteContent.nftCollections.enabled && (
          <section
            id="nft"
            className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative"
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cosmic-violet/30 rounded-full filter blur-3xl" />
            </div>

            <div className="relative z-10 max-w-6xl w-full">
              <div className="text-center mb-16">
                <h3 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cosmic-purple to-cosmic-violet bg-clip-text text-transparent">
                  {siteContent.nftCollections.title}
                </h3>
                <p className="text-cosmic-purple text-lg font-semibold mb-4">
                  {siteContent.nftCollections.subtitle}
                </p>
                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                  {siteContent.nftCollections.description}
                </p>
              </div>

              {siteContent.nftCollections.collections.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8">
                  {siteContent.nftCollections.collections.map(
                    (collection, index) => (
                      <a
                        key={index}
                        href={collection.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative aspect-square rounded-2xl overflow-hidden cosmic-glow border border-cosmic-purple/20 cursor-pointer"
                      >
                        <div className="w-full h-full bg-gradient-to-br from-cosmic-purple/20 to-cosmic-violet/10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-cosmic-dark/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-6 px-4">
                          {collection.name && (
                            <p className="text-gray-100 font-semibold text-center mb-2">
                              {collection.name}
                            </p>
                          )}
                          <span className="text-gray-300 text-sm">
                            View Collection
                          </span>
                        </div>
                      </a>
                    ),
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* My AI Tools Section */}
        {siteContent.aiTools.enabled &&
          siteContent.aiTools.videos.length > 0 && (
            <section
              id="my-ai-tools"
              className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative"
            >
              <div className="absolute inset-0 opacity-20">
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-cosmic-violet/30 rounded-full filter blur-3xl" />
              </div>

              <div className="relative z-10 w-full max-w-6xl">
                <div className="text-center mb-16">
                  <h3 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cosmic-purple to-cosmic-violet bg-clip-text text-transparent">
                    {siteContent.aiTools.title}
                  </h3>
                  <p className="text-cosmic-purple text-lg font-semibold mb-4">
                    {siteContent.aiTools.subtitle}
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                    {siteContent.aiTools.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {siteContent.aiTools.videos.map((url, index) => (
                    <div
                      key={index}
                      className="relative aspect-video rounded-2xl overflow-hidden cosmic-glow border border-cosmic-purple/20"
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
    </div>
  );
}
