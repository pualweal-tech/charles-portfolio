type ComingSoonProps = {
  title: string
}

export default function ComingSoon({ title }: ComingSoonProps) {
  return (
    <div className="flex h-full items-center justify-center px-6">
      <div className="text-center">
        <p className="font-display text-[22px] tracking-[0.18em]">{title}</p>
        <p className="font-en mt-5 text-[12px] tracking-[0.42em] text-[var(--ink-mute)]">
          COMING SOON
        </p>
      </div>
    </div>
  )
}
