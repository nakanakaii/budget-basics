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
import BudgetCalculatorPage from './pages/BudgetCalculatorPage.jsx'
import SavingsGoalsPage from './pages/SavingsGoalsPage.jsx'
import ExpensePlannerPage from './pages/ExpensePlannerPage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import ChatbotPage from './pages/ChatbotPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import FeedbackPage from './pages/FeedbackPage.jsx'
import ContactPage from './pages/ContactPage.jsx'

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
        <Route path="50-30-20" element={<BudgetCalculatorPage />} />
        <Route path="savings-goals" element={<SavingsGoalsPage />} />
        <Route path="expense-planner" element={<ExpensePlannerPage />} />
        <Route path="chatbot" element={<ChatbotPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="feedback" element={<FeedbackPage />} />
        <Route path="contact" element={<ContactPage />} />
        {primaryLinks.slice(1).filter(([, path]) => !['/budgeting-basics', '/needs-vs-wants', '/money-mistakes', '/infographics', '/50-30-20', '/savings-goals', '/expense-planner', '/chatbot', '/about', '/feedback', '/contact'].includes(path)).map(([name, path]) => <Route key={path} path={path} element={<Placeholder name={name} />} />)}
        <Route path="search" element={<SearchPage />} />
        <Route path="sitemap" element={<SitemapPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="*" element={<Placeholder name="Page not found" />} />
      </Route>
    </Routes>
  )
}

export default App
