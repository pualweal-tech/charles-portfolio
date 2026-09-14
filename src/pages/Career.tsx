import ProfileShell from '../components/ProfileShell'
import { EDUCATION, EXPERIENCES, PROFILE } from '../data/profile'

type CareerProps = {
  enabled: boolean
}

export default function Career({ enabled }: CareerProps) {
  return (
    <ProfileShell enabled={enabled} index="03" kicker="EXPERIENCE" title="工作经历">
      <ol className="career-list">
        {EXPERIENCES.map((job) => (
          <li key={job.company} className="career-item">
            <p className="career-period">{job.period}</p>
            <div className="career-body">
              <h2>{job.role}</h2>
              <p className="career-company">{job.company}</p>
              <ul>
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
        <li className="career-item">
          <p className="career-period">{EDUCATION.period}</p>
          <div className="career-body">
            <h2>{EDUCATION.degree}</h2>
            <p className="career-company">{EDUCATION.school}</p>
            <ul>
              <li>{EDUCATION.note}</li>
              <li>主修课程：{PROFILE.courses.join('、')}</li>
            </ul>
          </div>
        </li>
      </ol>
    </ProfileShell>
  )
}
