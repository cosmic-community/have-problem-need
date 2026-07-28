import Link from 'next/link'
import type { VideoProject } from '@/types'
import { getMetafieldValue, totalSceneSeconds, formatDuration } from '@/lib/cosmic'
import StatusBadge from '@/components/StatusBadge'

interface ProjectCardProps {
  project: VideoProject
}

export default function ProjectCard({ project }: ProjectCardProps) {
  if (!project || !project.id) return null

  const coverImage = project.metadata?.cover_image
  const scenes = project.metadata?.scenes || []
  const targetMinutes = Number(project.metadata?.target_duration_minutes ?? 0)
  const currentSeconds = totalSceneSeconds(scenes)
  const masterPrompt = getMetafieldValue(project.metadata?.master_prompt)

  return (
    <Link href={`/projects/${project.slug}`} className="card block group">
      <div className="relative aspect-video bg-studio-800">
        {coverImage ? (
          <img
            src={`${coverImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={project.title}
            width={400}
            height={225}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">🎬</div>
        )}
        <div className="absolute top-3 right-3">
          <StatusBadge status={project.metadata?.generation_status} />
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white group-hover:text-accent-400 transition-colors">
          {project.title}
        </h3>
        {masterPrompt && (
          <p className="text-gray-400 text-sm mt-2 line-clamp-2">{masterPrompt}</p>
        )}
        <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
          <span>🎞️ {scenes.length} scenes</span>
          <span>⏱️ {formatDuration(currentSeconds)} generated</span>
          {targetMinutes > 0 && <span>🎯 {targetMinutes} min target</span>}
        </div>
      </div>
    </Link>
  )
}