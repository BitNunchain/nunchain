import Hero from '@/components/Hero'
import Scene from '@/components/Scene'
import MiningPanel from '@/components/MiningPanel'

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden">
      {/* Top-of-page hero section */}
      <Hero />

      {/* Interactive visual / 3D scene */}
      <section className="relative w-full h-[500px] md:h-[700px]">
        <Scene />
      </section>

      {/* Mining interaction */}
      <section className="relative w-full max-w-6xl p-6">
        <MiningPanel />
      </section>
    </main>
  )
}
