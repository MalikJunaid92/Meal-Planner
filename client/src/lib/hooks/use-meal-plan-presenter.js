"use client"

import { useState, useEffect, useCallback } from "react"
import { MealPlanService } from "../services/meal-plan-service.js"
import { RecipeService } from "../services/recipe-service.js"

export function useMealPlanPresenter() {
  const [weekPlans, setWeekPlans] = useState([])
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [weekStats, setWeekStats] = useState({
    totalMeals: 0,
    totalCookTime: 0,
    mealsToGo: 21,
  })
  const [availableRecipes, setAvailableRecipes] = useState([])

  // Get the start of the current week (Monday)
  const getWeekStart = useCallback((date) => {
    const d = new Date(date)
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is Sunday
    return new Date(d.setDate(diff))
  }, [])

  // Load week meal plans
  const loadWeekPlans = useCallback(
    async (startDate) => {
      const weekStart = getWeekStart(startDate || currentWeek)
      setLoading(true)
      setError(null)

      try {
        const plans = await MealPlanService.getWeekMealPlan(weekStart)
        const stats = await MealPlanService.getWeekStats(weekStart)

        setWeekPlans(plans)
        setWeekStats(stats)
      } catch (err) {
        setError("Failed to load meal plans")
      } finally {
        setLoading(false)
      }
    },
    [currentWeek, getWeekStart],
  )

  // Navigate between weeks
  const navigateWeek = useCallback(
    (direction) => {
      const newDate = new Date(currentWeek)
      newDate.setDate(currentWeek.getDate() + (direction === "next" ? 7 : -7))
      setCurrentWeek(newDate)
    },
    [currentWeek],
  )

  // Go to current week
  const goToCurrentWeek = useCallback(() => {
    setCurrentWeek(new Date())
  }, [])

  // Add meal to plan
  const addMealToPlan = useCallback(
    async (date, mealType, recipeId) => {
      setLoading(true)
      setError(null)

      try {
        const updatedPlan = await MealPlanService.addMealToPlan(date, mealType, recipeId)
        if (updatedPlan) {
          setWeekPlans((prev) => prev.map((plan) => (plan.date === date ? updatedPlan : plan)))

          // Refresh stats
          const weekStart = getWeekStart(currentWeek)
          const stats = await MealPlanService.getWeekStats(weekStart)
          setWeekStats(stats)

          return true
        }
        return false
      } catch (err) {
        setError("Failed to add meal to plan")
        return false
      } finally {
        setLoading(false)
      }
    },
    [currentWeek, getWeekStart],
  )

  // Remove meal from plan
  const removeMealFromPlan = useCallback(
    async (date, mealType) => {
      setLoading(true)
      setError(null)

      try {
        const updatedPlan = await MealPlanService.removeMealFromPlan(date, mealType)
        setWeekPlans((prev) => prev.map((plan) => (plan.date === date ? updatedPlan : plan)))

        // Refresh stats
        const weekStart = getWeekStart(currentWeek)
        const stats = await MealPlanService.getWeekStats(weekStart)
        setWeekStats(stats)

        return true
      } catch (err) {
        setError("Failed to remove meal from plan")
        return false
      } finally {
        setLoading(false)
      }
    },
    [currentWeek, getWeekStart],
  )

  // Load available recipes for meal selection
  const loadAvailableRecipes = useCallback(async () => {
    try {
      const recipes = await RecipeService.getAllRecipes()
      setAvailableRecipes(recipes)
    } catch (err) {
      setError("Failed to load recipes")
    }
  }, [])

  // Get week range string
  const getWeekRange = useCallback(() => {
    const weekStart = getWeekStart(currentWeek)
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)

    return `${weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${weekEnd.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
  }, [currentWeek, getWeekStart])

  // Format date for display
  const formatDate = useCallback((date) => {
    return date.toISOString().split("T")[0]
  }, [])

  // Check if date is today
  const isToday = useCallback(
    (date) => {
      return date === formatDate(new Date())
    },
    [formatDate],
  )

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Load data when current week changes
  useEffect(() => {
    loadWeekPlans()
  }, [currentWeek, loadWeekPlans])

  // Load available recipes on mount
  useEffect(() => {
    loadAvailableRecipes()
  }, [loadAvailableRecipes])

  return {
    weekPlans,
    currentWeek,
    loading,
    error,
    weekStats,
    availableRecipes,
    loadWeekPlans,
    navigateWeek,
    goToCurrentWeek,
    addMealToPlan,
    removeMealFromPlan,
    loadAvailableRecipes,
    getWeekRange,
    formatDate,
    isToday,
    clearError,
  }
}
