import type { Metadata } from 'next'
import { getVideoProjects } from '@/lib/cosmic'
import ProjectCard from '@/components/ProjectCard'

export const metadata: Metadata = {
  title: 'Video Projects | Long-Form AI Video Studio',
  description: 'All long-form AI video projects, each split into short consistent scenes.',
}

export default async function ProjectsPage() {
  const projects = await getVideoProjects()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-white">🎬 Video Projects</h1>
      <p className="text-gray-400 mt-3 max-w-2xl">
        Each project is one master prompt and story, broken into short scenes that stitch
        together into a video up to 10 minutes long.
      </p>

      {projects.length === 0 ? (
        <div className="bg-studio-900 border border-studio-700 rounded-xl p-12 text-center mt-10">
          <p className="text-5xl mb-4">🎬</p>
          <p className="text-gray-300">No video projects yet. Add one in your Cosmic dashboard.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}