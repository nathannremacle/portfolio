'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface SandDistortImageProps {
  src: string
  alt: string
  revealSrc?: string // Image à révéler sous l'image principale
}

interface EraseTrace {
  x: number
  y: number
  timestamp: number
  radius: number
}

export default function SandDistortImage({ src, alt, revealSrc }: SandDistortImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const tracesRef = useRef<EraseTrace[]>([])
  const animationFrameRef = useRef<number>()
  const lastEraseTimeRef = useRef(0)
  
  // Configuration
  const brushRadius = 35
  const fadeSpeed = 0.2 // Vitesse de disparition (1 = disparaît en 1 seconde)
  const bgColor = '#F2F0E9'
  // Valeurs RGB de la couleur de fond (242, 240, 233)
  const bgR = 242
  const bgG = 240
  const bgB = 233

  // Fonction de dessin principale
  const drawCanvas = useCallback(() => {
    if (!revealSrc) {
      // Mode normal sans révélation
      const canvas = canvasRef.current
      if (!canvas || canvas.width === 0 || canvas.height === 0) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const now = Date.now()
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      tracesRef.current.forEach((trace) => {
        const age = (now - trace.timestamp) / 1000
        const opacity = Math.max(0, Math.min(1, 1 - age * fadeSpeed))
        
        if (opacity > 0.02) {
          const gradient = ctx.createRadialGradient(
            trace.x, trace.y, 0,
            trace.x, trace.y, trace.radius
          )
          gradient.addColorStop(0, `rgba(${bgR}, ${bgG}, ${bgB}, ${opacity})`)
          gradient.addColorStop(0.5, `rgba(${bgR}, ${bgG}, ${bgB}, ${opacity * 0.8})`)
          gradient.addColorStop(0.8, `rgba(${bgR}, ${bgG}, ${bgB}, ${opacity * 0.4})`)
          gradient.addColorStop(1, `rgba(${bgR}, ${bgG}, ${bgB}, 0)`)
          
          ctx.fillStyle = gradient
          ctx.fillRect(
            trace.x - trace.radius,
            trace.y - trace.radius,
            trace.radius * 2,
            trace.radius * 2
          )
        }
      })
      
      tracesRef.current = tracesRef.current.filter(
        (trace) => (now - trace.timestamp) / 1000 * fadeSpeed < 1
      )
      return
    }

    // Mode avec révélation - utiliser overlay canvas
    const overlayCanvas = overlayCanvasRef.current
    if (!overlayCanvas || overlayCanvas.width === 0 || overlayCanvas.height === 0) return
    
    const ctx = overlayCanvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    const now = Date.now()
    
    // Redessiner l'image du dessus sur le canvas overlay avec object-cover
    const img = imageRef.current
    if (img && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
      ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)
      
      // Calculer les dimensions pour object-cover (couverture tout en gardant les proportions)
      const imgAspect = img.naturalWidth / img.naturalHeight
      const canvasAspect = overlayCanvas.width / overlayCanvas.height
      
      let drawWidth: number
      let drawHeight: number
      let drawX: number
      let drawY: number
      
      if (imgAspect > canvasAspect) {
        // L'image est plus large que le canvas, on ajuste la hauteur
        drawHeight = overlayCanvas.height
        drawWidth = drawHeight * imgAspect
        drawX = (overlayCanvas.width - drawWidth) / 2
        drawY = 0
      } else {
        // L'image est plus haute que le canvas, on ajuste la largeur
        drawWidth = overlayCanvas.width
        drawHeight = drawWidth / imgAspect
        drawX = 0
        drawY = (overlayCanvas.height - drawHeight) / 2
      }
      
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight)
      
      // Utiliser destination-out pour "gommer" l'image
      ctx.globalCompositeOperation = 'destination-out'
      
      tracesRef.current.forEach((trace) => {
        const age = (now - trace.timestamp) / 1000
        const fadeAmount = Math.max(0, Math.min(1, 1 - age * fadeSpeed))
        
        if (fadeAmount > 0.02) {
          const gradient = ctx.createRadialGradient(
            trace.x, trace.y, 0,
            trace.x, trace.y, trace.radius
          )
          
          // Plus opaque au centre (gomme plus), transparent aux bords
          gradient.addColorStop(0, `rgba(0, 0, 0, ${fadeAmount})`)
          gradient.addColorStop(0.5, `rgba(0, 0, 0, ${fadeAmount * 0.8})`)
          gradient.addColorStop(0.8, `rgba(0, 0, 0, ${fadeAmount * 0.4})`)
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
          
          ctx.fillStyle = gradient
          ctx.fillRect(
            trace.x - trace.radius,
            trace.y - trace.radius,
            trace.radius * 2,
            trace.radius * 2
          )
        }
      })
      
      ctx.globalCompositeOperation = 'source-over'
    }
    
    tracesRef.current = tracesRef.current.filter(
      (trace) => (now - trace.timestamp) / 1000 * fadeSpeed < 1
    )
  }, [fadeSpeed, bgR, bgG, bgB, revealSrc])

  // Gérer la taille des canvas
  useEffect(() => {
    const canvas = canvasRef.current
    const overlayCanvas = overlayCanvasRef.current
    const container = containerRef.current
    if (!container) return

    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect()
      
      if (canvas) {
        canvas.width = rect.width
        canvas.height = rect.height
      }
      
      if (overlayCanvas) {
        overlayCanvas.width = rect.width
        overlayCanvas.height = rect.height
      }
      
      drawCanvas()
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [revealSrc, drawCanvas])

  // Charger l'image dans le ref pour le canvas overlay
  useEffect(() => {
    if (revealSrc) {
      const img = document.createElement('img')
      img.crossOrigin = 'anonymous'
      img.src = src
      img.onload = () => {
        imageRef.current = img
        drawCanvas()
      }
      imageRef.current = img
    }
  }, [src, revealSrc, drawCanvas])

  // Animation loop
  useEffect(() => {
    let animationId: number

    const animate = () => {
      drawCanvas()
      // Continuer l'animation si on a des traces, on est survolé, ou si on a une image à révéler
      if (tracesRef.current.length > 0 || isHovered || revealSrc) {
        animationId = requestAnimationFrame(animate)
      }
    }

    // Démarrer l'animation si nécessaire
    if (tracesRef.current.length > 0 || isHovered || revealSrc) {
      animationId = requestAnimationFrame(animate)
    } else {
      // Si aucune trace, nettoyer les canvas
      if (revealSrc && overlayCanvasRef.current) {
        const overlayCanvas = overlayCanvasRef.current
        const ctx = overlayCanvas.getContext('2d')
        if (ctx && overlayCanvas.width > 0 && overlayCanvas.height > 0) {
          const img = imageRef.current
          if (img && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
            ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)
            
            // Calculer les dimensions pour object-cover
            const imgAspect = img.naturalWidth / img.naturalHeight
            const canvasAspect = overlayCanvas.width / overlayCanvas.height
            
            let drawWidth: number
            let drawHeight: number
            let drawX: number
            let drawY: number
            
            if (imgAspect > canvasAspect) {
              drawHeight = overlayCanvas.height
              drawWidth = drawHeight * imgAspect
              drawX = (overlayCanvas.width - drawWidth) / 2
              drawY = 0
            } else {
              drawWidth = overlayCanvas.width
              drawHeight = drawWidth / imgAspect
              drawX = 0
              drawY = (overlayCanvas.height - drawHeight) / 2
            }
            
            ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight)
          }
        }
      } else if (canvasRef.current) {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (ctx && canvas.width > 0 && canvas.height > 0) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
      }
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isHovered, drawCanvas, revealSrc])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Vérifier que les coordonnées sont dans les limites
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return
    
    const now = Date.now()
    
    // Limiter la fréquence pour la performance (~60fps)
    if (now - lastEraseTimeRef.current > 16) {
      tracesRef.current.push({
        x,
        y,
        timestamp: now,
        radius: brushRadius,
      })
      lastEraseTimeRef.current = now
      
      // Limiter le nombre de traces pour la performance
      if (tracesRef.current.length > 500) {
        tracesRef.current = tracesRef.current.slice(-500)
      }
    }
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative w-full"
      style={{ 
        aspectRatio: '4/5', 
        maxWidth: '100%',
        cursor: isHovered ? 'grab' : 'default'
      }}
    >
      {/* Image container */}
      <div 
        className="relative overflow-hidden rounded-3xl w-full h-full"
        style={{
          cursor: isHovered ? 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'28\' height=\'28\' viewBox=\'0 0 24 24\'%3E%3Cdefs%3E%3Cfilter id=\'shadow\'%3E%3CfeDropShadow dx=\'0\' dy=\'0\' stdDeviation=\'2\' flood-color=\'%23000\' flood-opacity=\'0.5\'/%3E%3C/filter%3E%3C/defs%3E%3Cpath d=\'M16.24 3.56l4.95 4.94c.78.79.78 2.05 0 2.84L12 20.53a4.008 4.008 0 0 1-5.66 0L2.81 17c-.78-.79-.78-2.05 0-2.84l9.19-9.19c.79-.78 2.05-.78 2.84 0zm-1.41 1.42a.996.996 0 0 0-1.41 0L4.22 13.1c-.39.39-.39 1.02 0 1.41l3.53 3.53c.39.39 1.02.39 1.41 0L15.66 8.4c.39-.39.39-1.02 0-1.41l-1.83-1.41z\' fill=\'%23fff\' stroke=\'%23fff\' stroke-width=\'0.5\' filter=\'url(%23shadow)\'/%3E%3C/svg%3E") 14 14, auto' : 'default'
        }}
      >
        {/* Image de révélation (en dessous) */}
        {revealSrc && (
          <div className="absolute inset-0 z-0">
            <Image
              src={revealSrc}
              alt={`${alt} - révélé`}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
          </div>
        )}
        
        {/* Image principale (au dessus) - cachée si revealSrc */}
        {!revealSrc && (
          <div className="relative w-full h-full z-10">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
          </div>
        )}

        {/* Canvas overlay pour gommer l'image du dessus et révéler celle du dessous */}
        {revealSrc && (
          <canvas
            ref={overlayCanvasRef}
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ 
              width: '100%',
              height: '100%'
            }}
          />
        )}

        {/* Canvas pour le mode normal (sans révélation) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ 
            zIndex: 20,
            display: revealSrc ? 'none' : 'block'
          }}
        />

        {/* Subtle vignette overlay */}
        <div 
          className="absolute inset-0 z-30 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(242, 240, 233, 0.1) 100%)',
          }}
        />
      </div>

      {/* Interactive hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50"
      >
      </motion.div>
    </motion.div>
  )
}
