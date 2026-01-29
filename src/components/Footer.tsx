import { siteContent } from "../data/content"

export default function Footer() {
  const { footer } = siteContent

  return (
    <footer className="bg-cosmic-dark/50 border-t border-cosmic-purple/20 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-cosmic-purple to-cosmic-violet bg-clip-text text-transparent mb-4">
              Cosmic Hub
            </h3>
            <p className="text-gray-400">
              Where artificial intelligence meets creative vision.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footer.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-cosmic-purple transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <a
              href={`mailto:${siteContent.contact.email}`}
              className="text-gray-400 hover:text-cosmic-purple transition-colors block mb-2"
            >
              {siteContent.contact.email}
            </a>
            <a
              href={`tel:${siteContent.contact.phone}`}
              className="text-gray-400 hover:text-cosmic-purple transition-colors block"
            >
              {siteContent.contact.phone}
            </a>
          </div>
        </div>

        <div className="border-t border-cosmic-purple/20 pt-8 text-center text-gray-400">
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
