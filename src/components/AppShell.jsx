import { ChevronDown, Menu, Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { navigationItems, primaryLinks } from '../data/navigation.js'
import BackToTop from './BackToTop.jsx'
import Logo from './Logo.jsx'

export default function AppShell() {
  const [open, setOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState(null)
  const { pathname } = useLocation()
  const headerRef = useRef(null)

  useEffect(() => {
    let current = true
    queueMicrotask(() => {
      if (!current) return
      setOpen(false)
      setOpenGroup(null)
    })
    return () => { current = false }
  }, [pathname])

  useEffect(() => {
    const closeGroups = (event) => {
      if (event.type === 'keydown' ? event.key === 'Escape' : !headerRef.current?.contains(event.target)) setOpenGroup(null)
    }
    document.addEventListener('keydown', closeGroups)
    document.addEventListener('pointerdown', closeGroups)
    return () => {
      document.removeEventListener('keydown', closeGroups)
      document.removeEventListener('pointerdown', closeGroups)
    }
  }, [])

  const selectLink = () => {
    setOpen(false)
    setOpenGroup(null)
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header" ref={headerRef}>
        <div className="header-inner">
          <Logo />
          <button className="menu-toggle" type="button" aria-controls="primary-navigation" aria-expanded={open} aria-label="Navigation menu" onClick={() => setOpen(!open)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
          <nav id="primary-navigation" className={open ? 'nav-open' : ''} aria-label="Primary">
            {navigationItems.map((item) => {
              if (!item.children) return <NavLink key={item.path} to={item.path} end={item.path === '/'} onClick={selectLink}>{item.label}</NavLink>
              const id = `nav-${item.label.toLowerCase().replaceAll(' ', '-')}`
              const expanded = openGroup === item.label
              const active = item.children.some(({ path }) => path === pathname)
              return (
                <div className="nav-group" key={item.label}>
                  <button type="button" aria-controls={id} aria-expanded={expanded} data-active={active || undefined} onClick={() => setOpenGroup(expanded ? null : item.label)}>
                    {item.label}<ChevronDown aria-hidden="true" />
                  </button>
                  <div className="nav-panel" id={id} hidden={!expanded}>
                    {item.children.map(({ label, path }) => <NavLink key={`${item.label}-${path}`} to={path} onClick={selectLink}>{label}</NavLink>)}
                  </div>
                </div>
              )
            })}
          </nav>
          <Link className="search-link" to="/resources/search" aria-label="Search resources" title="Search resources"><Search aria-hidden="true" /></Link>
        </div>
      </header>
      <main id="main-content"><Outlet /></main>
      <footer>
        <div className="footer-grid">
          <div><Logo /><p>Friendly, practical money education for everyday decisions.</p></div>
          <nav aria-label="Footer">{primaryLinks.map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}</nav>
          <nav aria-label="Legal"><Link to="/resources/search">Search</Link><Link to="/sitemap">Sitemap</Link><Link to="/privacy">Privacy notice</Link></nav>
        </div>
        <p className="copyright">© {new Date().getFullYear()} BudgetBasics. Learn, plan, grow.</p>
      </footer>
      <BackToTop />
    </div>
  )
}
