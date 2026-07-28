import Link from 'next/link'
import type { Character } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface CharacterCardProps {
  character: Character
}

export default function CharacterCard({ character }: CharacterCardProps) {
  if (!character || !character.id) return null

  const referenceImage = character.metadata?.reference_image
  const name = getMetafieldValue(character.metadata?.name) || character.title
  const description = getMetafieldValue(character.metadata?.description)

  return (
    <Link href={`/characters/${character.slug}`} className="card block group">
      <div className="aspect-square bg-studio-800">
        {referenceImage ? (
          <img
            src={`${referenceImage.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={name}
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">👤</div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white group-hover:text-accent-400 transition-colors">
          {name}
        </h3>
        {description && (
          <p className="text-gray-400 text-sm mt-2 line-clamp-2">{description}</p>
        )}
      </div>
    </Link>
  )
}