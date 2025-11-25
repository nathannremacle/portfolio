import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nathan Remacle',
  description: 'Portfolio personnel de Nathan Remacle - Étudiant en ingénierie civile à l\'Université de Liège',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  )
}



