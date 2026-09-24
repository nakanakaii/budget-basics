import { Menu, Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { primaryLinks } from '../data/navigation.js'
import BackToTop from './BackToTop.jsx'
import Logo from './Logo.jsx'

export default function AppShell() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    let current = true
    queueMicrotask(() => current && setOpen(false))
    return () => { current = false }
  }, [pathname])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="header-inner">
          <Logo />
          <button className="menu-toggle" type="button" aria-controls="primary-navigation" aria-expanded={open} aria-label="Navigation menu" onClick={() => setOpen(!open)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
          <nav id="primary-navigation" className={open ? 'nav-open' : ''} aria-label="Primary">
            {primaryLinks.map(([label, path]) => <NavLink key={path} to={path} end={path === '/'} onClick={() => setOpen(false)}>{label}</NavLink>)}
          </nav>
          <Link className="search-link" to="/search" aria-label="Search"><Search aria-hidden="true" /></Link>
        </div>
      </header>
      <main id="main-content"><Outlet /></main>
      <footer>
        <div className="footer-grid">
          <div><Logo /><p>Friendly, practical money education for everyday decisions.</p></div>
          <nav aria-label="Footer">{primaryLinks.map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}</nav>
          <nav aria-label="Legal"><Link to="/search">Search</Link><Link to="/sitemap">Sitemap</Link><Link to="/privacy">Privacy notice</Link></nav>
        </div>
        <p className="copyright">© {new Date().getFullYear()} BudgetBasics. Learn, plan, grow.</p>
      </footer>
      <BackToTop />
    </div>
  )
}
