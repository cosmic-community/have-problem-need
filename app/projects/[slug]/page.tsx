// app/projects/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getVideoProject, getMetafieldValue, sortScenes, totalSceneSeconds, formatDuration } from '@/lib/cosmic'
import SceneCard from '@/components/SceneCard'
import StatusBadge from '@/components/StatusBadge'

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getVideoProject(slug)

  if (!project) {
    notFound()
  }

  const coverImage = project.metadata?.cover_image
  const masterPrompt = getMetafieldValue(project.metadata?.master_prompt)
  const story = getMetafieldValue(project.metadata?.story)
  const targetMinutes = Number(project.metadata?.target_duration_minutes ?? 0)
  const scenes = sortScenes(project.metadata?.scenes || [])
  const currentSeconds = totalSceneSeconds(scenes)
  const targetSeconds = targetMinutes * 60
  const progressPercent =
    targetSeconds > 0 ? Math.min(100, Math.round((currentSeconds / targetSeconds) * 100)) : 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/projects" className="text-accent-400 hover:text-accent-500 text-sm">
        ← Back to projects
      </Link>

      <div className="grid lg:grid-cols-2 gap-10 mt-6">
        <div>
          {coverImage ? (
            <img
              src={`${coverImage.imgix_url}?w=1200&h=675&fit=crop&auto=format,compress`}
              alt={project.title}
              width={600}
              height={338}
              className="w-full rounded-xl border border-studio-700"
            />
          ) : (
            <div className="aspect-video bg-studio-800 rounded-xl border border-studio-700 flex items-center justify-center text-6xl">
              🎬
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl md:text-4xl font-bold text-white">{project.title}</h1>
            <StatusBadge status={project.metadata?.generation_status} />
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-studio-900 border border-studio-700 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-accent-400">{scenes.length}</p>
              <p className="text-gray-400 text-xs mt-1">Scenes</p>
            </div>
            <div className="bg-studio-900 border border-studio-700 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-accent-400">{formatDuration(currentSeconds)}</p>
              <p className="text-gray-400 text-xs mt-1">Generated</p>
            </div>
            <div className="bg-studio-900 border border-studio-700 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-accent-400">
                {targetMinutes > 0 ? `${targetMinutes} min` : '—'}
              </p>
              <p className="text-gray-400 text-xs mt-1">Target</p>
            </div>
          </div>

          {targetSeconds > 0 && (
            <div className="mt-6">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>Runtime progress</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="h-3 bg-studio-800 rounded-full overflow-hidden border border-studio-700">
                <div
                  className="h-full bg-accent-500 rounded-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {masterPrompt && (
            <div className="mt-8">
              <h2 className="text-white font-semibold mb-2">✍️ Master Prompt</h2>
              <p className="text-gray-300 bg-studio-900 border border-studio-700 rounded-lg p-4 text-sm leading-relaxed">
                {masterPrompt}
              </p>
            </div>
          )}
        </div>
      </div>

      {story && (
        <section className="mt-12">
          <h2 className="section-title mb-4">📖 Story</h2>
          <div
            className="prose-story bg-studio-900 border border-studio-700 rounded-xl p-6"
            dangerouslySetInnerHTML={{ __html: story }}
          />
        </section>
      )}

      <section className="mt-12">
        <h2 className="section-title mb-6">🎞️ Scene Timeline</h2>
        {scenes.length === 0 ? (
          <div className="bg-studio-900 border border-studio-700 rounded-xl p-10 text-center">
            <p className="text-gray-300">No scenes connected to this project yet.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenes.map((scene) => (
              <SceneCard key={scene.id} scene={scene} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}