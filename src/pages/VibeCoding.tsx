import ProfileShell from '../components/ProfileShell'
import { VIBE_CASES } from '../data/profile'

type VibeCodingProps = {
  enabled: boolean
}

export default function VibeCoding({ enabled }: VibeCodingProps) {
  return (
    <ProfileShell enabled={enabled} index="04" kicker="SELECTED WORK" title="vibe coding">
      <p className="vibe-lead">
        用 Stitch / Figma 生成方案，再以 Cursor 完成交互，并发布到 Vercel。点开即可访问线上案例。
      </p>
      <ul className="vibe-list">
        {VIBE_CASES.map((item, index) => (
          <li key={item.id}>
            <a
              className="vibe-row"
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              <span className="vibe-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="vibe-copy">
                <span className="vibe-title">{item.title}</span>
                <span className="vibe-sub">{item.subtitle}</span>
                <span className="vibe-note">{item.note}</span>
              </span>
              <span className="vibe-live">LIVE ↗</span>
            </a>
          </li>
        ))}
      </ul>
    </ProfileShell>
  )
}
