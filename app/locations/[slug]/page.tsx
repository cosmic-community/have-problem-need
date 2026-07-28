// app/locations/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getLocation, getMetafieldValue } from '@/lib/cosmic'

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const location = await getLocation(slug)

  if (!location) {
    notFound()
  }

  const referenceImage = location.metadata?.reference_image
  const name = getMetafieldValue(location.metadata?.name) || location.title
  const description = getMetafieldValue(location.metadata?.description)
  const visualPrompt = getMetafieldValue(location.metadata?.visual_prompt)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/locations" className="text-accent-400 hover:text-accent-500 text-sm">
        ← Back to locations
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-white mt-6">{name}</h1>

      {referenceImage && (
        <img
          src={`${referenceImage.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
          alt={name}
          width={800}
          height={400}
          className="w-full rounded-xl border border-studio-700 mt-8"
        />
      )}

      {description && (
        <section className="mt-8">
          <h2 className="text-white font-semibold text-xl mb-3">📝 Description</h2>
          <p className="text-gray-300 leading-relaxed">{description}</p>
        </section>
      )}

      {visualPrompt && (
        <section className="mt-8">
          <h2 className="text-white font-semibold text-xl mb-2">🎨 Visual Prompt</h2>
          <p className="text-gray-400 text-sm mb-3">
            Copy this into every scene prompt set in this location to keep the setting consistent.
          </p>
          <p className="text-accent-400 bg-studio-900 border border-studio-700 rounded-lg p-5 text-sm font-mono leading-relaxed">
            {visualPrompt}
          </p>
        </section>
      )}
    </div>
  )
}