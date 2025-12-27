'use client'

import { motion } from 'framer-motion'
import { personal, socials, navigation } from '@/data/content'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-pine-800/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12"
        >
          {/* Logo & Tagline */}
          <div className="md:col-span-4">
            <a href="#" className="font-serif text-2xl text-pine-800">
              {personal.firstName}
              <span className="text-pine-300">.</span>
            </a>
            <p className="mt-4 text-pine-500 text-sm leading-relaxed max-w-xs">
              {personal.shortBio}
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-xs text-pine-400 uppercase tracking-widest mb-4">
              Navigation
            </h4>
            <div className="flex flex-col gap-3">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-pine-600 hover:text-pine-800 transition-colors text-sm"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-xs text-pine-400 uppercase tracking-widest mb-4">
              Suivez-moi
            </h4>
            <div className="flex flex-col gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pine-600 hover:text-accent transition-colors text-sm"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-pine-800/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-pine-400">
            © {currentYear} {personal.name}. Tous droits réservés.
          </p>
          <p className="text-xs text-pine-300 font-mono">
            Construit avec Next.js, Tailwind & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
