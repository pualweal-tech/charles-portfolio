import Hero from '../components/Hero'
import RippleEffect from '../components/RippleEffect'

type HomeProps = {
  active: boolean
  onEnterGraphic: () => void
}

export default function Home({ active, onEnterGraphic }: HomeProps) {
  return (
    <div className="h-full overflow-hidden">
      <RippleEffect enabled={active} />
      <div className="relative z-20 h-full">
        <Hero onEnterGraphic={onEnterGraphic} />
      </div>
    </div>
  )
}
