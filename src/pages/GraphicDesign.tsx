import { useCallback, useEffect, useRef, useState } from 'react'
import PortfolioNav from '../components/PortfolioNav'
import ProjectContent from '../components/ProjectContent'
import {
  DEFAULT_SECTION,
  type PortfolioSection,
} from '../data/projects'

type GraphicDesignProps = {
  enabled: boolean
}

export default function GraphicDesign({ enabled }: GraphicDesignProps) {
  const [active, setActive] = useState<PortfolioSection>(DEFAULT_SECTION)
  const activeRef = useRef(active)
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    if (!enabled) return
    setActive(DEFAULT_SECTION)
    scrollerRef.current?.scrollTo({ top: 0 })
  }, [enabled])

  const goTo = useCallback((next: PortfolioSection) => {
    if (activeRef.current === next) return
    setActive(next)
    scrollerRef.current?.scrollTo({ top: 0 })
  }, [])

  useEffect(() => {
    if (!enabled) return
    const scroller = scrollerRef.current
    if (!scroller) return

    const onWheel = (event: WheelEvent) => {
      const atTop = scroller.scrollTop <= 0
      const atBottom =
        scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1
      if ((event.deltaY < 0 && atTop) || (event.deltaY > 0 && atBottom)) {
        event.preventDefault()
      }
    }

    scroller.addEventListener('wheel', onWheel, { passive: false })
    return () => scroller.removeEventListener('wheel', onWheel)
  }, [enabled, active])

  return (
    <div className="relative h-full">
      <div
        ref={scrollerRef}
        className="section-lock h-full overflow-y-auto pt-20 pb-24 lg:pr-40 lg:pb-8"
      >
        <ProjectContent key={active} section={active} />
      </div>
      <PortfolioNav active={active} onChange={goTo} />
    </div>
  )
}
