import Link from 'next/link'
import { getVideoProjects, getCharacters, getLocations, getScenes } from '@/lib/cosmic'
import ProjectCard from '@/components/ProjectCard'
import CharacterCard from '@/components/CharacterCard'
import LocationCard from '@/components/LocationCard'

export default async function HomePage() {
  const [projects, characters, locations, scenes] = await Promise.all([
    getVideoProjects(),
    getCharacters(),
    getLocations(),
    getScenes(),
  ])

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-studio-700">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-600/20 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-4">
            The AI video length problem — solved
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight max-w-4xl mx-auto">
            Turn 6–8 second AI clips into{' '}
            <span className="text-accent-400">10-minute videos</span>
          </h1>
          <p className="text-gray-300 text-lg mt-6 max-w-2xl mx-auto">
            AI video generators cap you at 15 seconds. This studio breaks one master prompt and
            story into ordered scenes — with consistent characters and locations — so you can
            generate and stitch clips into full-length videos.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link
              href="/projects"
              className="bg-accent-600 hover:bg-accent-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              🎬 View Projects
            </Link>
            <Link
              href="/scenes"
              className="bg-studio-800 hover:bg-studio-700 border border-studio-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              🎞️ Browse Scenes
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-3xl mx-auto">
            <div className="bg-studio-900/80 border border-studio-700 rounded-xl p-4">
              <p className="text-3xl font-bold text-accent-400">{projects.length}</p>
              <p className="text-gray-400 text-sm mt-1">Projects</p>
            </div>
            <div className="bg-studio-900/80 border border-studio-700 rounded-xl p-4">
              <p className="text-3xl font-bold text-accent-400">{scenes.length}</p>
              <p className="text-gray-400 text-sm mt-1">Scenes</p>
            </div>
            <div className="bg-studio-900/80 border border-studio-700 rounded-xl p-4">
              <p className="text-3xl font-bold text-accent-400">{characters.length}</p>
              <p className="text-gray-400 text-sm mt-1">Characters</p>
            </div>
            <div className="bg-studio-900/80 border border-studio-700 rounded-xl p-4">
              <p className="text-3xl font-bold text-accent-400">{locations.length}</p>
              <p className="text-gray-400 text-sm mt-1">Locations</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="section-title text-center">How the pipeline works</h2>
        <p className="text-gray-400 text-center mt-3 max-w-2xl mx-auto">
          Free AI tools only generate short clips — so we chain them.
        </p>
        <div className="grid md:grid-cols-4 gap-6 mt-10">
          <div className="bg-studio-900 border border-studio-700 rounded-xl p-6">
            <p className="text-3xl">✍️</p>
            <h3 className="text-white font-semibold mt-3">1. One master prompt</h3>
            <p className="text-gray-400 text-sm mt-2">
              Write a single prompt and full story for your entire video project.
            </p>
          </div>
          <div className="bg-studio-900 border border-studio-700 rounded-xl p-6">
            <p className="text-3xl">✂️</p>
            <h3 className="text-white font-semibold mt-3">2. Split into scenes</h3>
            <p className="text-gray-400 text-sm mt-2">
              A 10-minute video ≈ 75–100 scenes of 6–8 seconds, each with its own prompt.
            </p>
          </div>
          <div className="bg-studio-900 border border-studio-700 rounded-xl p-6">
            <p className="text-3xl">👤</p>
            <h3 className="text-white font-semibold mt-3">3. Keep consistency</h3>
            <p className="text-gray-400 text-sm mt-2">
              Reuse character consistency prompts and location visual prompts in every scene.
            </p>
          </div>
          <div className="bg-studio-900 border border-studio-700 rounded-xl p-6">
            <p className="text-3xl">🎬</p>
            <h3 className="text-white font-semibold mt-3">4. Stitch clips</h3>
            <p className="text-gray-400 text-sm mt-2">
              Generate each clip, then join them in order with a free editor into one video.
            </p>
          </div>
        </div>
      </section>

      {/* Projects */}
      {projects.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title">🎬 Video Projects</h2>
            <Link href="/projects" className="text-accent-400 hover:text-accent-500 text-sm font-medium">
              View all →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* Characters */}
      {characters.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title">👤 Characters</h2>
            <Link href="/characters" className="text-accent-400 hover:text-accent-500 text-sm font-medium">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {characters.slice(0, 4).map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        </section>
      )}

      {/* Locations */}
      {locations.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title">📍 Locations</h2>
            <Link href="/locations" className="text-accent-400 hover:text-accent-500 text-sm font-medium">
              View all →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.slice(0, 3).map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}