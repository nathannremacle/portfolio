'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navigation, personal } from '@/data/content'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-stone-warm/90 backdrop-blur-lg border-b border-pine-800/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <a 
              href="#" 
              className="font-serif text-xl text-pine-800 hover:text-accent transition-colors"
            >
              {personal.firstName}
              <span className="text-pine-400">.</span>
            </a>

            {/* Desktop Navigation - Centrée */}
            <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-2 text-pine-600 hover:text-pine-800 transition-colors"
                >
                  <span className="font-mono text-xs text-pine-300 group-hover:text-accent transition-colors">
                    {item.number}
                  </span>
                  <span className="text-sm font-medium hover-line">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>

            {/* Espace invisible pour équilibrer (même largeur que le logo) */}
            <div className="hidden md:block font-serif text-xl opacity-0 pointer-events-none">
              {personal.firstName}.
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-pine-600 hover:text-pine-800 transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-stone-warm md:hidden"
          >
            <div className="flex flex-col items-start justify-center h-full px-12 gap-8">
              {navigation.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group flex items-center gap-4"
                >
                  <span className="font-mono text-sm text-pine-300">
                    {item.number}
                  </span>
                  <span className="text-4xl font-serif text-pine-800 group-hover:text-accent transition-colors">
                    {item.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
