import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ProjectsAccomplishments from '@/components/ProjectsAccomplishments'
import Skills from '@/components/Skills'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-warm">
      <Navbar />
      <Hero />
      <ProjectsAccomplishments />
      <Skills />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
