'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, MapPin, ArrowUpRight } from 'lucide-react'
import { personal, socials } from '@/data/content'
import Section from './Section'

export default function Contact() {
  type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const sendMessage = async () => {
      try {
        setStatus('loading')
        setError(null)

        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })

        if (!response.ok) {
          const data = await response.json().catch(() => ({}))
          throw new Error(data?.error || 'Une erreur est survenue.')
        }

        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } catch (err) {
        setStatus('error')
        setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
      }
    }

    void sendMessage()
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Section id="contact" number="04" title="Contactus" subtitle="Contact">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Column - Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div>
            <h3 className="font-serif text-3xl text-pine-800 mb-4">
              Discutons de votre projet
            </h3>
            <p className="text-pine-600 leading-relaxed">
              Opportunités, collaborations ou simplement échanger sur des idées — 
              je suis toujours ouvert à la discussion.
            </p>
          </div>

          <div className="space-y-4">
            <a
              href={`mailto:${personal.email}`}
              className="group flex items-center gap-4 p-4 bg-stone-light rounded-xl border border-pine-800/10 hover:border-accent/30 transition-all"
            >
              <div className="p-3 bg-stone-warm rounded-lg">
                <Mail size={20} className="text-pine-800" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-pine-400 font-mono">Email</p>
                <p className="text-pine-800 font-medium group-hover:text-accent transition-colors">
                  {personal.email}
                </p>
              </div>
              <ArrowUpRight size={18} className="text-pine-300 group-hover:text-accent transition-colors" />
            </a>

            <div className="flex items-center gap-4 p-4 bg-stone-light rounded-xl border border-pine-800/10">
              <div className="p-3 bg-stone-warm rounded-lg">
                <MapPin size={20} className="text-pine-800" />
              </div>
              <div>
                <p className="text-sm text-pine-400 font-mono">Localisation</p>
                <p className="text-pine-800 font-medium">{personal.location}</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-4">
            <p className="text-sm text-pine-400 font-mono mb-4">Retrouvez-moi sur</p>
            <div className="flex flex-wrap gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-2 bg-stone-light border border-pine-800/10 rounded-full text-sm text-pine-600 hover:border-accent/30 hover:text-accent transition-all"
                >
                  {social.name}
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column - Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-stone-light rounded-2xl border border-pine-800/10 p-8"
        >
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-pine-700">
                Nom
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-stone-warm border border-pine-800/10 rounded-xl focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 text-pine-800 placeholder:text-pine-300 transition-all"
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-pine-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-stone-warm border border-pine-800/10 rounded-xl focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 text-pine-800 placeholder:text-pine-300 transition-all"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-pine-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-stone-warm border border-pine-800/10 rounded-xl focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 text-pine-800 resize-none placeholder:text-pine-300 transition-all"
                placeholder="Votre message..."
              />
            </div>

            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-pine-50 text-pine-800 rounded-xl text-sm border border-pine-100"
              >
                ✓ Message envoyé avec succès !
              </motion.div>
            )}
            {status === 'error' && error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100"
              >
                ✗ {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-pine-800 text-stone-warm rounded-xl font-medium hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
              {status === 'loading' ? 'Envoi...' : 'Envoyer le message'}
            </button>
          </div>
        </motion.form>
      </div>
    </Section>
  )
}
