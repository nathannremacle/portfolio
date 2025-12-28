// ============================================
// FICHIER DE DONNÉES CENTRALISÉ
// Structure: Projects / Accomplishments
// ============================================

// === INFORMATIONS PERSONNELLES ===
export const personal = {
  name: 'Nathan Remacle',
  firstName: 'Nathan',
  lastName: 'Remacle',
  title: {
    line1: 'Ingénieur',
    line2: 'Développeur',
    connector: '&',
  },
  role: 'Étudiant en ingénierie civile',
  university: 'Université de Liège',
  location: 'Liège, Belgique',
  email: 'nathanremacle@engineer.com',
  bio: `Je combine rigueur d'ingénieur et créativité de développeur pour construire 
        des systèmes automatisés qui fonctionnent en arrière-plan, résolvant des 
        problèmes réels avec élégance et efficacité.`,
  shortBio: `Étudiant ingénieur passionné par l'automatisation et la performance.`,
}

// === LIENS SOCIAUX ===
export const socials = [
  { 
    name: 'GitHub', 
    handle: '@nathannremacle',
    url: 'https://github.com/nathannremacle',
  },
  { 
    name: 'LinkedIn', 
    handle: '/in/nathanremacle',
    url: 'https://www.linkedin.com/in/nathanremacle',
  },
  { 
    name: 'Email', 
    handle: 'nathanremacle@engineer.com',
    url: 'mailto:nathanremacle@engineer.com',
  },
]

// === NAVIGATION ===
export const navigation = [
  { label: 'Opuscula', href: '#work', number: '01' },
  { label: 'Sollertia', href: '#skills', number: '02' },
  { label: 'De Homine', href: '#about', number: '03' },
  { label: 'Contactus', href: '#contact', number: '04' },
]

// === PROJETS (Code & Tech) ===
export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  year: string
  category: string
  technologies: string[]
  metrics?: { label: string; value: string }[]
  links: {
    github?: string
    live?: string
  }
  image?: string
}

export const projects: Project[] = [
  {
    id: 'youtube-automation',
    title: 'YouTube Automation',
    subtitle: 'Pipeline de contenu autonome',
    description: 'Automatisation complète de la création et publication de contenu vidéo.',
    longDescription: `Conception d'un pipeline d'automatisation complet pour YouTube piloté par Python. 
Le système orchestre la création et la publication de contenu via des workflows GitHub Actions.

Publication automatique : un Short quotidien à 15h et un Best-Of chaque 27 du mois.

Le système gère automatiquement le téléchargement, le montage, l'optimisation et la publication de contenu vidéo, permettant une présence continue sur la plateforme sans intervention manuelle.`,
    year: '2024',
    category: 'Automation',
    technologies: ['Python', 'GitHub Actions', 'YouTube API', 'FFmpeg'],
    metrics: [
      { label: 'Vidéos générées', value: '100+' },
      { label: 'Uptime', value: '24/7' },
      { label: 'Intervention', value: '0' },
    ],
    links: {
      github: 'https://github.com/anymeredifftwitch/art',
      live: 'https://www.youtube.com/@AnymeRediffTwitch',
    },
    image: '/projet1.png',
  },
  {
    id: 'blog-automation',
    title: 'Blog Remacle',
    subtitle: 'CI/CD Zero-Touch',
    description: 'Pipeline autonome de génération et publication d\'articles techniques.',
    longDescription: `Pipeline CI/CD autonome qui génère, illustre et publie des articles techniques sur Hashnode.

Combine Gemini 2.0 Flash pour la rédaction et Flux (Pollinations) pour l'illustration, maintenant un média technologique sans intervention humaine.

Chaque article est automatiquement optimisé SEO, illustré avec des images générées par IA, et publié selon un calendrier éditorial prédéfini.`,
    year: '2024',
    category: 'AI & Content',
    technologies: ['Python', 'Gemini 2.0', 'GitHub Actions', 'Hashnode GraphQL'],
    metrics: [
      { label: 'Articles/mois', value: '30' },
      { label: 'SEO Score', value: '95+' },
      { label: 'Images IA', value: '100%' },
    ],
    links: {
      github: 'https://github.com/nathannremacle/blogremacle',
      live: 'https://remacle.hashnode.dev',
    },
    image: '/projet2.png',
  },
]

