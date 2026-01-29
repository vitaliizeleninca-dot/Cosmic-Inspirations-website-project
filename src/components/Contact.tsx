import { siteContent } from '../data/content'

export default function Contact() {
  const { contact } = siteContent

  return (
    <section id="contact" className="py-20 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          {contact.title}
        </h2>
        <p className="text-center text-gray-400 mb-12">{contact.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="p-8 bg-purple-500/10 border border-purple-500/20 rounded-lg text-center">
            <p className="text-gray-400 text-sm mb-2">Email</p>
            <a href={`mailto:${contact.email}`} className="text-xl font-semibold text-purple-400 hover:text-purple-300">
              {contact.email}
            </a>
          </div>
          <div className="p-8 bg-purple-500/10 border border-purple-500/20 rounded-lg text-center">
            <p className="text-gray-400 text-sm mb-2">Phone</p>
            <a href={`tel:${contact.phone}`} className="text-xl font-semibold text-purple-400 hover:text-purple-300">
              {contact.phone}
            </a>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-400 mb-6">Follow Me</p>
          <div className="flex justify-center gap-6">
            {contact.social.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-400 hover:bg-purple-500/20 transition-all"
              >
                {social.platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
