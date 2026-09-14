import Hero from '../components/Hero'
import RippleEffect from '../components/RippleEffect'

type HomeProps = {
  active: boolean
  onEnterGraphic: () => void
  onEnterAbout: () => void
  onEnterVibe: () => void
}

export default function Home({
  active,
  onEnterGraphic,
  onEnterAbout,
  onEnterVibe,
}: HomeProps) {
  return (
    <div className="h-full overflow-hidden">
      <RippleEffect enabled={active} />
      <div className="relative z-20 h-full">
        <Hero
          active={active}
          onEnterGraphic={onEnterGraphic}
          onEnterAbout={onEnterAbout}
          onEnterVibe={onEnterVibe}
        />
      </div>
    </div>
  )
}
