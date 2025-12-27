'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '@/data/content'
import Section from './Section'

export default function Projects() {
  return (
    <Section id="projects" number="01" title="Projets">
      {/* Bento Grid - Modern B&W Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={index === 0 ? 'md:col-span-2' : ''}
          >
            <Link
              href={`/project/${project.id}`}
              className="group block relative overflow-hidden rounded-2xl bg-black text-white aspect-[16/9] md:aspect-[21/9]"
            >
              {/* Background Image with B&W Filter */}
              {project.image && (
                <div className="absolute inset-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
                </div>
              )}

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8">
                {/* Top Row */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white/80 text-xs font-mono rounded-full border border-white/20">
                      {project.category}
                    </span>
                    <span className="text-white/40 text-xs font-mono">{project.year}</span>
                  </div>
                  
                  {/* Arrow - appears on hover */}
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight size={18} className="text-black" />
                  </div>
                </div>

                {/* Bottom Row */}
                <div>
                  <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-sm md:text-base max-w-xl">
                    {project.subtitle}
                  </p>
                  
                  {/* Tech Stack - hidden on small, visible on hover */}
                  <div className="hidden md:flex flex-wrap gap-2 mt-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-white/10 text-white/80 text-xs font-mono rounded"
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
    </Section>
  )
}

