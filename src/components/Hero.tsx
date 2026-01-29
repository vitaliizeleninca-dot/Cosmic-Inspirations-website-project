import { siteContent } from "../data/content";

export default function Hero() {
  const { hero } = siteContent;

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="mb-6 inline-block">
          <div className="px-4 py-2 rounded-full border border-purple-500/50 bg-purple-500/10 backdrop-blur">
            <span className="text-purple-400 text-sm font-semibold">
              {hero.badge}
            </span>
          </div>
        </div>

        <h2 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
            {hero.title}
          </span>
          <br />
          <span className="text-gray-100">{hero.subtitle}</span>
        </h2>

        <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
          {hero.description}
        </p>

        <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
          {hero.cta}
        </button>
      </div>
    </section>
  );
}
