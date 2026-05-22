import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { accomplishments } from '@/data/content'

export function generateStaticParams() {
  return accomplishments.map((item) => ({
    id: item.id,
  }))
}

export default async function AccomplishmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = accomplishments.find((a) => a.id === id)

  if (!item) {
    notFound()
  }

  const categoryLabels: Record<string, string> = {
    education: 'Formation',
    sport: 'Sport',
    professional: 'Professionnel',
    personal: 'Personnel',
  }

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link 
            href="/#work" 
            className="flex items-center gap-2 text-black/60 hover:text-black transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Retour</span>
          </Link>
          <span className="font-mono text-xs text-black/40 uppercase">
            {categoryLabels[item.category]}
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 border-b border-black/10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="font-mono text-sm text-black/40">{item.year}</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-black mb-6">
            {item.title}
          </h1>
          <p className="text-xl md:text-2xl text-black/60 max-w-2xl">
            {item.subtitle}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <h2 className="font-mono text-xs text-black/40 uppercase tracking-widest mb-6">
              Détails
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-black/80 text-lg leading-relaxed whitespace-pre-line">
                {item.longDescription}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Stats */}
            {item.stats && item.stats.length > 0 && (
              <div>
                <h3 className="font-mono text-xs text-black/40 uppercase tracking-widest mb-4">
                  Données
                </h3>
                <div className="space-y-4">
                  {item.stats.map((stat) => (
                    <div key={stat.label} className="flex justify-between items-baseline border-b border-black/10 pb-4">
                      <span className="text-black/60 text-sm">{stat.label}</span>
                      <span className="text-black font-serif text-2xl">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights */}
            <div>
              <h3 className="font-mono text-xs text-black/40 uppercase tracking-widest mb-4">
                Points clés
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="px-3 py-1.5 bg-black/5 text-black/80 text-sm font-mono rounded-lg"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

