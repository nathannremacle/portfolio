'use client'

import { motion } from 'framer-motion'
import { aboutSections, personal } from '@/data/content'
import Section from './Section'
import SandDistortImage from './SandDistortImage'

export default function About() {
  const sections = [
    aboutSections.engineer,
    aboutSections.developer,
    aboutSections.athlete,
  ]

  return (
    <Section id="about" number="03" title="De Homine" subtitle="L'Humain">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left - Text Content */}
        <div className="lg:col-span-7 space-y-12">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xl lg:text-2xl text-pine-700 font-light leading-relaxed">
              {personal.bio}
            </p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-10">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="flex items-start gap-6">
                  {/* Number */}
                  <span className="font-mono text-sm text-pine-300 mt-1">
                    0{index + 1}
                  </span>
                  
                  <div>
                    {/* Title */}
                    <h3 className="font-serif text-2xl text-pine-800 group-hover:text-accent transition-colors mb-1">
                      {section.title}
                    </h3>
                    <p className="text-sm text-pine-500 font-mono mb-3">
                      {section.subtitle}
                    </p>
                    <p className="text-pine-600 leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right - Sand Distort Image */}
        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="sticky top-32 space-y-6"
          >
            {/* Interactive Sand Effect Image */}
            <SandDistortImage 
              src="/profilecrayonné.png"
              alt={personal.name}
              revealSrc="/profile4.png"
            />

            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-stone-light rounded-xl p-6 border border-pine-800/10"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-sm text-pine-600">Actuellement</span>
              </div>
              <p className="text-pine-800 font-medium">{personal.role}</p>
              <p className="text-pine-500 text-sm">{personal.university}</p>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 border border-pine-800/5 rounded-full pointer-events-none" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-accent/10 rounded-full pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
