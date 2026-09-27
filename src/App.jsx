import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell.jsx";
import PageHero from "./components/PageHero.jsx";
import HomePage from "./pages/HomePage.jsx";
import BudgetingBasicsPage from "./pages/BudgetingBasicsPage.jsx";
import InfographicsPage from "./pages/InfographicsPage.jsx";
import MoneyMistakesPage from "./pages/MoneyMistakesPage.jsx";
import NeedsWantsPage from "./pages/NeedsWantsPage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import SitemapPage from "./pages/SitemapPage.jsx";
import BudgetCalculatorPage from "./pages/BudgetCalculatorPage.jsx";
import SavingsGoalsPage from "./pages/SavingsGoalsPage.jsx";
import ExpensePlannerPage from "./pages/ExpensePlannerPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import ChatbotPage from "./pages/ChatbotPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import FeedbackPage from "./pages/FeedbackPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import SavingsGoalsGuidePage from "./pages/SavingsGoalsGuidePage.jsx";
import ExpensePlannerGuidePage from "./pages/ExpensePlannerGuidePage.jsx";
import MoneyMistakesPracticePage from "./pages/MoneyMistakesPracticePage.jsx";

function NotFound() {
  return (
    <PageHero eyebrow="404" title="Page not found">
      <p>
        The requested page does not exist. Use the navigation to continue
        learning.
      </p>
    </PageHero>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route
          path="learn/budgeting-basics"
          element={<BudgetingBasicsPage />}
        />
        <Route path="learn/needs-vs-wants" element={<NeedsWantsPage />} />
        <Route path="learn/savings-goals" element={<SavingsGoalsGuidePage />} />
        <Route
          path="learn/expense-planner"
          element={<ExpensePlannerGuidePage />}
        />
        <Route path="learn/money-mistakes" element={<MoneyMistakesPage />} />
        <Route path="practice/savings-goals" element={<SavingsGoalsPage />} />
        <Route
          path="practice/expense-planner"
          element={<ExpensePlannerPage />}
        />
        <Route
          path="practice/money-mistakes"
          element={<MoneyMistakesPracticePage />}
        />
        <Route path="resources/infographics" element={<InfographicsPage />} />
        <Route path="resources/search" element={<SearchPage />} />
        <Route path="budget-calculator" element={<BudgetCalculatorPage />} />
        <Route path="chatbot" element={<ChatbotPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="feedback" element={<FeedbackPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route
          path="budgeting-basics"
          element={<Navigate replace to="/learn/budgeting-basics" />}
        />
        <Route
          path="needs-vs-wants"
          element={<Navigate replace to="/learn/needs-vs-wants" />}
        />
        <Route
          path="savings-goals"
          element={<Navigate replace to="/practice/savings-goals" />}
        />
        <Route
          path="expense-planner"
          element={<Navigate replace to="/practice/expense-planner" />}
        />
        <Route
          path="money-mistakes"
          element={<Navigate replace to="/learn/money-mistakes" />}
        />
        <Route
          path="infographics"
          element={<Navigate replace to="/resources/infographics" />}
        />
        <Route
          path="search"
          element={<Navigate replace to="/resources/search" />}
        />
        <Route
          path="50-30-20"
          element={<Navigate replace to="/budget-calculator" />}
        />
        <Route path="sitemap" element={<SitemapPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
