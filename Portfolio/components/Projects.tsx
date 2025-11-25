'use client'

import { ExternalLink, Github, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  image?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "Chaîne Youtube automatisée",
    description: "Conception d'un pipeline d'automatisation complet pour YouTube piloté par Python. Le système orchestre la création et la publication de contenu via des workflows GitHub Actions. Il assure une régularité parfaite en gérant l'upload via l'API YouTube Data : un format court ('Short') publié quotidiennement à 15h et une compilation ('Best-Of') générée chaque 27 du mois.",
    technologies: ['Python', 'GitHub Actions', 'YouTube Data API', 'FFmpeg'], 
    githubUrl: 'https://github.com/anymeredifftwitch/art',
    liveUrl: 'https://www.youtube.com/@AnymeRediffTwitch',
    image: '/projet1.png',
  },
  {
    id: 2,
    title: 'Blog Remacle automatisé',
    description: "Ce projet est un pipeline CI/CD autonome (Zero-Touch) qui génère, illustre et publie des articles techniques de haute qualité sur un blog Hashnode. Il combine la puissance des LLM multimodaux (Gemini 2.0 Flash) et des modèles de génération d'images (Flux via Pollinations) pour maintenir un média technologique sans intervention humaine quotidienne.",
    technologies: ['Python', 'Google Gemini 2.0', 'GitHub Actions', 'Pollinations.ai (Flux)', 'Hashnode GraphQL'],
    githubUrl: 'https://github.com/nathannremacle/blogremacle',
    liveUrl: 'https://remacle.hashnode.dev',
    image: '/projet2.png',
  },
]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    const originalOverflow = document.body.style.overflow

    if (selectedProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [selectedProject])

  useEffect(() => {
    if (!selectedProject) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedProject])

  return (
    <section id="projects" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-white">Projets</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setSelectedProject(project)}
              className="text-left bg-black/40 rounded-xl overflow-hidden border border-white/5 hover:border-[#c4a5e8]/30 hover:-translate-y-1 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1]"
            >
              <div className="relative aspect-video w-full bg-black/20 flex items-center justify-center">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="text-6xl text-gray-600">💻</span>
                )}
              </div>
              
              <div className="p-4 space-y-3">
                <h3 className="text-xl font-semibold line-clamp-2 text-white">{project.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-3">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-black/40 border border-white/5 text-xs rounded-full text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-0.5 bg-black/30 backdrop-blur-sm border border-white/10 text-xs rounded-full text-gray-400">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 px-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="max-w-3xl w-full bg-black/60 border border-white/10 rounded-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label={`Projet ${selectedProject.title}`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-video w-full bg-black/20 flex items-center justify-center">
              {selectedProject.image ? (
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-6xl text-gray-600">💻</span>
              )}
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-black/70 border border-white/10 rounded-full p-2 text-white hover:bg-black/80 hover:border-[#6366f1] transition-colors"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <h3 className="text-3xl font-semibold mb-2 text-white">{selectedProject.title}</h3>
                <p className="text-gray-300">{selectedProject.description}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-black/40 border border-white/5 text-sm rounded-full text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#6366f1] hover:text-[#c4a5e8] transition-colors"
                  >
                    <Github size={20} />
                    <span>Code</span>
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#6366f1] hover:text-[#c4a5e8] transition-colors"
                  >
                    <ExternalLink size={20} />
                    <span>Live</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

