'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import ArtGallery from '@/components/ArtGallery'

// Liste des images dans l'ordre de création (basé sur les noms de fichiers)
const artImages = [
  'IMG_20210829_184106.jpg',
  'IMG_20210903_212907.jpg',
  'IMG_20210904_094955.jpg',
  'IMG_20210908_153149.jpg',
  'IMG_20210913_171117.jpg',
  'IMG_20210918_182222.jpg',
  'IMG_20210929_183732.jpg',
  'IMG_20211003_203000.jpg',
  'IMG_20211015_210607.jpg',
  'IMG_20211118_184238.jpg',
  'IMG_20211124_183942.jpg',
  'IMG_20211128_122526.jpg',
  'IMG_20220212_100421.jpg',
  'IMG_20220317_181021.jpg',
  'IMG_20220428_182735.jpg',
  'IMG_20220609_210537.jpg',
  'IMG_20220623_131854.jpg',
  'IMG_20220623_133412.jpg',
  'IMG_20220922_185006.jpg',
  'IMG_20220924_233445.jpg',
  'IMG_20220929_203620.jpg',
  'IMG_20221013_184605.jpg',
  'IMG_20230314_203058.jpg',
  'IMG_20240208_230549.jpg',
]

export default function ArtPage() {

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Header flottant */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            href="/other" 
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-pine-600 hover:text-pine-800 hover:bg-white transition-all shadow-md"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Retour</span>
          </Link>
          <div className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md">
            <span className="font-mono text-xs text-pine-600">{artImages.length} œuvres</span>
          </div>
        </div>
      </header>

      {/* Titre superposé sur le mur */}
      <motion.div 
        className="absolute top-20 left-0 right-0 z-10 text-center pointer-events-none"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h1 className="font-serif text-3xl md:text-4xl text-pine-800/80 drop-shadow-sm">
          Galerie d'Art
        </h1>
        <p className="text-sm text-pine-600/70 mt-1 italic">
          Dessins & Peintures — depuis mes 15 ans
        </p>
      </motion.div>

      {/* Galerie Pinboard - Structure en 3 couches */}
      <ArtGallery images={artImages} />
    </main>
  )
}

