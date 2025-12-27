'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SectionProps {
  id: string
  number: string
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
  showDivider?: boolean
}

export default function Section({ 
  id, 
  number, 
  title,
  subtitle,
  children, 
  className = '',
  showDivider = true 
}: SectionProps) {
  return (
    <section id={id} className={`relative ${className}`}>
      {/* Top Divider */}
      {showDivider && <div className="section-divider" />}
      
      <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Section Header - Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 lg:sticky lg:top-24 lg:self-start"
          >
            <div className="flex lg:flex-col gap-4 items-start">
              {/* Number */}
              <span className="font-mono text-sm text-pine-600 tracking-wider">
                {number}
              </span>
              
              {/* Title */}
              <h2 className="font-serif text-3xl lg:text-4xl text-pine-800 leading-tight">
                {title}
              </h2>
              
              {/* Subtitle/Translation */}
              {subtitle && (
                <p className="font-sans text-sm text-pine-600 mt-2 italic">
                  {subtitle}
                </p>
              )}
              
              {/* Decorative Line */}
              <div className="hidden lg:block w-12 h-px bg-pine-800/20 mt-4" />
            </div>
          </motion.div>
          
          {/* Content - Right Column */}
          <div className="lg:col-span-9">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}

