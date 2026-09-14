import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!fine.matches) return

    document.documentElement.dataset.cursor = 'on'

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { x: pos.x, y: pos.y }
    let raf = 0

    const render = () => {
      ring.x += (pos.x - ring.x) * 0.18
      ring.y += (pos.y - ring.y) * 0.18
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`
      }
      raf = window.requestAnimationFrame(render)
    }

    const onMove = (event: MouseEvent) => {
      pos.x = event.clientX
      pos.y = event.clientY
    }

    const onOver = (event: MouseEvent) => {
      const target = event.target
      const hot =
        target instanceof Element && Boolean(target.closest('button, a'))
      document.documentElement.dataset.cursorHot = hot ? 'true' : 'false'
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    raf = window.requestAnimationFrame(render)

    return () => {
      delete document.documentElement.dataset.cursor
      delete document.documentElement.dataset.cursorHot
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="site-cursor" aria-hidden="true">
      <div ref={ringRef} className="site-cursor-ring" />
      <div ref={dotRef} className="site-cursor-dot" />
    </div>
  )
}
