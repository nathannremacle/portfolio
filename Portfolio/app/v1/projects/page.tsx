'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Github, ExternalLink } from 'lucide-react'
import { projects } from '@/data/content'

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-stone-warm">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-stone-warm/90 backdrop-blur-lg border-b border-pine-800/10">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <Link 
            href="/#work" 
            className="group flex items-center gap-2 text-pine-600 hover:text-pine-800 transition-colors"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Retour</span>
          </Link>
          <span className="font-mono text-xs text-pine-400">{projects.length} projets</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-pine-800" />
              <span className="font-mono text-sm text-pine-600 tracking-widest uppercase">
                Portfolio
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-pine-800 mb-2">
              Incepta
            </h1>
            <p className="text-lg md:text-xl text-pine-600 italic mb-6">
              Projets
            </p>
            <p className="text-lg md:text-xl text-pine-600 leading-relaxed">
              Une collection de mes projets de développement, de design et d'innovation technologique.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={`/project/${project.id}`}
                  className="group block relative overflow-hidden rounded-2xl bg-pine-800 text-stone-warm aspect-[4/3]"
                >
                  {/* Background Image */}
                  {project.image && (
                    <div className="absolute inset-0">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-pine-800/70 group-hover:bg-pine-800/50 transition-colors duration-500" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-6">
                    {/* Top */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-stone-warm/10 backdrop-blur-sm text-stone-warm/80 text-xs font-mono rounded-full border border-stone-warm/20">
                          {project.category}
                        </span>
                        <span className="text-stone-warm/40 text-xs font-mono">{project.year}</span>
                      </div>
                      
                      <div className="w-10 h-10 rounded-full bg-stone-warm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <ArrowUpRight size={18} className="text-pine-800" />
                      </div>
                    </div>

                    {/* Bottom */}
                    <div>
                      <h3 className="font-serif text-2xl md:text-3xl text-stone-warm mb-2 group-hover:translate-x-2 transition-transform duration-300">
                        {project.title}
                      </h3>
                      <p className="text-stone-warm/60 text-sm line-clamp-2">
                        {project.subtitle}
                      </p>
                      
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mt-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-stone-warm/10 text-stone-warm/80 text-xs font-mono rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

