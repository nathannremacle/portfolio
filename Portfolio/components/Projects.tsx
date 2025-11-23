'use client'

import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'

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
    image: '/logoanyme.png',
  },
  {
    id: 2,
    title: 'Blog Remacle automatisé',
    description: "Ce projet est un pipeline CI/CD autonome (Zero-Touch) qui génère, illustre et publie des articles techniques de haute qualité sur un blog Hashnode. Il combine la puissance des LLM multimodaux (Gemini 2.0 Flash) et des modèles de génération d'images (Flux via Pollinations) pour maintenir un média technologique sans intervention humaine quotidienne.",
    technologies: ['Python', 'Google Gemini 2.0', 'GitHub Actions', 'Pollinations.ai (Flux)', 'Hashnode GraphQL'],
    githubUrl: 'https://github.com/nathannremacle/blogremacle',
    liveUrl: 'https://remacle.hashnode.dev',
    image: '/logoremacle.png',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Projets</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors duration-200"
            >
              <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="text-6xl text-gray-700">💻</span>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-800 text-sm rounded-full text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Github size={18} />
                      <span>Code</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <ExternalLink size={18} />
                      <span>Live</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

