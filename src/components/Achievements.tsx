import { siteContent } from "../data/content";

export default function Achievements() {
  const { achievements } = siteContent;

  return (
    <section
      id="achievements"
      className="py-20 px-4 bg-gradient-to-b from-black to-purple-950/20"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          {achievements.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.items.map((item, idx) => (
            <div
              key={idx}
              className="p-8 bg-purple-500/10 border border-purple-500/20 rounded-lg text-center hover:border-purple-500/50 transition-all transform hover:scale-105"
            >
              <p className="text-4xl font-bold text-purple-400 mb-2">
                {item.number}
              </p>
              <p className="text-gray-300">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
