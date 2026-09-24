import { Route, Routes } from 'react-router-dom'
import AppShell from './components/AppShell.jsx'
import PageHero from './components/PageHero.jsx'
import { primaryLinks } from './data/navigation.js'
import HomePage from './pages/HomePage.jsx'
import BudgetingBasicsPage from './pages/BudgetingBasicsPage.jsx'
import InfographicsPage from './pages/InfographicsPage.jsx'
import MoneyMistakesPage from './pages/MoneyMistakesPage.jsx'
import NeedsWantsPage from './pages/NeedsWantsPage.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'
import SitemapPage from './pages/SitemapPage.jsx'

function Placeholder({ name }) {
  return <PageHero eyebrow="Learning module" title={`${name} module coming soon`}><p>This area is reserved for the upcoming {name.toLowerCase()} learning module.</p></PageHero>
}

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="budgeting-basics" element={<BudgetingBasicsPage />} />
        <Route path="needs-vs-wants" element={<NeedsWantsPage />} />
        <Route path="money-mistakes" element={<MoneyMistakesPage />} />
        <Route path="infographics" element={<InfographicsPage />} />
        {primaryLinks.slice(1).filter(([, path]) => !['/budgeting-basics', '/needs-vs-wants', '/money-mistakes', '/infographics'].includes(path)).map(([name, path]) => <Route key={path} path={path} element={<Placeholder name={name} />} />)}
        <Route path="search" element={<Placeholder name="Search" />} />
        <Route path="sitemap" element={<SitemapPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="*" element={<Placeholder name="Page not found" />} />
      </Route>
    </Routes>
  )
}

export default App
