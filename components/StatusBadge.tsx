import { getMetafieldValue } from '@/lib/cosmic'

interface StatusBadgeProps {
  status: unknown
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const value = getMetafieldValue(status)

  if (!value) return null

  const lower = value.toLowerCase()
  let classes = 'bg-gray-700 text-gray-200'

  if (lower.includes('complete') || lower.includes('done') || lower.includes('finish')) {
    classes = 'bg-green-900/60 text-green-300 border border-green-700'
  } else if (lower.includes('generat') || lower.includes('progress') || lower.includes('render')) {
    classes = 'bg-yellow-900/60 text-yellow-300 border border-yellow-700'
  } else if (lower.includes('draft') || lower.includes('plan')) {
    classes = 'bg-blue-900/60 text-blue-300 border border-blue-700'
  } else if (lower.includes('fail') || lower.includes('error')) {
    classes = 'bg-red-900/60 text-red-300 border border-red-700'
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${classes}`}>
      {value}
    </span>
  )
}