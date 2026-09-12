import { useCallback, useState } from 'react'
import ComingSoon from './components/ComingSoon'
import Header from './components/Header'
import GraphicDesign from './pages/GraphicDesign'
import Home from './pages/Home'
import type { View } from './types'

export default function App() {
  const [view, setView] = useState<View>('home')

  const goHome = useCallback(() => setView('home'), [])
  const goGraphic = useCallback(() => setView('graphic'), [])
  const goAbout = useCallback(() => setView('about'), [])
  const goCareer = useCallback(() => setView('career'), [])
  const goVibe = useCallback(() => setView('vibe'), [])

  return (
    <main className="relative h-screen overflow-hidden bg-[var(--bg)]">
      <Header
        view={view}
        onHome={goHome}
        onGraphic={goGraphic}
        onAbout={goAbout}
        onCareer={goCareer}
        onVibe={goVibe}
      />
      <section
        className="space-home"
        data-active={view === 'home'}
        aria-hidden={view !== 'home'}
        inert={view !== 'home'}
      >
        <Home active={view === 'home'} onEnterGraphic={goGraphic} />
      </section>
      <section
        className="space-graphic"
        data-active={view === 'graphic'}
        aria-hidden={view !== 'graphic'}
        inert={view !== 'graphic'}
      >
        <GraphicDesign enabled={view === 'graphic'} />
      </section>
      <section
        className="space-graphic"
        data-active={view === 'about'}
        aria-hidden={view !== 'about'}
        inert={view !== 'about'}
      >
        <ComingSoon title="个人简介" />
      </section>
      <section
        className="space-graphic"
        data-active={view === 'career'}
        aria-hidden={view !== 'career'}
        inert={view !== 'career'}
      >
        <ComingSoon title="工作经历" />
      </section>
      <section
        className="space-graphic"
        data-active={view === 'vibe'}
        aria-hidden={view !== 'vibe'}
        inert={view !== 'vibe'}
      >
        <ComingSoon title="vibe coding案例" />
      </section>
    </main>
  )
}
