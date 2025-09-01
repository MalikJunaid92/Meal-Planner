import { create } from "zustand"
import { RecipeService } from "../services/recipe-service.js"

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  currentRecipe: null,
  loading: false,
  error: null,
  searchQuery: "",
  selectedTags: [],

  // Actions
  fetchRecipes: async () => {
    set({ loading: true, error: null })
    try {
      const recipes = await RecipeService.getAllRecipes()
      set({ recipes, loading: false })
    } catch (error) {
      set({ error: "Failed to fetch recipes", loading: false })
    }
  },

  fetchRecipeById: async (id) => {
    set({ loading: true, error: null })
    try {
      const recipe = await RecipeService.getRecipeById(id)
      set({ currentRecipe: recipe, loading: false })
    } catch (error) {
      set({ error: "Failed to fetch recipe", loading: false })
    }
  },

  createRecipe: async (data) => {
    set({ loading: true, error: null })
    try {
      const newRecipe = await RecipeService.createRecipe(data)
      const { recipes } = get()
      set({
        recipes: [...recipes, newRecipe],
        loading: false,
      })
      return newRecipe
    } catch (error) {
      set({ error: "Failed to create recipe", loading: false })
      return null
    }
  },

  updateRecipe: async (data) => {
    set({ loading: true, error: null })
    try {
      const updatedRecipe = await RecipeService.updateRecipe(data)
      if (updatedRecipe) {
        const { recipes } = get()
        const updatedRecipes = recipes.map((recipe) => (recipe.id === updatedRecipe.id ? updatedRecipe : recipe))
        set({
          recipes: updatedRecipes,
          currentRecipe: updatedRecipe,
          loading: false,
        })
      }
      return updatedRecipe
    } catch (error) {
      set({ error: "Failed to update recipe", loading: false })
      return null
    }
  },

  deleteRecipe: async (id) => {
    set({ loading: true, error: null })
    try {
      const success = await RecipeService.deleteRecipe(id)
      if (success) {
        const { recipes } = get()
        const filteredRecipes = recipes.filter((recipe) => recipe.id !== id)
        set({ recipes: filteredRecipes, loading: false })
      }
      return success
    } catch (error) {
      set({ error: "Failed to delete recipe", loading: false })
      return false
    }
  },

  searchRecipes: async (query, tags = []) => {
    set({ loading: true, error: null })
    try {
      const recipes = await RecipeService.searchRecipes(query, tags)
      set({ recipes, loading: false })
    } catch (error) {
      set({ error: "Failed to search recipes", loading: false })
    }
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query })
  },

  setSelectedTags: (tags) => {
    set({ selectedTags: tags })
  },

  clearError: () => {
    set({ error: null })
  },
}))
