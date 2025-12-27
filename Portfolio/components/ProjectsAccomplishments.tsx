'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { projects, accomplishments } from '@/data/content'
import Section from './Section'

export default function ProjectsAccomplishments() {
  const accomplishmentsVideoRef = useRef<HTMLVideoElement>(null)
  const projectsVideoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Contrôle des vidéos basé sur le scroll avec fluidité maximale
  useEffect(() => {
    let animationFrameId: number | null = null
    let isRunning = true
    let currentAccomplishmentsTime = 0
    let currentProjectsTime = 0
    const SMOOTHING_FACTOR = 0.15 // Facteur de lissage pour interpolation fluide

    const updateVideos = () => {
      if (!sectionRef.current || !isRunning) {
        return
      }

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionTop = rect.top
      const sectionHeight = rect.height
      const sectionCenter = sectionTop + sectionHeight / 2
      
      // Zone de scroll : de quand la section entre dans le viewport jusqu'à ce qu'elle soit centrée
      // Zone réduite pour que la dernière frame arrive plus tôt (se termine à 60% du viewport)
      const scrollStart = windowHeight // Section entre dans le viewport
      const scrollEnd = windowHeight * 0.6 // Arrête plus tôt (60% du viewport)
      const scrollRange = scrollStart - scrollEnd
      
      // Calculer le progress brut
      let rawProgress = (scrollStart - sectionCenter) / scrollRange
      rawProgress = Math.max(0, Math.min(1, rawProgress))
      
      // Appliquer une courbe d'accélération pour que progress = 1 arrive plus tôt
      const easedProgress = rawProgress < 1 
        ? 1 - Math.pow(1 - rawProgress, 1.5)
        : 1
      
      setScrollProgress(easedProgress)

      // Mettre à jour les vidéos avec interpolation fluide
      const accomplishmentsVideo = accomplishmentsVideoRef.current
      const projectsVideo = projectsVideoRef.current

      if (accomplishmentsVideo && accomplishmentsVideo.readyState >= 4 && accomplishmentsVideo.duration) {
        const targetTime = easedProgress * accomplishmentsVideo.duration
        
        // Interpolation fluide (lerp) pour éviter les sauts
        currentAccomplishmentsTime = currentAccomplishmentsTime + (targetTime - currentAccomplishmentsTime) * SMOOTHING_FACTOR
        
        if (currentAccomplishmentsTime >= 0 && currentAccomplishmentsTime <= accomplishmentsVideo.duration) {
          accomplishmentsVideo.currentTime = currentAccomplishmentsTime
        }
        accomplishmentsVideo.pause()
      }

      if (projectsVideo && projectsVideo.readyState >= 4 && projectsVideo.duration) {
        const targetTime = easedProgress * projectsVideo.duration
        
        // Interpolation fluide (lerp) pour éviter les sauts
        currentProjectsTime = currentProjectsTime + (targetTime - currentProjectsTime) * SMOOTHING_FACTOR
        
        if (currentProjectsTime >= 0 && currentProjectsTime <= projectsVideo.duration) {
          projectsVideo.currentTime = currentProjectsTime
        }
        projectsVideo.pause()
      }

      // Continuer la boucle d'animation
      animationFrameId = requestAnimationFrame(updateVideos)
    }

    // Démarrer la boucle d'animation continue
    animationFrameId = requestAnimationFrame(updateVideos)

    // Écouter le resize pour recalculer
    const handleResize = () => {
      // La boucle requestAnimationFrame s'occupe déjà des mises à jour
    }

    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      isRunning = false
      window.removeEventListener('resize', handleResize)
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  // Initialiser les vidéos avec préchargement complet et désactiver les interactions
  useEffect(() => {
    const accomplishmentsVideo = accomplishmentsVideoRef.current
    const projectsVideo = projectsVideoRef.current

    // Empêcher toutes les interactions avec les vidéos
    const preventInteractions = (video: HTMLVideoElement) => {
      video.controls = false
      video.disablePictureInPicture = true
      video.disableRemotePlayback = true
      
      // Empêcher le clic droit et autres interactions
      video.addEventListener('contextmenu', (e) => e.preventDefault())
      video.addEventListener('play', (e) => {
        e.preventDefault()
        video.pause()
      })
      video.addEventListener('pause', (e) => {
        // Laisser pause mais s'assurer qu'on reste en pause
      })
    }

    if (accomplishmentsVideo) {
      accomplishmentsVideo.load()
      accomplishmentsVideo.pause()
      accomplishmentsVideo.preload = 'auto'
      // Optimisations pour fluidité maximale
      accomplishmentsVideo.playsInline = true
      accomplishmentsVideo.muted = true
      preventInteractions(accomplishmentsVideo)
      
      // Attendre que la vidéo soit complètement chargée
      accomplishmentsVideo.addEventListener('loadeddata', () => {
        accomplishmentsVideo.currentTime = 0
      }, { once: true })
    }
    if (projectsVideo) {
      projectsVideo.load()
      projectsVideo.pause()
      projectsVideo.preload = 'auto'
      // Optimisations pour fluidité maximale
      projectsVideo.playsInline = true
      projectsVideo.muted = true
      preventInteractions(projectsVideo)
      
      // Attendre que la vidéo soit complètement chargée
      projectsVideo.addEventListener('loadeddata', () => {
        projectsVideo.currentTime = 0
      }, { once: true })
    }
  }, [])

  return (
    <Section id="work" number="01" title="Opuscula" subtitle="Travaux">
      {/* Fond quadrillé comme Hero */}
      <div 
        ref={sectionRef}
        className="relative grid-lines min-h-[500px] lg:min-h-[600px] pt-20 lg:pt-24 pb-12 overflow-visible"
      >
        <div className="relative w-full mt-8 lg:mt-12 flex gap-0">
          {/* Accomplissements - Gauche */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-1/2"
            style={{ aspectRatio: '7/5', background: 'transparent' }}
          >
            <Link
              href="/accomplishments"
              className="group relative block w-full h-full cursor-pointer overflow-visible"
              style={{ 
                background: 'transparent',
                willChange: 'transform',
                transform: 'translateZ(0)'
              }}
            >
              {/* Halo orange au survol - Point lumineux incandescent (derrière la vidéo) */}
              <div 
                className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '90%',
                  height: '90%',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at center, rgba(255, 255, 220, 0.95) 0%, rgba(255, 255, 210, 0.9) 2%, rgba(255, 255, 200, 0.85) 4%, rgba(255, 250, 180, 0.8) 6%, rgba(255, 245, 160, 0.75) 8%, rgba(255, 240, 140, 0.7) 10%, rgba(255, 230, 120, 0.65) 12%, rgba(255, 220, 100, 0.6) 14%, rgba(255, 210, 80, 0.55) 16%, rgba(255, 200, 60, 0.5) 18%, rgba(255, 190, 50, 0.45) 20%, rgba(255, 180, 40, 0.4) 22%, rgba(255, 170, 35, 0.38) 24%, rgba(255, 160, 30, 0.35) 26%, rgba(255, 150, 25, 0.32) 28%, rgba(255, 140, 20, 0.3) 30%, rgba(255, 130, 18, 0.28) 32%, rgba(255, 120, 15, 0.25) 34%, rgba(255, 110, 12, 0.22) 36%, rgba(255, 100, 10, 0.2) 38%, rgba(240, 90, 8, 0.18) 40%, rgba(230, 80, 6, 0.15) 42%, rgba(220, 70, 5, 0.13) 44%, rgba(210, 60, 4, 0.11) 46%, rgba(200, 55, 3, 0.09) 48%, rgba(190, 50, 2, 0.07) 50%, rgba(180, 45, 2, 0.06) 52%, rgba(170, 40, 1, 0.05) 54%, rgba(160, 35, 1, 0.04) 56%, rgba(150, 30, 1, 0.035) 58%, rgba(140, 25, 0, 0.03) 60%, rgba(130, 20, 0, 0.025) 62%, rgba(120, 18, 0, 0.02) 64%, rgba(110, 15, 0, 0.015) 66%, rgba(100, 12, 0, 0.012) 68%, rgba(90, 10, 0, 0.01) 70%, rgba(80, 8, 0, 0.008) 72%, rgba(70, 6, 0, 0.006) 74%, rgba(60, 5, 0, 0.005) 76%, rgba(50, 4, 0, 0.004) 78%, rgba(40, 3, 0, 0.003) 80%, rgba(30, 2, 0, 0.002) 82%, rgba(20, 1, 0, 0.0015) 84%, rgba(15, 1, 0, 0.001) 86%, rgba(10, 0, 0, 0.0008) 88%, rgba(5, 0, 0, 0.0005) 90%, transparent 95%)',
                  boxShadow: 'none',
                  aspectRatio: '1 / 1',
                  zIndex: 0,
                  filter: 'blur(2px)'
                }}
              />
              {/* Video - Traité comme animation */}
              <video
                ref={accomplishmentsVideoRef}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.1] transition-transform duration-700 ease-in-out"
                muted
                playsInline
                preload="auto"
                disablePictureInPicture
                disableRemotePlayback
                controls={false}
                style={{ 
                  mixBlendMode: 'normal', 
                  background: 'transparent',
                  pointerEvents: 'none',
                  willChange: 'transform',
                  transformOrigin: 'center',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  perspective: '1000px',
                  WebkitPerspective: '1000px',
                  zIndex: 1
                }}
                aria-hidden="true"
                role="presentation"
              >
                <source src="/gop_hobbyscrateFINAL.webm" type="video/webm" />
              </video>
            </Link>
          </motion.div>

          {/* Projets - Droite */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative w-1/2"
            style={{ aspectRatio: '7/5', background: 'transparent' }}
          >
            <Link
              href="/projects"
              className="group relative block w-full h-full cursor-pointer overflow-visible"
              style={{ 
                background: 'transparent',
                willChange: 'transform',
                transform: 'translateZ(0)'
              }}
            >
              {/* Halo orange au survol - Point lumineux incandescent (derrière la vidéo) */}
              <div 
                className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '90%',
                  height: '90%',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at center, rgba(255, 255, 220, 0.95) 0%, rgba(255, 255, 210, 0.9) 2%, rgba(255, 255, 200, 0.85) 4%, rgba(255, 250, 180, 0.8) 6%, rgba(255, 245, 160, 0.75) 8%, rgba(255, 240, 140, 0.7) 10%, rgba(255, 230, 120, 0.65) 12%, rgba(255, 220, 100, 0.6) 14%, rgba(255, 210, 80, 0.55) 16%, rgba(255, 200, 60, 0.5) 18%, rgba(255, 190, 50, 0.45) 20%, rgba(255, 180, 40, 0.4) 22%, rgba(255, 170, 35, 0.38) 24%, rgba(255, 160, 30, 0.35) 26%, rgba(255, 150, 25, 0.32) 28%, rgba(255, 140, 20, 0.3) 30%, rgba(255, 130, 18, 0.28) 32%, rgba(255, 120, 15, 0.25) 34%, rgba(255, 110, 12, 0.22) 36%, rgba(255, 100, 10, 0.2) 38%, rgba(240, 90, 8, 0.18) 40%, rgba(230, 80, 6, 0.15) 42%, rgba(220, 70, 5, 0.13) 44%, rgba(210, 60, 4, 0.11) 46%, rgba(200, 55, 3, 0.09) 48%, rgba(190, 50, 2, 0.07) 50%, rgba(180, 45, 2, 0.06) 52%, rgba(170, 40, 1, 0.05) 54%, rgba(160, 35, 1, 0.04) 56%, rgba(150, 30, 1, 0.035) 58%, rgba(140, 25, 0, 0.03) 60%, rgba(130, 20, 0, 0.025) 62%, rgba(120, 18, 0, 0.02) 64%, rgba(110, 15, 0, 0.015) 66%, rgba(100, 12, 0, 0.012) 68%, rgba(90, 10, 0, 0.01) 70%, rgba(80, 8, 0, 0.008) 72%, rgba(70, 6, 0, 0.006) 74%, rgba(60, 5, 0, 0.005) 76%, rgba(50, 4, 0, 0.004) 78%, rgba(40, 3, 0, 0.003) 80%, rgba(30, 2, 0, 0.002) 82%, rgba(20, 1, 0, 0.0015) 84%, rgba(15, 1, 0, 0.001) 86%, rgba(10, 0, 0, 0.0008) 88%, rgba(5, 0, 0, 0.0005) 90%, transparent 95%)',
                  boxShadow: 'none',
                  aspectRatio: '1 / 1',
                  zIndex: 0,
                  filter: 'blur(2px)'
                }}
              />
              {/* Video - Traité comme animation */}
              <video
                ref={projectsVideoRef}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.1] transition-transform duration-700 ease-in-out"
                muted
                playsInline
                preload="auto"
                disablePictureInPicture
                disableRemotePlayback
                controls={false}
                style={{ 
                  mixBlendMode: 'normal', 
                  background: 'transparent',
                  pointerEvents: 'none',
                  willChange: 'transform',
                  transformOrigin: 'center',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  perspective: '1000px',
                  WebkitPerspective: '1000px',
                  zIndex: 1
                }}
                aria-hidden="true"
                role="presentation"
              >
                <source src="/gop_projectscrateFINAL.webm" type="video/webm" />
              </video>
            </Link>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

