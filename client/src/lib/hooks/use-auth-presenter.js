"use client"

import { useState, useCallback } from "react"

// Mock user for demo purposes
const mockUser = {
  id: "1",
  email: "demo@example.com",
  name: "Demo User",
}

export function useAuthPresenter() {
  const [user, setUser] = useState(mockUser) // Start logged in for demo
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const isAuthenticated = user !== null

  // Login
  const login = useCallback(async (email, password) => {
    setLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock validation
      if (email === "demo@example.com" && password === "password") {
        setUser(mockUser)
        return true
      } else {
        setError("Invalid email or password")
        return false
      }
    } catch (err) {
      setError("Login failed. Please try again.")
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  // Signup
  const signup = useCallback(async (email, password, name) => {
    setLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user creation
      const newUser = {
        id: Date.now().toString(),
        email,
        name,
      }

      setUser(newUser)
      return true
    } catch (err) {
      setError("Signup failed. Please try again.")
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  // Logout
  const logout = useCallback(() => {
    setUser(null)
    setError(null)
  }, [])

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    signup,
    logout,
    clearError,
  }
}
