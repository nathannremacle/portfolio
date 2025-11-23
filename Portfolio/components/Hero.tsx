'use client'

import { Github, Linkedin, Mail, Twitter } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/nathannremacle', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/nathanremacle', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:nathanremacle@engineer.com', label: 'Email' },
  ]

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-gray-800">
            <Image
              src="/profile.png"
              alt="Nathan Remacle"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6x1 font-bold mb-5 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Nathan Remacle
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Étudiant en ingénierie civile à l'Université de Liège
        </p>
        
        <div className="flex justify-center gap-6">
          {socialLinks.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label={link.label}
              >
                <Icon size={24} />
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

