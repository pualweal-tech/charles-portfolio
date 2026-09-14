import { useCallback, useState } from 'react'
import Cursor from './components/Cursor'
import Header from './components/Header'
import About from './pages/About'
import Career from './pages/Career'
import GraphicDesign from './pages/GraphicDesign'
import Home from './pages/Home'
import VibeCoding from './pages/VibeCoding'
import type { View } from './types'

export default function App() {
  const [view, setView] = useState<View>('home')

  const goHome = useCallback(() => setView('home'), [])
  const goGraphic = useCallback(() => setView('graphic'), [])
  const goAbout = useCallback(() => setView('about'), [])
  const goCareer = useCallback(() => setView('career'), [])
  const goVibe = useCallback(() => setView('vibe'), [])

  return (
    <main className="site-shell">
      <div className="site-frame" aria-hidden="true" />
      <div className="film-grain" aria-hidden="true" />
      <Cursor />
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
        <Home
          active={view === 'home'}
          onEnterGraphic={goGraphic}
          onEnterAbout={goAbout}
          onEnterVibe={goVibe}
        />
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
        <About enabled={view === 'about'} />
      </section>
      <section
        className="space-graphic"
        data-active={view === 'career'}
        aria-hidden={view !== 'career'}
        inert={view !== 'career'}
      >
        <Career enabled={view === 'career'} />
      </section>
      <section
        className="space-graphic"
        data-active={view === 'vibe'}
        aria-hidden={view !== 'vibe'}
        inert={view !== 'vibe'}
      >
        <VibeCoding enabled={view === 'vibe'} />
      </section>
    </main>
  )
}
