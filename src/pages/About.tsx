import ProfileShell from '../components/ProfileShell'
import { PROFILE } from '../data/profile'

type AboutProps = {
  enabled: boolean
}

export default function About({ enabled }: AboutProps) {
  return (
    <ProfileShell enabled={enabled} index="02" kicker="PROFILE" title="个人简介">
      <div className="about-grid">
        <aside className="about-aside">
          <p className="about-name">{PROFILE.name}</p>
          <p className="about-en">{PROFILE.english}</p>
          <p className="about-intent">
            {PROFILE.intent}
            <span> · {PROFILE.city}</span>
          </p>
          <dl className="about-contact">
            <div>
              <dt>Mail</dt>
              <dd>
                <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              </dd>
            </div>
            <div>
              <dt>Tel</dt>
              <dd>
                <a href={`tel:${PROFILE.phone}`}>{PROFILE.phone}</a>
              </dd>
            </div>
          </dl>
          <a className="about-cv" href={PROFILE.resume} target="_blank" rel="noreferrer">
            <span>下载简历</span>
            <span>PDF ↗</span>
          </a>
        </aside>

        <div className="about-main">
          {PROFILE.summary.map((paragraph) => (
            <p key={paragraph} className="about-bio">
              {paragraph}
            </p>
          ))}

          <ul className="about-facts">
            {PROFILE.facts.map((fact, index) => (
              <li key={fact.label}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{fact.value}</strong>
                <em>{fact.label}</em>
              </li>
            ))}
          </ul>

          <section className="about-block">
            <h2>工作流</h2>
            <ol className="about-process">
              {PROFILE.process.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <section className="about-block">
            <h2>能力</h2>
            <div className="about-tags">
              {PROFILE.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </section>

          <section className="about-block">
            <h2>奖项 / 证书</h2>
            <div className="about-tags">
              {PROFILE.awards.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </ProfileShell>
  )
}
