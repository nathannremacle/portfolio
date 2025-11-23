'use client'

import { Code, Database, Smartphone, Cloud, GitBranch, Shield } from 'lucide-react'

interface SkillCategory {
  title: string
  icon: React.ElementType
  skills: string[]
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Langages & Scripting',
    icon: Code,
    skills: ['Python', 'C', 'Automatisation', 'Scripting'],
  },
  {
    title: 'APIs & Data',
    icon: Database, // L'icône base de données convient bien aux APIs/Flux
    skills: ['YouTube Data API', 'Hashnode GraphQL', 'RSS', 'JSON/XML'],
  },
  {
    title: 'DevOps & Outils',
    icon: GitBranch,
    skills: ['GitHub', 'GitHub Actions', 'FFmpeg', 'Sublime Text', 'Excel', 'Cursor'],
  },
  {
    title: 'Tech & Innovation',
    icon: Cloud, // L'icône Cloud ou CPU convient pour l'IA et le Web
    skills: ['AI Prompting', 'SEO', 'Veille Technologique'],
  },
  {
    title: 'Ingénierie (Bac 2)',
    icon: Shield, // Symbolise la rigueur ou "PenTool" si disponible
    skills: ['Mathématiques', 'Physique', 'Algorithmique', 'Analyse', 'Résolution de problèmes'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Compétences</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => {
            const Icon = category.icon
            return (
              <div
                key={category.title}
                className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-gray-700 transition-colors duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon size={24} className="text-gray-400" />
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gray-800 text-sm rounded text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}



