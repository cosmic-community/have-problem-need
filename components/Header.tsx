import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-studio-950/90 backdrop-blur border-b border-studio-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg">
            <span className="text-2xl">🎬</span>
            <span>
              Long-Form <span className="text-accent-400">AI Video Studio</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/projects" className="text-gray-300 hover:text-accent-400 transition-colors">
              Projects
            </Link>
            <Link href="/scenes" className="text-gray-300 hover:text-accent-400 transition-colors">
              Scenes
            </Link>
            <Link href="/characters" className="text-gray-300 hover:text-accent-400 transition-colors">
              Characters
            </Link>
            <Link href="/locations" className="text-gray-300 hover:text-accent-400 transition-colors">
              Locations
            </Link>
          </nav>
          <nav className="md:hidden flex items-center gap-4 text-lg">
            <Link href="/projects" aria-label="Projects">🎬</Link>
            <Link href="/scenes" aria-label="Scenes">🎞️</Link>
            <Link href="/characters" aria-label="Characters">👤</Link>
            <Link href="/locations" aria-label="Locations">📍</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}