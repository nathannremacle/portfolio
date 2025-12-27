'use client'

import { motion } from 'framer-motion'
import { skills } from '@/data/content'
import Section from './Section'

// Double the skills array for seamless loop
const marqueeSkills = [...skills, ...skills]

export default function Skills() {
  return (
    <Section id="skills" number="02" title="Sollertia" subtitle="Compétences">
      <div className="space-y-8">
        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-pine-600 text-lg max-w-2xl"
        >
          Technologies et domaines de maîtrise, acquis en formation et par l'expérience pratique sur des projets personnels.
        </motion.p>

        {/* Marquee Container */}
        <div className="relative -mx-6 lg:-mx-12 overflow-hidden">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-stone-warm to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-stone-warm to-transparent z-10" />

          {/* First Row - Normal */}
          <div className="marquee-track py-4">
            {marqueeSkills.map((skill, index) => (
              <motion.div
                key={`${skill.name}-${index}`}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex-shrink-0 mx-2 px-5 py-3 bg-stone-light border border-pine-800/10 rounded-full hover:border-accent/50 hover:bg-white transition-all cursor-default"
              >
                <span className="text-sm font-medium text-pine-800 whitespace-nowrap">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Second Row - Reverse (optional, for visual richness) */}
          <div className="marquee-track py-4" style={{ animationDirection: 'reverse', animationDuration: '35s' }}>
            {[...marqueeSkills].reverse().map((skill, index) => (
              <motion.div
                key={`reverse-${skill.name}-${index}`}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex-shrink-0 mx-2 px-5 py-3 bg-stone-light border border-pine-800/10 rounded-full hover:border-accent/50 hover:bg-white transition-all cursor-default"
              >
                <span className="text-sm font-medium text-pine-800 whitespace-nowrap">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Categories Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-6 pt-8 border-t border-pine-800/10"
        >
          {[
            { key: 'languages', label: 'Langages' },
            { key: 'apis', label: 'APIs & Data' },
            { key: 'devops', label: 'DevOps' },
            { key: 'engineering', label: 'Ingénierie' },
          ].map((category) => (
            <div key={category.key} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pine-800/40" />
              <span className="text-sm text-pine-500 font-mono">{category.label}</span>
              <span className="text-xs text-pine-400">
                ({skills.filter(s => s.category === category.key).length})
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}

