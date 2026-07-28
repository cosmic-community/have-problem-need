import Link from 'next/link'
import type { Location } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface LocationCardProps {
  location: Location
}

export default function LocationCard({ location }: LocationCardProps) {
  if (!location || !location.id) return null

  const referenceImage = location.metadata?.reference_image
  const name = getMetafieldValue(location.metadata?.name) || location.title
  const description = getMetafieldValue(location.metadata?.description)

  return (
    <Link href={`/locations/${location.slug}`} className="card block group">
      <div className="aspect-video bg-studio-800">
        {referenceImage ? (
          <img
            src={`${referenceImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={name}
            width={400}
            height={225}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">📍</div>
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