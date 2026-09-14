type ComingSoonProps = {
  index: string
  title: string
}

export default function ComingSoon({ index, title }: ComingSoonProps) {
  return (
    <div className="coming-soon">
      <p className="coming-soon-index">{index}</p>
      <h2 className="coming-soon-title">{title}</h2>
      <p className="coming-soon-mark">COMING SOON</p>
    </div>
  )
}
