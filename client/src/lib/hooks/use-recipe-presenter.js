"use client"

import { useState, useEffect, useCallback } from "react"
import { RecipeService } from "../services/recipe-service.js"

export function useRecipePresenter() {
  const [recipes, setRecipes] = useState([])
  const [currentRecipe, setCurrentRecipe] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState([])
  const [allTags, setAllTags] = useState([])

  // Load all recipes
  const loadRecipes = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const fetchedRecipes = await RecipeService.getAllRecipes()
      setRecipes(fetchedRecipes)
      setAllTags(RecipeService.getAllTags())
    } catch (err) {
      setError("Failed to load recipes")
    } finally {
      setLoading(false)
    }
  }, [])

  // Load single recipe
  const loadRecipe = useCallback(async (id) => {
    setLoading(true)
    setError(null)
    try {
      const recipe = await RecipeService.getRecipeById(id)
      setCurrentRecipe(recipe)
    } catch (err) {
      setError("Failed to load recipe")
    } finally {
      setLoading(false)
    }
  }, [])

  // Create new recipe
  const createRecipe = useCallback(async (data) => {
    setLoading(true)
    setError(null)
    try {
      const newRecipe = await RecipeService.createRecipe(data)
      setRecipes((prev) => [...prev, newRecipe])
      setAllTags(RecipeService.getAllTags())
      return newRecipe
    } catch (err) {
      setError("Failed to create recipe")
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  // Update existing recipe
  const updateRecipe = useCallback(async (data) => {
    setLoading(true)
    setError(null)
    try {
      const updatedRecipe = await RecipeService.updateRecipe(data)
      if (updatedRecipe) {
        setRecipes((prev) => prev.map((recipe) => (recipe.id === updatedRecipe.id ? updatedRecipe : recipe)))
        setCurrentRecipe(updatedRecipe)
        setAllTags(RecipeService.getAllTags())
      }
      return updatedRecipe
    } catch (err) {
      setError("Failed to update recipe")
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  // Delete recipe
  const deleteRecipe = useCallback(
    async (id) => {
      setLoading(true)
      setError(null)
      try {
        const success = await RecipeService.deleteRecipe(id)
        if (success) {
          setRecipes((prev) => prev.filter((recipe) => recipe.id !== id))
          if (currentRecipe?.id === id) {
            setCurrentRecipe(null)
          }
          setAllTags(RecipeService.getAllTags())
        }
        return success
      } catch (err) {
        setError("Failed to delete recipe")
        return false
      } finally {
        setLoading(false)
      }
    },
    [currentRecipe],
  )

  // Search recipes
  const searchRecipes = useCallback(
    async (query, tags) => {
      const searchTerm = query !== undefined ? query : searchQuery
      const searchTags = tags !== undefined ? tags : selectedTags

      setLoading(true)
      setError(null)
      try {
        const results = await RecipeService.searchRecipes(searchTerm, searchTags)
        setRecipes(results)
      } catch (err) {
        setError("Failed to search recipes")
      } finally {
        setLoading(false)
      }
    },
    [searchQuery, selectedTags],
  )

  // Toggle tag selection
  const toggleTag = useCallback((tag) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }, [])

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchQuery("")
    setSelectedTags([])
  }, [])

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Auto-search when query or tags change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery || selectedTags.length > 0) {
        searchRecipes()
      } else {
        loadRecipes()
      }
    }, 300) // Debounce search

    return () => clearTimeout(timeoutId)
  }, [searchQuery, selectedTags, searchRecipes, loadRecipes])

  // Load initial data
  useEffect(() => {
    loadRecipes()
  }, [loadRecipes])

  return {
    recipes,
    currentRecipe,
    loading,
    error,
    searchQuery,
    selectedTags,
    allTags,
    loadRecipes,
    loadRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    searchRecipes,
    setSearchQuery,
    setSelectedTags,
    toggleTag,
    clearFilters,
    clearError,
  }
}
