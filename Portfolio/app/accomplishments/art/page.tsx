'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-stone-warm">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-stone-warm/90 backdrop-blur-lg border-b border-pine-800/10">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <Link 
            href="/other" 
            className="group flex items-center gap-2 text-pine-600 hover:text-pine-800 transition-colors"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Retour</span>
          </Link>
          <span className="font-mono text-xs text-pine-400">{artImages.length} œuvres</span>
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
                Galerie
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-pine-800 mb-2">
              Art
            </h1>
            <p className="text-lg md:text-xl text-pine-600 italic mb-6">
              Dessins & Peintures
            </p>
            <p className="text-lg md:text-xl text-pine-600 leading-relaxed mb-4">
              Une sélection de mes créations artistiques, du dessin à la peinture. 
              Ces œuvres témoignent de mon évolution au fil des années.
            </p>
            <p className="text-sm text-pine-500 italic">
              Note : Cette galerie ne présente qu'une sélection de mes créations. 
              Le premier dessin exposé date de mes 15 ans.
            </p>
            <p className="text-sm text-pine-500 italic mt-2">
              Ces dessins et peintures sont également l'œuvre de ma professeure Marianne que j'ai eu la chance de rencontrer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {artImages.map((image, index) => (
              <motion.div
                key={image}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-pine-800/5 border border-pine-800/10 hover:border-pine-800/30 transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={`/Dessins/${image}`}
                    alt={`Dessin ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-pine-800/0 group-hover:bg-pine-800/10 transition-colors duration-500" />
                  
                  {/* Number badge */}
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-3 py-1 bg-stone-warm/90 backdrop-blur-sm text-pine-800 text-xs font-mono rounded-full border border-pine-800/20">
                      #{index + 1}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-pine-800/95 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-6xl max-h-[90vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-stone-warm/90 backdrop-blur-sm text-pine-800 flex items-center justify-center hover:bg-stone-warm transition-colors"
              aria-label="Fermer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-pine-800/20 border border-pine-800/30">
              <Image
                src={`/Dessins/${selectedImage}`}
                alt="Dessin en grand format"
                fill
                className="object-contain p-4"
                sizes="90vw"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  )
}

