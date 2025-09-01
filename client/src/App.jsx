import { Routes, Route } from "react-router-dom"
import { Suspense } from "react"
import { AppProviders } from "./components/providers/app-providers"
import { ErrorBoundary } from "./components/error-boundary"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import DashboardPage from "./pages/DashboardPage"
import RecipesPage from "./pages/RecipesPage"
import PlannerPage from "./pages/PlannerPage"
import GroceryPage from "./pages/GroceryPage"
import LoadingSpinner from "./components/ui/loading-spinner"

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <AppProviders>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/planner" element={<PlannerPage />} />
            <Route path="/grocery" element={<GroceryPage />} />
          </Routes>
        </AppProviders>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
