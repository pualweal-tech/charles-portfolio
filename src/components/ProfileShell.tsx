import { useEffect, useRef, type ReactNode } from 'react'

type ProfileShellProps = {
  enabled: boolean
  index: string
  kicker: string
  title: string
  children: ReactNode
}

export default function ProfileShell({
  enabled,
  index,
  kicker,
  title,
  children,
}: ProfileShellProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (enabled) scrollerRef.current?.scrollTo({ top: 0 })
  }, [enabled])

  return (
    <div ref={scrollerRef} className="section-lock profile-page">
      <header className="profile-head">
        <p className="profile-kicker">
          <span>{index}</span>
          <span>{kicker}</span>
        </p>
        <h1 className="profile-title">{title}</h1>
      </header>
      {children}
    </div>
  )
}
