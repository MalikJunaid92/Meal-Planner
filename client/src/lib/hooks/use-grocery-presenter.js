"use client"

import { useState, useCallback } from "react"
import { GroceryService } from "../services/grocery-service.js"

const categoryNames = {
  produce: "Produce",
  meat: "Meat & Seafood",
  dairy: "Dairy & Eggs",
  pantry: "Pantry & Condiments",
  herbs: "Herbs & Spices",
  frozen: "Frozen Foods",
  bakery: "Bakery",
  other: "Other",
}

export function useGroceryPresenter() {
  const [groceryList, setGroceryList] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Calculate categorized items
  const categorizedItems = groceryList ? GroceryService.getItemsByCategory(groceryList) : {}

  // Calculate stats
  const stats = {
    totalItems: groceryList?.items.length || 0,
    checkedItems: groceryList?.items.filter((item) => item.checked).length || 0,
    remainingItems: groceryList?.items.filter((item) => !item.checked).length || 0,
    progress: groceryList?.items.length
      ? Math.round((groceryList.items.filter((item) => item.checked).length / groceryList.items.length) * 100)
      : 0,
  }

  // Generate grocery list from meal plan
  const generateFromMealPlan = useCallback(async (startDate) => {
    setLoading(true)
    setError(null)

    try {
      const newList = await GroceryService.generateFromMealPlan(startDate || new Date())
      setGroceryList(newList)
    } catch (err) {
      setError("Failed to generate grocery list from meal plan")
    } finally {
      setLoading(false)
    }
  }, [])

  // Add manual item
  const addManualItem = useCallback(
    async (name, quantity, category) => {
      if (!groceryList) return

      setLoading(true)
      setError(null)

      try {
        const newItem = await GroceryService.addManualItem(name, quantity, category)
        setGroceryList((prev) => {
          if (!prev) return prev
          return {
            ...prev,
            items: [...prev.items, newItem],
            updatedAt: new Date(),
          }
        })
      } catch (err) {
        setError("Failed to add item")
      } finally {
        setLoading(false)
      }
    },
    [groceryList],
  )

  // Toggle item checked status
  const toggleItemChecked = useCallback(
    async (itemId) => {
      if (!groceryList) return

      setLoading(true)
      setError(null)

      try {
        const updatedList = await GroceryService.toggleItemChecked(itemId, groceryList)
        setGroceryList(updatedList)
      } catch (err) {
        setError("Failed to update item")
      } finally {
        setLoading(false)
      }
    },
    [groceryList],
  )

  // Remove item
  const removeItem = useCallback(
    async (itemId) => {
      if (!groceryList) return

      setLoading(true)
      setError(null)

      try {
        const updatedList = await GroceryService.removeItem(itemId, groceryList)
        setGroceryList(updatedList)
      } catch (err) {
        setError("Failed to remove item")
      } finally {
        setLoading(false)
      }
    },
    [groceryList],
  )

  // Clear checked items
  const clearCheckedItems = useCallback(async () => {
    if (!groceryList) return

    setLoading(true)
    setError(null)

    try {
      const updatedList = await GroceryService.clearCheckedItems(groceryList)
      setGroceryList(updatedList)
    } catch (err) {
      setError("Failed to clear checked items")
    } finally {
      setLoading(false)
    }
  }, [groceryList])

  // Export list (simple implementation)
  const exportList = useCallback(() => {
    if (!groceryList) return

    const listText = Object.entries(categorizedItems)
      .filter(([, items]) => items.length > 0)
      .map(([category, items]) => {
        const categoryName = categoryNames[category]
        const itemList = items.map((item) => `- ${item.name} (${item.quantity})`).join("\n")
        return `${categoryName}:\n${itemList}`
      })
      .join("\n\n")

    const blob = new Blob([listText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `grocery-list-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [groceryList, categorizedItems])

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    groceryList,
    loading,
    error,
    categorizedItems,
    stats,
    generateFromMealPlan,
    addManualItem,
    toggleItemChecked,
    removeItem,
    clearCheckedItems,
    exportList,
    clearError,
  }
}
