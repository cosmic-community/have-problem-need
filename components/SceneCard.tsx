import Link from 'next/link'
import type { Scene } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface SceneCardProps {
  scene: Scene
}

export default function SceneCard({ scene }: SceneCardProps) {
  if (!scene || !scene.id) return null

  const previewImage = scene.metadata?.preview_image
  const sceneNumber = Number(scene.metadata?.scene_number ?? 0)
  const duration = Number(scene.metadata?.duration_seconds ?? 0)
  const scenePrompt = getMetafieldValue(scene.metadata?.scene_prompt)
  const location = scene.metadata?.location
  const characters = scene.metadata?.characters || []
  const clipUrl = getMetafieldValue(scene.metadata?.generated_clip_url)

  return (
    <Link href={`/scenes/${scene.slug}`} className="card block group">
      <div className="relative aspect-video bg-studio-800">
        {previewImage ? (
          <img
            src={`${previewImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={scene.title}
            width={400}
            height={225}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">🎞️</div>
        )}
        {sceneNumber > 0 && (
          <span className="absolute top-3 left-3 bg-accent-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            Scene {sceneNumber}
          </span>
        )}
        {duration > 0 && (
          <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded">
            {duration}s
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white group-hover:text-accent-400 transition-colors">
          {scene.title}
        </h3>
        {scenePrompt && (
          <p className="text-gray-400 text-sm mt-2 line-clamp-2">{scenePrompt}</p>
        )}
        <div className="flex flex-wrap items-center gap-3 mt-4 text-xs text-gray-400">
          {location && <span>📍 {getMetafieldValue(location.metadata?.name) || location.title}</span>}
          {characters.length > 0 && <span>👤 {characters.length} character{characters.length > 1 ? 's' : ''}</span>}
          {clipUrl && <span className="text-green-400">✓ Clip generated</span>}
        </div>
      </div>
    </Link>
  )
}