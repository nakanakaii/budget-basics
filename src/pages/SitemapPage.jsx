import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import { primaryLinks } from '../data/navigation.js'

export default function SitemapPage() {
  return <><PageHero eyebrow="Find your way" title="Sitemap"><p>Every BudgetBasics learning destination in one place.</p></PageHero><section><ul className="link-list">{primaryLinks.map(([label, path]) => <li key={path}><Link to={path}>{label}</Link></li>)}<li><Link to="/privacy">Privacy notice</Link></li></ul></section></>
}
