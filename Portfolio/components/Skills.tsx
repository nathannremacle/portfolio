'use client'

import { Code, Database, Cloud, GitBranch, Shield } from 'lucide-react'

interface SkillCategory {
  title: string
  icon: React.ElementType
  skills: string[]
}

interface SkillItem {
  category: string
  icon: React.ElementType
  skill: string
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Langages & Scripting',
    icon: Code,
    skills: ['Python', 'C', 'Automatisation', 'Scripting'],
  },
  {
    title: 'APIs & Data',
    icon: Database,
    skills: ['YouTube Data API', 'Hashnode GraphQL', 'RSS', 'JSON/XML'],
  },
  {
    title: 'DevOps & Outils',
    icon: GitBranch,
    skills: ['GitHub', 'GitHub Actions', 'FFmpeg', 'Sublime Text', 'Excel', 'Cursor'],
  },
  {
    title: 'Tech & Innovation',
    icon: Cloud,
    skills: ['AI Prompting', 'SEO', 'Veille Technologique'],
  },
  {
    title: 'Ingénierie (Bac 2)',
    icon: Shield,
    skills: ['Mathématiques', 'Physique', 'Algorithmique', 'Analyse', 'Résolution de problèmes'],
  },
]

const marqueeSkills: SkillItem[] = skillCategories.flatMap((category) =>
  category.skills.map((skill) => ({
    category: category.title,
    icon: category.icon,
    skill,
  }))
)

const repeatedSkills = [...marqueeSkills, ...marqueeSkills]

export default function Skills() {
  return (
    <section id="skills" className="py-16 px-4 space-y-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Compétences</h2>
        <p className="text-gray-400">
          Une sélection non exhaustive de technologies et de domaines que j&apos;utilise au quotidien. Certaines compétences sont issues de mon cursus universitaire mais la majorité sont issues de mes propres recherches et expériences.
        </p>
      </div>

      <div className="skill-marquee-wrapper relative overflow-hidden rounded-3xl border border-gray-800 bg-gray-900/40 px-6 sm:px-10 py-6 w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent" />

        <div className="skill-marquee-content flex gap-4">
          {repeatedSkills.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={`${item.skill}-${index}`}
                className="flex items-center gap-3 px-4 py-2 bg-gray-900/80 border border-gray-800 rounded-full min-w-max backdrop-blur"
              >
                <Icon size={18} className="text-gray-400" />
                <div className="text-left">
                  <p className="text-sm font-medium text-white">{item.skill}</p>
                  <p className="text-xs text-gray-400">{item.category}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

