import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-studio-700 bg-studio-900 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-white font-semibold">🎬 Long-Form AI Video Studio</p>
            <p className="text-gray-400 text-sm mt-1">
              Beat the 6–8 second limit. One story, many scenes, up to 10 minutes.
            </p>
          </div>
          <nav className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/projects" className="hover:text-accent-400 transition-colors">Projects</Link>
            <Link href="/scenes" className="hover:text-accent-400 transition-colors">Scenes</Link>
            <Link href="/characters" className="hover:text-accent-400 transition-colors">Characters</Link>
            <Link href="/locations" className="hover:text-accent-400 transition-colors">Locations</Link>
          </nav>
        </div>
        <p className="text-gray-500 text-xs text-center mt-8">
          © {new Date().getFullYear()} Long-Form AI Video Studio. Powered by Cosmic.
        </p>
      </div>
    </footer>
  )
}