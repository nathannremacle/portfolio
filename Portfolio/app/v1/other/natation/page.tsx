'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, MapPin, FileText, Clock, Trophy, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { natationImages } from '@/data/natation'

export default function NatationPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const selectedImageData = selectedImage 
    ? natationImages.find(img => img.filename === selectedImage)
    : null

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
          <span className="font-mono text-xs text-pine-400">{natationImages.length} photos</span>
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
              Natation
            </h1>
            <p className="text-lg md:text-xl text-pine-600 italic mb-6">
              Plus qu'un sport
            </p>
            <p className="text-lg md:text-xl text-pine-600 leading-relaxed">
              Une maigre collection de moments capturés lors de certaines de mes dernières compétitions de natation. 
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Vertical List - Style "Accroché au mur" */}
      <section className="px-6 pb-24 relative">
        {/* Fond de mur avec texture */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 120, 99, 0.03) 2px, rgba(139, 120, 99, 0.03) 4px)
            `,
          }}
        />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="space-y-16">
            {natationImages.map((imageData, index) => {
              const isLeft = index % 2 === 0
              
              return (
                <motion.div
                  key={imageData.filename}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex flex-col ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-start`}
                >
                  {/* Image avec effet "accrochée au mur" */}
                  <div 
                    className="relative flex-shrink-0 w-full md:w-[28%] group"
                  >
                    {/* Épingle/Bombelle en haut */}
                    <div 
                      className={`absolute z-20`}
                      style={{
                        top: '8px',
                        [isLeft ? 'left' : 'right']: '20px',
                        transform: `translateY(-50%) rotate(${(index * 23.7 + 15) % 360}deg)`,
                      }}
                    >
                      <Image
                        src="/epingle.png"
                        alt="Épingle"
                        width={32}
                        height={32}
                        className="drop-shadow-lg"
                      />
                    </div>

                    {/* Photo avec ombre et effet papier */}
                    <div 
                      className="relative bg-stone-warm p-4 shadow-2xl transform transition-all duration-500 group-hover:rotate-1 group-hover:shadow-3xl"
                      style={{
                        boxShadow: `
                          0 10px 30px rgba(139, 120, 99, 0.3),
                          0 0 0 1px rgba(139, 120, 99, 0.1),
                          inset 0 1px 0 rgba(255, 255, 255, 0.1)
                        `,
                      }}
                    >
                      {/* Bordure de la photo */}
                      <div className="relative bg-white p-2 shadow-inner">
                        <div className="relative w-full" style={{ display: 'block' }}>
                          <img
                            src={`/Natation/${imageData.filename}`}
                            alt={`Photo natation ${index + 1}`}
                            className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Metadata - À côté de l'image */}
                  <div className={`flex-1 space-y-4 pt-8 ${isLeft ? 'md:pl-4' : 'md:pr-4'}`}>
                    {/* Date et Lieu */}
                    <div className="space-y-3">
                      {(imageData.date || imageData.lieu) && (
                        <div className="flex flex-col gap-3 text-pine-800">
                          {imageData.date && (
                            <div className="flex items-center gap-2">
                              <Calendar size={18} className="text-pine-600 flex-shrink-0" />
                              <span className="font-medium text-lg">{imageData.date}</span>
                            </div>
                          )}
                          {imageData.lieu && (
                            <div className="flex items-center gap-2">
                              <MapPin size={18} className="text-pine-600 flex-shrink-0" />
                              <span className="font-medium text-lg">{imageData.lieu}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    {imageData.description && (
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center gap-2">
                          <FileText size={18} className="text-pine-600" />
                          <span className="text-xs font-mono text-pine-500 uppercase tracking-wider">Description</span>
                        </div>
                        <p className="text-pine-600 leading-relaxed text-base whitespace-pre-line">
                          {imageData.description}
                        </p>
                      </div>
                    )}

                    {/* Temps réalisés */}
                    {imageData.times && imageData.times.length > 0 && (
                      <div className="space-y-3 pt-4 border-t border-pine-800/10">
                        <div className="flex items-center gap-2">
                          <Clock size={18} className="text-pine-600" />
                          <span className="text-xs font-mono text-pine-500 uppercase tracking-wider">Temps réalisés</span>
                        </div>
                        <div className="space-y-2">
                          {imageData.times.map((time, timeIndex) => (
                            <div key={timeIndex} className="flex items-baseline gap-3 text-pine-800">
                              <span className="font-serif text-xl font-semibold text-pine-800">
                                {time.time}
                              </span>
                              <span className="text-pine-600 text-sm">
                                {time.distance} {time.style}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Classement */}
                    {imageData.ranking && (
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center gap-2">
                          <Trophy size={18} className="text-pine-600" />
                          <span className="text-xs font-mono text-pine-500 uppercase tracking-wider">Classement</span>
                        </div>
                        <p className="text-pine-600 leading-relaxed text-sm italic">
                          {imageData.ranking}
                        </p>
                      </div>
                    )}

                    {/* Lien SwimRankings */}
                    {imageData.swimrankingsUrl && (
                      <div className="pt-2">
                        <a
                          href={imageData.swimrankingsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-pine-600 hover:text-pine-800 transition-colors text-sm group"
                        >
                          <span className="font-mono text-xs">Mes temps sur SwimRankings</span>
                          <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      </div>
                    )}

                    {/* Placeholder si pas de métadonnées */}
                    {!imageData.date && !imageData.lieu && !imageData.description && (
                      <div className="text-pine-400 italic text-sm">
                        Informations à venir...
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && selectedImageData && (
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
            className="relative max-w-6xl max-h-[90vh] w-full h-full flex flex-col"
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
            
            {/* Image */}
            <div className="relative flex-1 rounded-2xl overflow-hidden bg-pine-800/20 border border-pine-800/30 mb-4">
              <Image
                src={`/Natation/${selectedImage}`}
                alt="Photo natation en grand format"
                fill
                className="object-contain p-4"
                sizes="90vw"
              />
            </div>

            {/* Metadata */}
            {(selectedImageData.date || selectedImageData.lieu || selectedImageData.description) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-stone-warm/95 backdrop-blur-sm rounded-2xl p-6 border border-pine-800/20"
              >
                <div className="space-y-4">
                  {selectedImageData.date && (
                    <div className="flex items-center gap-3">
                      <Calendar size={18} className="text-pine-600" />
                      <div>
                        <p className="text-xs font-mono text-pine-500 uppercase tracking-wider">Date</p>
                        <p className="text-pine-800 font-medium">{selectedImageData.date}</p>
                      </div>
                    </div>
                  )}
                  
                  {selectedImageData.lieu && (
                    <div className="flex items-center gap-3">
                      <MapPin size={18} className="text-pine-600" />
                      <div>
                        <p className="text-xs font-mono text-pine-500 uppercase tracking-wider">Lieu</p>
                        <p className="text-pine-800 font-medium">{selectedImageData.lieu}</p>
                      </div>
                    </div>
                  )}
                  
                  {selectedImageData.description && (
                    <div className="flex items-start gap-3">
                      <FileText size={18} className="text-pine-600 mt-0.5" />
                      <div>
                        <p className="text-xs font-mono text-pine-500 uppercase tracking-wider mb-1">Description</p>
                        <p className="text-pine-600 leading-relaxed">{selectedImageData.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </main>
  )
}

