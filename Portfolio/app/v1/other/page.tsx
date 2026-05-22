'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Folder, FileText, Image as ImageIcon, GraduationCap, Briefcase, User, Trophy } from 'lucide-react'
import { accomplishments } from '@/data/content'

const categoryLabels: Record<string, string> = {
  education: 'Formation',
  sport: 'Sport',
  professional: 'Pro',
  personal: 'Personnel',
}

export default function AccomplishmentsPage() {
  // Separate by category
  const education = accomplishments.filter(a => a.category === 'education')
  const professional = accomplishments.filter(a => a.category === 'professional')
  const personal = accomplishments.filter(a => a.category === 'personal')

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
          <span className="font-mono text-xs text-pine-400">{accomplishments.length} réalisations</span>
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
                Parcours
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-pine-800 mb-2">
              Alia
            </h1>
            <p className="text-lg md:text-xl text-pine-600 italic mb-6">
              Autres
            </p>
            <p className="text-lg md:text-xl text-pine-600 leading-relaxed">
              Les moments marquants de mon parcours académique, professionnel et sportif.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Archive Files Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Archive Files - Style 1:1 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Education Files */}
            {education.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={`/accomplishment/${item.id}`}
                  className="group block relative aspect-square"
                >
                  {/* File Style */}
                  <div className="relative h-full bg-stone-light border-2 border-pine-800/20 hover:border-pine-800/40 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    {/* File Tab */}
                    <div className="absolute -top-2 left-4 w-16 h-4 bg-pine-800 border-2 border-pine-800 border-b-0 rounded-t-lg" />
                    
                    {/* Content */}
                    <div className="h-full flex flex-col justify-between p-6">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <GraduationCap size={24} className="text-pine-600" />
                          <span className="text-xs font-mono text-pine-500 uppercase">{categoryLabels[item.category]}</span>
                        </div>
                        <h3 className="font-serif text-lg text-pine-800 mb-2 line-clamp-2 group-hover:text-pine-900 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-pine-500 mb-3 line-clamp-2">
                          {item.subtitle}
                        </p>
                        <span className="text-xs font-mono text-pine-400">{item.year}</span>
                      </div>
                      
                      {/* File Icon */}
                      <div className="flex justify-end">
                        <div className="w-8 h-8 rounded bg-pine-800/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowUpRight size={14} className="text-pine-800" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* Natation File */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: education.length * 0.1 }}
            >
              <Link
                href="/other/natation"
                className="group block relative aspect-square"
              >
                <div className="relative h-full bg-pine-800 border-2 border-pine-800/20 hover:border-pine-800/40 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  <div className="absolute -top-2 left-4 w-16 h-4 bg-pine-700 border-2 border-pine-700 border-b-0 rounded-t-lg" />
                  
                  <div className="h-full flex flex-col justify-between p-6 text-stone-warm">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Trophy size={24} className="text-stone-warm/80" />
                        <span className="text-xs font-mono text-stone-warm/60 uppercase">Galerie</span>
                      </div>
                      <h3 className="font-serif text-lg text-stone-warm mb-2 line-clamp-2 group-hover:text-stone-50 transition-colors">
                        Natation
                      </h3>
                      <p className="text-xs text-stone-warm/70 mb-3 line-clamp-2">
                        Plus qu'un sport
                      </p>
                    </div>
                    
                    <div className="flex justify-end">
                      <div className="w-8 h-8 rounded bg-stone-warm/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight size={14} className="text-stone-warm" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Professional Files */}
            {professional.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (education.length + 1 + index) * 0.1 }}
              >
                <Link
                  href={`/accomplishment/${item.id}`}
                  className="group block relative aspect-square"
                >
                  <div className="relative h-full bg-stone-light border-2 border-pine-800/20 hover:border-pine-800/40 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    <div className="absolute -top-2 left-4 w-16 h-4 bg-pine-800 border-2 border-pine-800 border-b-0 rounded-t-lg" />
                    
                    <div className="h-full flex flex-col justify-between p-6">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Briefcase size={24} className="text-pine-600" />
                          <span className="text-xs font-mono text-pine-500 uppercase">{categoryLabels[item.category]}</span>
                        </div>
                        <h3 className="font-serif text-lg text-pine-800 mb-2 line-clamp-2 group-hover:text-pine-900 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-pine-500 mb-3 line-clamp-2">
                          {item.subtitle}
                        </p>
                        <span className="text-xs font-mono text-pine-400">{item.year}</span>
                      </div>
                      
                      <div className="flex justify-end">
                        <div className="w-8 h-8 rounded bg-pine-800/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowUpRight size={14} className="text-pine-800" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* Personal Files */}
            {personal.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (education.length + 1 + professional.length + index) * 0.1 }}
              >
                <Link
                  href={`/accomplishment/${item.id}`}
                  className="group block relative aspect-square"
                >
                  <div className="relative h-full bg-stone-light border-2 border-pine-800/20 hover:border-pine-800/40 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    <div className="absolute -top-2 left-4 w-16 h-4 bg-pine-800 border-2 border-pine-800 border-b-0 rounded-t-lg" />
                    
                    <div className="h-full flex flex-col justify-between p-6">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <User size={24} className="text-pine-600" />
                          <span className="text-xs font-mono text-pine-500 uppercase">{categoryLabels[item.category]}</span>
                        </div>
                        <h3 className="font-serif text-lg text-pine-800 mb-2 line-clamp-2 group-hover:text-pine-900 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-pine-500 mb-3 line-clamp-2">
                          {item.subtitle}
                        </p>
                      </div>
                      
                      <div className="flex justify-end">
                        <div className="w-8 h-8 rounded bg-pine-800/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowUpRight size={14} className="text-pine-800" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* Art File */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (education.length + 1 + professional.length + personal.length) * 0.1 }}
            >
              <Link
                href="/other/art"
                className="group block relative aspect-square"
              >
                <div className="relative h-full bg-pine-800 border-2 border-pine-800/20 hover:border-pine-800/40 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  <div className="absolute -top-2 left-4 w-16 h-4 bg-pine-700 border-2 border-pine-700 border-b-0 rounded-t-lg" />
                  
                  <div className="h-full flex flex-col justify-between p-6 text-stone-warm">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <ImageIcon size={24} className="text-stone-warm/80" />
                        <span className="text-xs font-mono text-stone-warm/60 uppercase">Galerie</span>
                      </div>
                      <h3 className="font-serif text-lg text-stone-warm mb-2 line-clamp-2 group-hover:text-stone-50 transition-colors">
                        Art
                      </h3>
                      <p className="text-xs text-stone-warm/70 mb-3 line-clamp-2">
                        Dessins & Peintures
                      </p>
                    </div>
                    
                    <div className="flex justify-end">
                      <div className="w-8 h-8 rounded bg-stone-warm/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight size={14} className="text-stone-warm" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}

