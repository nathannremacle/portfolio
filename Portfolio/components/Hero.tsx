'use client'

import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { personal, socials, stats } from '@/data/content'

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-between px-6 pt-32 pb-12 relative grid-lines">
      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full">
        {/* Title Block */}
        <div className="space-y-6">
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-px bg-pine-800" />
            <span className="font-mono text-sm text-pine-600 tracking-widest uppercase">
              Portfolio
            </span>
          </motion.div>

          {/* Main Title - Mixed Typography */}
          <div className="relative">
            {/* Texte dans sa disposition originale */}
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-serif text-pine-800 leading-none"
              >
                <motion.span 
                  className="inline-block cursor-default"
                  whileHover={{ 
                    color: '#D97706',
                    transition: { duration: 0.2 }
                  }}
                >
                  {personal.title.line1}
                </motion.span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-baseline gap-4 sm:gap-6"
              >
                <span className="text-3xl sm:text-4xl lg:text-5xl text-pine-400 font-light">
                  {personal.title.connector}
                </span>
                <motion.span 
                  className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-sans font-bold text-pine-800 tracking-tight cursor-default"
                  whileHover={{ 
                    color: '#D97706',
                    transition: { duration: 0.2 }
                  }}
                >
                  {personal.title.line2}
                </motion.span>
              </motion.div>
            </div>
            
            {/* Image positionnée absolument à droite, ne perturbe pas le flux du texte */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute right-20 -translate-x-1/2 -top-8 h-[600px] sm:h-[550px] lg:h-[600px] group"
            >
              {/* Conteneur relatif pour superposer les images */}
              <div className="relative h-full w-auto">
                {/* Image claire (en dessous) */}
                <img
                  src="/headerimage.png"
                  alt=""
                  className="h-full w-auto object-contain"
                  style={{ mixBlendMode: 'multiply' }}
                />
                {/* Image sombre (au dessus, disparaît au hover) */}
                <img
                  src="/headerimagegreen2.png"
                  alt=""
                  className="h-full w-auto object-contain absolute top-0 left-0 transition-opacity duration-300 group-hover:opacity-0"
                  style={{ mixBlendMode: 'multiply' }}
                />
              </div>
            </motion.div>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-pine-600 max-w-xl font-light leading-relaxed"
          >
            {personal.role} à l'<span className="font-medium hover:text-accent transition-colors cursor-default">{personal.university}</span>
          </motion.p>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-8 sm:gap-12 mt-16 pt-8 border-t border-pine-800/10"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className="group"
            >
              <div className="text-3xl sm:text-4xl font-serif text-pine-800 group-hover:text-accent transition-colors">
                {stat.value}
              </div>
              <div className="text-sm text-pine-500 font-mono mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="flex items-end justify-between max-w-7xl mx-auto w-full pt-12"
      >
        {/* Social Links */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-pine-500 hover:text-pine-800 transition-colors"
            >
              <span className="text-sm font-medium">{social.name}</span>
              <span className="text-xs font-mono text-pine-400 group-hover:text-accent transition-colors">
                {social.handle}
              </span>
            </a>
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="hidden sm:flex flex-col items-center gap-2 text-pine-400"
        >
          <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
