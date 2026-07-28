import type { Metadata } from 'next'
import { getLocations } from '@/lib/cosmic'
import LocationCard from '@/components/LocationCard'

export const metadata: Metadata = {
  title: 'Locations | Long-Form AI Video Studio',
  description: 'Location library with visual prompts for consistent settings across AI video scenes.',
}

export default async function LocationsPage() {
  const locations = await getLocations()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-white">📍 Locations</h1>
      <p className="text-gray-400 mt-3 max-w-2xl">
        Reusable setting definitions with visual prompts so every scene shot in the same place
        looks consistent across your full video.
      </p>

      {locations.length === 0 ? (
        <div className="bg-studio-900 border border-studio-700 rounded-xl p-12 text-center mt-10">
          <p className="text-5xl mb-4">📍</p>
          <p className="text-gray-300">No locations yet. Add locations in your Cosmic dashboard.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {locations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      )}
    </div>
  )
}