import { siteContent } from "../data/content";

export default function VideoShowcase() {
  const { videos } = siteContent;

  return (
    <section id="videos" className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          {videos.title}
        </h2>
        <p className="text-center text-gray-400 mb-12">{videos.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.items.map((video, idx) => (
            <div
              key={idx}
              className="group rounded-lg overflow-hidden bg-purple-500/10 border border-purple-500/20 hover:border-purple-500/50 transition-all"
            >
              <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white mb-2">{video.title}</h3>
                <p className="text-sm text-gray-400">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
