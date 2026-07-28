import type { Metadata } from 'next'
import { getCharacters } from '@/lib/cosmic'
import CharacterCard from '@/components/CharacterCard'

export const metadata: Metadata = {
  title: 'Characters | Long-Form AI Video Studio',
  description: 'Character library with consistency prompts for AI video generation across scenes.',
}

export default async function CharactersPage() {
  const characters = await getCharacters()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-white">👤 Characters</h1>
      <p className="text-gray-400 mt-3 max-w-2xl">
        Reusable character definitions with consistency prompts so the same character appears
        identical in every 6–8 second scene of your video.
      </p>

      {characters.length === 0 ? (
        <div className="bg-studio-900 border border-studio-700 rounded-xl p-12 text-center mt-10">
          <p className="text-5xl mb-4">👤</p>
          <p className="text-gray-300">No characters yet. Add characters in your Cosmic dashboard.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}
    </div>
  )
}