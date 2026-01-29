import { siteContent } from '../data/content'

export default function Footer() {
  const { footer } = siteContent

  return (
    <footer className="bg-black border-t border-purple-500/20 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-purple-400 mb-4">Cosmic Hub</h3>
            <p className="text-gray-400">Exploring the intersection of technology and creativity.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footer.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-gray-400 hover:text-purple-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to get updates on latest projects.</p>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
            />
          </div>
        </div>

        <div className="border-t border-purple-500/20 pt-8 text-center text-gray-400">
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
