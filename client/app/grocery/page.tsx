"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, ShoppingCart, Trash2, Calendar, RefreshCw, Download } from "lucide-react"
import { GroceryCategory } from "@/components/grocery/grocery-category"
import { AddItemDialog } from "@/components/grocery/add-item-dialog"

// Mock grocery list data organized by categories
const mockGroceryList = {
  produce: [
    { id: 1, name: "Red Bell Pepper", quantity: "2 pieces", checked: false, fromRecipe: "Chicken Stir Fry" },
    { id: 2, name: "Yellow Bell Pepper", quantity: "1 piece", checked: false, fromRecipe: "Chicken Stir Fry" },
    { id: 3, name: "Onion", quantity: "1 medium", checked: true, fromRecipe: "Chicken Stir Fry" },
    { id: 4, name: "Garlic", quantity: "2 cloves", checked: false, fromRecipe: "Chicken Stir Fry" },
    { id: 5, name: "Fresh Ginger", quantity: "1 tbsp", checked: false, fromRecipe: "Chicken Stir Fry" },
    { id: 6, name: "Green Onions", quantity: "2 stalks", checked: false, fromRecipe: "Chicken Stir Fry" },
    { id: 7, name: "Lemon", quantity: "1 piece", checked: false, fromRecipe: "Grilled Salmon" },
  ],
  meat: [
    { id: 8, name: "Chicken Breasts", quantity: "2 pieces", checked: false, fromRecipe: "Chicken Stir Fry" },
    { id: 9, name: "Pancetta", quantity: "100g", checked: false, fromRecipe: "Pasta Carbonara" },
    { id: 10, name: "Salmon Fillets", quantity: "2 pieces", checked: true, fromRecipe: "Grilled Salmon" },
  ],
  dairy: [
    { id: 11, name: "Eggs", quantity: "6 pieces", checked: false, fromRecipe: "Pasta Carbonara" },
    { id: 12, name: "Parmesan Cheese", quantity: "50g", checked: false, fromRecipe: "Pasta Carbonara" },
  ],
  pantry: [
    { id: 13, name: "Spaghetti", quantity: "200g", checked: false, fromRecipe: "Pasta Carbonara" },
    { id: 14, name: "Soy Sauce", quantity: "1 bottle", checked: false, fromRecipe: "Chicken Stir Fry" },
    { id: 15, name: "Oyster Sauce", quantity: "1 bottle", checked: true, fromRecipe: "Chicken Stir Fry" },
    { id: 16, name: "Sesame Oil", quantity: "1 bottle", checked: false, fromRecipe: "Chicken Stir Fry" },
    { id: 17, name: "Vegetable Oil", quantity: "1 bottle", checked: false, fromRecipe: "Chicken Stir Fry" },
    { id: 18, name: "Sesame Seeds", quantity: "1 pack", checked: false, fromRecipe: "Chicken Stir Fry" },
    { id: 19, name: "Olive Oil", quantity: "1 bottle", checked: false, fromRecipe: "Grilled Salmon" },
  ],
  herbs: [{ id: 20, name: "Fresh Dill", quantity: "1 bunch", checked: false, fromRecipe: "Grilled Salmon" }],
}

const categoryNames = {
  produce: "Produce",
  meat: "Meat & Seafood",
  dairy: "Dairy & Eggs",
  pantry: "Pantry & Condiments",
  herbs: "Herbs & Spices",
}

export default function GroceryPage() {
  const [groceryList, setGroceryList] = useState(mockGroceryList)
  const [showAddDialog, setShowAddDialog] = useState(false)

  const toggleItem = (categoryKey: string, itemId: number) => {
    setGroceryList((prev) => ({
      ...prev,
      [categoryKey]: prev[categoryKey as keyof typeof prev].map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item,
      ),
    }))
  }

  const removeItem = (categoryKey: string, itemId: number) => {
    setGroceryList((prev) => ({
      ...prev,
      [categoryKey]: prev[categoryKey as keyof typeof prev].filter((item) => item.id !== itemId),
    }))
  }

  const getTotalItems = () => {
    return Object.values(groceryList).reduce((total, category) => total + category.length, 0)
  }

  const getCheckedItems = () => {
    return Object.values(groceryList).reduce((total, category) => {
      return total + category.filter((item) => item.checked).length
    }, 0)
  }

  const getProgress = () => {
    const total = getTotalItems()
    const checked = getCheckedItems()
    return total > 0 ? Math.round((checked / total) * 100) : 0
  }

  const clearCheckedItems = () => {
    setGroceryList((prev) => {
      const newList = { ...prev }
      Object.keys(newList).forEach((categoryKey) => {
        newList[categoryKey as keyof typeof newList] = newList[categoryKey as keyof typeof newList].filter(
          (item) => !item.checked,
        )
      })
      return newList
    })
  }

  const regenerateFromMealPlan = () => {
    // TODO: Implement regeneration from current meal plan
    console.log("Regenerating grocery list from meal plan...")
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Grocery List</h1>
              <p className="text-muted-foreground">Your smart shopping list organized by category</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={regenerateFromMealPlan}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Regenerate from Plan
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export List
              </Button>
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getTotalItems()}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{getCheckedItems()}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Remaining</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getTotalItems() - getCheckedItems()}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getProgress()}%</div>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgress()}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="sm" onClick={clearCheckedItems} disabled={getCheckedItems() === 0}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Checked Items ({getCheckedItems()})
            </Button>
            <Badge variant="secondary" className="flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              Generated from this week's meal plan
            </Badge>
          </div>

          {/* Grocery Categories */}
          <div className="space-y-6">
            {Object.entries(groceryList).map(([categoryKey, items]) => (
              <GroceryCategory
                key={categoryKey}
                title={categoryNames[categoryKey as keyof typeof categoryNames]}
                items={items}
                onToggleItem={(itemId) => toggleItem(categoryKey, itemId)}
                onRemoveItem={(itemId) => removeItem(categoryKey, itemId)}
              />
            ))}
          </div>

          {getTotalItems() === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <CardTitle className="mb-2">No items in your grocery list</CardTitle>
                <CardDescription className="mb-4">
                  Add items manually or generate a list from your meal plan
                </CardDescription>
                <div className="flex gap-2 justify-center">
                  <Button onClick={() => setShowAddDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                  <Button variant="outline" onClick={regenerateFromMealPlan}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Generate from Meal Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Add Item Dialog */}
      <AddItemDialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onAddItem={(item) => {
          // TODO: Implement add item logic
          console.log("Adding item:", item)
          setShowAddDialog(false)
        }}
      />
    </div>
  )
}
