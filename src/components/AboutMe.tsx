import { siteContent } from '../data/content'

export default function AboutMe() {
  const { about } = siteContent

  return (
    <section id="about" className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          {about.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              {about.description}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {about.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg text-center"
                >
                  <p className="text-purple-400 font-semibold">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="h-96 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-2xl flex items-center justify-center border border-purple-500/20">
            <p className="text-gray-400">Image Placeholder</p>
          </div>
        </div>
      </div>
    </section>
  )
}