// === ACCOMPLISSEMENTS (Personnel & Pro) ===
export interface Accomplishment {
  id: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  year: string
  category: 'education' | 'sport' | 'professional' | 'personal'
  highlights: string[]
  stats?: { label: string; value: string }[]
}

export const accomplishments: Accomplishment[] = [
  {
    id: 'ingenierie-civile',
    title: 'Ingénierie Civile',
    subtitle: 'Université de Liège',
    description: 'Formation d\'excellence en sciences de l\'ingénieur.',
    longDescription: `Formation rigoureuse en ingénierie civile à l'Université de Liège.

Le cursus développe une pensée analytique, la résolution de problèmes complexes et une approche méthodique applicable à tous les domaines.

Mathématiques avancées, physique, algorithmique et gestion de projet constituent le socle de cette formation d'excellence.`,
    year: '2022 — Present',
    category: 'education',
    highlights: ['Mathématiques', 'Physique', 'Algorithmique', 'Analyse'],
    stats: [
      { label: 'Niveau', value: 'Bac+2' },
      { label: 'Spécialité', value: 'Civile' },
    ],
  },
  {
    id: 'natation',
    title: 'Natation',
    subtitle: 'Discipline aquatique',
    description: 'Entraînement régulier développant endurance et technique.',
    longDescription: `La natation est un pilier de mon entraînement physique. Sport complet par excellence, il développe l'endurance cardiovasculaire, la coordination et la technique de respiration.

L'eau impose une rigueur similaire au code : chaque mouvement doit être optimisé, chaque respiration calculée.

La progression se mesure en secondes gagnées.`,
    year: 'Continu',
    category: 'sport',
    highlights: ['Crawl', 'Brasse', 'Endurance', 'Technique'],
    stats: [
      { label: 'Fréquence', value: '3x/sem' },
      { label: 'Focus', value: 'Cardio' },
    ],
  },
]

// === COMPÉTENCES ===
export interface Skill {
  name: string
  category: 'languages' | 'apis' | 'devops' | 'engineering' | 'soft'
}

export const skills: Skill[] = [
  { name: 'Python', category: 'languages' },
  { name: 'C', category: 'languages' },
  { name: 'Automatisation', category: 'languages' },
  { name: 'Scripting', category: 'languages' },
  { name: 'YouTube Data API', category: 'apis' },
  { name: 'Hashnode GraphQL', category: 'apis' },
  { name: 'REST APIs', category: 'apis' },
  { name: 'JSON/XML', category: 'apis' },
  { name: 'GitHub', category: 'devops' },
  { name: 'GitHub Actions', category: 'devops' },
  { name: 'FFmpeg', category: 'devops' },
  { name: 'Cursor', category: 'devops' },
  { name: 'Mathématiques', category: 'engineering' },
  { name: 'Physique', category: 'engineering' },
  { name: 'Algorithmique', category: 'engineering' },
  { name: 'Analyse', category: 'engineering' },
  { name: 'Résolution de problèmes', category: 'soft' },
  { name: 'AI Prompting', category: 'soft' },
  { name: 'Veille Tech', category: 'soft' },
]

// === SECTIONS À PROPOS ===
export const aboutSections = {
  engineer: {
    title: 'L\'Ingénieur',
    subtitle: 'Rigueur & Méthode',
    description: `Étudiant en ingénierie civile à l'Université de Liège. 
      Chaque problème est une équation à résoudre, chaque projet une 
      opportunité d'optimiser et de perfectionner.`,
  },
  developer: {
    title: 'Le Développeur',
    subtitle: 'Automatisation & Efficacité',
    description: `Python, APIs, CI/CD. Je construis des systèmes qui 
      fonctionnent 24/7 en arrière-plan. L'automatisation n'est pas 
      un luxe, c'est une nécessité.`,
  },
  athlete: {
    title: 'L\'Athlète',
    subtitle: 'Discipline & Performance',
    description: `La même rigueur appliquée au code s'applique à 
      l'entraînement. Performance physique et mentale sont 
      indissociables. La discipline forge l'excellence.`,
  },
}

// === STATISTIQUES ===
export const stats = [
  { value: 'Opus', label: 'Founder' },
  { value: 'Bac+2', label: 'Civil Engineering' },
]
