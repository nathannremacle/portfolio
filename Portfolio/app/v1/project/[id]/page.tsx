import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react'
import { projects } from '@/data/content'

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link 
            href="/#work" 
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Retour</span>
          </Link>
          <span className="font-mono text-xs text-white/40">{project.category}</span>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <span className="font-mono text-sm text-white/40">{project.year}</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/60 max-w-2xl">
            {project.subtitle}
          </p>
        </div>
      </section>

      {/* Image */}
      {project.image && (
        <section className="px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Content Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <h2 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-2">
              De Homine
            </h2>
            <p className="text-sm text-white/60 italic mb-6">
              L'Humain
            </p>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-white/80 text-lg leading-relaxed whitespace-pre-line">
                {project.longDescription}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div>
                <h3 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-4">
                  Métriques
                </h3>
                <div className="space-y-4">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="flex justify-between items-baseline border-b border-white/10 pb-4">
                      <span className="text-white/60 text-sm">{metric.label}</span>
                      <span className="text-white font-serif text-2xl">{metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            <div>
              <h3 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-4">
                Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-white/5 text-white/80 text-sm font-mono rounded-lg border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            {(project.links.github || project.links.live) && (
              <div className="space-y-3">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full px-5 py-4 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <Github size={18} />
                      Code Source
                    </span>
                    <ArrowUpRight size={16} />
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full px-5 py-4 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors border border-white/10"
                  >
                    <span>Voir le projet</span>
                    <ArrowUpRight size={16} />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

