export default function PageHero({ eyebrow, title, children }) {
  return (
    <header className="page-hero">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      {children}
    </header>
  )
}
