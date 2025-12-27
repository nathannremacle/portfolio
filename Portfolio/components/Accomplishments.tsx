'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { accomplishments } from '@/data/content'
import Section from './Section'

const categoryLabels: Record<string, string> = {
  education: 'Formation',
  sport: 'Sport',
  professional: 'Pro',
  personal: 'Personnel',
}

export default function Accomplishments() {
  // Separate by category for visual hierarchy
  const education = accomplishments.filter(a => a.category === 'education')
  const sports = accomplishments.filter(a => a.category === 'sport')

  return (
    <Section id="accomplishments" number="02" title="Alia" subtitle="Autres">
      {/* Bento Grid - Modern B&W Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Education Card - Spans 2 columns, dark */}
        {education.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <Link
              href={`/accomplishment/${item.id}`}
              className="group block relative overflow-hidden rounded-2xl bg-black text-white h-full min-h-[280px]"
            >
              {/* Grid Pattern Background */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                  `,
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8">
                {/* Top */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-white/10 text-white/80 text-xs font-mono rounded-full border border-white/20">
                      {categoryLabels[item.category]}
                    </span>
                    <span className="text-white/40 text-xs font-mono">{item.year}</span>
                  </div>
                  
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight size={18} className="text-black" />
                  </div>
                </div>

                {/* Bottom */}
                <div>
                  <h3 className="font-serif text-3xl md:text-4xl text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm md:text-base mb-4">
                    {item.subtitle}
                  </p>
                  
                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {item.highlights.slice(0, 4).map((highlight) => (
                      <span
                        key={highlight}
                        className="px-2 py-1 bg-white/10 text-white/70 text-xs font-mono rounded"
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

        {/* Sport Cards - Compact squares, white */}
        {sports.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
          >
            <Link
              href={`/accomplishment/${item.id}`}
              className="group block relative overflow-hidden rounded-2xl bg-white text-black border border-black/10 hover:border-black/30 transition-colors h-full min-h-[200px]"
            >
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-5">
                {/* Top */}
                <div className="flex items-start justify-between">
                  <span className="px-2 py-0.5 bg-black/5 text-black/60 text-xs font-mono rounded">
                    {categoryLabels[item.category]}
                  </span>
                  
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight size={14} className="text-white" />
                  </div>
                </div>

                {/* Bottom */}
                <div>
                  <h3 className="font-serif text-2xl text-black mb-1 group-hover:translate-x-1 transition-transform duration-300">
                    {item.title}
                  </h3>
                  <p className="text-black/50 text-sm">
                    {item.subtitle}
                  </p>
                  
                  {/* Stats */}
                  {item.stats && item.stats.length > 0 && (
                    <div className="flex gap-4 mt-3 pt-3 border-t border-black/10">
                      {item.stats.map((stat) => (
                        <div key={stat.label}>
                          <span className="block text-xl font-serif text-black">{stat.value}</span>
                          <span className="text-xs text-black/40 font-mono">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

