import { useEffect, useState } from 'react'
import type { PortfolioSection } from '../data/projects'

type ProjectContentProps = {
  section: PortfolioSection
}

const BOARDS: Partial<
  Record<
    PortfolioSection,
    { src: string; width: number; height: number; alt: string }
  >
> = {
  ui: {
    src: '/works/ui.svg',
    width: 1140,
    height: 13722,
    alt: 'UI设计',
  },
  branding: {
    src: '/works/branding.svg',
    width: 1141,
    height: 7920,
    alt: '品牌策划',
  },
  packaging: {
    src: '/works/packaging.svg',
    width: 1140,
    height: 5764,
    alt: '包装设计',
  },
  poster: {
    src: '/works/poster.svg',
    width: 1283,
    height: 15360,
    alt: '海报设计',
  },
  book: {
    src: '/works/book.svg',
    width: 1147,
    height: 21172,
    alt: '书籍设计',
  },
}

export default function ProjectContent({ section }: ProjectContentProps) {
  const board = BOARDS[section]

  return (
    <div className="content-enter">
      {board ? <WorkBoard board={board} /> : <EmptyState />}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <p className="font-en text-[12px] tracking-[0.42em] text-[var(--ink-mute)]">
        COMING SOON
      </p>
    </div>
  )
}

function WorkBoard({
  board,
}: {
  board: { src: string; width: number; height: number; alt: string }
}) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 6000)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="relative mx-auto w-full max-w-[1283px]">
      {!ready && (
        <div className="flex min-h-[70vh] items-center justify-center">
          <p className="font-en text-[12px] tracking-[0.42em] text-[var(--ink-mute)]">
            LOADING
          </p>
        </div>
      )}
      <object
        data={board.src}
        type="image/svg+xml"
        aria-label={board.alt}
        onLoad={() => setReady(true)}
        className="block w-full"
        style={{
          aspectRatio: `${board.width} / ${board.height}`,
          visibility: ready ? 'visible' : 'hidden',
          position: ready ? 'relative' : 'absolute',
          pointerEvents: ready ? 'auto' : 'none',
        }}
      />
    </div>
  )
}
