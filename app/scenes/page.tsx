import type { Metadata } from 'next'
import { getScenes, totalSceneSeconds, formatDuration } from '@/lib/cosmic'
import SceneCard from '@/components/SceneCard'

export const metadata: Metadata = {
  title: 'Scenes | Long-Form AI Video Studio',
  description: 'All short AI video scenes, each 6–8 seconds, ready to stitch into long-form videos.',
}

export default async function ScenesPage() {
  const scenes = await getScenes()
  const totalSeconds = totalSceneSeconds(scenes)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-white">🎞️ Scenes</h1>
      <p className="text-gray-400 mt-3 max-w-2xl">
        Every scene is a short 6–8 second AI clip with its own prompt, consistent characters,
        and a fixed location. {scenes.length > 0 && (
          <span className="text-accent-400 font-medium">
            Total runtime across all scenes: {formatDuration(totalSeconds)}.
          </span>
        )}
      </p>

      {scenes.length === 0 ? (
        <div className="bg-studio-900 border border-studio-700 rounded-xl p-12 text-center mt-10">
          <p className="text-5xl mb-4">🎞️</p>
          <p className="text-gray-300">No scenes yet. Add scenes in your Cosmic dashboard.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {scenes.map((scene) => (
            <SceneCard key={scene.id} scene={scene} />
          ))}
        </div>
      )}
    </div>
  )
}