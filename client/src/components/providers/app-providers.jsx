import { ErrorBoundary } from "../error-boundary"

export function AppProviders({ children }) {
  return <ErrorBoundary>{children}</ErrorBoundary>
}
