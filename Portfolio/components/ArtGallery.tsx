'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useState, useMemo } from 'react'

interface ArtGalleryProps {
  images: string[]
}

export default function ArtGallery({ images }: ArtGalleryProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // Générer des rotations aléatoires pour chaque image (entre -2deg et 2deg)
  const rotations = useMemo(() => {
    return images.map(() => Math.random() * 4 - 2)
  }, [images])

  // Générer des rotations aléatoires pour les épingles (entre -15deg et 15deg)
  const pinRotations = useMemo(() => {
    return images.map(() => Math.random() * 30 - 15)
  }, [images])

  // Disposition en quinconce : 8 images par ligne pour remplir le tableau
  const IMAGES_PER_ROW = 8
  const rows = useMemo(() => {
    const result: string[][] = []
    for (let i = 0; i < images.length; i += IMAGES_PER_ROW) {
      result.push(images.slice(i, i + IMAGES_PER_ROW))
    }
    return result
  }, [images])

  return (
    <>
      {/* ========== COUCHE 1 : LE MUR ========== */}
      <div 
        className="w-full h-screen flex items-center justify-center p-8 md:p-12 lg:p-16"
        style={{
          background: 'linear-gradient(180deg, #e8e4df 0%, #d4d0c8 100%)',
        }}
      >
        {/* ========== COUCHE 2 : LE TABLEAU (OBJET) ========== */}
        {/* Dimensions contraintes pour voir TOUS les bords */}
        <div 
          className="relative"
          style={{
            width: 'min(90vw, calc((100vh - 100px) * 4 / 3))', // Largeur = min(90% écran, hauteur * ratio)
            height: 'min(calc(90vw * 3 / 4), calc(100vh - 100px))', // Hauteur = min(largeur / ratio, hauteur écran - padding)
            aspectRatio: '4 / 3',
            backgroundImage: 'url(/board.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.3)',
            borderRadius: '4px',
          }}
        >
          {/* ========== COUCHE 3 : ZONE DE CONTENU (SAFE ZONE) ========== */}
          <div className="absolute inset-0 p-4 md:p-6 lg:p-8 overflow-hidden flex flex-col justify-center">
            {/* Grille en quinconce */}
            <div className="flex flex-col gap-1 md:gap-2">
              {rows.map((row, rowIndex) => (
                <div 
                  key={rowIndex}
                  className="flex justify-center gap-1 md:gap-2"
                  style={{
                    // Décalage en quinconce pour les lignes impaires
                    marginLeft: rowIndex % 2 === 1 ? '30px' : '0',
                    marginRight: rowIndex % 2 === 1 ? '-30px' : '0',
                  }}
                >
                  {row.map((image) => {
                    const index = images.indexOf(image)
                    const rotation = rotations[index]
                    const isSelected = selectedId === image
                    
                    return (
                      <motion.div
                        key={image}
                        layoutId={`card-${image}`}
                        className="relative cursor-pointer bg-white p-1 md:p-1.5"
                        style={{
                          rotate: isSelected ? 0 : rotation,
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                        }}
                        onClick={() => setSelectedId(image)}
                        whileHover={{ scale: 1.08, zIndex: 10 }}
                        transition={{ 
                          layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                          scale: { duration: 0.2 }
                        }}
                      >
                        {/* Image du dessin - taille réduite pour tout faire tenir */}
                        <div className="relative w-[45px] h-[56px] sm:w-[55px] sm:h-[69px] md:w-[65px] md:h-[81px] lg:w-[75px] lg:h-[94px]">
                          <Image
                            src={`/Dessins/${image}`}
                            alt={`Dessin ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 45px, (max-width: 768px) 55px, (max-width: 1024px) 65px, 75px"
                          />
                        </div>
                        
                        {/* L'Épingle */}
                        <motion.div
                          className="absolute -top-2 left-1/2 -translate-x-1/2 z-20"
                          style={{
                            filter: 'drop-shadow(0 2px 3px rgba(0, 0, 0, 0.4))',
                            rotate: `${pinRotations[index]}deg`,
                          }}
                          animate={{ opacity: isSelected ? 0 : 1 }}
                        >
                          <Image
                            src="/epingle.png"
                            alt="Épingle"
                            width={14}
                            height={14}
                            className="object-contain"
                          />
                        </motion.div>
                      </motion.div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========== OVERLAY & IMAGE ZOOMÉE ========== */}
      <AnimatePresence>
        {selectedId && (
          <>
            {/* Overlay sombre */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-sm"
              onClick={() => setSelectedId(null)}
            />
            
            {/* Bouton de fermeture */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => setSelectedId(null)}
              className="fixed top-6 right-6 z-[202] w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm text-pine-800 flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              aria-label="Fermer"
            >
              <X size={24} />
            </motion.button>

            {/* Image zoomée - même structure que sur le tableau */}
            <motion.div
              layoutId={`card-${selectedId}`}
              className="fixed inset-0 z-[201] flex items-center justify-center p-8 pointer-events-none"
              style={{
                rotate: 0,
              }}
            >
              <div 
                className="relative pointer-events-auto bg-white p-3 md:p-4"
                style={{
                  boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)',
                }}
              >
                {/* L'épingle en haut */}
                <div 
                  className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
                  style={{
                    filter: 'drop-shadow(0 3px 5px rgba(0, 0, 0, 0.4))',
                  }}
                >
                  <Image
                    src="/epingle.png"
                    alt="Épingle"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                
                {/* Image agrandie */}
                <div className="relative w-[75vw] max-w-2xl aspect-[4/5]">
                  <Image
                    src={`/Dessins/${selectedId}`}
                    alt="Dessin en grand format"
                    fill
                    className="object-contain"
                    sizes="75vw"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
