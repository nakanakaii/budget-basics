import { Route, Routes } from 'react-router-dom'
import AppShell from './components/AppShell.jsx'
import PageHero from './components/PageHero.jsx'
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

function NotFound() {
  return <PageHero eyebrow="404" title="Page not found"><p>The requested page does not exist. Use the navigation to continue learning.</p></PageHero>
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
        <Route path="search" element={<SearchPage />} />
        <Route path="sitemap" element={<SitemapPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
