// Métadonnées pour les images de natation
// Vous pouvez ajouter/modifier les informations pour chaque image

export interface NatationTime {
  time: string
  distance: string
  style: string
}

export interface NatationImage {
  filename: string
  date?: string
  lieu?: string
  description?: string
  times?: NatationTime[]
  ranking?: string
  swimrankingsUrl?: string
}

export const natationImages: NatationImage[] = [
  {
    filename: 'natation-1.png',
    date: '24/04/2022',
    lieu: 'Piscine Olympique du Wezenberg à Anvers',
    description: "Cette photo a été prise lors du Championnat de Belgique Open (bassin 50m), juste après le relais 4x100m 4 nages. Je venais de terminer ma course (freestyle), décrochant pour l'équipe et moi une médaille de vice-champion.\nCrédits: Clément Lourtie, Tristan Hessens, Augustin Ficher, Nathan Remacle (Moi).",
  },
  {
    filename: 'natation-2.png',
    date: '21/04/2023',
    lieu: 'Piscine Olympique du Wezenberg à Anvers',
    description: "Cette photo a été prise lors du Championnat de Belgique Open (bassin 50m). Elle immortalise un moment unique de l'année et l'excellente ambiance qui régnait au sein de mon club de natation de l'époque, le Swimming Team Dison (STD). Crédits photo : Clémence Sevrin, Gabriel Struys, Nathan Remacle (Moi), Olivier Laudauer, Noé Doyen.",
  },
  {
    filename: 'natation-3.png',
    date: '23/04/2023',
    lieu: 'Piscine Olympique du Wezenberg à Anvers',
    description: "Cette photo a été prise le dernier jour du Championnat de Belgique Open (bassin 50m), compétition durant laquelle j'ai réalisé un nouveau record personnel.",
    times: [
      { time: "55''43", distance: '100m', style: 'freestyle' },
    ],
  },
  {
    filename: 'natation-4.png',
    date: '23/07/2023',
    lieu: 'Piscine Olympique du Wezenberg à Anvers',
    description: "Cette photo a été prise le dernier jour du Championnat de Belgique Open (bassin 50m), qui fût ma dernière compétition. J'ai eu la chance de réaliser mes derniers temps, qui furent tous des records personnels.",
    times: [
      { time: "55''25", distance: '100m', style: 'freestyle' },
      { time: "25''48", distance: '50m', style: 'freestyle' },
      { time: "27''31", distance: '50m', style: 'butterfly' },
    ],
    ranking: '4e de Belgique de ma catégorie cette année-là (qui fut ma dernière année et ma dernière compétition)',
    swimrankingsUrl: 'https://www.swimrankings.net/index.php?page=athleteDetail&athleteId=5259179',
  },
]

