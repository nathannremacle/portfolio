'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
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

      {/* Accomplishments Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Education Section */}
          {education.length > 0 && (
            <div>
              <h2 className="font-serif text-3xl text-pine-800 mb-8">Formation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      className="group block relative overflow-hidden rounded-2xl bg-pine-800 text-stone-warm h-full min-h-[300px]"
                    >
                      {/* Grid Pattern Background */}
                      <div 
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: `
                            linear-gradient(rgba(242, 240, 233, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(242, 240, 233, 0.1) 1px, transparent 1px)
                          `,
                          backgroundSize: '24px 24px',
                        }}
                      />

                      {/* Content */}
                      <div className="relative z-10 h-full flex flex-col justify-between p-8">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-stone-warm/10 text-stone-warm/80 text-xs font-mono rounded-full border border-stone-warm/20">
                              {categoryLabels[item.category]}
                            </span>
                            <span className="text-stone-warm/40 text-xs font-mono">{item.year}</span>
                          </div>
                          
                          <div className="w-10 h-10 rounded-full bg-stone-warm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ArrowUpRight size={18} className="text-pine-800" />
                          </div>
                        </div>

                        <div>
                          <h3 className="font-serif text-3xl text-stone-warm mb-2 group-hover:translate-x-2 transition-transform duration-300">
                            {item.title}
                          </h3>
                          <p className="text-stone-warm/60 text-sm mb-4">
                            {item.subtitle}
                          </p>
                          
                          {/* Highlights */}
                          <div className="flex flex-wrap gap-2">
                            {item.highlights.slice(0, 4).map((highlight) => (
                              <span
                                key={highlight}
                                className="px-2 py-1 bg-stone-warm/10 text-stone-warm/70 text-xs font-mono rounded"
                              >
                                {highlight}
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
          )}

          {/* Natation Section */}
          <div>
            <h2 className="font-serif text-3xl text-pine-800 mb-8">Natation</h2>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/other/natation"
                className="group block relative overflow-hidden rounded-2xl bg-pine-800 text-stone-warm min-h-[400px]"
              >
                {/* Grid Pattern Background */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(242, 240, 233, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(242, 240, 233, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12">
                  <div className="flex items-start justify-between">
                    <span className="px-3 py-1 bg-stone-warm/10 text-stone-warm/80 text-xs font-mono rounded-full border border-stone-warm/20">
                      Galerie
                    </span>
                    
                    <div className="w-10 h-10 rounded-full bg-stone-warm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight size={18} className="text-pine-800" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-4xl md:text-5xl text-stone-warm mb-4 group-hover:translate-x-2 transition-transform duration-300">
                      Plus qu'un sport
                    </h3>
                    <p className="text-stone-warm/70 text-lg mb-6 max-w-2xl">
                      Une collection de moments capturés lors de mes entraînements et compétitions de natation. 
                      Chaque image témoigne de la discipline, de la technique et de la passion pour ce sport complet.
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Professional Section */}
          {professional.length > 0 && (
            <div>
              <h2 className="font-serif text-3xl text-pine-800 mb-8">Professionnel</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {professional.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link
                      href={`/accomplishment/${item.id}`}
                      className="group block relative overflow-hidden rounded-2xl bg-pine-800 text-stone-warm h-full min-h-[300px]"
                    >
                      <div className="relative z-10 h-full flex flex-col justify-between p-8">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-stone-warm/10 text-stone-warm/80 text-xs font-mono rounded-full border border-stone-warm/20">
                              {categoryLabels[item.category]}
                            </span>
                            <span className="text-stone-warm/40 text-xs font-mono">{item.year}</span>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-serif text-3xl text-stone-warm mb-2">{item.title}</h3>
                          <p className="text-stone-warm/60 text-sm">{item.subtitle}</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Personal Section */}
          {personal.length > 0 && (
            <div>
              <h2 className="font-serif text-3xl text-pine-800 mb-8">Personnel</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {personal.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link
                      href={`/accomplishment/${item.id}`}
                      className="group block relative overflow-hidden rounded-2xl bg-stone-light text-pine-800 border border-pine-800/10 hover:border-pine-800/30 transition-colors h-full min-h-[250px]"
                    >
                      <div className="relative z-10 h-full flex flex-col justify-between p-6">
                        <div>
                          <span className="px-2 py-0.5 bg-pine-800/5 text-pine-600 text-xs font-mono rounded mb-4 inline-block">
                            {categoryLabels[item.category]}
                          </span>
                          <h3 className="font-serif text-2xl text-pine-800 mb-2">{item.title}</h3>
                          <p className="text-pine-500 text-sm">{item.subtitle}</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Art Section */}
          <div>
            <h2 className="font-serif text-3xl text-pine-800 mb-8">Art</h2>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/other/art"
                className="group block relative overflow-hidden rounded-2xl bg-pine-800 text-stone-warm min-h-[400px]"
              >
                {/* Grid Pattern Background */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(242, 240, 233, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(242, 240, 233, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12">
                  <div className="flex items-start justify-between">
                    <span className="px-3 py-1 bg-stone-warm/10 text-stone-warm/80 text-xs font-mono rounded-full border border-stone-warm/20">
                      Galerie
                    </span>
                    
                    <div className="w-10 h-10 rounded-full bg-stone-warm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight size={18} className="text-pine-800" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-4xl md:text-5xl text-stone-warm mb-4 group-hover:translate-x-2 transition-transform duration-300">
                      Dessins & Peintures
                    </h3>
                    <p className="text-stone-warm/70 text-lg mb-6 max-w-2xl">
                      Une sélection de mes créations artistiques, du dessin à la peinture. 
                      Ces œuvres témoignent de mon évolution au fil des années.
                    </p>
                    <p className="text-stone-warm/50 text-sm italic">
                      Le premier dessin exposé date de mes 15 ans.
                    </p>
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

