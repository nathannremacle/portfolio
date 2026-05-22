'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Github, 
  Linkedin, 
  Mail, 
  Send, 
  Check, 
  Loader2, 
  AlertCircle, 
  Compass
} from 'lucide-react'

export default function UnderConstruction() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [feedbackMsg, setFeedbackMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) {
      setStatus('error')
      setFeedbackMsg('Veuillez remplir tous les champs.')
      return
    }

    setStatus('loading')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
        setFeedbackMsg(data.error || "Impossible d'envoyer le message pour le moment.")
      }
    } catch (err) {
      console.error(err)
      setStatus('error')
      setFeedbackMsg("Une erreur est survenue lors de l'envoi.")
    }
  }

  const backgroundFormulas = [
    {
      element: (
        <span className="text-accent/90 font-bold">
          E = mc<sup>2</sup>
        </span>
      ),
      style: "top-[10%] left-[28%] rotate-6 text-sm font-bold text-accent/80 hover:opacity-[0.45]"
    },
    // Block de code en C (sur la gauche, aucunement caché par le formulaire)
    {
      element: <span>// C Programming</span>,
      style: "top-[20%] left-[3%] -rotate-1 text-xs text-pine-600/80"
    },
    {
      element: <span>#include &lt;stdio.h&gt;</span>,
      style: "top-[24%] left-[3%] -rotate-1 text-xs"
    },
    {
      element: <span>int main() {"{"}</span>,
      style: "top-[28%] left-[3%] -rotate-1 text-xs"
    },
    {
      element: <span className="font-semibold">  printf("Hello, World!\n");</span>,
      style: "top-[32%] left-[5%] -rotate-1 text-xs"
    },
    {
      element: <span>  return 0;</span>,
      style: "top-[36%] left-[5%] -rotate-1 text-xs"
    },
    {
      element: <span>{"}"}</span>,
      style: "top-[40%] left-[3%] -rotate-1 text-xs"
    },
    // Équations de Génie Civil (placées stratégiquement sur le tiers gauche)
    {
      element: (
        <div className="inline-flex items-center gap-0.5 font-mono">
          <div className="inline-flex flex-col items-center leading-none text-[10px]">
            <span className="border-b border-pine-800/80 pb-0.5">d<sup>2</sup></span>
            <span className="pt-0.5">dx<sup>2</sup></span>
          </div>
          <span className="text-xs">&nbsp;(EI&nbsp;</span>
          <div className="inline-flex flex-col items-center leading-none text-[10px]">
            <span className="border-b border-pine-800/80 pb-0.5">d<sup>2</sup>w</span>
            <span className="pt-0.5">dx<sup>2</sup></span>
          </div>
          <span className="text-xs">&nbsp;) = q(x)</span>
        </div>
      ),
      style: "bottom-[45%] left-[4%] rotate-3 text-xs"
    },
    {
      element: <span>&sigma; = E &middot; &epsilon;</span>,
      style: "bottom-[24%] left-[10%] -rotate-6 text-sm"
    },
    {
      element: (
        <div className="inline-flex items-center gap-1 font-mono">
          <span className="text-xs">&tau; =</span>
          <div className="inline-flex flex-col items-center leading-none text-[10px]">
            <span className="border-b border-pine-800/80 pb-0.5">V &middot; Q</span>
            <span className="pt-0.5">I &middot; b</span>
          </div>
        </div>
      ),
      style: "bottom-[35%] left-[3%] rotate-6 text-xs"
    },
    {
      element: (
        <div className="inline-flex items-center gap-0.5 text-xs font-mono">
          <span>p +</span>
          <div className="inline-flex flex-col items-center leading-none text-[9px] mx-0.5">
            <span className="border-b border-pine-800/80 pb-0.5">1</span>
            <span className="pt-0.5">2</span>
          </div>
          <span>&rho;v<sup>2</sup> + &rho;gh = C</span>
        </div>
      ),
      style: "bottom-[12%] left-[15%] rotate-3 text-xs"
    },
    {
      element: (
        <div className="inline-flex items-center gap-1 font-mono">
          <span className="text-xs">&theta; =</span>
          <div className="inline-flex flex-col items-center leading-none text-[10px]">
            <span className="border-b border-pine-800/80 pb-0.5">M &middot; L</span>
            <span className="pt-0.5">E &middot; I</span>
          </div>
        </div>
      ),
      style: "top-[6%] left-[30%] rotate-0 text-xs"
    },
    {
      element: <span>E<sub>d</sub> &le; R<sub>d</sub></span>,
      style: "bottom-[28%] left-[24%] rotate-6 text-xs"
    },
    // Références techniques (placées à gauche pour éviter tout chevauchement avec le formulaire)
    {
      element: <span>GRID REF: 50-N4 // SEC_A-A</span>,
      style: "top-[16%] left-[3%] rotate-0 text-[9px] tracking-wider"
    },
    {
      element: <span>SCALE: 1:25 // ALL DIM. IN MM</span>,
      style: "bottom-[8%] left-[3%] rotate-0 text-[9px] tracking-wider"
    },
    {
      element: <span>ULIÈGE // DEPT. D'INGÉNIERIE</span>,
      style: "top-[6%] left-[14%] rotate-0 text-[9px] tracking-wider"
    },
    {
      element: <span>PROJECT CODE: NR-2026-PORTFOLIO</span>,
      style: "bottom-[45%] left-[26%] rotate-90 text-[8px] tracking-wider origin-left"
    },
  ]

  return (
    <div className="relative min-h-screen bg-stone-warm text-pine-800 overflow-hidden flex flex-col justify-between p-6 md:p-12 font-sans selection:bg-pine-500/10">
      
      {/* Swiss Editorial Grid Overlay */}
      <div className="absolute inset-0 grid-lines pointer-events-none opacity-80" />

      {/* Dynamic Animated Engineering Formulas */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden font-mono text-pine-800 select-none">
        {backgroundFormulas.map((item, idx) => (
          <motion.div
            key={idx}
            className={`absolute select-none pointer-events-none opacity-[0.14] transition-opacity duration-700 hover:opacity-[0.50] ${item.style}`}
            initial={{ y: 0, x: 0 }}
            animate={{ 
              y: [0, idx % 2 === 0 ? 12 : -12, 0],
              x: [0, idx % 3 === 0 ? 8 : -8, 0]
            }}
            transition={{
              duration: 12 + (idx % 4) * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {item.element}
          </motion.div>
        ))}
      </div>

      {/* Decorative Technical / Engineering SVG Graphic (Civil Engineering motif) */}
      <div className="absolute -right-48 -top-48 w-[600px] h-[600px] md:w-[800px] md:h-[800px] pointer-events-none opacity-[0.12] z-0 select-none">
        <motion.svg
          viewBox="0 0 400 400"
          className="w-full h-full text-pine-800"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        >
          {/* Compass grid and circle */}
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="80" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="200" cy="200" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
          
          {/* Diagonal axes */}
          <line x1="20" y1="20" x2="380" y2="380" stroke="currentColor" strokeWidth="0.75" />
          <line x1="20" y1="380" x2="380" y2="20" stroke="currentColor" strokeWidth="0.75" />
          <line x1="200" y1="10" x2="200" y2="390" stroke="currentColor" strokeWidth="1" />
          <line x1="10" y1="200" x2="390" y2="200" stroke="currentColor" strokeWidth="1" />

          {/* Technical blueprint triangles/arches */}
          <path d="M 200,60 A 140,140 0 0,1 340,200 L 200,200 Z" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M 200,200 L 320,320 M 200,200 L 80,80" stroke="currentColor" strokeWidth="2" />
          <path d="M 60,200 A 140,140 0 0,1 200,340" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6,6" />
          
          {/* Technical dimensions markings */}
          <text x="210" y="55" className="font-mono text-[8px] fill-current opacity-70">R = 140.00m</text>
          <text x="210" y="220" className="font-mono text-[8px] fill-current opacity-70">A = 90.00°</text>
          <text x="325" y="195" className="font-mono text-[8px] fill-current opacity-70">X_02</text>
        </motion.svg>
      </div>

      <div className="absolute -left-64 -bottom-64 w-[500px] h-[500px] pointer-events-none opacity-[0.08] z-0 select-none">
        <motion.svg
          viewBox="0 0 300 300"
          className="w-full h-full text-pine-800"
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        >
          <rect x="50" y="50" width="200" height="200" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="150" cy="150" r="100" fill="none" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="150" x2="300" y2="150" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="150" y1="0" x2="150" y2="300" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />
          <polygon points="150,50 250,150 150,250 50,150" fill="none" stroke="currentColor" strokeWidth="1" />
        </motion.svg>
      </div>

      {/* Header */}
      <header className="relative z-10 w-full flex justify-between items-center border-b border-pine-800/10 pb-6">
        <div>
          <span className="font-serif italic text-2xl font-medium tracking-tight text-pine-900 block leading-none">
            Nathan Remacle
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-pine-500 mt-1 block">
            Ingénierie Civile & Tech
          </span>
        </div>
        <div className="flex gap-4">
          <a 
            href="https://github.com/nathannremacle" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-pine-800/5 hover:bg-pine-800/10 border border-pine-800/10 flex items-center justify-center text-pine-800 transition-all duration-300 hover:scale-105"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a 
            href="https://linkedin.com/in/nathan-remacle-a73461230" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-pine-800/5 hover:bg-pine-800/10 border border-pine-800/10 flex items-center justify-center text-pine-800 transition-all duration-300 hover:scale-105"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
        </div>
      </header>

      {/* Main Hero Container */}
      <main className="relative z-10 my-auto py-12 flex flex-col lg:flex-row gap-12 lg:gap-24 items-center max-w-7xl mx-auto w-full">
        
        {/* Left column: Text */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
          
          {/* Tag */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-accent font-mono text-xs font-semibold mb-6"
          >
            <Compass size={14} className="animate-spin-slow" style={{ animationDuration: '6s' }} />
            <span>CHANTIER NUMÉRIQUE EN COURS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          </motion.div>

          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-pine-850 leading-tight tracking-tight mb-6"
          >
            Bâtir de nouvelles <br />
            <span className="italic font-medium text-accent">perspectives</span>.
          </motion.h1>

          {/* Paragraph */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-pine-650 text-base md:text-lg leading-relaxed mb-8 max-w-xl"
          >
            Je reconstruis actuellement mon espace numérique pour vous proposer une expérience encore plus immersive et représentative de mes projets d'ingénierie civile, de design et de développement. 
          </motion.p>

          {/* Information blocks */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-pine-800/10 pt-8 w-full"
          >
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-pine-450 block mb-1">
                Localisation
              </span>
              <span className="text-sm font-medium text-pine-750">
                Liège, Belgique
              </span>
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-pine-450 block mb-1">
                Affiliation
              </span>
              <span className="text-sm font-medium text-pine-750">
                Université de Liège (ULiège)
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right column: Interactive Glassmorphic Contact Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2"
        >
          <div className="relative overflow-hidden rounded-3xl bg-pine-900/5 backdrop-blur-xl border border-pine-800/10 p-6 md:p-8 shadow-soft">
            <h2 className="font-serif text-2xl text-pine-900 mb-2">
              Me laisser un message
            </h2>
            <p className="text-sm text-pine-600 mb-6">
              Une question, un projet ou simplement envie de discuter ? Envoyez-moi un message direct.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block font-mono text-[10px] uppercase tracking-wider text-pine-500 mb-1.5">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={status === 'loading' || status === 'success'}
                    placeholder="Votre nom"
                    className="w-full bg-stone-light/60 focus:bg-stone-light border border-pine-800/15 focus:border-accent text-pine-800 text-sm rounded-xl px-4 py-3 outline-none transition-all duration-300 placeholder:text-pine-400/60"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-mono text-[10px] uppercase tracking-wider text-pine-500 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading' || status === 'success'}
                    placeholder="votre@email.com"
                    className="w-full bg-stone-light/60 focus:bg-stone-light border border-pine-800/15 focus:border-accent text-pine-800 text-sm rounded-xl px-4 py-3 outline-none transition-all duration-300 placeholder:text-pine-400/60"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block font-mono text-[10px] uppercase tracking-wider text-pine-500 mb-1.5">
                  Votre Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={status === 'loading' || status === 'success'}
                  rows={4}
                  placeholder="Décrivez votre projet ou laissez un commentaire..."
                  className="w-full bg-stone-light/60 focus:bg-stone-light border border-pine-800/15 focus:border-accent text-pine-800 text-sm rounded-xl px-4 py-3 outline-none resize-none transition-all duration-300 placeholder:text-pine-400/60"
                  required
                />
              </div>

              <AnimatePresence mode="wait">
                {status === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200/55 p-3 rounded-xl text-xs"
                  >
                    <AlertCircle size={16} />
                    <span>{feedbackMsg}</span>
                  </motion.div>
                )}

                {status === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center text-center p-6 bg-pine-50 border border-pine-100 rounded-xl space-y-3"
                  >
                    <div className="w-12 h-12 rounded-full bg-pine-500 text-stone-warm flex items-center justify-center animate-bounce shadow-soft">
                      <Check size={24} />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-pine-850 font-semibold">Message envoyé avec succès !</h3>
                      <p className="text-xs text-pine-650 mt-1">Merci pour votre message, je reviendrai vers vous rapidement.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {status !== 'success' && (
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-pine-800 hover:bg-pine-900 text-stone-warm font-medium py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 group hover:shadow-subtle active:scale-98"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <span>Envoyer le message</span>
                      <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
              )}
            </form>
          </div>
        </motion.div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full flex justify-center items-center border-t border-pine-800/10 pt-6">
        <p className="font-mono text-[10px] text-pine-450 text-center">
          © {new Date().getFullYear()} Nathan Remacle. Tous droits réservés.
        </p>
      </footer>
      
      {/* Slow pulse ambient background lights */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none mix-blend-multiply filter animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-pine-300/5 rounded-full blur-[100px] pointer-events-none mix-blend-multiply filter animate-pulse-slow delay-1000" />
    </div>
  )
}
