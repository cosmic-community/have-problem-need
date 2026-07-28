// app/scenes/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getScene, getMetafieldValue } from '@/lib/cosmic'

export default async function SceneDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const scene = await getScene(slug)

  if (!scene) {
    notFound()
  }

  const previewImage = scene.metadata?.preview_image
  const sceneNumber = Number(scene.metadata?.scene_number ?? 0)
  const duration = Number(scene.metadata?.duration_seconds ?? 0)
  const scenePrompt = getMetafieldValue(scene.metadata?.scene_prompt)
  const clipUrl = getMetafieldValue(scene.metadata?.generated_clip_url)
  const location = scene.metadata?.location
  const characters = scene.metadata?.characters || []

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/scenes" className="text-accent-400 hover:text-accent-500 text-sm">
        ← Back to scenes
      </Link>

      <div className="mt-6">
        <div className="flex items-center gap-3 flex-wrap">
          {sceneNumber > 0 && (
            <span className="bg-accent-600 text-white text-sm font-bold px-3 py-1 rounded-full">
              Scene {sceneNumber}
            </span>
          )}
          {duration > 0 && (
            <span className="bg-studio-800 border border-studio-700 text-gray-300 text-sm px-3 py-1 rounded-full">
              ⏱️ {duration} seconds
            </span>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mt-4">{scene.title}</h1>
      </div>

      {previewImage && (
        <img
          src={`${previewImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
          alt={scene.title}
          width={800}
          height={450}
          className="w-full rounded-xl border border-studio-700 mt-8"
        />
      )}

      {scenePrompt && (
        <section className="mt-8">
          <h2 className="text-white font-semibold text-xl mb-3">✍️ Scene Prompt</h2>
          <p className="text-gray-300 bg-studio-900 border border-studio-700 rounded-lg p-5 leading-relaxed">
            {scenePrompt}
          </p>
        </section>
      )}

      {clipUrl && (
        <section className="mt-8">
          <h2 className="text-white font-semibold text-xl mb-3">🎥 Generated Clip</h2>
          <a
            href={clipUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent-600 hover:bg-accent-500 text-white font-semibold px-5 py-3 rounded-lg transition-colors"
          >
            ▶ Watch generated clip
          </a>
        </section>
      )}

      <div className="grid md:grid-cols-2 gap-8 mt-10">
        {characters.length > 0 && (
          <section>
            <h2 className="text-white font-semibold text-xl mb-4">👤 Characters in this scene</h2>
            <div className="space-y-3">
              {characters.map((character) => {
                if (!character || !character.id) return null
                const charName = getMetafieldValue(character.metadata?.name) || character.title
                const charImage = character.metadata?.reference_image
                return (
                  <Link
                    key={character.id}
                    href={`/characters/${character.slug}`}
                    className="flex items-center gap-4 bg-studio-900 border border-studio-700 rounded-lg p-4 hover:border-accent-500/60 transition-colors"
                  >
                    {charImage ? (
                      <img
                        src={`${charImage.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
                        alt={charName}
                        width={60}
                        height={60}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-studio-800 flex items-center justify-center text-2xl">
                        👤
                      </div>
                    )}
                    <span className="text-white font-medium">{charName}</span>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {location && (
          <section>
            <h2 className="text-white font-semibold text-xl mb-4">📍 Location</h2>
            <Link
              href={`/locations/${location.slug}`}
              className="block bg-studio-900 border border-studio-700 rounded-lg overflow-hidden hover:border-accent-500/60 transition-colors"
            >
              {location.metadata?.reference_image && (
                <img
                  src={`${location.metadata.reference_image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
                  alt={getMetafieldValue(location.metadata?.name) || location.title}
                  width={400}
                  height={200}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                <p className="text-white font-medium">
                  {getMetafieldValue(location.metadata?.name) || location.title}
                </p>
                {getMetafieldValue(location.metadata?.description) && (
                  <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                    {getMetafieldValue(location.metadata?.description)}
                  </p>
                )}
              </div>
            </Link>
          </section>
        )}
      </div>
    </div>
  )
}