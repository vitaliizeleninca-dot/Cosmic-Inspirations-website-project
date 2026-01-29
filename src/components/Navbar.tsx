import { siteContent } from '../data/content'

export default function Navbar() {
  const { nav } = siteContent

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-purple-500/20 bg-black/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              {nav.brand}
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-purple-400 transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
