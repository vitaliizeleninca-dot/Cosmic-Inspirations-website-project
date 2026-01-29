import { siteContent } from '../data/content'

export default function PhotoGallery() {
  const { gallery } = siteContent

  return (
    <section id="gallery" className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          {gallery.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gallery.photos.map((photo, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-lg overflow-hidden bg-purple-500/10 border border-purple-500/20 hover:border-purple-500/50 transition-all"
            >
              <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-2">{photo.alt}</p>
                  <p className="text-lg font-semibold text-purple-400">{photo.title}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <p className="text-white font-semibold">View</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
