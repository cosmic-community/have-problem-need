// app/characters/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCharacter, getMetafieldValue } from '@/lib/cosmic'

export default async function CharacterDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const character = await getCharacter(slug)

  if (!character) {
    notFound()
  }

  const referenceImage = character.metadata?.reference_image
  const name = getMetafieldValue(character.metadata?.name) || character.title
  const description = getMetafieldValue(character.metadata?.description)
  const consistencyPrompt = getMetafieldValue(character.metadata?.consistency_prompt)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/characters" className="text-accent-400 hover:text-accent-500 text-sm">
        ← Back to characters
      </Link>

      <div className="grid md:grid-cols-2 gap-10 mt-6">
        <div>
          {referenceImage ? (
            <img
              src={`${referenceImage.imgix_url}?w=1000&h=1000&fit=crop&auto=format,compress`}
              alt={name}
              width={500}
              height={500}
              className="w-full rounded-xl border border-studio-700"
            />
          ) : (
            <div className="aspect-square bg-studio-800 rounded-xl border border-studio-700 flex items-center justify-center text-7xl">
              👤
            </div>
          )}
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">{name}</h1>

          {description && (
            <div className="mt-6">
              <h2 className="text-white font-semibold mb-2">📝 Description</h2>
              <p className="text-gray-300 leading-relaxed">{description}</p>
            </div>
          )}

          {consistencyPrompt && (
            <div className="mt-8">
              <h2 className="text-white font-semibold mb-2">🔁 Consistency Prompt</h2>
              <p className="text-gray-400 text-sm mb-3">
                Copy this into every scene prompt to keep this character identical across all clips.
              </p>
              <p className="text-accent-400 bg-studio-900 border border-studio-700 rounded-lg p-4 text-sm font-mono leading-relaxed">
                {consistencyPrompt}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}